////////////////////////////데이터////////////////////////////////////////
var main_data = {
    supp_check: 'A',
};

var lastsel;
var saverow = 0;

var savecol = 0;

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {

    modal_make1();
    jqGrid_modal1();
    datepickerInput_modal1();


    jqGridResize('#mes_modal_grid',$('#mes_modal_grid').closest('[class*="col-"]'));
}


////////////////////////////클릭 함수/////////////////////////////////////
function crm_btn() {
    if (main_data.check2 === 'Y') {
        $("#crmSearchGrid").jqGrid('clearGridData');
        $("#crm-search-dialog").dialog('open');
        var date = new Date();
        var date2 = new Date();
        date2.setDate(date.getDate()+1);
        $('#crm_datepicker').datepicker('setDate',date);
        $('#crm_datepicker2').datepicker('setDate',date2);

        jqGridResize2("#crmSearchGrid", $('#crmSearchGrid').closest('[class*="col-"]'));
    } else {
        alert("출고가 완료된 제품입니다.");
    }
}

function crmModal_bus(data) {
    $("#ord_no").val(data[0].ord_no);
    $("#supp_name_modal").val(data[0].supp_name);
    $("#supp_code_modal").val(data[0].supp_code);
    $("#mes_modal_grid").jqGrid('clearGridData');
    $("#mes_modal_grid").setGridParam({
        datatype: "local",
        data: data
    }).trigger("reloadGrid");

}

function close_modal1_btn() {
    $("#addDialog").dialog('close');
}

function update_btn(rowid) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        $("#mes_modal_grid").jqGrid('clearGridData');
        main_data.check = 'U';
        ccn_ajax('/wmsOutOrderSubOneGet', {keyword: rowid}).then(function (data) {
            $("#ord_no").val(data[0].ord_no);
            $("#req_no").val(data[0].req_no);
            $("#supp_name_modal").val(data[0].supp_name);
            $("#supp_code_modal").val(data[0].supp_code);
            $("#datepicker3").val(formmatterDate2(data[0].work_date));
            $("#ord_no").prop("disabled",true).trigger('change');
            $("#mes_modal_grid").setGridParam({
                datatype: "local",
                data: data
            }).trigger("reloadGrid");


            $("#addDialog").dialog('open');
            jqGridResize2("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]'));
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}

function addupdate_btn() {

    if (main_data.check2 === 'Y') {
        if (main_data.check === 'I') {
            var add_data = value_return(".modal_value");
            add_data.work_date = add_data.work_date.replace(/\-/g, '');
            var jdata = $("#mes_modal_grid").getRowData();
            add_data.keyword = main_data.check;
            add_data = Object.assign(add_data, jdata[0]);
            if (effectiveness1(add_data)) {
                callback(function () {
                    if (jdata.length === 0) {
                        alert("수주번호를 다시 확인해주세요");
                    } else {
                        if (confirm('저장하겠습니까?')) {
                            wrapWindowByMask2();


                            callback(function () {
                                ccn_ajax("/wmsOutOrderAdd", add_data).then(function (data) {
                                    if (data.result === 'NG') {
                                        alert(data.message);
                                    } else {
                                        if (main_data.check === "I") {
                                            get_btn(1);
                                        } else {
                                            get_btn_post($("#mes_grid").getGridParam('page'));
                                        }
                                    }
                                    $('#mes_grid2').jqGrid('clearGridData');
                                    closeWindowByMask();
                                    $("#addDialog").dialog('close');
                                }).catch(function (err) {
                                    closeWindowByMask();
                                    alert("저장실패");
                                });
                            })
                        }
                    }
                })
            }
        }else {

        }
    } else {
        alert("출고가 완료된 제품입니다.");
    }

}

////////////////////////////호출 함수/////////////////////////////////////

function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width:'1300',
        height: 'auto',
        autoOpen:false,
        resizable: false

    });
}

