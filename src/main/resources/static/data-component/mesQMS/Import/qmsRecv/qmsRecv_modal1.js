////////////////////////////데이터////////////////////////////////////////

var lastsel;
var saverow = 0;

var savecol = 0;

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {

    modal_make1();
    jqGrid_modal1();

    jqGridResize('#mes_modal_grid',$('#mes_modal_grid').closest('[class*="col-"]'));
}


////////////////////////////클릭 함수/////////////////////////////////////
function supp_btn(what) {
    main_data.supp_check = what;

    $("#SuppSearchGrid").jqGrid('clearGridData');
    $("#supp-search-dialog").dialog('open');
    $('#gubun_select option:eq(0)').prop("selected", true).trigger("change");
    $('#supp_code_search').val('').trigger("change");

    jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));
}


function update_btn(rowid) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        $("#mes_modal_grid").jqGrid('clearGridData');
        main_data.check = 'U';
        ccn_ajax('/qmsRecvSubAllGet', {keyword: rowid}).then(function (data) {
            $("#in_no").val(data[0].in_no);
            $("#supp_name_modal").val(data[0].supp_name);
            $("#supp_code_modal").val(data[0].supp_code);
            $("#datepicker3").val(formmatterDate2(data[0].work_date));


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

    var gu4 = String.fromCharCode(4);
    var gu5 = String.fromCharCode(5);


    var add_data = value_return(".modal_value");
    add_data.work_date = add_data.work_date.replace(/\-/g, '');
    var jdata = $("#mes_modal_grid").getRowData();
    if (jdata.length > 0) {
        var list = [];
        var list2 = [];

        jdata.forEach(function (data, j) {
            if (data.qc_qty !== ''
                && data.ng_qty !=='' && parseFloat(data.qc_qty) > 0
            ) {
                if (data.qc_result === '2'){
                    if (data.ng_type !=='' && data.ng_name !== '' && parseFloat(data.ng_qty) > 0){
                        list.push(data.part_code + gu4 + data.qc_qty+ gu4 + data.ng_qty + gu4 + data.qc_result+ gu4 + data.ng_type + gu4 + data.ng_name+ gu4 + data.act_type);
                    } else {
                        list2.push(data.part_code);
                    }
                }else {
                    list.push(data.part_code + gu4 + data.qc_qty+ gu4 + data.ng_qty + gu4 + data.qc_result+ gu4 + data.ng_type + gu4 + data.ng_name+ gu4 + data.act_type);
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
                    ccn_ajax("/qmsRecvAdd", add_data).then(function (data) {
                        var formData = new FormData();
                        var index = 0;
                        var index2 = 0;
                        jdata.forEach(function (j,i) {
                            if ($("#file_"+j.part_code).val() !== ""){
                                formData.append("file_in_no"+(i-index),add_data.in_no);
                                formData.append("file_part_code"+(i-index),j.part_code);
                                formData.append("file"+i,$("#file_"+j.part_code).prop("files")[0]);
                                index2++;
                            } else {
                                index++;
                            }
                        });

                        callback(function () {
                            formData.append("index",index2);
                            if (index2 !== 0) {
                                $.ajax({
                                    type: "POST",
                                    enctype: 'multipart/form-data',
                                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                    url: "/qmsRecvFileAdd",
                                    data: formData,
                                    processData: false,
                                    contentType: false,
                                    cache: false,
                                    success: function (data) {

                                        get_btn(1);
                                        $("#addDialog").dialog('close');
                                        closeWindowByMask();
                                    },
                                    error: function (e) {
                                        closeWindowByMask();
                                        console.log("ERROR : ", e);
                                    }
                                });
                            }else {
                                get_btn(1);
                                $("#addDialog").dialog('close');
                                closeWindowByMask();
                            }
                            console.log(2);

                        })

                    }).catch(function (err) {
                             closeWindowByMask();
                             alert("저장실패");
                    });

                }
            }
        })
    } else {
        alert("저장 목록이 없습니다.");
    }
}

////////////////////////////호출 함수/////////////////////////////////////

function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width:'1200',
        height: 'auto',
        autoOpen:false,
        resizable: false
    });
}

