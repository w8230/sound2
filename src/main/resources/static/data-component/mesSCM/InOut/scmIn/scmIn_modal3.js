var modal3_data = {
    part_code: '',
    sub_data: []
}
var lastsel3;
var saverow3;
var savecol3;

////////////////////////////시작 함수/////////////////////////////////////
function modal_start3() {

    modal_make3();
    modal3_jqGrid();
    datepickerInput_modal3();
    jqGridResize("#modal3Grid", $('#modal3Grid').closest('[class*="col-"]'));
}


////////////////////////////클릭 함수/////////////////////////////////////

function modal3_get_btn(page) {
    if(main_data.check !== 'U') {
        var modal3_send_data = value_return(".modal3_condition");
        modal3_send_data.start_date = modal3_send_data.start_date.replace(/\-/g, '');
        modal3_send_data.end_date = modal3_send_data.end_date.replace(/\-/g, '');

        modal3_send_data.keyword2 = '0';
        modal3_send_data.keyword3 = modal3_data.part_code;
        $("#modal3Grid").setGridParam({
            url: '/scmOrderListGet',
            datatype: "json",
            page: page,
            postData: modal3_send_data,
        }).trigger("reloadGrid");
    }
}


function modal3_close() {
    $("#addDialog3").dialog('close');
    suppModal_close_bus();

}


function modal3_modal_open(rowid) {

    var data = $('#scmInDialogRightGrid').jqGrid('getRowData', rowid);

    if (data.lot === ''){
        alert("수량을 등록해주세요");
        return false;
    } else {
        modal3_data.part_code = rowid;

        $("#supp_name_modal3").val($("#supp_name_modal").val());
        $("#supp_code_modal3").val($("#supp_code_modal").val());

        datepicker_makes("#modal3_datepicker", -1);
        datepicker_makes("#modal3_datepicker2", 0);

        $('#modal3Grid').jqGrid("clearGridData");
        jQuery("#modal3Grid").jqGrid('footerData', 'set', {qty: '총 입고수량:', in_qty: 0});

        if (main_data.check === 'I'){
         $('#scmInDialogRightGrid').jqGrid('setCell', rowid, 'ord_check', 'N');
        }

        if (main_data.check === 'U'){
            scmIn_lot2_get_btn(rowid);


        }

        $("#addDialog3").dialog('open');
        jqGridResize2("#modal3Grid", $('#modal3Grid').closest('[class*="col-"]'));
    }

}

function scmIn_lot2_get_btn(rowid) {
    $("#modal3Grid").setGridParam({
        url: '/scmInLot2Get',
        datatype: "json",
        page: 1,
        postData: {keyword:$("#in_no").val(),keyword2:rowid}
    }).trigger("reloadGrid");

}



function modal3_add_btn() {
    if (main_data.check2 === 'Y'  && main_data.check === 'I') {
        var data = $('#scmInDialogRightGrid').jqGrid('getRowData', modal3_data.part_code);
        var sumOfPrice = jQuery("#modal3Grid").jqGrid('getCol', 'in_qty', false, 'sum');
        if (data.qty == sumOfPrice) {
            var data = {};
            var data2 = {};
            var list = [];
            data.part_code = modal3_data.part_code;

            var grid3 = $("#modal3Grid").getRowData();

            var check = false;
            grid3.forEach(function (g) {
                data2 = {};
                if (parseFloat_change(g.in_qty) > 0 && g.in_qty !== '') {
                    data2.ord_no = g.ord_no;
                    data2.part_code = g.part_code;
                    data2.in_qty = g.in_qty;
                    data2.result_check = g.result_check;
                    list.push(data2);
                    check = true;

                }
            });


            var idx;
            idx = findArrayIndex(modal3_data.sub_data, function (item) {
                return item.part_code === data.part_code
            })


            if (idx !== -1) {
                modal3_data.sub_data.splice(idx, 1);
            }
            if (check) {
                data.list = list;
                modal3_data.sub_data.push(data);
                $('#scmInDialogRightGrid').jqGrid('setCell', modal3_data.part_code, 'ord_check', 'Y');

            }


            $("#addDialog3").dialog('close');

        } else {
            alert("입고수량이 맞지 않습니다.");
            return false;
        }
    }
}

