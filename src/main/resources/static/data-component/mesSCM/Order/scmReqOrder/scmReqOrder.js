/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    check2: 'Y',
    auth:{}
};

var save_rowid;
////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();

    modal_start1();
    authcheck();
    jqgridPagerIcons();
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return2(".condition_main");
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: '/scmReqOrderGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
    $('#mes_grid2').jqGrid('clearGridData');
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/scmReqOrderGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
    $('#mes_grid2').jqGrid('clearGridData');
}



function under_get(rowid) {

    $("#mes_grid2").setGridParam({
        url: '/scmReqOrderSubGet',
        datatype: "json",
        page: 1,
        postData: {keyword: rowid}
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", []);
        modal_reset(".modal_value2", []);
        $("#mes_modal1_grid1").jqGrid('clearGridData');
        $("#mes_modal1_grid2").jqGrid('clearGridData');

        $("#part_type_modal1_select").val('A').trigger("change");

        var date = new Date();
        var date2 = new Date();
        date2.setDate(date.getDate()+1);
        $('#datepicker3').datepicker('setDate',date);
        $('#datepicker4').datepicker('setDate',date2);

        main_data.check = 'I';
        main_data.check = 'Y';

        $("#addDialog").dialog('open');
        jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
        jqGridResize2("#mes_modal1_grid2", $('#mes_modal1_grid2').closest('[class*="col-"]'));
    } else {
        alert("추가권한이 없습니다,");
    }
}



function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                main_data.check = 'D';
                wrapWindowByMask2();
                ccn_ajax("/scmReqOrderDel", {req_no: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page'));
                    }
                    closeWindowByMask();
                }).catch(function (err) {
                    closeWindowByMask();
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert("삭제권한이 없습니다.");
    }
}
////////////////////////////호출 함수/////////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "scmReqOrder"}).then(function (data) {
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
        colNames: ['일자','접수번호', '수주번호', '수주처', 'End User','납기일','등록자','등록일'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 150,fixed:true,formatter: formmatterDate2},
            {name: 'req_no', index: 'req_no', key:true, sortable: false, width: 200,fixed:true},
            {name: 'ord_no', index: 'ord_no', sortable: false, width: 200,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150,fixed:true},
            {name: 'end_supp_name', index: 'end_supp_name', sortable: false, width: 150,fixed:true},
            {name: 'end_date', index: 'end_date', sortable: false, width: 180, formatter: formmatterDate2,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 180,  formatter: formmatterDate,fixed:true}
        ],
        caption: '구매요청현황 | MES',
        autowidth: true,
        height: 243,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');

                $myGrid.setRowData(save_rowid, false, {background:"#FFFFFF"}) ;
                save_rowid = rowid;
                $myGrid.setRowData(rowid, false, {background:"rgb(190, 220, 260)"}) ;

            return (cm[i].name === 'cb');
        },
        onCellSelect: function (rowid, icol, cellcontent, e) {
            under_get(rowid);
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            if (data.ord_no === '') {
                update_btn(rowid);
            } else {
                alert("수정 할수 없습니다.");
            }
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_grid tr.jqgfirstrow").css("height","1px");
            else
                $("table#mes_grid tr.jqgfirstrow").css("height","0px");
        }
    });

    $('#mes_grid2').jqGrid({
        mtype: 'POST',
        datatype: "local",
        caption: "출고요청 | MES",
        colNames: ['전표번호','품번','품명','규격','단위','발주단위','요청수량'],
        colModel: [
            {name: 'req_no', index: 'req_no', width: 205, sortable: false,fixed:true},
            {name: 'part_code', index: 'part_code', width: 200, sortable: false,fixed:true},
            {name: 'part_name', index: 'part_name', width: 200, sortable: false,fixed:true},
            {name: 'spec', index: 'spec', width: 200, sortable: false,fixed:true},
            {name: 'unit_name', index: 'unit_name', width: 200, sortable: false,fixed:true},
            {name: 'ord_qty', index: 'ord_qty', width: 195, sortable: false, align: 'right',formatter:'number',fixed:true},
            {name: 'qty', index: 'qty', width: 195, sortable: false, align: 'right',formatter:'number',fixed:true}
        ],
        autowidth: true,
        viewrecords: true,
        height: 194,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid2_pager',
        loadComplete:function(){
            if ($("#mes_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_grid2 tr.jqgfirstrow").css("height","1px");
            else
                $("table#mes_grid2 tr.jqgfirstrow").css("height","0px");
        }

    });

}