function jqGrid_modal1() {
    $('#mes_modal_grid').jqGrid({
        datatype: "local",
        caption: "수입검사등록 | MES",
        colNames: ['품번','품명','규격','단위','입고LOT','검사구분','입고수량','검사수량','불량수량','검사결과','불량유형','불량상세','조치구분','성적서'],
        colModel: [

            {name: 'part_code', index: 'part_code',key:true, width: 80, sortable: false},
            {name: 'part_name', index: 'part_name', width: 60, sortable: false},
            {name: 'spec', index: 'spec', width: 70, sortable: false},
            {name: 'unit_name', index: 'unit_name', width: 40, sortable: false},
            {name: 'lot', index: 'lot',width: 60, sortable: false},
            {name: 'qc_level_name', index: 'qc_level_name', width: 60, sortable: false},
            {name: 'in_qty', index: 'in_qty', width: 50, sortable: false, align: 'right',formatter:'number'},
            {name: 'qc_qty', index: 'qc_qty',width: 50, sortable: false, align: 'right',formatter:'number',
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
                                    var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }  else if (Number(data.in_qty)  < Number(value)) {
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
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
                                if (isNaN(value)){
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                    $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }  else if (Number(data.in_qty)  < Number(value)) {
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
            {name: 'ng_qty', index: 'ng_qty',width: 50, sortable: false, align: 'right',formatter:'number',
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
                                    var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
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
                                }
                            }

                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
                                if (isNaN(value)){
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
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

                            }
                        }

                    ]
                }
            },
            {name: 'qc_result', index: 'qc_result',width: 60, sortable: false,
                editable: true,                                       // 수정가능 여부
                formatter : 'select',                                 // SELECT 포매터
                edittype:'select',                                    // EDIT타입 : SELECT
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
            {name: 'ng_type', index: 'ng_type',width: 70, sortable: false,
                editable: true,                                       // 수정가능 여부
                formatter : 'select',                                 // SELECT 포매터
                edittype:'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    value: ":선택안함;"+main_data.qcItem_list_string.join(";"),             // EDIT옵션(SELECT, INPUT, CHECKBOX등 옵션 상이함)
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
            {name: 'ng_name', index: 'ng_name',width: 90, sortable: false,
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
            {name: 'act_type', index: 'act_type',width: 70, sortable: false,
                editable: true,                                       // 수정가능 여부
                formatter : 'select',                                 // SELECT 포매터
                edittype:'select',                                    // EDIT타입 : SELECT
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
            {name: 'file', index: 'file',width: 60, sortable: false,formatter:filebox}
            // {name: 'file', index: 'file',width: 80, sortable: false,
            //     editable: true,
            //     edittype: 'file',
            //     editoptions: {
            //         defaultValue: 'N',
            //         enctype: "multipart/form-data",
            //         dataEvents: [{
            //             type: 'change',
            //             fn: function (e) {                // 값 : this.value || e.target.val()
            //                 alert("sss");
            //                 $("#mes_modal_grid").jqGrid("saveCell", saverow, savecol);
            //             },
            //         }
            //         ]
            //     },
            //     width: 210,
            //
            //
            // },
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
                // if (isNaN(data.qc_qty)) {
                //     alert("숫자만 입력가능합니다.");
                //     data.qc_qty = data.qc_qty.replace(/[^0-9]/g, '');
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'qc_qty', data.qc_qty);
                //     if (data.qc_qty === '') {
                //         $('#mes_modal_grid').jqGrid('setCell', rowid, 'qc_qty', '0');
                //     }
                //     return false;
                // } else if (Number(data.in_qty)  < Number(data.qc_qty)) {
                //     alert("검사 수량이 초과 하였습니다.");
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'qc_qty', 0);
                //     return false;
                // }else if(data.qc_qty === ''){
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'qc_qty', 0);
                //     return false;
                // }
            }


            if (iCol === 8) {
                // if (isNaN(data.ng_qty)) {
                //     alert("숫자만 입력가능합니다.");
                //     data.ng_qty = data.ng_qty.replace(/[^0-9]/g, '');
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
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');

            $myGrid.setRowData(save_rowid2, false, {background:"#FFFFFF"}) ;
            save_rowid2 = rowid;
            $myGrid.setRowData(rowid, false, {background:"rgb(190, 220, 260)"}) ;

            return (cm[i].name === 'cb');
        },

    });
}

var save_rowid2;
function file_change(e) {
    if ( $(e).val() !== ''){
        $(e).closest("div").children(".file_labal").text("완료");
    }
}


function filebox(cellvalue, options, rowObject) {
    return "" +
        "<div class='filebox'>"+
        "<label class='file_labal' for='file_"+rowObject.part_code+"'>업로드</label>"+
        "<input type='file' id='file_"+rowObject.part_code+"'  onchange='file_change(this);' />" +
        "</div>";
}


