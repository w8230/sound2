////////////////////////////데이터////////////////////////////////////////
var row_save;

var lastsel;
var saverow = 0;

var savecol = 0;

var tfcheck = false;
////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {

    modal_make1();
    jqGrid_modal1();
    datepickerInput_modal1();

    jqGridResize('#mes_modal_grid', $('#mes_modal_grid').closest('[class*="col-"]'));
}


////////////////////////////클릭 함수/////////////////////////////////////
function add_modal1_btn() {

        var gu4 = String.fromCharCode(4);
        var gu5 = String.fromCharCode(5);
        var gu3 = String.fromCharCode(3);
        var add_data = value_return(".modal_value");
        var jdata = $("#mes_modal_grid").getRowData();
        if (jdata.length > 0) {
            var list = [];
            var list2 = [];
            var list3 = [];
            var list4 = [];
            jdata.forEach(function (data, j) {
                if (data.qc_qty !== ''
                    && data.ng_qty !== '' && parseInt(data.qc_qty) > 0
                ) {
                    if (data.qc_result === '2') {
                        if (data.ng_type !== '' && data.ng_name !== ''  && parseInt(data.ng_qty) > 0) {
                            list.push(data.part_code + gu4 + data.qc_qty + gu4 + data.ng_qty + gu4 + data.qc_result + gu4 + data.ng_type + gu4 + data.ng_name + gu4 + data.act_type+gu4+$(".reportsAdd:eq("+j+")").text());
                            list3.push(data.part_code);
                            list4.push(data.qc_qty);
                        } else {
                            list2.push(data.part_code);
                        }
                    } else {
                        list.push(data.part_code + gu4 + data.qc_qty + gu4 + data.ng_qty + gu4 + data.qc_result + gu4 + data.ng_type + gu4 + data.ng_name + gu4 + data.act_type+gu4+$(".reportsAdd:eq("+j+")").text());
                        list3.push(data.part_code);
                        list4.push(data.qc_qty);
                    }

                } else {
                    list2.push(data.part_code);
                }

            });
            callback(function () {
                if (list2.length > 0) {
                    alert(list2[0] + "를 다시 확인해주세요");
                } else {
                    if (confirm('저장하겠습니까?')) {
                        wrapWindowByMask2();
                        add_data.keyword = list.join(gu5);


                        var code_list = [];
                        var code_list2 = [];
                        var code_list3 = [];
                        var idx;


                        list3.forEach(function (s2, i2) {
                            idx = findArrayIndex(modal2_data.sub_data, function (item) {
                                return item.part_code === s2
                            });

                            if (idx !== -1) {
                                modal2_data.sub_data[idx].list.forEach(function (s3, k) {
                                    code_list.push(s3.qc_code);
                                    for (var i = 1; i <= list4[i2] && i <= 20;i++){
                                        code_list.push(s3['qc_result'+i]);
                                        if (i == list4[i2] || i == 20 ){
                                            code_list2.push(code_list.join(gu3));
                                            code_list = [];
                                        }
                                    }

                                });
                            }
                            callback(function () {
                                code_list3.push(code_list2.join(gu4));
                                code_list2 = [];
                            })
                        });
                        add_data.keyword2 = code_list3.join(gu5);
                        ccn_ajax("/qmsProdAdd", add_data).then(function (data) {
                            if (data.result === 'NG') {
                                alert(data.message);
                            } else {
                                get_btn(1);
                            }
                            $('#mes_grid2').jqGrid('clearGridData');
                            closeWindowByMask();
                            $("#addDialog").dialog('close');
                        }).catch(function (err) {
                            closeWindowByMask();
                            alert("저장실패");
                        });

                    }

                }

            })


        }

}


function update_btn(rowid) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        $("#mes_modal_grid").jqGrid('clearGridData');
        main_data.check = 'U';
        ccn_ajax('/qmsProdSubAllGet', {keyword: rowid}).then(function (data) {
            $("#in_no").val(data[0].in_no);
            $("#work_date").val(formmatterDate2(data[0].work_date));

            $("#mes_modal_grid").setGridParam({
                datatype: "local",
                data: data
            }).trigger("reloadGrid");


            modal2_data._this = '';
            modal2_data.part_code = '';
            modal2_data.qc_qty = 0;

            $("#addDialog").dialog('open');
            jqGridResize2("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]'));
        });


        $("#addDialog").dialog('open');
        jqGridResize2("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]'));
    } else {
        alert("수정권한이 없습니다,");
    }
}

////////////////////////////호출 함수/////////////////////////////////////

function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 1000,
        height: 'auto',
        autoOpen: false,
        resizable: false
    });
}

