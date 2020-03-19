var lastsel;
var saverow = 0;

var savecol = 0;
////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    datepickerInput_modal1();
    jqGrid_modal1();
    jqGridResize("#scmOutOrderDialogLeftGrid", $('#scmOutOrderDialogLeftGrid').closest('[class*="col-"]'));
    jqGridResize("#scmOutOrderDialogRightGrid", $('#scmOutOrderDialogRightGrid').closest('[class*="col-"]'));
    selectBox_modal1();

}


////////////////////////////클릭 함수/////////////////////////////////////
function get_modal1_btn(page) {
    var data = value_return(".modal_value");
    data.keyword5 = "";
    $("#scmOutOrderDialogLeftGrid").setGridParam({
        url: "/sysPartSuppGet",
        datatype: "json",
        page: page,
        postData: data
    }).trigger("reloadGrid");


}


function update_btn(rowid) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value2", []);
        modal_reset(".modal_value", []);
        $("#scmOutOrderDialogLeftGrid").jqGrid('clearGridData');
        $("#scmOutOrderDialogRightGrid").jqGrid('clearGridData');
        $("#ord_no").val(rowid);
        main_data.check = 'U';

        ccn_ajax('/scmOutOrderSup2Get', {keyword: rowid}).then(function (data) {

            $("#line_select").val(data[0].cargo_code_to).trigger("change");
            $("#usage_select").val(data[0].usage).trigger("change");
            $("#datepicker3").val(formmatterDate2(data[0].work_date));
            $("#part_type_modal1_select").val('D').trigger("change");

            $("#scmOutOrderDialogRightGrid").setGridParam({
                datatype: "local",
                data: data
            }).trigger("reloadGrid");

            $("#scmOutOrder-add-dialog").dialog('open');
            jqGridResize2("#scmOutOrderDialogLeftGrid", $('#scmOutOrderDialogLeftGrid').closest('[class*="col-"]'));
            jqGridResize2("#scmOutOrderDialogRightGrid", $('#scmOutOrderDialogRightGrid').closest('[class*="col-"]'));
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}


function right_modal1_btn() {
    if (main_data.check2 === 'Y') {

        var ids = $("#scmOutOrderDialogLeftGrid").getGridParam('selarrrow').slice();

        if (ids.length === 0 ){
            alert("옮길 데이터를 선택해주세요");
            return false;
        }


        var ids2 = $("#scmOutOrderDialogRightGrid").jqGrid("getDataIDs");

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
                list.push($("#scmOutOrderDialogLeftGrid").getRowData(idsfor));
            }
        });

        callback(function () {
            if (overlap.length !== 0) {
                alert(overlap.join(", ") + " 중복");
            }
            ids2 = $("#scmOutOrderDialogRightGrid").getRowData();
            ids2 = ids2.concat(list);

            $('#scmOutOrderDialogRightGrid').jqGrid("clearGridData");

            $("#scmOutOrderDialogRightGrid").setGridParam({
                datatype: "local",
                data: ids2
            }).trigger("reloadGrid");

            $('#scmOutOrderDialogLeftGrid').jqGrid("resetSelection");
        });
    }
}


function left_modal1_btn() {
    if (main_data.check2 === 'Y') {
        var ids2 = $("#scmOutOrderDialogRightGrid").getGridParam('selarrrow').slice();

        for (var i = 0; i < ids2.length; i++) {
            $('#scmOutOrderDialogRightGrid').jqGrid('delRowData', ids2[i]);
        }
        $('#scmOutOrderDialogRightGrid').jqGrid("resetSelection");
    }
}


