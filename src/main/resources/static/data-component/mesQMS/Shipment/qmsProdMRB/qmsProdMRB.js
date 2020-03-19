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

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    selectBox();
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: "/qmsProdMRBGet",
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
        url: "/qmsProdMRBGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_edit !="N") {
        var gu4 = String.fromCharCode(4);
        var gu5 = String.fromCharCode(5);

        var ids = $('#mes_grid').getGridParam('selarrrow');
        var check = '';
        var check2 = [];
        var jdata = {};
        var list = [];
        if(ids.length === 0) {
            alert('MRB 처리할 데이터를 선택해주세요.');
        }else {
            ids.forEach(function (id){
                jdata = $('#mes_grid').jqGrid('getRowData',id);
                check = jdata.mrb;
                if (check === 'Y') {
                    check2.push(id);
                }else {
                    list.push(jdata.in_no+gu4+jdata.part_code);
                }
            });

            callback(function () {
                if(check2.length > 0) {
                    alert('이미 MRB 처리된 데이터가 있습니다.');
                } else {
                    if(confirm("MRB 처리하시겠습니까?")) {
                        wrapWindowByMask2();
                        ccn_ajax("/qmsProdMRBAdd", {keyword: list.join(gu5)}).then(function (data) {
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
            alert("MRB 처리를 취소할 데이터를 선택해주세요.");
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
                    alert("MRB 처리가 되지않은 데이터가 있습니다.");
                } else {
                    if (confirm("MRB 처리를 취소하시겠습니까?")) {
                        wrapWindowByMask2();
                        ccn_ajax("/qmsProdMRBCancel", {keyword: list.join(gu5)}).then(function (data) {
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


////////////////////////////호출 함수/////////////////////////////////////
function selectBox() {
    $('#result_select').select2();
}

function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);
}
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsProdMRB"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['출고일자', '전표번호', '업체', '품번', '품명', '규격', '단위', '출고수량','불량수량', '검사결과','불량유형','불량내용','완료여부','부적합보고서','개선조치','검사자','검사일시','MRB','MRB일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 150, formatter: formmatterDate2,fixed:true},
            {name: 'in_no', index: 'in_no', sortable: false, width: 150,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150,fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 150,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 150,fixed:true},
            {name: 'spec', index: 'spec', sortable: false, width: 150,fixed:true},
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 150,fixed:true},
            {name: 'qc_qty', index: 'qc_qty', sortable: false, width: 100,fixed:true},
            {name: 'ng_qty', index: 'ng_qty', sortable: false, width: 100,fixed:true},
            {name: 'qc_result_name', index: 'qc_result_name', sortable: false, width: 100,fixed:true},
            {name: 'qc_name', index: 'qc_name', sortable: false, width: 100,fixed:true},
            {name: 'ng_name', index: 'ng_name', sortable: false, width: 100,fixed:true},
            {name: 'act_type_name', index: 'act_type_name', sortable: false, width: 100,fixed:true},
            {name: 'file2_name', index: 'file2_name', sortable: false, width: 100,fixed:true},
            {name: 'file3_name', index: 'file3_name', sortable: false, width: 100,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 180, formatter: formmatterDate,fixed:true},
            {name: 'mrb', index: 'mrb', sortable: false, width: 100,fixed:true},
            {name: 'mrb_date', index: 'mrb_date', sortable: false, width: 180, formatter: formmatterDate,fixed:true}
        ],
        caption: "출하검사MRB관리 | MES",
        autowidth: true,
        multiselect: true,
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
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    });
}