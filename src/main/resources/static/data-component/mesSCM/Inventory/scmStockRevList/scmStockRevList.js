/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    auth:{}
};

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    authcheck();
    datepickerInput();
    selectBox();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////
function select_type_change(value) {
    if(main_data.change ==='N'){
        console.log(value);
        if(value == 'C'){
            $('#part_group3').text('');
            $('#part_group3').removeClass('td-title');
            $('#part_name_select').empty();
            $('#part_name').addClass('select_hide');
        }else {
            $('#part_group3').text('품명');
            $('#part_group3').addClass('td-title');
            $('#part_name').removeClass('select_hide');
            part_type_select_ajax_all("#part_group1_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name",{keyword:value}).then(function (data) {
                $('#part_group2_select').empty();
                var option = null;
                option = $("<option></option>").text('전체').val('');
                $('#part_group2_select').append(option);
                $('#part_group2_select').select2();
            });
            if (value === 'D'){
                select_makes_sub('#part_name_select', "/sysPartNameGroupAllGet","code_name2" ,"code_name2",{keyword:'MAT_PROD', keyword2:'CODE'},'Y');
            } else if (value === 'A') {
                select_makes_sub('#part_name_select', "/sysPartNameGroupAllGet","code_name2" ,"code_name2",{keyword:'MAT_PRODUCT', keyword2:'CODE'},'Y');
            }
        }
    }
}
function excel_download() {
    if (confirm("엑셀로 저장하시겠습니까?")) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name": "scmStockRevList",
                "row0": $('#datepicker').val().replace(/-/gi, ""),
                "row1": $('#datepicker2').val().replace(/-/gi, ""),
                "row2": $('#part_type_select').val(),
                "row3": $('#part_group1_select').val(),
                "row4": $('#part_group2_select').val(),
                "row5": $('#part_name_select').val()
            },
            successCallback: function (url) {
                $preparingFileModal.dialog('close');
            },
            failCallback: function (responseHtml, url) {
                $preparingFileModal.dialog('close');
                $("#error-modal").dialog({modal: true});
            }
        });
        return false;
    }
}

function select_change1(value) {
    if(value === ''){
        $('#part_group2_select').empty();
        var option = null;
        option = $("<option></option>").text('전체').val('');
        $('#part_group2_select').append(option);
        $('#part_group2_select').select2();
    }else{
        part_type_select_ajax_all('#part_group2_select', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:$("#part_type_select").val(), keyword2:value});
    }
}
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.stop_date = main_data.send_data.stop_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: '/scmStockRevListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/scmStockRevListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

////////////////////////////호출 함수//////////////////////////////////
function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "scmStockRevList"}).then(function (data) {
        main_data.auth = data;
    });
}
function selectBox() {
    $("#part_type_select").select2();
    part_type_select_ajax_all("#part_group1_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name",{keyword:'D'}).then(function (data) {
        $("#part_type_select").val('D').trigger("change");
        main_data.change='N';
        if($('#part_group1_select').val() === ''){
            $('#part_group2_select').empty();
            var option = null;
            option = $("<option></option>").text('전체').val('');
            $('#part_group2_select').append(option);
            $('#part_group2_select').select2();
        }else{
            part_type_select_ajax_all('#part_group2_select', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:'D', keyword2:data[0].part_grp_code});
        }
    });

    part_type_select_ajax_all('#part_name_select', "/sysPartNameGroupAllGet","code_name2" ,"code_name2",{keyword:'MAT_PROD', keyword2:'CODE'});
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['조정일자','조정번호','제품유형','품목군','제품군','품번','품명','규격','단위','바코드','조정전수량','조정후수량','증가','조정사유','등록자','조정일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', width: 150,formatter: formmatterDate2,sortable:false,fixed:true},
            {name: 'rev_no', index: 'rev_no', width: 150,sortable:false,fixed:true},
            {name: 'part_type_name', index: 'part_type_name', width: 150,sortable:false,fixed:true},
            {name: 'part_grp_name', index: 'part_grp_name', width: 150,sortable:false,fixed:true},
            {name: 'part_grp_name2', index: 'part_grp_name2', width: 150,sortable:false,fixed:true},
            {name: 'part_code', index: 'part_code', width: 150,sortable:false,fixed:true},
            {name: 'part_name', index: 'part_name', width: 150,sortable:false,fixed:true},
            {name: 'spec', index: 'spec', width: 150,sortable:false,fixed:true},
            {name: 'unit_name', index: 'unit_name', width: 100,sortable:false,fixed:true},
            {name: 'bcr', index: 'bcr', width: 150,sortable:false,fixed:true},
            {name: 'stock_qty_prev', index: 'stock_qty_prev', width: 100, align: 'right',formatter:'number',sortable:false,fixed:true},
            {name: 'stock_qty', index: 'stock_qty', width: 100, align: 'right',formatter:'number',sortable:false,fixed:true},
            {name: 'increase_qty', index: 'increase_qty', width: 100, align: 'right',formatter:'number',sortable:false,fixed:true},
            {name: 'rev_name', index: 'rev_name', width: 100,sortable:false,fixed:true},
            {name: 'user_name', index: 'user_name', width: 100,sortable:false,fixed:true},
            {name: 'update_date', index: 'update_date', width:180,formatter: formmatterDate,sortable:false,fixed:true}
        ],
        caption: "자재조정현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

