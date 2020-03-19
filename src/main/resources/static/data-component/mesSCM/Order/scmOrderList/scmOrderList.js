/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    supp_check: 'A',
    send_data: {},
    send_data_post: {},
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();

    suppModal_start();
    authcheck();
    jqgridPagerIcons();
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return2(".condition_main");

    main_data.send_data.keyword2 ='';
    main_data.send_data.keyword3 ='';
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: '/scmOrderListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/scmOrderListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function supp_btn(what) {
    main_data.supp_check = what;

    $("#SuppSearchGrid").jqGrid('clearGridData');
    $("#supp-search-dialog").dialog('open');
    $('#gubun_select option:eq(0)').prop("selected", true).trigger("change");
    $('#supp_code_search').val('').trigger("change");

    jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));
}

function suppModal_bus(code, name) {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val(name);
        $("#supp_code_main").val(code);
    } else if (main_data.supp_check === 'B') {
        $("#supp_name_modal").val(name);
        $("#supp_code_modal").val(code);
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');

}

function suppModal_close_bus() {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val("");
        $("#supp_code_main").val("");
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}


function excel_download() {
    if (confirm("엑셀로 저장하시겠습니까?")) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data: {
                "name":"scmOrderList",
                "row0":$('#datepicker').val().replace(/-/gi,""),
                "row1": $('#datepicker2').val().replace(/-/gi,""),
                "row2":$('#supp_code_main').val()
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
////////////////////////////호출 함수/////////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "scmOrderList"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: 'local',
        mtype: 'POST',
        colNames: ['발주일자', '발주번호', '업체명', '품번', '품명', '규격', '단위', '상태', '발주수량', '입고수량', '미입고', '등록자', '등록일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 130,fixed:true, formatter: formmatterDate2},
            {name: 'ord_no', index: 'ord_no', sortable: false,fixed:true, width: 150},
            {name: 'supp_name', index: 'supp_name', sortable: false,fixed:true, width: 150},
            {name: 'part_code', index: 'part_code', sortable: false,fixed:true, width: 150},
            {name: 'part_name', index: 'part_name', sortable: false,fixed:true, width: 150},
            {name: 'spec', index: 'spec', sortable: false,fixed:true, width: 150},
            {name: 'unit_name', index: 'unit_name', sortable: false,fixed:true, width: 100},
            {name: 'status_name', index: 'status_name', sortable: false,fixed:true, width: 150},
            {name: 'ord_qty', index: 'ord_qty', sortable: false,fixed:true, width: 100, align: 'right',formatter:'number'},
            {name: 'qty', index: 'qty', sortable: false,fixed:true, width: 100, align: 'right',formatter:'number'},
            {name: 'not_qty', index: 'not_qty', sortable: false,fixed:true, width: 100, align: 'right',formatter:'number'},
            {name: 'user_name', index: 'user_code', sortable: false,fixed:true, width: 150},
            {name: 'update_date', index: 'update_date', sortable: false,fixed:true, width: 180, formatter: formmatterDate}
        ],
        caption: '발주현황 | MES',
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        onCellSelect: function (rowid, icol, cellcontent, e) {

        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_grid tr.jqgfirstrow").css("height","1px");
            else
                $("table#mes_grid tr.jqgfirstrow").css("height","0px");
        }
    });
}