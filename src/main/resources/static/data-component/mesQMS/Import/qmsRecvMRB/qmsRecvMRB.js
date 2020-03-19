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
    selectBox();
    datepickerInput();
    suppModal_start();
    authcheck();
    jqgridPagerIcons();
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: "/qmsRecvMRBGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: "/qmsRecvMRBGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_edit !="N") {
        var gu4 = String.fromCharCode(4);
        var gu5 = String.fromCharCode(5);

        var ids = $("#mes_grid").getGridParam('selarrrow');
        var check = '';
        var check2 = [];
        var jdata ={};
        var list = [];
        if (ids.length === 0) {
            alert("MRB 처리할 데이터를 선택해주세요");
        }else {
            ids.forEach(function (id) {
                jdata = $('#mes_grid').jqGrid('getRowData', id);
                check = jdata.mrb;
                if (check === 'Y') {
                    check2.push(id);
                }else {
                    list.push(jdata.in_no+gu4+jdata.part_code);
                }
            });

            callback(function () {
                if (check2.length > 0) {
                    alert("MRB가 이미 처리 된 데이터가 있습니다.");
                } else {
                    if (confirm("MRB 처리하겠습니까?")) {
                        wrapWindowByMask2();
                        ccn_ajax("/qmsRecvMRBAdd", {keyword: list.join(gu5)}).then(function (data) {
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
            });
        }
    } else {
        alert("수정권한이 없습니다.");
    }
}

function cancel_btn() {
    if (main_data.auth.check_edit !="N") {
        var gu4 = String.fromCharCode(4);
        var gu5 = String.fromCharCode(5);

        var ids = $("#mes_grid").getGridParam('selarrrow');
        var check = '';
        var check2 = [];
        var jdata ={};
        var list = [];
        if (ids.length === 0) {
            alert("MRB 취소 하는 데이터를 선택해주세요");
        }else {
            ids.forEach(function (id) {
                jdata = $('#mes_grid').jqGrid('getRowData', id);
                check = jdata.mrb;
                if (check === 'N') {
                    check2.push(id);
                }else {
                    list.push(jdata.in_no+gu4+jdata.part_code);
                }
            });

            callback(function () {
                if (check2.length > 0) {
                    alert("MRB가 이미 취소 된 데이터가 있습니다.");
                } else {
                    if (confirm("MRB 처리하겠습니까?")) {
                        wrapWindowByMask2();
                        ccn_ajax("/qmsRecvMRBCancel", {keyword: list.join(gu5)}).then(function (data) {
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
            });
        }
    } else {
        alert("수정권한이 없습니다.");
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
////////////////////////////호출 함수/////////////////////////////////////
function selectBox() {
    $('#result_select').select2();
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsRecvMRB"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['rownum','입고일자', '전표번호', '업체', '품번', '품명', '규격', '단위',  '검사등급'
            , '입고수량','검사수량','불량수량', '검사결과','불량유형'
            ,'불량내용','완료여부','성적서','부적합보고서','개선조치','검사자','검사일시','MRB','MRB일시'],
        colModel: [
            {name: 'rownum', index: 'rownum', key:true, hidden:true, sortable: false},
            {name: 'work_date', index: 'work_date', sortable: false, width: 150, formatter: formmatterDate2,fixed: true},
            {name: 'in_no', index: 'in_no', sortable: false, width: 150,fixed: true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150,fixed: true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 150,fixed: true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 150,fixed: true},
            {name: 'spec', index: 'spec', sortable: false, width: 150,fixed: true},
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 100,fixed: true},
            {name: 'qc_level_name', index: 'qc_level_name', sortable: false, width: 100,fixed: true},
            {name: 'in_qty', index: 'in_qty', sortable: false, width: 100,fixed: true, align: 'right',formatter:'number'},
            {name: 'qc_qty', index: 'qc_qty', sortable: false, width: 100,fixed: true, align: 'right',formatter:'number'},
            {name: 'ng_qty', index: 'ng_qty', sortable: false, width: 100,fixed: true, align: 'right',formatter:'number'},
            {name: 'qc_result_name', index: 'qc_result_name', sortable: false, width: 100,fixed: true},
            {name: 'qc_name', index: 'qc_name', sortable: false, width: 100,fixed: true},
            {name: 'ng_name', index: 'ng_name', sortable: false, width: 100,fixed: true},
            {name: 'act_type_name', index: 'act_type_name', sortable: false, width: 100,fixed: true},
            {name: 'file1_name', index: 'file1_name', sortable: false, width: 100,fixed: true},
            {name: 'file2_name', index: 'file2_name', sortable: false, width: 100,fixed: true},
            {name: 'file3_name', index: 'file3_name', sortable: false, width: 100,fixed: true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed: true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 180, formatter: formmatterDate,fixed: true},
            {name: 'mrb', index: 'mrb', sortable: false, width: 100,fixed: true},
            {name: 'mrb_date', index: 'mrb_date', sortable: false, width: 180, formatter: formmatterDate,fixed: true},
        ],
        caption: "수입검사MRB관리 | MES",
        autowidth: true,
        multiselect: true,
        height:562,

        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,

        onCellSelect: function (rowid, icol, cellcontent, e) {

        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
        }
        ,
        loadComplete:function(){
        if ($("#mes_grid").jqGrid('getGridParam', 'reccount') == 0)
            $(".jqgfirstrow").css("height","1px");
        else
            $(".jqgfirstrow").css("height","0px");
    }
    });
}
