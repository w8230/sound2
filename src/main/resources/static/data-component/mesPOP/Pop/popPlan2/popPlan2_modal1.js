var lastsel;
var saverow = 0;

var savecol = 0;

var modal1_data = {
    plan_no1 : ''
}

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    jqGrid_modal1();
    jqGridResize("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
}


////////////////////////////클릭 함수/////////////////////////////////////
function add_modal1_btn() {
    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
    var gu5 = String.fromCharCode(5);
    var gu4 = String.fromCharCode(4);

        var add_data = {}
        var jdata = $("#mes_modal1_grid1").getRowData();
        if (jdata.length > 0) {
            var list = [];
            var list2 = [];

            jdata.forEach(function (data, j) {
                if (data.prod_dept !== '' && data.prod_dept !== ' ' &&
                    data.work_user_code !== '' && data.work_user_code !== ' ' &&
                    data.plan_qty !== '' && data.plan_qty !== 0 &&
                    data.plan_date !== ''
            ) {
                    list.push(data.plan_no2+gu4+data.plan_qty + gu4 + data.plan_date.replace(/\-/g, '')+gu4+data.prod_dept+gu4+data.work_user_code+gu4+data.remark+gu4+data.remark1);
                } else {
                    list2.push(data.line_name);
                }
            });
            callback(function () {
                if (list2.length > 0) {
                    alert(list2[0] + "를 다시 확인해주세요");
                } else {
                    var text = '수정하겠습니까?';
                    if (confirm(text)) {
                        wrapWindowByMask2();
                        add_data.keyword = list.join(gu5);
                        add_data.plan_no1 = modal1_data.plan_no1;
                        ccn_ajax("/popPlan2Add", add_data).then(function (data) {
                            if (data.result === 'NG') {
                                alert(data.message);
                            } else {
                                if (main_data.check === "I") {
                                    get_btn(1);
                                } else {
                                    get_btn_post($("#mes_grid").getGridParam('page'));
                                }

                            }
                            $('#mes_modal1_grid1').jqGrid('clearGridData');
                            closeWindowByMask();
                            $("#addDialog").dialog('close');
                        }).catch(function (err) {
                            closeWindowByMask();
                            alert("저장실패");
                        });
                    }
                }
            })
        } else {
            alert("저장 목록을 넣어주세요");
        }

}
////////////////////////////호출 함수/////////////////////////////////////

function modal_make1() {

    $("#addDialog").dialog({
        modal: true,
        width: 900,
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: '저장',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    if (main_data.check2 == 'Y'){
                        add_modal1_btn();
                    } else {
                        alert("수정 할 수 없습니다.");
                    }
                }
            },
            {
                text: '취소',
                'class': 'btn btn-minier',
                click: function () {
                    $(this).dialog('close');
                }
            }
        ]
    });
}
function setSelectCombo(data) {
    data = jQuery.parseJSON(data);
    var result = '<select name="prod_dept">';
    result += '<option value="">' + '선택안함' + '</option>';
    for(var idx=0; idx < data.length; idx++) {
        result += '<option value="' + data[idx].code_value + '">' + data[idx].code_name1 + '</option>';
    }
    result += '</select>';
    return result;
}
function setSelectCombo2(data) {
    data = jQuery.parseJSON(data);
    var result = '<select name="work_user_name">';
    result += '<option value="">' + '선택안함' + '</option>';
    for(var idx=0; idx < data.length; idx++) {
        result += '<option value="' + data[idx].user_code + '">' + data[idx].user_name + '</option>';
    }
    result += '</select>';
    return result;
}


