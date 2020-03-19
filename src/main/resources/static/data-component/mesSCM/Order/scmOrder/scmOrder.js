/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    supp_check: 'A',
    send_data: {},
    send_data_post: {},
    check2 : 'Y',
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqGridResize("#mes_grid2", $('#mes_grid2').closest('[class*="col-"]'));
    datepickerInput();

    modal_start1();
    suppModal_start();
    selectBox();
    authcheck();
    jqgridPagerIcons();
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: "/scmOrderGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
    $('#mes_grid2').jqGrid('clearGridData');
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/scmOrderGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
    $('#mes_grid2').jqGrid('clearGridData');
}

function under_get(rowid) {

    $("#mes_grid2").setGridParam({
        url: '/scmOrderSub1Get',
        datatype: "json",
        page: 1,
        postData: {keyword: rowid}
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", []);
        modal_reset(".modal_value2", []);

        $("#mes_add_grid").jqGrid('clearGridData');
        $("#mes_add_grid2").jqGrid('clearGridData');

        $("#datepicker3").datepicker('setDate', 'today');
        $("#part_type_modal1_select").val('D').trigger("change");
        $("#view_select option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=t_payment] option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=t_delivery] option:eq(0)").prop("selected", true).trigger("change");
        $("input[name=attachment]:eq(0)").prop("checked", true).trigger("change");
        $("select[name=shipping_addr] option:eq(0)").prop("selected", true).trigger("change");

        main_data.check = 'I';
        main_data.check2 = 'Y';

        $("#addDialog").dialog('open');
        jqGridResize2("#mes_add_grid", $('#mes_add_grid').closest('[class*="col-"]'));
        jqGridResize2("#mes_add_grid2", $('#mes_add_grid2').closest('[class*="col-"]'));
    } else {
        alert("추가권한이 없습니다,");
    }
}


function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        var check = '';
        var check2 = [];
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            ids.forEach(function (id) {
                check = $('#mes_grid').jqGrid('getRowData', id).status;
                if (check === '1') {
                    check2.push(id);
                }

            })
            if (check2.length > 0) {
                alert(check2.join(",") + " 전표가 완료 되어있습니다.");
            } else {
                if (confirm("삭제하겠습니까?")) {
                    main_data.check = 'D';
                    wrapWindowByMask2();
                    ccn_ajax("/scmOrderDel", {ord_no: ids.join(gu5)}).then(function (data) {
                        if (data.result === 'NG') {
                            alert(data.message);
                        } else {
                            get_btn_post($("#mes_grid").getGridParam('page'));
                        }
                        $('#mes_grid2').jqGrid('clearGridData');
                        closeWindowByMask();
                    }).catch(function (err) {
                        closeWindowByMask();
                        console.error(err); // Error 출력
                    });
                }
            }
            $('#mes_grid').jqGrid("resetSelection");
        }
    } else {
        alert("삭제권한이 없습니다.");
    }
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
        $("#mes_add_grid").jqGrid('clearGridData');
        $("#mes_add_grid2").jqGrid('clearGridData');
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');

}

function complete_btn() {
    if(main_data.auth.check_edit != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');

        if (ids.length === 0) {
            alert("완료처리하는 데이터를 선택해주세요");
        } else {


            if (confirm("완료처리 하겠습니까?")) {;
                wrapWindowByMask2();
                ccn_ajax("/scmOrderAdd2", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page'));
                    }
                    $('#mes_grid2').jqGrid('clearGridData');
                    closeWindowByMask();
                }).catch(function (err) {
                    closeWindowByMask();
                    console.error(err); // Error 출력
                });
            }

            $('#mes_grid').jqGrid("resetSelection");
        }
    } else {
        alert("수정권한이 없습니다.");
    }
}

function ord_cancel_btn() {
    if(main_data.auth.check_edit != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');

        if (ids.length === 0) {
            alert("취소처리하는 데이터를 선택해주세요");
        } else {


            if (confirm("취소처리 하겠습니까?")) {;
                wrapWindowByMask2();
                ccn_ajax("/scmOrderCancel", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page'));
                    }
                    $('#mes_grid2').jqGrid('clearGridData');
                    closeWindowByMask();
                }).catch(function (err) {
                    closeWindowByMask();
                    console.error(err); // Error 출력
                });
            }

            $('#mes_grid').jqGrid("resetSelection");
        }
    } else {
        alert("수정권한이 없습니다.");
    }
}

////////////////////////////호출 함수/////////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "scmOrder"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    $('#status_select').select2();
}

function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);

}

function suppModal_close_bus() {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val("");
        $("#supp_code_main").val("");
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: 'local',
        multiselect: true,
        caption: '발주등록 | MES',
        colNames: ['발주일자', '전표번호', '업체', '상태','상태코드', '등록자', '발주일자'],
        colModel: [
            {name: 'work_date', index: 'work_date', width: 200,formatter: formmatterDate2, sortable: false,fixed:true},
            {name: 'ord_no', index: 'ord_no', key: true, width: 200, sortable: false,fixed:true},
            {name: 'supp_name', index: 'supp_name', width: 200, sortable: false,fixed:true},
            {name: 'status_name', index: 'status_name', width: 200, sortable: false,fixed:true},
            {name: 'status', index: 'status',hidden:true, sortable: false},
            {name: 'user_name', index: 'user_name', width: 150, sortable: false,fixed:true},
            {name: 'update_date', index: 'update_date', width: 240,formatter: formmatterDate, sortable: false,fixed:true}
        ],
        autowidth: true,
        viewrecords: true,
        height: 243,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager',
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
            if (data.status === '1') {
                main_data.check2 = 'N';
            } else {
                main_data.check2 = 'Y';
            }
            update_btn(rowid);
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
        datatype: 'local',
        caption: '발주등록 | MES',
        colNames: ['전표번호', '품번', '품명', '규격','도면REV' ,'단위','발주수량','입고수량','미입고'],
        colModel: [
            {name: 'ord_no', index: 'ord_no', width: 180, sortable: false,fixed:true},
            {name: 'part_code', index: 'part_code', width: 150,key:true, sortable: false,fixed:true},
            {name: 'part_name', index: 'part_name', width: 150, sortable: false,fixed:true},
            {name: 'spec', index: 'spec', width: 150, sortable: false,fixed:true},
            {name: '', index: '', width: 150, sortable: false,fixed:true,hidden:true},
            {name: 'unit_name', index: 'unit_name', width: 150, sortable: false,fixed:true},
            {name: 'ord_qty', index: 'ord_qty', width: 100, sortable: false,fixed:true, align: 'right',formatter:'number'},
            {name: 'qty', index: 'qty', width: 100, sortable: false,fixed:true, align: 'right',formatter:'number'},
            {name: 'not_qty', index: 'not_qty', width: 100, sortable: false,fixed:true, align: 'right',formatter:'number'}
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

var save_rowid;