function jqGrid_modal1() {
    $('#mes_modal_grid').jqGrid({
        datatype: "local",
        caption: "출하검사등록 | MES",
        colNames: [ '품번', '품명', '규격', '단위', '검사구분', '입고수량', '검사수량', '불량수량', '검사결과', '불량유형', '불량상세', '조치구분', '성적서'],
        colModel: [

            {name: 'part_code', index: 'part_code', key: true, width: 70, sortable: false},
            {name: 'part_name', index: 'part_name', width: 60, sortable: false},
            {name: 'spec', index: 'spec', width: 70, sortable: false},
            {name: 'unit_name', index: 'unit_name', width: 40, sortable: false},
            {name: 'qc_level_name', index: 'qc_level_name', width: 50, sortable: false},
            {name: 'in_qty', index: 'in_qty', width: 50, sortable: false, align: 'right',formatter:'number'},
            {
                name: 'qc_qty', index: 'qc_qty', width: 50, sortable: false, align: 'right', formatter: 'integer',
                editable: true,

                editoptions: {

                    dataEvents: [
                        {
                            type: 'keydown',
                            fn: function (e) {
                               if (e.keyCode === 13) {
                                   var row = $(e.target).closest('tr.jqgrow');
                                   var rowid = row.attr('id');
                                   var idx;
                                   row.find('.reportsAdd').text("추가");
                                   idx = findArrayIndex(modal2_data.sub_data, function (item) {
                                       return item.part_code === rowid
                                   });

                                   if (idx !== -1) {
                                       modal2_data.sub_data.splice(idx, 1);
                                   }
                                   var value = e.target.value;
                                   var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
                                   if (isNaN(value)) {
                                       alert("숫자만 입력가능합니다.");
                                       e.target.value = e.target.value.replace(/[^0-9]/g,'');
                                       $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                       return false;
                                   } else if (Number(data.in_qty)  < Number(value)) {
                                       alert("검사 수량이 초과 하였습니다.");
                                       e.target.value = 0;
                                       $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);

                                       return false;
                                   }else if(value === ''){
                                       e.target.value = 0;
                                   }

                                   $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                               }
                            }

                        },
                        {
                            type: 'focus',
                            fn: function (e) {
                                row_save = $(e.target).closest('tr.jqgrow');
                                if (e.target.value === '0'){
                                    e.target.value = '';
                                }
                                $(e.target).attr('autocomplete', 'off');
                            }
                        },
                        {
                            type: 'focusout',
                            fn: function (e) {



                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var idx;
                                row.find('.reportsAdd').text("추가");
                                idx = findArrayIndex(modal2_data.sub_data, function (item) {
                                    return item.part_code === rowid
                                });

                                if (idx !== -1) {
                                    modal2_data.sub_data.splice(idx, 1);
                                }
                                var value = e.target.value;
                                var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
                                if (isNaN(value)) {
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = e.target.value.replace(/[^0-9]/g,'');
                                    $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                } else if (Number(data.in_qty)  < Number(value)) {
                                    alert("검사 수량이 초과 하였습니다.");
                                    e.target.value = 0;
                                    $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);

                                    return false;
                                }else if(value === ''){
                                    e.target.value = 0;
                                }

                                $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },
            {
                name: 'ng_qty', index: 'ng_qty', width: 50, sortable: false, align: 'right',
                editable: true,
                formatter: 'integer',
                editoptions: {

                    dataEvents: [
                        {
                            type: 'keydown',
                            fn: function (e) {
                                if (e.keyCode === 13) {
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var rowid = row.attr('id');
                                    var value = e.target.value;
                                    var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
                                    if (isNaN(value)) {
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^0-9]/g,'');
                                        $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }else if (Number(data.qc_qty)  < Number(value)) {
                                        alert("불량 수량이 초과 하였습니다.");
                                        e.target.value = 0;
                                        $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }else if(value === ''){
                                        e.target.value = 0;
                                    }

                                    $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                            }

                        },
                        {
                            type: 'focus',
                            fn: function (e) {
                                if (e.target.value === '0'){
                                    e.target.value = '';
                                }
                                //e.target.value = '';
                                $(e.target).attr('autocomplete', 'off');

                            }
                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
                                if (isNaN(value)) {
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = e.target.value.replace(/[^0-9]/g,'');
                                    $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }else if (Number(data.qc_qty)  < Number(value)) {
                                    alert("불량 수량이 초과 하였습니다.");
                                    e.target.value = 0;
                                    $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }else if(value === ''){
                                    e.target.value = 0;
                                }

                                $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                return false;

                            }
                        }

                    ]
                }
            },
            {
                name: 'qc_result', index: 'qc_result', width: 50, sortable: false,
                editable: true,                                       // 수정가능 여부
                formatter: 'select',                                 // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    value: "1:양품;2:불량",             // EDIT옵션(SELECT, INPUT, CHECKBOX등 옵션 상이함)
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);

                            }
                        }
                    ]


                }
            },
            {
                name: 'ng_type', index: 'ng_type', width: 50, sortable: false,
                editable: true,                                       // 수정가능 여부
                formatter: 'select',                                 // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    value: ":선택안함;" + main_data.qcItem_list_string.join(";"),             // EDIT옵션(SELECT, INPUT, CHECKBOX등 옵션 상이함)
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);

                            }
                        }
                    ]


                }
            },
            {
                name: 'ng_name', index: 'ng_name', width: 80, sortable: false,
                editable: true,
                editoptions: {

                    dataEvents: [
                        {
                            type: 'focus',
                            fn: function (e) {

                                $(e.target).attr('autocomplete', 'off');


                            }
                        },
                        {
                            type: 'focusout',
                            fn: function (e) {

                                $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },
            {
                name: 'act_type', index: 'act_type', width: 50, sortable: false,
                editable: true,                                       // 수정가능 여부
                formatter: 'select',                                 // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    value: "0:조치중;1:조치완료",             // EDIT옵션(SELECT, INPUT, CHECKBOX등 옵션 상이함)
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);

                            }
                        }
                    ]


                }
            },
            {name: 'file', index: 'file', width: 50, sortable: false, formatter: reportsButton}
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
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');

            $myGrid.setRowData(save_rowid2, false, {background:"#FFFFFF"}) ;
            save_rowid2 = rowid;
            $myGrid.setRowData(rowid, false, {background:"rgb(190, 220, 260)"}) ;

            return (cm[i].name === 'cb');
        },
        // onCellSelect: function (rowid, icol, cellcontent, e) {
        //     if (icol === 12) {
        //
        //         var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
        //         if (data.qc_qty !== '0' && data.qc_qty !== '') {
        //             update_btn2(rowid, e);
        //         } else {
        //             alert("검사수량을 확인해주세요");
        //         }
        //     }
        //
        // },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {
            //var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
            if (iCol === 6) {

                //
                // var idx;
                // row_save.find('.reportsAdd').text("추가");
                // idx = findArrayIndex(modal2_data.sub_data, function (item) {
                //     return item.part_code === rowid
                // });
                //
                // if (idx !== -1) {
                //     modal2_data.sub_data.splice(idx, 1);
                // }
                // if (isNaN(data.qc_qty)) {
                //
                //     alert("숫자만 입력가능합니다.");
                //     data.qc_qty = data.qc_qty.replace(/[^0-9]/g, '');
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'qc_qty', data.qc_qty);
                //     if (data.qc_qty === '') {
                //         $('#mes_modal_grid').jqGrid('setCell', rowid, 'qc_qty', '0');
                //     }
                //     return false;
                // } else if (Number(data.in_qty) < Number(data.qc_qty)) {
                //     alert("검사 수량이 초과 하였습니다.");
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'qc_qty', 0);
                //     return false;
                // } else if (data.qc_qty === '') {
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'qc_qty', 0);
                //     return false;
                // }

            }



            if (iCol === 7) {
                // if (isNaN(data.ng_qty)) {
                //     alert("숫자만 입력가능합니다.");
                //     data.ng_qty = data.ng_qty.replace(/[^0-9]/g,'');
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'ng_qty', data.ng_qty);
                //     if (data.ng_qty === '') {
                //         $('#mes_modal_grid').jqGrid('setCell', rowid, 'ng_qty', '0');
                //     }
                //     return false;
                // } else if (Number(data.qc_qty)  < Number(data.ng_qty)) {
                //     alert("불량 수량이 초과 하였습니다.");
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'ng_qty', 0);
                //     return false;
                // }else if(data.ng_qty === ''){
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'ng_qty', 0);
                //     return false;
                // }
            }



        },

    });
}
var save_rowid2;
function datepickerInput_modal1() {
    datepicker_makes("#datepicker3", 0);
}

function pmsProd_modal1_btn(rowid,e) {
    var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
    if (data.qc_qty !== '0' && data.qc_qty !== '') {
        update_btn2(rowid, e);
    } else {
        alert("검사수량을 확인해주세요");
    }
}

function reportsButton(cellvalue, options, rowObject) {
    return ' <a class="dt-button btn btn-white btn-primary btn-mini btn-bold" title="" onclick="pmsProd_modal1_btn('+'\''+rowObject.part_code+'\','+'this)">\n' +
        '                            <span><i class="fa fa-plus bigger-110 blue"></i>\n' +
        '                            <span class="reportsAdd">추가</span>\n' +
        '                            </span>\n' +
        '                    </a>';

};