function jqGrid_modal1() {
    $('#mes_modal_grid').jqGrid({
        datatype: "local",
        caption: "제품출고요청 | MES",
        colNames: ['품번','품명','규격','조립정보','단위','수주수량','기납품수량','납품가능수량','납품요청수량'],
        colModel: [
            {name: 'part_code', index: 'part_code',key:true, width: 40, sortable: false},
            {name: 'part_name', index: 'part_name', width: 50, sortable: false},
            {name: 'spec', index: 'spec', width: 40, sortable: false},
            {name: 'part_desc', index: 'part_desc', width: 80, sortable: false},
            {name: 'unit_name', index: 'unit_name', width: 40, sortable: false},
            {name: 'ord_qty', index: 'ord_qty',width: 60, sortable: false, align: 'right',formatter:'number'},
            {name: 'comp_qty', index: 'comp_qty', width: 60, sortable: false, align: 'right',formatter:'number'},
            {name: 'ready_qty', index: 'ready_qty', width: 60, sortable: false, align: 'right',formatter:'number'},
            {name: 'req_qty', index: 'req_qty', width: 60, sortable: false, align: 'right',formatter:'number',
                editable: true,
                editoptions: {

                    dataEvents: [
                        {
                            type: 'focus',
                            fn: function (e) {
                                if (e.target.value === '0.00'){
                                    e.target.value = '';
                                }
                                $(e.target).attr('autocomplete', 'off');

                            }
                        },
                        {
                            type: 'keydown',
                            fn: function (e) {
                                if (e.keyCode === 13) {
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var rowid = row.attr('id');
                                    var value = e.target.value;
                                    var jdata = $('#mes_modal_grid').jqGrid('getRowData', rowid);
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }else if(Number(jdata.ready_qty) < Number(value)){
                                        alert("납품가능 수량을 초과했습니다.");
                                        e.target.value = 0;
                                        $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }

                                    $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);

                                }
                            }

                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                var jdata = $('#mes_modal_grid').jqGrid('getRowData', rowid);
                                if (isNaN(value)){
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                    $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }else if(Number(jdata.ready_qty) < Number(value)){
                                    alert("납품가능 수량을 초과했습니다.");
                                    e.target.value = 0;
                                    $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }

                                $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },


            ],

        autowidth: true,
        height: 250,
        cellEdit: true,
        cellsubmit: 'clientArray',
        beforeEditCell: function (id, name, val, IRow, ICol) {
            lastsel = id;
            saverow = IRow;
            savecol = ICol;

        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {
            //var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
            if (iCol === 7) {
                // if (isNaN(data.req_qty)) {
                //     alert("숫자만 입력가능합니다.");
                //     data.req_qty = data.req_qty.replace(/[^\.0-9]/g,'');
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'req_qty', data.req_qty);
                //     if (data.req_qty === '') {
                //         $('#mes_modal_grid').jqGrid('setCell', rowid, 'req_qty', '0');
                //     }
                //     return false;
                // } else if (Number(data.ready_qty) < Number(data.req_qty)) {
                //     alert("납품가능 수량이 초과 하였습니다.");
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'req_qty', 0);
                //     return false;
                // } else if(data.req_qty === ''){
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'req_qty', 0);
                // }
            }
        },
        loadComplete: function (data) {
            if(main_data.check === 'U'){
                var rows = data.rows;
                rows.forEach(function (r) {
                    $("#mes_modal_grid").jqGrid('setCell', r.part_code,  'req_qty', "", 'not-editable-cell');
                })
            }

        }

    });
}

function datepickerInput_modal1() {
    datepicker_makes("#datepicker3", 0);
}


function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.work_date === '') {
        alert("날짜를 선택해주세요");
        return false;
    } else if (modal_objact.ord_no === '') {
        alert("수주번호를 선택해주세요");
        return false;
    }  else if (modal_objact.supp_code === '') {
        alert("수주번호를 다시 확인해주세요");
        return false;
    }   else if (modal_objact.ready_qty === '0.00') {
        alert("납품가능수량이 없습니다.");
        return false;
    }   else if (modal_objact.req_qty === '' || modal_objact.req_qty === '0.00') {
        alert("요청수량을 입력해주세요");
        return false;
    }   else {

        return true;
    }
}