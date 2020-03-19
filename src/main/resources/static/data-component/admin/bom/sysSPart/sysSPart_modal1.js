var lastsel;
var saverow = 0;

var savecol = 0;


////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    jqGrid_modal1();
    jqGridResize("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
    $('#mes_modal1_grid1 .ui-widget-content .ui-corner-all').select2();
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
                if (data.prod_dept !== '' && data.prod_type !=='' && data.prod_dept !== ' ' ) {
                    list.push(data.part_code + gu4 + data.prod_dept+gu4+data.prod_type+gu4+data.remark);
                } else {
                    list2.push(data.part_name);
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
                        ccn_ajax("/sysSPartAdd", add_data).then(function (data) {
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
                    add_modal1_btn();
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



function jqGrid_modal1() {
    $("#mes_modal1_grid1").jqGrid({
        mtype: 'POST',
        datatype: "local",
        ajaxSelectOptions: { cache: false, type: 'POST' },
        caption: "제품등록 | MES",
        colNames: ['part_code','품명', '공정구분','생산구분','prod_dept','제품유형','용도','공정코드','비고'],
        colModel: [
            {name: 'part_code', index: 'part_code',hidden:true,key:true, sortable: false},
            {name: 'part_name', index: 'part_name', sortable: false,width:150,fixed:true},
            {name: 'line_name', index: 'line_name', sortable: false,width:150,fixed:true},
            {name: 'prod_dept_name', index: 'prod_dept_name',width:150, sortable: false,
                fixed:true,
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
            {name: 'prod_dept', index: 'prod_dept', hidden:true, sortable: false,width:150,fixed:true},
            {name: 'part_type_name', index: 'part_type_name', sortable: false,width:150,fixed:true},
            {name: 'prod_type', index: 'prod_type', sortable: false,width:150,fixed:true,
                editable: true,                                       // 수정가능 여부
                formatter: 'select',                                 // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    value: ":선택안함;1:양산;2:개발",             // EDIT옵션(SELECT, INPUT, CHECKBOX등 옵션 상이함)
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()
                            $('#mes_modal1_grid1 select').select2();
                            $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                        },
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
            {name: 'line_char', index: 'line_char', sortable: false,width:150,fixed:true},
            {name: 'remark', index: 'remark', sortable: false,width:300,fixed:true,
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
            }
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
        loadComplete:function(){
            if ($("#mes_modal1_grid1").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_modal1_grid1 tr.jqgfirstrow").css("height","1px");
            else
                $("table#mes_modal1_grid1 tr.jqgfirstrow").css("height","0px");
        },
        pager: "#mes_modal1_grid1_pager"
    });

}
