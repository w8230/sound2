/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    auth: {},
    change: 'Y'
};

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    authcheck();
    selectBox();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////
function select_type_change(value) {
    if(main_data.change ==='N'){
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
    main_data.send_data_post = main_data.send_data;
    console.log(main_data);
    if(main_data.keyword4 === null) {
        main_data.keyword4 = '';
    }
    $("#mes_grid").setGridParam({
        url: '/scmStockListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/scmStockListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function excel_download() {
    if (confirm("엑셀로 저장하시겠습니까?")) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name":"scmStockList",
                "row0":$('#part_type_select').val(),
                "row1":$('#part_group1_select').val(),
                "row2":$('#part_group2_select').val(),
                "row3":$('#part_name_select').val()
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

////////////////////////////호출 함수//////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "scmStockList"}).then(function (data) {
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
        colNames: ['제품유형','품목군','제품군','품명','품목코드','규격', '단위', '공급업체', '적정재고(최소)', '적정재고(최대)', '재고량'],
        colModel: [
            {name: 'part_type_name', index: 'part_type_name', width: 150,sortable:false,fixed:true},
            {name: 'part_grp_name', index: 'part_grp_name', width: 150,sortable:false,fixed:true},
            {name: 'part_grp_name2', index: 'part_grp_name2', width: 150,sortable:false,fixed:true},
            {name: 'part_name', index: 'part_name', width: 150,sortable:false,fixed:true},
            {name: 'part_code', index: 'part_code', width: 150,sortable:false,fixed:true},
            {name: 'spec', index: 'spec', width: 150,sortable:false,fixed:true},
            {name: 'unit_name', index: 'unit_name', width: 100,sortable:false,fixed:true},
            {name: 'supp_name', index: 'supp_name', width: 150,sortable:false,fixed:true},
            {name: 'min_qty', index: 'min_qty', width: 100, align: 'right',formatter:'number',sortable:false,fixed:true},
            {name: 'max_qty', index: 'max_qty', width: 100, align: 'right',formatter:'number',sortable:false,fixed:true},
            {name: 'qty', index: 'qty', width: 100, align: 'right',formatter:'number',sortable:false,fixed:true}
        ],
        caption: "재고현황 | MES",
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

