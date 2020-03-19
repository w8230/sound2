////////////////////////////데이터/////////////////////////////////////
var modal_data = {
    check: 'I',
    send_data: {},
};

var lastsel;
var saverow = 0;
var savecol = 0;

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();

    jqGrid_modal1();
    jqGridResize("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
    jqGridResize("#mes_modal1_grid2", $('#mes_modal1_grid2').closest('[class*="col-"]'));
    selectBox();
    datepickerInput_modal1();
}

////////////////////////////클릭 함수/////////////////////////////////////

function select_change1(value) {
    ccn_ajax('/sysPartTypeOneGet',{keyword:'',keyword2:value}).then(function (value) {
        for(var i=1; i<=3;i++) {
            group_cb(value,i);
        }
    });
}

function get_modal1_btn(page) {
    modal_data.send_data = value_return(".modal_value");
    $("#mes_modal1_grid1").setGridParam({
        url: '/sysPartGet',
        datatype: "json",
        page: page,
        postData: modal_data.send_data
    }).trigger("reloadGrid");
}


function update_btn(rowid) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        modal_reset(".modal_value2", []);
        $("#mes_modal1_grid1").jqGrid('clearGridData');
        $("#mes_modal1_grid2").jqGrid('clearGridData');
        $("#req_no").val(rowid);
        main_data.check = 'U';

        ccn_ajax('/scmReqOrderSubAllGet', {keyword: rowid}).then(function (data) {

            $("#datepicker3").val(formmatterDate2(data[0].work_date));
            $("#datepicker4").val(formmatterDate2(data[0].end_date));
            $("#part_type_modal1_select").val('A').trigger("change");

            $("#mes_modal1_grid2").setGridParam({
                datatype: "local",
                data: data
            }).trigger("reloadGrid");

            $("#addDialog").dialog('open');
            jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
            jqGridResize2("#mes_modal1_grid2", $('#mes_modal1_grid2').closest('[class*="col-"]'));
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}

function right_modal1_btn() {
    $("#mes_modal1_grid2").jqGrid("saveCell", saverow, savecol);
    if (main_data.check2 === 'Y') {
        var ids = $("#mes_modal1_grid1").getGridParam('selarrrow').slice();
        if (ids.length === 0 ){
            alert("옮길 데이터를 선택해주세요");
            return false;
        }
        var ids2 = $("#mes_modal1_grid2").jqGrid("getDataIDs");

        var overlap = [];

        if (ids2.length != 0) {
            ids.forEach(function (idsfor, s) {
                ids2.forEach(function (ids2for) {
                    if (idsfor === ids2for) {
                        ids.splice(s, 1, '');
                        overlap.push(idsfor);
                    }
                });
            });
        }

        var list = [];
        ids.forEach(function (idsfor) {
            if (idsfor !== '') {
                list.push($("#mes_modal1_grid1").getRowData(idsfor));
            }
        });

        callback(function () {
            if (overlap.length !== 0) {
                alert(overlap.join(", ") + " 중복");
            }
            ids2 = $("#mes_modal1_grid2").getRowData();
            ids2 = ids2.concat(list);

            $('#mes_modal1_grid2').jqGrid("clearGridData");

            $("#mes_modal1_grid2").setGridParam({
                datatype: "local",
                data: ids2
            }).trigger("reloadGrid");

            $('#mes_modal1_grid1').jqGrid("resetSelection");
        });
    }
}

function left_modal1_btn() {
    $("#mes_modal1_grid2").jqGrid("saveCell", saverow, savecol);
    if (main_data.check2 === 'Y') {
        var ids2 = $("#mes_modal1_grid2").getGridParam('selarrrow').slice();

        for (var i = 0; i < ids2.length; i++) {
            $('#mes_modal1_grid2').jqGrid('delRowData', ids2[i]);
        }
        $('#mes_modal1_grid2').jqGrid("resetSelection");
    }
}

function add_modal1_btn() {
    var gu4 = String.fromCharCode(4);
    var gu5 = String.fromCharCode(5);
    if (main_data.check2 === 'Y') {
        var add_data = value_return(".modal_value2");
        add_data.work_date = add_data.work_date.replace(/\-/g, '');
        add_data.end_date = add_data.end_date.replace(/\-/g, '');

        var jdata = $("#mes_modal1_grid2").getRowData();
        if (jdata.length > 0) {
            var list = [];
            var list2 = [];

            jdata.forEach(function (data, j) {
                if (data.qty !== '' && parseFloat(data.qty) > 0 ) {
                    list.push(data.part_code+gu4+data.qty);
                } else {
                    list2.push(data.part_code);
                }
            });

            callback(function () {
                if (list2.length > 0) {
                    alert(list2[0] + "를 다시 확인해주세요");
                } else {
                    var text = '저장하겠습니까?';
                    if (main_data.check === "U") {
                        text = '수정하겠습니까?';
                    }
                    if (confirm(text)) {
                        wrapWindowByMask2();
                        add_data.keyword = list.join(gu5);
                        ccn_ajax("/scmReqOrderAdd", add_data).then(function (data) {
                            if (data.result === 'NG') {
                                alert(data.message);
                            } else {
                                if (main_data.check === "I") {
                                    get_btn(1);
                                } else {
                                    get_btn_post($("#mes_grid").getGridParam('page'));
                                }
                            }
                            closeWindowByMask();
                            $("#addDialog").dialog('close');
                        }).catch(function (err) {
                            closeWindowByMask();
                            alert("저장실패");
                        });
                    }
                }
            })
        }else {
            alert("저장 목록을 넣어주세요");
        }
    }
}

function close_modal1_btn() {
    $("#addDialog").dialog('close');
}


////////////////////////////호출 함수/////////////////////////////////////
function datepickerInput_modal1() {
    datepicker_makes("#datepicker3", 0);
    datepicker_makes("#datepicker4", 1);
}

function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 1350,
        height: 'auto',
        autoOpen: false,
        resizable: false,
        open: function () {
            if ($.ui && $.ui.dialog && !$.ui.dialog.prototype._allowInteractionRemapped && $(this).closest(".ui-dialog").length) {
                if ($.ui.dialog.prototype._allowInteraction) {
                    $.ui.dialog.prototype._allowInteraction = function (e) {
                        if ($(e.target).closest('.select2-drop').length) return true;

                        if (typeof ui_dialog_interaction!="undefined") {
                            return ui_dialog_interaction.apply(this, arguments);
                        } else {
                            return true;
                        }
                    };
                    $.ui.dialog.prototype._allowInteractionRemapped = true;
                }
                else {
                    $.error("You must upgrade jQuery UI or else.");
                }
            }
        },
        _allowInteraction: function (event) {
            return !!$(e.target).closest('.ui-dialog, .ui-datepicker, .select2-drop').length;
        }
    });
}