function jqGrid_modal1() {
    $("#mes_modal1_grid1").jqGrid({
        mtype: 'POST',
        datatype: "local",
        ajaxSelectOptions: { cache: false, type: 'POST' },
        caption: "생산계획등록(2단계) | MES",
        colNames: ['plan_no2','구분','line_code','계획량','계획일','제품유형','생산구분','prod_dept','작업자','work_user_code','Remark','비고'],
        colModel: [
            {name: 'plan_no2', index: 'plan_no2',key:true,hidden:true,  sortable: false},
            {name: 'line_name', index: 'line_name', sortable: false},
            {name: 'line_code', index: 'line_code', hidden:true, sortable: false},
            {name: 'plan_qty', index: 'plan_qty', sortable: false, align: 'right',formatter:'number',
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
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    } else if(Number(value) <= 0) {
                                        alert("계획량이 0보다 커야합니다.");
                                        e.target.value = '';
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                                }
                            }

                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var value = e.target.value;
                                if (isNaN(value)){
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                } else if(Number(value) <= 0) {
                                    alert("계획량이 0보다 커야합니다.");
                                    e.target.value = '';
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },

            {name: 'plan_date', index: 'plan_date', sortable: false,formatter: formmatterDate2, editable: true,
                editoptions: {
                    dataInit: function (element) {
                        $(element).attr("readonly","readonly").datepicker({
                            format: 'yyyymmdd',
                            autoclose: true,
                            language:   "kr",
                            widgetPositioning:{
                                horizontal: 'auto',
                                vertical: 'bottom'
                            },

                        }).on('changeDate', function(e) {
                            $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                        }).on('hide', function(ev) {
                            $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                        });
                    },

                }
            },
            {name: 'part_type_name', index: 'part_type_name', sortable: false},

            {name: 'prod_dept_name', index: 'prod_dept_name', sortable: false,
                editable: true,                                       // 수정가능 여부
                                                                        // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    dataUrl:"sysCommonAllGet",
                    postData: function (rowid, value, cmName) {
                        return {
                            keyword: 'PROD_DEPT'
                        }
                    },
                    buildSelect:setSelectCombo,
                    dataInit: function ss(elem){

                        $(elem).css('height','18px');
                        $(elem).css('width','100%');

                        },

                   // value: ":선택안함;" + main_data.prod_dept_string.join(";"),             // EDIT옵션(SELECT, INPUT, CHECKBOX등 옵션 상이함)
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            var row = $(e.target).closest('tr.jqgrow');
                            var rowid = row.attr('id');
                            var value = e.target.value;
                            var text = $(e.target).find("option:selected").text();
                            $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'prod_dept', value);
                            if (value === ''){
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'prod_dept', ' ');
                            }
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'prod_dept_name', text);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                var text = $(e.target).find("option:selected").text();
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'prod_dept', value);
                                if (value === ''){
                                    $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'prod_dept', ' ');
                                }
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'prod_dept_name', text);

                            }
                        }
                    ]


                }

            },
            {name: 'prod_dept', index: 'prod_dept', hidden:true, sortable: false,},

            {name: 'work_user_name', index: 'work_user_name', sortable: false,
                editable: true,                                       // 수정가능 여부
                // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    dataUrl:"popLineUserAllGet",
                    postData: function (rowid, value, cmName) {
                        var data = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
                        return {
                            keyword: data.line_code
                        }
                    },
                    buildSelect:setSelectCombo2,
                    dataInit: function ss(elem){

                        $(elem).css('height','18px');
                        $(elem).css('width','100%');

                    },

                    // value: ":선택안함;" + main_data.prod_dept_string.join(";"),             // EDIT옵션(SELECT, INPUT, CHECKBOX등 옵션 상이함)
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            var row = $(e.target).closest('tr.jqgrow');
                            var rowid = row.attr('id');
                            var value = e.target.value;
                            var text = $(e.target).find("option:selected").text();
                            $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'work_user_code', value);
                            if (value === ''){
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'work_user_code', ' ');
                            }
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'work_user_name', text);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                var text = $(e.target).find("option:selected").text();
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'work_user_code', value);
                                if (value === ''){
                                    $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'work_user_code', ' ');
                                }
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'work_user_name', text);

                            }
                        }
                    ]


                }
            },
            {name: 'work_user_code', index: 'work_user_code',hidden:true, sortable: false},
            {name: 'remark', index: 'remark', sortable: false,
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

                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },
            {name: 'remark1', index: 'remark1', sortable: false,
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

                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },
        ],
        autowidth: true,
        height: 310,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        cellEdit: true,
        cellsubmit: 'clientArray',
        beforeEditCell: function (id, name, val, IRow, ICol) {
            lastsel = id;
            saverow = IRow;
            savecol = ICol;
            // if(name=='prod_dept_name') {
            //     var data2 = [];
            //     ccn_ajax("/sysCommonAllGet", {keyword: 'PROD_DEPT'}).then(function (data) {
            //         main_data.prod_dept_string=[];
            //         data.forEach(function (d) {
            //             data2.push(d.code_value+":"+d.code_name1);
            //         })
            //
            //         $("#mes_modal1_grid1").setColProp(name, {
            //                 editoptions: {
            //                     value: data2.join(";"),
            //
            //                 }
            //             }
            //         )
            //     });
            // }

        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {
            // var data = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
            //
            // if (isNaN(data.plan_qty)) {
            //     alert("숫자만 입력가능합니다.");
            //     data.plan_qty = data.plan_qty.replace(/[^0-9]/g, '');
            //     $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'plan_qty', data.plan_qty);
            //
            //     if(parseFloat(data.plan_qty) <= 0) {
            //         alert("계획량이 0보다 커야합니다.");
            //         $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'plan_qty', '');
            //         $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
            //         return false;
            //     }else {
            //         $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
            //     }
            //     return false;
            // }else if(parseFloat(data.plan_qty) <= 0) {
            //     alert("계획량이 0보다 커야합니다.");
            //     $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'plan_qty', '');
            //     $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
            //     return false;
            // }





        },
        pager: "#mes_modal1_grid1_pager",
    });

}
