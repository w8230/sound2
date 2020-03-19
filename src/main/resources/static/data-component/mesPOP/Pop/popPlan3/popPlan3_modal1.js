var lastsel;
var saverow = 0;

var savecol = 0;

var modal1_data = {
    plan_no2 : '',
    plan_qty:0,
    plan_date:'',
    end_date:'',
    work_user_code:'',
    work_user_name:'',
    line_code:''
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
            var sum  = 0;

            jdata.forEach(function (data, i) {
                if (
                    data.work_user_code !== '' && data.work_user_code !== ' ' &&
                    data.plan_qty !== '' && data.plan_qty !== 0.00 &&
                    data.plan_date !== '' && data.end_date !== ''
            ) {
                    list.push(data.plan_no3+gu4+data.line_code+gu4+data.plan_qty + gu4 + data.plan_date.replace(/\-/g, '')+ gu4 + data.end_date.replace(/\-/g, '')+gu4+data.work_user_code+gu4+data.remark+gu4+data.remark1);
                    sum = parseFloat_change(sum) + parseFloat_change(data.plan_qty);
                } else {
                    list2.push(i + 1);
                }
            });
            callback(function () {
                if (list2.length > 0) {
                    alert(list2[0] + "번째를 다시 확인해주세요");
                } else if(parseFloat_change(sum) !==  parseFloat(modal1_data.plan_qty) ){
                    alert("전체 계획량이 다릅니다.");
                } else {
                    var text = '수정하겠습니까?';
                    if (main_data.check == 'I'){
                        text = '저장하겠습니까?';
                    }
                    if (confirm(text)) {
                        wrapWindowByMask2();
                        add_data.keyword = list.join(gu5);
                        add_data.plan_no2 = modal1_data.plan_no2;
                        ccn_ajax("/popPlan3Add", add_data).then(function (data) {
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

function makeNewRowId(jdata){ //그리드 rowid배열을 파라메터로 받는다
    var max = 0;
    for(var i=0; i<jdata.length; i++){
        if(max <= parseInt(jdata[i].seq)){
            max = parseInt(jdata[i].seq);
        }
    }
    return max + 1;
}


function modal1_rowAdd() {
    var reccount = $("#mes_modal1_grid1").getGridParam("reccount");
    var seq = 1;
    if (reccount !== 0){
        var jdata = $("#mes_modal1_grid1").getRowData();
        seq = makeNewRowId(jdata);
    }
    var add_data = {
        seq:seq,
        plan_no3:'',
        line_code:modal1_data.line_code,
        plan_qty:'',
        plan_date:modal1_data.plan_date,
        end_date:modal1_data.end_date,
        work_user_name:modal1_data.work_user_name,
        work_user_code:modal1_data.work_user_code,
        remark:'',
        remark1:''
    }
    $('#mes_modal1_grid1').jqGrid("resetSelection");
    $("#mes_modal1_grid1").jqGrid("addRowData", seq, add_data, 'last'); // 마지막 행에 Row 추가
}

function modal1_rowDel() {

    var ids = $("#mes_modal1_grid1").getGridParam('selarrrow');
    var ids2 = ids.slice();
    var idx;
    ids2.forEach(function (id) {
        idx = findArrayIndex(ids, function (item) {
            return item === id
        })
        if (idx !== -1) {
            $("#mes_modal1_grid1").jqGrid("delRowData", ids[idx]);
        }

    });
    $('#mes_modal1_grid1').jqGrid("resetSelection");
    


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
                text: '줄추가',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    if (main_data.check2 == 'Y'){
                        modal1_rowAdd();
                    } else {
                        alert("수정 할 수 없습니다.");
                    }
                }
            },
            {
                text: '줄삭제',
                'class': 'btn btn-dark btn-minier',
                click: function () {
                    if ( main_data.check2 == 'Y'){
                        modal1_rowDel();
                    } else {
                        alert("수정 할 수 없습니다.");
                    }
                }
            },
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
        caption: "생산계획등록(3단계) | MES",
        colNames: ['rowid','plan_no3','line_code','계획량','지시일','마감일','작업자','work_user_code','Remark','비고'],
        colModel: [
            {name: 'seq', index: 'seq',key:true,hidden:true,  sortable: false},
            {name: 'plan_no3', index: 'plan_no3',hidden:true, sortable: false},
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
            {name: 'end_date', index: 'end_date', sortable: false,formatter: formmatterDate2, editable: true,
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
        multiselect: true,
        autowidth: true,
        height: 310,
        cellEdit: true,
        cellsubmit: 'clientArray',
        beforeEditCell: function (id, name, val, IRow, ICol) {
            lastsel = id;
            saverow = IRow;
            savecol = ICol;
        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {
            // var data = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
            //
            // if (isNaN(data.plan_qty)) {
            //     alert("숫자만 입력가능합니다.");
            //     data.plan_qty = data.plan_qty.replace(/[^0-9]/g, '');
            //     $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'plan_qty', data.plan_qty);
            //
            //     if(parseInt(data.plan_qty) <= 0) {
            //         alert("계획량이 0보다 커야합니다.");
            //         $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'plan_qty', '');
            //         $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
            //         return false;
            //     }else {
            //         $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
            //     }
            //     return false;
            // }else if(parseInt(data.plan_qty) <= 0) {
            //     alert("계획량이 0보다 커야합니다.");
            //     $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'plan_qty', '');
            //     $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
            //     return false;
            // }





        },

    });

}
