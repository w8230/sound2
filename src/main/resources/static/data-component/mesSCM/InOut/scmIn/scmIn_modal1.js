

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    datepickerInput_modal1();
    jqGrid_modal1();
    jqGridResize("#scmInDialogLeftGrid", $('#scmInDialogLeftGrid').closest('[class*="col-"]'));
    jqGridResize("#scmInDialogRightGrid", $('#scmInDialogRightGrid').closest('[class*="col-"]'));
    selectBox_modal1();

}


////////////////////////////클릭 함수/////////////////////////////////////
function get_modal1_btn(page) {
    if ($("#supp_code_modal").val() === '') {
        alert("업체를 선택하세요");
    } else {


        var data = value_return(".modal_value");


        $("#scmInDialogLeftGrid").setGridParam({
            url: "/sysPartSuppGet",
            datatype: "json",
            page: page,
            postData: data
        }).trigger("reloadGrid");
    }

}


function update_btn(rowid) {
    if (main_data.auth.check_edit !="N") {
        var gu4 = String.fromCharCode(4);
        var gu5 = String.fromCharCode(5);
        $("#supp_name_modal").prop("disabled", true);
        $("#part_type_select").prop("disabled", true);
        $("#part_group_select1").prop("disabled", true);
        $("#part_group_select2").prop("disabled", true);
        $("#part_group_select3").prop("disabled", true);
        modal_reset(".modal_value2", []);
        modal_reset(".modal_value", []);
        $("#scmInDialogLeftGrid").jqGrid('clearGridData');
        $("#scmInDialogRightGrid").jqGrid('clearGridData');
        $("#in_no").val(rowid);
        modal2_data.part_code = '';
        modal2_data.sub_data = [];
        main_data.check = 'U';

        ccn_ajax('/scmInSub2Get', {keyword: rowid}).then(function (data) {
            $("#part_type_modal1_select").val('D').trigger("change");

            $("#supp_name_modal").val(data[0].supp_name);
            $("#supp_code_modal").val(data[0].supp_code);

            $("#datepicker3").val(formmatterDate2(data[0].work_date));
            $("#remark").val(data[0].remark);

            var push;
            var list;
            var list2;
            var list3;
            data.forEach(function (s) {
                push = {};
                list = [];
                list3 = [];
                push.part_code = s.part_code;
                list = s.sub.split(gu5);
                list.forEach(function (s2) {
                    list2 = [];
                    list2 = s2.split(gu4);
                    list3.push({lot: list2[0], qty: list2[1]});
                });
                push.list = list3;
                modal2_data.sub_data.push(push);

            })


            $("#scmInDialogRightGrid").setGridParam({
                datatype: "local",
                data: data
            }).trigger("reloadGrid");

            $("#scmIn-add-dialog").dialog('open');
            jqGridResize2("#scmInDialogLeftGrid", $('#scmInDialogLeftGrid').closest('[class*="col-"]'));
            jqGridResize2("#scmInDialogRightGrid", $('#scmInDialogRightGrid').closest('[class*="col-"]'));
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}


function right_modal1_btn() {
    if (main_data.check2 === 'Y'  && main_data.check === 'I') {
        // $('#scmInDialogRightGrid').jqGrid('saveRow', lastsel, false, 'clientArray');
        var ids = $("#scmInDialogLeftGrid").getGridParam('selarrrow').slice();

        if (ids.length === 0 ){
            alert("옮길 데이터를 선택해주세요");
            return false;
        }


        var ids2 = $("#scmInDialogRightGrid").jqGrid("getDataIDs");


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
        var checkData={};
        ids.forEach(function (idsfor) {
            if (idsfor !== '') {
                checkData =  $("#scmInDialogLeftGrid").getRowData(idsfor);
                checkData.check='N';
                list.push(checkData);
            }
        });

        callback(function () {
            if (overlap.length !== 0) {
                alert(overlap.join(", ") + " 중복");
            }
            ids2 = $("#scmInDialogRightGrid").getRowData();

            ids2 = ids2.concat(list);

            $('#scmInDialogRightGrid').jqGrid("clearGridData");

            $("#scmInDialogRightGrid").setGridParam({
                datatype: "local",
                data: ids2
            }).trigger("reloadGrid");

            $('#scmInDialogLeftGrid').jqGrid("resetSelection").trigger("reloadGrid");
        });
    }
}


function left_modal1_btn() {
    if (main_data.check2 === 'Y' && main_data.check === 'I') {
        var ids2 = $("#scmInDialogRightGrid").getGridParam('selarrrow').slice();
        var idx;
        var idx2;
        ids2.forEach(function (id, j) {
            modal2_data.sub_data.forEach(function (id2, i) {
                if (id === id2.part_code) {
                    idx = findArrayIndex(modal2_data.sub_data, function (item) {
                        return item.part_code === id
                    })
                    if (idx !== -1) {
                        modal2_data.sub_data.splice(idx, 1);
                    }
                }
            });

            modal3_data.sub_data.forEach(function (id3, i) {
                if (id === id3.part_code) {
                    idx2 = findArrayIndex(modal3_data.sub_data, function (item) {
                        return item.part_code === id
                    })
                    if (idx2 !== -1) {
                        modal3_data.sub_data.splice(idx2, 1);
                    }
                }
            });

        });


        for (var i = 0; i < ids2.length; i++) {
            $('#scmInDialogRightGrid').jqGrid('delRowData', ids2[i]);
        }
        $('#scmInDialogRightGrid').jqGrid("resetSelection");
    }
}


function add_modal1_btn() {
    var gu4 = String.fromCharCode(4);
    var gu5 = String.fromCharCode(5);
    var gu3 = String.fromCharCode(3);

    if (main_data.check2 === 'Y'  && main_data.check === 'I') {
        var add_data = value_return(".modal_value2");
        add_data.work_date = add_data.work_date.replace(/\-/g, '');
        add_data.supp_code = add_data.keyword6;

        // $('#scmInDialogRightGrid').jqGrid('saveRow', lastsel, false, 'clientArray');
        var jdata = $("#scmInDialogRightGrid").getRowData();
        if (jdata.length > 0){
            var list = [];
            var list2 = [];
            var list3 = [];
            var list4 = [];
            var list5 = [];
            var add_check=true;
            jdata.forEach(function (data, j) {
                if (add_check === true) {
                    if (data.ord_check === 'N') {
                        alert(data.part_code + "의 " + "발주등록을 다시 확인해주세요");
                        add_check=false;
                        return false;
                    } else if (data.lot === '') {
                        //list.push(data.part_code);
                        alert(data.part_code + "의 " + "수량등록을 다시 확인해주세요");
                        add_check=false;
                        return false;
                    } else if (data.qty === '' || isNaN(data.qty)) {
                        //list.push(data.part_code);
                        alert(data.part_code + "의 " + "수량등록을 다시 확인해주세요");
                        add_check=false;
                        return false;
                    } else {
                        list2.push(data.part_code + gu4 + data.lot + gu4 + data.qty + gu4 + data.pack_qty);

                        list3.push(data.part_code);

                    }
                }
            });
            callback(function () {
                if (add_check=== true) {
                    if (list.length > 0) {
                        alert(list[0] + "를 다시 확인해주세요");
                    } else {
                        var text = '저장하겠습니까?';
                        if (main_data.check === "U") {
                            text = '수정하겠습니까?';
                        }
                        if (confirm(text)) {
                            wrapWindowByMask2();
                            add_data.keyword = list2.join(gu5);

                            var code_list = [];
                            var code_list2 = [];
                            var idx;

                            var code_list_2 = [];
                            var code_list2_2 = [];
                            var idx2;


                            list3.forEach(function (s2, i2) {
                                idx = findArrayIndex(modal2_data.sub_data, function (item) {
                                    return item.part_code === s2
                                });

                                if (idx !== -1) {
                                    modal2_data.sub_data[idx].list.forEach(function (s3, k) {
                                        code_list.push(s3.part_code + gu3 + s3.lot + gu3 + s3.qty);
                                        if (modal2_data.sub_data[idx].list.length === k + 1) {
                                            code_list2.push(code_list.join(gu4));
                                            code_list = [];
                                        }
                                        ;
                                    });
                                }

                                /////////////////////////////////////////////
                                idx2 = findArrayIndex(modal3_data.sub_data, function (item) {
                                    return item.part_code === s2
                                });

                                if (idx2 !== -1) {
                                    modal3_data.sub_data[idx2].list.forEach(function (s3, k) {
                                        code_list_2.push(s3.ord_no + gu3 + s3.part_code + gu3 + s3.in_qty + gu3 + s3.result_check);
                                        if (modal3_data.sub_data[idx].list.length === k + 1) {
                                            code_list2_2.push(code_list_2.join(gu4));
                                            code_list_2 = [];
                                        }
                                        ;
                                    });
                                }
                            });

                            add_data.keyword2 = code_list2.join(gu5);
                            add_data.keyword3 = code_list2_2.join(gu5);
                            ccn_ajax("/scmInAdd", add_data).then(function (data) {
                                if (data.result === 'NG') {
                                    alert(data.message);
                                } else {
                                    if (main_data.check === "I") {
                                        get_btn(1);
                                    } else {
                                        get_btn_post($("#scmInTopGrid").getGridParam('page'));
                                    }
                                }
                                $('#scmInBottomGrid').jqGrid('clearGridData');
                                closeWindowByMask();
                                $("#scmIn-add-dialog").dialog('close');
                            }).catch(function (err) {
                                closeWindowByMask();
                                alert("저장실패");
                            });
                        }
                    }
                }
            })
        }else {
            alert("저장 목록을 넣어주세요");
        }
    }
}

function close_modal1_btn() {
    $("#scmIn-add-dialog").dialog('close');
}

function modal2_modal_open(rowid) {
    modal2_data.part_code = rowid;
    modal_reset(".modal_value3", []);
    var data = $('#scmInDialogRightGrid').jqGrid('getRowData', rowid);
    if (data.lot !== '') {
        modal2_edit(rowid);
    }
    $("#scmInAddDialog").dialog('open');
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

////////////////////////////호출 함수/////////////////////////////////////

function jqGrid_modal1() {
    $("#scmInDialogLeftGrid").jqGrid({
        mtype: 'POST',
        datatype: "local",
        multiselect: true,
        caption: "입고등록 | MES",
        colNames: [ '품번', '품명', '규격', '단위', '검사등급'],
        colModel: [

            {name: 'part_code', key: true, index: 'part_code', sortable: false,fixed:true, width: 80},
            {name: 'part_name', index: 'part_name', sortable: false,fixed:true, width: 100},
            {name: 'spec', index: 'spec', sortable: false,fixed:true, width: 120},
            {name: 'unit_name', index: 'unit_name',fixed:true, width: 60},
            {name: 'qc_level_name', index: 'qc_level_name', sortable: false,fixed:true, width: 60},

        ],
        autowidth: true,
        height: 300,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: "#scmInDialogLeftGridPager",


    });

    $("#scmInDialogRightGrid").jqGrid({

        datatype: "local",
        // 다중 select
        multiselect: true,
        // 타이틀
        caption: "입고등록 | MES",
        colNames: ['품번', '품명', '규격', '단위', '검사등급', 'lot_no', '입고수량', '패킹수', '수량등록','발주확인','발주체크'],
        colModel: [
            {name: 'part_code', key: true, index: 'part_code', width: 80, sortable: false,fixed:true},
            {name: 'part_name', index: 'part_name', width: 100, sortable: false,fixed:true},
            {name: 'spec', index: 'spec', width: 120, sortable: false,fixed:true},
            {name: 'unit_name', index: 'unit_name', width: 60,fixed:true},
            {name: 'qc_level_name', index: 'qc_level_name', width: 60, sortable: false,fixed:true},
            {name: 'lot', index: 'lot', width: 80, sortable: false,fixed:true},
            {name: 'qty', index: 'qty', width: 100, sortable: false, align: 'right',formatter:'number',fixed:true},
            {name: 'pack_qty', index: 'pack_qty', width: 50, sortable: false, align: 'right',formatter:'integer',fixed:true},
            {name: 'button', index: 'button', width: 60, formatter: qtyButton, sortable: false,fixed:true},
            {name: 'button2', index: 'button2', width: 60, formatter: orderButton, sortable: false,fixed:true},
            {name: 'ord_check', index: 'ord_check', width: 60,  sortable: false, formatter:formatter_check,fixed:true}

            // {name: 'in_pty', index: 'in_pty', width: 60
            //     editoptions: {
            //
            //         dataEvents: [
            //             {
            //                 type: 'focusout',
            //                 fn: function (e) {
            //                     var row = $(e.target).closest('tr.jqgrow');
            //                     var rowid = row.attr('id');
            //                     var value = e.target.value;
            //                     if (isNaN(value)){
            //                         e.target.value = '';
            //                     }
            //                     if (rowid !== lastsel) {
            //                         $("#scmInDialogRightGrid").jqGrid('saveRow', lastsel,false,'clientArray');
            //                     }
            //                     // if ($("#"+lastsel+"_in_pty").val() !== '' && $("#"+lastsel+"_bad_pty").val() !== '') {
            //                     //     $("#scmInDialogRightGrid").jqGrid('saveRow', lastsel,false,'clientArray');
            //                     // }
            //
            //
            //                 }
            //             }
            //
            //         ]
            //     }
            // },
            // {
            //     name: 'bad_pty', index: 'bad_pty', width: 60, editable: true,
            //     editoptions: {
            //
            //         dataEvents: [
            //             {
            //                 type: 'focusout',
            //                 fn: function (e) {
            //
            //
            //                     var row = $(e.target).closest('tr.jqgrow');
            //                     var rowid = row.attr('id');
            //                     var value = e.target.value;
            //                     if (isNaN(value)){
            //                         e.target.value = '';
            //                     }
            //
            //                     if (rowid !== lastsel) {
            //                         $("#scmInDialogRightGrid").jqGrid('saveRow', lastsel,false,'clientArray');
            //                     }
            //                     // if ($("#"+lastsel+"_in_pty").val() !== '' && $("#"+lastsel+"_bad_pty").val() !== '') {
            //                     //     $("#scmInDialogRightGrid").jqGrid('saveRow', lastsel,false,'clientArray');
            //                     // }
            //
            //
            //                 }
            //             }
            //
            //         ]
            //     }
            // },
        ],
        autowidth: true,
        height: 331,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');

            $myGrid.setRowData(save_rowid2, false, {background:"#FFFFFF"}) ;
            save_rowid2 = rowid;
            $myGrid.setRowData(rowid, false, {background:"rgb(190, 220, 260)"}) ;

            return (cm[i].name === 'cb');
        },
        loadComplete:function(){
            if ($("#scmInDialogRightGrid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#scmInDialogRightGrid tr.jqgfirstrow").css("height","1px");
        },

        onCellSelect: function (rowid, icol, cellcontent, e) {
            // if (icol === 7 || icol === 8) {
            //
            //
            //     if ($("#" + lastsel + "_in_pty").val()) {
            //         if (isNaN($("#" + lastsel + "_in_pty").val())) {
            //             alert("입고 수량은 숫자만 가능합니다.");
            //             return false;
            //         }
            //     }
            //
            //     if ($("#" + lastsel + "_bad_pty").val()) {
            //         if (isNaN($("#" + lastsel + "_bad_pty").val())) {
            //             alert("불량 수량은 숫자만 가능합니다.");
            //             return false;
            //         }
            //     }
            //
            //     if (rowid === lastsel) {
            //         $('#scmInDialogRightGrid').jqGrid('editRow', rowid, true);
            //     }
            //
            //     if (rowid && rowid !== lastsel) {
            //         $('#scmInDialogRightGrid').jqGrid('saveRow', lastsel, false, 'clientArray');
            //         $('#scmInDialogRightGrid').jqGrid('editRow', rowid, {
            //             keys: false
            //         });
            //         lastsel = rowid;
            //         if(icol === 7){
            //             $("#" + lastsel + "_in_pty").focus();
            //         }else if(icol === 8){
            //             $("#" + lastsel + "_bad_pty").focus();
            //         }
            //     }
            // }
        }

    });

}


function qtyButton(cellvalue, options, rowObject) {
    return ' <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" title="" id="showDialog" onclick="modal2_modal_open(\'' + rowObject.part_code + '\')">\n' +
        '                            <span><i class="fa fa-plus bigger-110 blue"></i>\n' +
        '                            <span>추가</span>\n' +
        '                            </span>\n' +
        '                    </a>';

};
function orderButton(cellvalue, options, rowObject) {
    return ' <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" title="" id="showDialog" onclick="modal3_modal_open(\'' + rowObject.part_code + '\')">\n' +
        '                            <span><i class="fa fa-plus bigger-110 blue"></i>\n' +
        '                            <span>추가</span>\n' +
        '                            </span>\n' +
        '                    </a>';

};


function modal_make1() {
    $("#scmIn-add-dialog").dialog({
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

function selectBox_modal1() {
    part_type_select_ajax("#part_type_modal1_select", "/sysPartTypeGet", "part_type_code", "part_type_name",{keyword:''}).then(function (data) {
        $("select#part_type_modal1_select option[value='C']").remove();
        $("select#part_type_modal1_select option[value='B']").remove();


        part_type_select_ajax_all("#part_group_modal1_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name", {keyword: 'D'}).then(function () {
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

function select_change1(value) {
    if (value !== ''){
        ccn_ajax('/sysPartTypeOneGet',{keyword:'',keyword2:value}).then(function (value) {
            for(var i=1; i<=3;i++) {
                group_cb(value,i);
            }
        });

    }
}

function group_cb(value,i) {
    $('#part_group'+i).text(value["part_group"+i]);
    ccn_ajax('/sysPartGroupAllGet',{keyword:value.part_type_code,keyword2:i}).then(function (value1) {
        $('#part_group_select'+i).empty();
        var option = null;
        var allSelect = ($("<option></option>").text("전체").val(""));
        $('#part_group_select'+i).append(allSelect);
        for(var j=0;j<value1.length;j++){
            option = $("<option></option>").text(value1[j].part_grp_name).val(value1[j].part_grp_code);
            $('#part_group_select'+i).append(option);
        }
        $('#part_group_select'+i).select2();
    });
}

var save_rowid2;