function add_modal1_btn() {
    var gu4 = String.fromCharCode(4);
    var gu5 = String.fromCharCode(5);
    if (main_data.check2 === 'Y') {
        var add_data = value_return(".modal_value2");
        add_data.work_date = add_data.work_date.replace(/\-/g, '');

        // $('#scmInDialogRightGrid').jqGrid('saveRow', lastsel, false, 'clientArray');
        var jdata = $("#scmOutOrderDialogRightGrid").getRowData();
        if (jdata.length > 0) {
            var list = [];
            var list2 = [];

            jdata.forEach(function (data, j) {
                if (data.qty !== '' &&  parseFloat(data.qty) > 0 ) {
                    list.push(data.part_code +gu4 + data.qty);
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
                        ccn_ajax("/scmOutOrderAdd", add_data).then(function (data) {
                            if (data.result === 'NG') {
                                alert(data.message);
                            } else {
                                if (main_data.check === "I") {
                                    get_btn(1);
                                } else {
                                    get_btn_post($("#scmOutOrderTopGrid").getGridParam('page'));
                                }
                            }
                            $('#scmOutOrderBottomGrid').jqGrid('clearGridData');
                            closeWindowByMask();
                            $("#scmOutOrder-add-dialog").dialog('close');
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
    $("#scmOutOrder-add-dialog").dialog('close');
}

////////////////////////////호출 함수/////////////////////////////////////

function jqGrid_modal1() {
    $("#scmOutOrderDialogLeftGrid").jqGrid({
        mtype: 'POST',
        datatype: "local",
        multiselect: true,
        caption: "출고요청 | MES",
        colNames: [ '품번', '품명', '규격', '단위'],
        colModel: [

            {name: 'part_code', key: true, index: 'part_code', sortable: false,fixed:true, width: 80},
            {name: 'part_name', index: 'part_name', sortable: false,fixed:true, width: 100},
            {name: 'spec', index: 'spec', sortable: false,fixed:true, width: 120},
            {name: 'unit_name', index: 'unit_name', sortable: false,fixed:true, width: 60},
        ],
        autowidth: true,
        height: 310,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: "#scmOutOrderDialogLeftGridPager",


    });

    $("#scmOutOrderDialogRightGrid").jqGrid({

        datatype: "local",
        // 다중 select
        multiselect: true,
        // 타이틀
        caption: "출고요청 | MES",
        colNames: [ '품번', '품명', '규격', '단위', '요청수량'],
        colModel: [

            {name: 'part_code', key: true, index: 'part_code', width: 80, sortable: false,fixed:true},
            {name: 'part_name', index: 'part_name', width: 100, sortable: false,fixed:true},
            {name: 'spec', index: 'spec', width: 120, sortable: false,fixed:true},
            {name: 'unit_name', index: 'unit_name', width: 60, sortable: false,fixed:true},
            {
                name: 'qty', index: 'qty', width: 100, sortable: false, editable: true, align: 'right',fixed:true,formatter:'number',
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
                                        $("#scmOutOrderDialogRightGrid").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    } else if(parseFloat_change(value) <= 0) {
                                        alert("요청수량이 0보다 커야합니다.");
                                        e.target.value = '';
                                        $("#scmOutOrderDialogRightGrid").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }

                                    $("#scmOutOrderDialogRightGrid").jqGrid("saveCell", saverow, savecol);


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
                                    $("#scmOutOrderDialogRightGrid").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                } else if(parseFloat_change(value) <= 0) {
                                    alert("요청수량이 0보다 커야합니다.");
                                    e.target.value = '';
                                    $("#scmOutOrderDialogRightGrid").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }

                                $("#scmOutOrderDialogRightGrid").jqGrid("saveCell", saverow, savecol);


                            }
                        }

                    ]
                }
            },
        ],
        autowidth: true,
        height: 340,
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
            // var data = $('#scmOutOrderDialogRightGrid').jqGrid('getRowData', rowid);
            //
            //     if (isNaN(data.qty)) {
            //         alert("숫자만 입력가능합니다.");
            //         data.qty = data.qty.replace(/[^0-9]/g, '');
            //         $('#scmOutOrderDialogRightGrid').jqGrid('setCell', rowid, 'qty', data.qty);
            //
            //         if(parseFloat_change(data.qty) <= 0) {
            //             alert("발주수량이 0보다 커야합니다.");
            //             $('#scmOutOrderDialogRightGrid').jqGrid('setCell', rowid, 'qty', '');
            //             $("#scmOutOrderDialogRightGrid").jqGrid("saveCell", saverow, savecol);
            //             return false;
            //         }else {
            //             $("#scmOutOrderDialogRightGrid").jqGrid("saveCell", saverow, savecol);
            //         }
            //         return false;
            //     }else if(parseFloat(data.qty) <= 0) {
            //         alert("발주수량이 0보다 커야합니다.");
            //         $('#scmOutOrderDialogRightGrid').jqGrid('setCell', rowid, 'qty', '');
            //         $("#scmOutOrderDialogRightGrid").jqGrid("saveCell", saverow, savecol);
            //         return false;
            //     }





        },
        onCellSelect: function (rowid, icol, cellcontent, e) {


        }


    });

}


function modal_make1() {
    $("#scmOutOrder-add-dialog").dialog({
        modal: true,
        width: 1300,
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


function selectBox_modal1() {
    select_makes_sub("#grp_select", "/sysBPartGroupSelectGet", "part_grp_code", "part_grp_name", {keyword: ''}, 'Y');
    select_makes3("#line_select", "/sysProdLineAllGet", "line_code", "line_name",{keyword:''});
    $("#usage_select").select2();

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

function datepickerInput_modal1() {
    datepicker_makes("#datepicker3", 0);

}