function select_part_type_change_modal(value) {
    if (value !== '' && value !== null ) {
        part_type_select_ajax_all("#part_group_modal1_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name", {keyword: value}).then(function () {
            $('#part_group_modal1_select2').empty();

            var option = $("<option></option>").text('전체').val('');

            $('#part_group_modal1_select2').append(option);

            $('#part_group_modal1_select2').select2();

        });

        if (value === 'D'){
            select_makes_sub('#part_name_modal1_select', "/sysPartNameGroupAllGet","code_name2" ,"code_name2",{keyword:'MAT_PROD', keyword2:'CODE'},'Y');
        } else if (value === 'A') {
            select_makes_sub('#part_name_modal1_select', "/sysPartNameGroupAllGet","code_name2" ,"code_name2",{keyword:'MAT_PRODUCT', keyword2:'CODE'},'Y');
        }
    }else {

        $('#part_name_modal1_select').empty();
        var option2 = $("<option></option>").text('전체').val('');
        $('#part_name_modal1_select').append(option2);
    }
}


function select_change1_modal(value) {
    if (value !== '' && value !== null ){
        part_type_select_ajax_all('#part_group_modal1_select2', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:$("#part_type_modal1_select").val(), keyword2:value}).then(function (){

        }).catch(function (err){
            $('#part_group_modal1_select2').empty();

            var option = $("<option></option>").text('전체').val('');

            $('#part_group_modal1_select2').append(option);

        });



    } else {
        $('#part_group_modal1_select2').empty();


        var option = $("<option></option>").text('전체').val('');


        $('#part_group_modal1_select2').append(option);

    }
}

function selectBox() {
    part_type_select_ajax("#part_type_modal1_select", "/sysPartTypeGet", "part_type_code", "part_type_name",{keyword:''}).then(function (data) {
        $("select#part_type_modal1_select option[value='C']").remove();
        $("select#part_type_modal1_select option[value='B']").remove();


        part_type_select_ajax_all("#part_group_modal1_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name", {keyword: 'B'}).then(function () {
            $('#part_group_modal1_select2').empty();

            var option = $("<option></option>").text('전체').val('');

            $('#part_group_modal1_select2').append(option);

            $('#part_group_modal1_select2').select2();

        });
    });
    select_makes_sub('#part_name_modal1_select', "/sysPartNameGroupAllGet","code_name2" ,"code_name2",{keyword:'MAT_PROD', keyword2:'CODE'},'Y');

}

