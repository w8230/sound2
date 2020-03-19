/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
/**
 * @desc : 사용자관리 main 데이터
 * @생성자 : 김종효
 * @생성일 : 2019-11-12
 * */
var main_data = {
    check: 'I',
    supp_check: 'A',
    send_data: {},
    send_data_post: {},
    check2: 'Y',
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////
/**
 * @desc : 사용자관리 main 시작 함수
 * @생성자 : 김종효
 * @생성일 : 2019-11-12
 * */
$(document).ready(function () {
    jqGrid_main();
    jqGridResize("#scmInTopGrid", $('#scmInTopGrid').closest('[class*="col-"]'));
    jqGridResize("#scmInBottomGrid", $('#scmInBottomGrid').closest('[class*="col-"]'));
    datepickerInput();
    /*----모달----*/
    modal_start1();
    modal_start2();
    modal_start3();

    suppModal_start();
    authcheck();
    jqgridPagerIcons();

});


////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;
    $("#scmInTopGrid").setGridParam({
        url: "/scmInGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
    $('#scmInBottomGrid').jqGrid('clearGridData');
}

function get_btn_post(page) {
    $("#scmInTopGrid").setGridParam({
        url: '/scmInGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
    $('#scmInBottomGrid').jqGrid('clearGridData');
}

function under_get(rowid) {

    $("#scmInBottomGrid").setGridParam({
        url: '/scmInSub1Get',
        datatype: "json",
        page: 1,
        postData: {keyword: rowid}
    }).trigger("reloadGrid");
}


function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", []);
        modal_reset(".modal_value2", []);
        $("#scmInDialogLeftGrid").jqGrid('clearGridData');
        $("#scmInDialogRightGrid").jqGrid('clearGridData');
        modal2_data.part_code = '';
        modal2_data.sub_data = [];
        modal3_data.part_code = '';
        modal3_data.sub_data = [];

        $("#part_type_modal1_select").val('D').trigger("change");
        $("#datepicker3").datepicker('setDate', 'today');

        main_data.check = 'I';
        main_data.check2 = 'Y';
        $("#supp_name_modal").prop("disabled", false);
        $("#part_type_select").prop("disabled", false);
        $("#part_group_select1").prop("disabled", false);
        $("#part_group_select2").prop("disabled", false);
        $("#part_group_select3").prop("disabled", false);
        $("#scmIn-add-dialog").dialog('open');
        jqGridResize2("#scmInDialogLeftGrid", $('#scmInDialogLeftGrid').closest('[class*="col-"]'));
        jqGridResize2("#scmInDialogRightGrid", $('#scmInDialogRightGrid').closest('[class*="col-"]'));
    } else {
        alert("추가권한이 없습니다,");
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
        modal2_data.part_code = '';
        modal2_data.sub_data = [];
        $("#scmInDialogLeftGrid").jqGrid('clearGridData');
        $("#scmInDialogRightGrid").jqGrid('clearGridData');
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


function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#scmInTopGrid").getGridParam('selarrrow');
        var check = '';
        var check2 = [];
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            ids.forEach(function (id) {
                check = $('#scmInTopGrid').jqGrid('getRowData', id).status;
                if (check === '2') {
                    check2.push(id);
                }

            })
            if (check2.length > 0) {
                alert(check2.join(",") + " 전표가 입고 완료 되어있습니다.");
            } else {
                if (confirm("삭제하겠습니까?")) {
                    main_data.check = 'D';
                    wrapWindowByMask2();
                    ccn_ajax("/scmInDel", {keyword: ids.join(gu5)}).then(function (data) {
                        if (data.result === 'NG') {
                            alert(data.message);
                        } else {
                            get_btn_post($("#scmInTopGrid").getGridParam('page'));
                        }
                        $('#scmInBottomGrid').jqGrid('clearGridData');
                        closeWindowByMask();
                    }).catch(function (err) {
                        closeWindowByMask();
                        console.error(err); // Error 출력
                    });
                }
            }
            $('#scmInTopGrid').jqGrid("resetSelection");
        }
    } else {
        alert("삭제권한이 없습니다.");
    }
}


////////////////////////////호출 함수/////////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "scmIn"}).then(function (data) {
        main_data.auth = data;
    });
}


function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);

}

function jqGrid_main() {
    $("#scmInTopGrid").jqGrid({
        mtype: 'POST',
        datatype: "local",
        // 다중 select
        multiselect: true,
        // 타이틀
        caption: "입고등록 | MES",
        colNames: ['입고일자', '전표번호', '업체', '상태', '상태기준', '처리자', '입고일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', width: 60, sortable: false, formatter: formmatterDate2},
            {name: 'in_no', index: 'in_no', key: true, width: 60, sortable: false},
            {name: 'supp_name', index: 'supp_name', width: 60, sortable: false},
            {name: 'status_name', index: 'status_name', width: 60, sortable: false},
            {name: 'status', index: 'status', hidden: true, width: 60, sortable: false},
            {name: 'user_name', index: 'user_name', width: 60, sortable: false},
            {name: 'update_date', index: 'update_date', width: 60, sortable: false,formatter: formmatterDate},
        ],
        autowidth: true,
        viewrecords: true,
        height: 243,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#scmInTopGridPager',
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
            var data = $('#scmInTopGrid').jqGrid('getRowData', rowid);
            if (data.status === '2') {
                main_data.check2 = 'N';
            } else {
                main_data.check2 = 'Y';
            }
            update_btn(rowid);

        }

    });

    $('#scmInBottomGrid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        caption: "입고등록 | MES",
        colNames: ['전표번호', '품번', '품명', '업체명', '규격', '단위', 'lot', '입고수량', '패킹수'],
        colModel: [
            {name: 'in_no', index: 'in_no', width: 60, sortable: false},
            {name: 'part_code', index: 'part_code', width: 60, sortable: false},
            {name: 'part_name', index: 'part_name', width: 60, sortable: false},
            {name: 'supp_name', index: 'supp_name', width: 60, sortable: false},
            {name: 'spec', index: 'spec', width: 60, sortable: false},
            {name: 'unit_name', index: 'unit_name', width: 60, sortable: false},
            {name: 'lot', index: 'lot', width: 60, sortable: false},
            {name: 'qty', index: 'qty', width: 60, sortable: false, align: 'right',formatter:'number'},
            {name: 'pack_qty', index: 'pack_qty', width: 60, sortable: false, align: 'right',formatter:'integer'},
        ],
        autowidth: true,
        viewrecords: true,
        height: 194,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#scmInBottomGridPager'

    });

}


var save_rowid;