////////////////////////////호출 함수/////////////////////////////////////


function modal_make3() {
    $("#addDialog3").dialog({
        autoOpen: false,
        modal: true,
        minWidth: 1100,
        height: 'auto',
        resizable: false

    });

}

function modal3_jqGrid() {
    $('#modal3Grid').jqGrid({
        datatype: "local",
        // 다중 select
        mtype: 'POST',
        // 타이틀
        caption: "발주확인 | MES",
        colNames: ['발주일자', '발주번호', '품번', '품명', '규격', '단위', '발주수량', '기입고수량', '입고수량', '완료처리'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 60, formatter: formmatterDate2},
            {name: 'ord_no', index: 'ord_no', key: true, sortable: false, width: 80},
            {name: 'part_code', index: 'part_code', sortable: false, width: 60},
            {name: 'part_name', index: 'part_name', sortable: false, width: 60},
            {name: 'spec', index: 'spec', sortable: false, width: 60},
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 40},
            {name: 'ord_qty', index: 'ord_qty', sortable: false, width: 60, align: 'right',formatter:'number'},
            {name: 'qty', index: 'qty', sortable: false, width: 60, align: 'right',formatter:'number'},
            {
                name: 'in_qty', index: 'in_qty', sortable: false, width: 60, align: 'right',formatter:'number',
                editable: true,
                editoptions: {

                    dataEvents: [
                        {
                            type: 'focus',
                            fn: function (e) {
                                if (e.target.value === '0.00'){
                                    e.target.value = '';
                                }

                                // if(main_data.check !== 'I') {
                                //     $(e.target).prop('readonly',true);
                                // }

                                $(e.target).attr('autocomplete', 'off');

                            }
                        },
                        {
                            type: 'keydown',
                            fn: function (e) {
                                if (e.keyCode === 13) {
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var rowid = row.attr('id');
                                    var data = $('#modal3Grid').jqGrid('getRowData', rowid);
                                    var value = e.target.value;

                                    if (isNaN(value)) {
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#modal3Grid").jqGrid("saveCell", saverow3, savecol3);
                                        var sumOfPrice = jQuery("#modal3Grid").jqGrid('getCol', 'in_qty', false, 'sum');
                                        jQuery("#modal3Grid").jqGrid('footerData', 'set', {qty: '총 입고수량:', in_qty: sumOfPrice});
                                        return false;
                                    } else if (parseFloat_change((parseFloat(data.ord_qty) - parseFloat(data.qty))) < parseFloat_change(value)) {
                                        alert("입고 가능 수량이 초과 하였습니다.");
                                        e.target.value = 0;
                                        $("#modal3Grid").jqGrid("saveCell", saverow3, savecol3);
                                        var sumOfPrice = jQuery("#modal3Grid").jqGrid('getCol', 'in_qty', false, 'sum');
                                        jQuery("#modal3Grid").jqGrid('footerData', 'set', {qty: '총 입고수량:', in_qty: sumOfPrice});
                                        return false;
                                    } else if(value === ''){
                                        e.target.value = 0;
                                    }
                                    $("#modal3Grid").jqGrid("saveCell", saverow3, savecol3);
                                    var sumOfPrice = jQuery("#modal3Grid").jqGrid('getCol', 'in_qty', false, 'sum');
                                    jQuery("#modal3Grid").jqGrid('footerData', 'set', {qty: '총 입고수량:', in_qty: sumOfPrice});
                                }
                            }

                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var data = $('#modal3Grid').jqGrid('getRowData', rowid);
                                var value = e.target.value;

                                if (isNaN(value)) {
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                    $("#modal3Grid").jqGrid("saveCell", saverow3, savecol3);
                                    var sumOfPrice = jQuery("#modal3Grid").jqGrid('getCol', 'in_qty', false, 'sum');
                                    jQuery("#modal3Grid").jqGrid('footerData', 'set', {qty: '총 입고수량:', in_qty: sumOfPrice});
                                    return false;
                                } else if (parseFloat_change((parseFloat(data.ord_qty) - parseFloat(data.qty))) < parseFloat_change(value)) {
                                    alert("입고 가능 수량이 초과 하였습니다.");
                                    e.target.value = 0;
                                    $("#modal3Grid").jqGrid("saveCell", saverow3, savecol3);
                                    var sumOfPrice = jQuery("#modal3Grid").jqGrid('getCol', 'in_qty', false, 'sum');
                                    jQuery("#modal3Grid").jqGrid('footerData', 'set', {qty: '총 입고수량:', in_qty: sumOfPrice});
                                    return false;
                                } else if(value === ''){
                                    e.target.value = 0;
                                }
                                $("#modal3Grid").jqGrid("saveCell", saverow3, savecol3);
                                var sumOfPrice = jQuery("#modal3Grid").jqGrid('getCol', 'in_qty', false, 'sum');
                                jQuery("#modal3Grid").jqGrid('footerData', 'set', {qty: '총 입고수량:', in_qty: sumOfPrice});
                            }
                        }

                    ]
                }
            },
            {
                name: 'result_check', index: 'result_check', sortable: false, width: 60,
                editable: true,                                       // 수정가능 여부
                formatter: 'select',                                 // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    value: "N:N;Y:Y",             // EDIT옵션(SELECT, INPUT, CHECKBOX등 옵션 상이함)
                    defaultValue: 'N',
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            $("#modal3Grid").jqGrid("saveCell", saverow3, savecol3);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                $("#modal3Grid").jqGrid("saveCell", saverow3, savecol3);

                            }
                        }
                    ]


                }
            }

        ],
        autowidth: true,
        height: 250,
        rowNum: 100,
        cellEdit: true,
        cellsubmit: 'clientArray',
        beforeEditCell: function (id, name, val, IRow, ICol) {

            lastsel3 = id;
            saverow3 = IRow;
            savecol3 = ICol;


        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {
            var data = $('#modal3Grid').jqGrid('getRowData', rowid);
            if (iCol === 8) {
                // if (isNaN(data.in_qty)) {
                //     alert("숫자만 입력가능합니다.");
                //     data.in_qty = data.in_qty.replace(/[^\.0-9]/g,'');
                //     $('#modal3Grid').jqGrid('setCell', rowid, 'in_qty', data.in_qty);
                //     if (data.in_qty === '') {
                //         $('#modal3Grid').jqGrid('setCell', rowid, 'in_qty', '0');
                //     }
                //     return false;
                // } else if (parseFloat_change((parseFloat(data.ord_qty) - parseFloat(data.qty))) < parseFloat_change(data.in_qty)) {
                //     alert("입고 가능 수량이 초과 하였습니다.");
                //     $('#modal3Grid').jqGrid('setCell', rowid, 'in_qty', 0);
                //     return false;
                // } else if(data.in_qty === ''){
                //     $('#modal3Grid').jqGrid('setCell', rowid, 'in_qty', 0);
                //     return false;
                // }
                //
                // var sumOfPrice = jQuery("#modal3Grid").jqGrid('getCol', 'in_qty', false, 'sum');
                // jQuery("#modal3Grid").jqGrid('footerData', 'set', {qty: '총 입고수량:', in_qty: sumOfPrice});
            }



        },
        pager: '#modal3GridPager',
        jsonReader: {cell: ""},
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        footerrow: true,
        userDataOnFooter: true,
        loadComplete: function (data) {
            if(main_data.check === 'U'){
                var rows = data.rows;
                rows.forEach(function (r) {
                    $("#modal3Grid").jqGrid('setCell', r.ord_no,  'in_qty', "", 'not-editable-cell');
                    $("#modal3Grid").jqGrid('setCell', r.ord_no,  'result_check', "", 'not-editable-cell');
                })
            }


            var $self = $(this),
                sum = $self.jqGrid("getCol", "in_qty", false, "sum");

            $self.jqGrid("footerData", "set", {qty: "총 입고수량:", in_qty: sum});
        }


        });
}

function datepickerInput_modal3() {
    datepicker_makes("#modal3_datepicker", -1);
    datepicker_makes("#modal3_datepicker2", 0);
}

function formatterN(cellValue) { // 날짜 필터

    return 'N'
}