function jqGrid_modal1() {
    $("#mes_modal1_grid1").jqGrid({
        mtype: 'POST',
        datatype: "local",
        multiselect: true,
        caption: "구매의뢰서 | MES",
        colNames: [ '품번', '품명', '규격', '단위', '발주단위'],
        colModel: [
            {name: 'part_code', index: 'part_code',key:true, sortable: false, width:80,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width:100,fixed:true},
            {name: 'spec', index: 'spec', sortable: false, width:120,fixed:true},
            {name: 'unit_name', index: 'unit_name', sortable: false, width:60,fixed:true},
            {name: 'ord_qty', index: 'ord_qty', sortable: false, width:100, align: 'right',formatter:'number',fixed:true},
        ],
        autowidth: true,
        height: 300,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: "#mes_modal1_grid1_pager",
        loadComplete:function(){
            if ($("#mes_modal1_grid1").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_modal1_grid1 tr.jqgfirstrow").css("height","1px");
        }
    });

    $("#mes_modal1_grid2").jqGrid({
        datatype: "local",
        multiselect: true,
        caption: "구매의뢰서 | MES",
        colNames: [ '품번', '품명', '규격','단위', '발주단위','요청수량'],
        colModel: [
            {name: 'part_code', index: 'part_code', width: 80,key:true, sortable: false,fixed:true},
            {name: 'part_name', index: 'part_name', width: 100, sortable: false,fixed:true},
            {name: 'spec', index: 'spec', width: 120, sortable: false,fixed:true},
            {name: 'unit_name', index: 'unit_name', width: 60, sortable: false,fixed:true},
            {name: 'ord_qty', index: 'ord_qty', width: 100, sortable: false, align: 'right',formatter:'number',fixed:true},
            { name: 'qty', index: 'qty', width: 100, sortable: false, editable: true, align: 'right',formatter:'number',fixed:true,
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
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal1_grid2").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    } else if(parseFloat_change(value) <= 0) {
                                        alert("요청수량이 0보다 커야합니다.");
                                        e.target.value = '';
                                        $("#mes_modal1_grid2").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }

                                    $("#mes_modal1_grid2").jqGrid("saveCell", saverow, savecol);

                                }
                            }

                        },

                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                if (isNaN(value)){
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                    $("#mes_modal1_grid2").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                } else if(parseFloat_change(value) <= 0) {
                                    alert("요청수량이 0보다 커야합니다.");
                                    e.target.value = '';
                                    $("#mes_modal1_grid2").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }

                                $("#mes_modal1_grid2").jqGrid("saveCell", saverow, savecol);


                            }
                        }

                    ]
                }
            }
        ],
        autowidth: true,
        height: 328,
        cellEdit: true,
        cellsubmit: 'clientArray',
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        beforeEditCell: function (id, name, val, IRow, ICol) {
            lastsel = id;
            saverow = IRow;
            savecol = ICol;
        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {
            // var data = $('#mes_modal1_grid2').jqGrid('getRowData', rowid);
            // if (isNaN(data.qty)) {
            //     alert("숫자만 입력가능합니다.");
            //     data.qty = data.qty.replace(/[^\.0-9]/g,'');
            //     $('#mes_modal1_grid2').jqGrid('setCell', rowid, 'qty', data.qty);
            //
            //     if(parseFloat_change(data.qty) <= 0) {
            //         alert("요청수량이 0보다 커야합니다.");
            //         $('#mes_modal1_grid2').jqGrid('setCell', rowid, 'qty', '');
            //         $("#mes_modal1_grid2").jqGrid("saveCell", saverow, savecol);
            //         return false;
            //     }else {
            //         $("#mes_modal1_grid2").jqGrid("saveCell", saverow, savecol);
            //     }
            //     return false;
            // }else if(parseFloat(data.qty) <= 0) {
            //     alert("요청수량이 0보다 커야합니다.");
            //     $('#mes_modal1_grid2').jqGrid('setCell', rowid, 'qty', '');
            //     $("#mes_modal1_grid2").jqGrid("saveCell", saverow, savecol);
            //     return false;
            // }

        },
        loadComplete:function(){
            if ($("#mes_modal1_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_modal1_grid2  tr.jqgfirstrow").css("height","1px");

        }
    });

}