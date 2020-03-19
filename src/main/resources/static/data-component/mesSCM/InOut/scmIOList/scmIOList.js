/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    send_data: {},
    auth:{}
};


////////////////////////////시작 함수/////////////////////////////////////


$(document).ready(function () {
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
    selectBox();
});

////////////////////////////클릭 함수/////////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return2(".condition_main");
    $("#mes_grid").setGridParam({
        url: '/scmIOListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
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
                "name": "scmIOList",
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

////////////////////////////호출 함수/////////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "scmIOList"}).then(function (data) {
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

function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['seq','제품유형', '품목군', '제품군', '품번', '품명', '규격', '일자', '수량', '구분'],
        colModel: [
            {name: 'seq', index: 'seq',hidden:true,key:true, sortable: false},
            {name: 'part_type_name', index: 'part_type_name', sortable: false, width: 150,fixed:true},
            {name: 'part_grp_name', index: 'part_grp_name', sortable: false, width: 150,fixed:true},
            {name: 'part_grp_name2', index: 'part_grp_name2', sortable: false, width: 150,fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 150,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 150,fixed:true},
            {name: 'spec', index: 'spec', sortable: false, width: 150,fixed:true},
            {name: 'work_date', index: 'work_date', sortable: false, width: 150,fixed:true, formatter: formmatterDate2},
            {name: 'qty', index: 'qty', sortable: false, width: 100, align: 'right',fixed:true,formatter:'number'},
            {name: 'remark', index: 'remark', sortable: false, width: 100 ,fixed:true}
        ],
        caption: "자재입출고현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        loadComplete : function(data) {
            data.rows.forEach(function (idsfor, s) {
                if (idsfor.work_date === '소계'){
                    $("#mes_grid").setRowData(idsfor.seq, false, {background:"rgb(155, 185, 239)"}) ;

                }
            });

            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");

        },
    });
}
