var lastsel;
var saverow = 0;
var savecol = 0;

function modal_start1() {
    modal_make1();
    datepicker_modal1();
    selectBox_modal1();
    jqGrid_modal1();
    jqGridResize("#mes_add_grid", $('#mes_add_grid').closest('[class*="col-"]'));
    jqGridResize("#mes_add_grid2", $('#mes_add_grid2').closest('[class*="col-"]'));

}

function get_modal1_btn(page) {
    var data = value_return(".modal_value");
    if (data.keyword6 !== '') {
        $("#mes_add_grid").setGridParam({
            url: "/sysPartSuppGet",
            datatype: "json",
            page: page,
            postData: data
        }).trigger("reloadGrid");
    }else {
        alert("업체를 선택 해주세요");
    }



}


function update_btn(rowid) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value2", []);
        modal_reset(".modal_value", []);
        $("#mes_add_grid").jqGrid('clearGridData');
        $("#mes_add_grid2").jqGrid('clearGridData');
        $("#ord_no").val(rowid);
        main_data.check = 'U';

        ccn_ajax('/scmOrderSub2Get', {keyword: rowid}).then(function (data) {
            $("#part_type_modal1_select").val('D').trigger("change");
            $("select[name=view_amount]").val(data[0].view_amount).trigger("change");
            $("select[name=t_payment]").val(data[0].t_payment).trigger("change");
            $("select[name=t_delivery]").val(data[0].t_delivery).trigger("change");
            $("input[name=delivery]").val(data[0].delivery).trigger("change");
            $("input:radio[name=attachment]:input[value="+data[0].attachment+"]").prop("checked", true);
            $("select[name=shipping_addr]").val(data[0].shipping_addr).trigger("change");
            $("input[name=remark]").val(data[0].remark).trigger("change");
            $("#supp_name_modal").val(data[0].supp_name).trigger("change");
            $("#supp_code_modal").val(data[0].supp_code).trigger("change");
            $("#datepicker3").val(formmatterDate2(data[0].work_date));


            $("#mes_add_grid2").setGridParam({
                datatype: "local",
                data: data
            }).trigger("reloadGrid");

            $("#addDialog").dialog('open');
            jqGridResize2("#mes_add_grid", $('#mes_add_grid').closest('[class*="col-"]'));
            jqGridResize2("#mes_add_grid2", $('#mes_add_grid2').closest('[class*="col-"]'));
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}


function add_modal1_btn() {
    $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
    var gu5 = String.fromCharCode(5);
    var gu4 = String.fromCharCode(4);
    if (main_data.check2 === 'Y') {
        var add_data = value_return(".modal_value2");
        add_data.work_date = add_data.work_date.replace(/\-/g, '');
        add_data.supp_code = add_data.keyword6;
        add_data.attachment = $("input:radio[name=attachment]:checked").val();
        var jdata = $("#mes_add_grid2").getRowData();
        if (jdata.length > 0) {
            var list = [];
            var list2 = [];

            jdata.forEach(function (data, j) {
                if (data.ord_qty !== '' && data.ord_qty > 0 && data.end_date !=='' ) {
                    list.push(data.part_code + gu4 + data.ord_qty+gu4+data.end_date.replace(/\-/g, ''));
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
                        ccn_ajax("/scmOrderAdd", add_data).then(function (data) {
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
                    }
                }
            })
        } else {
            alert("저장 목록을 넣어주세요");
        }
    }
}



function right_modal1_btn() {
    $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
    if (main_data.check2 === 'Y') {

        var ids = $("#mes_add_grid").getGridParam('selarrrow').slice();

        if (ids.length === 0 ){
            alert("옮길 데이터를 선택해주세요");
            return false;
        }


        var ids2 = $("#mes_add_grid2").jqGrid("getDataIDs");

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
                list.push($("#mes_add_grid").getRowData(idsfor));
            }
        });

        callback(function () {
            if (overlap.length !== 0) {
                alert(overlap.join(", ") + " 중복");
            }
            ids2 = $("#mes_add_grid2").getRowData();
            ids2 = ids2.concat(list);

            $('#mes_add_grid2').jqGrid("clearGridData");

            $("#mes_add_grid2").setGridParam({
                datatype: "local",
                data: ids2
            }).trigger("reloadGrid");

            $('#mes_add_grid').jqGrid("resetSelection");
        });
    }
}


function left_modal1_btn() {
    $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
    if (main_data.check2 === 'Y') {
        var ids2 = $("#mes_add_grid2").getGridParam('selarrrow').slice();

        for (var i = 0; i < ids2.length; i++) {
            $('#mes_add_grid2').jqGrid('delRowData', ids2[i]);
        }
        $('#mes_add_grid2').jqGrid("resetSelection");
    }
}





function jqGrid_modal1() {
    $("#mes_add_grid").jqGrid({
        mtype: 'POST',
        datatype: "local",
        // 다중 select
        multiselect: true,
        // 타이틀
        caption: "발주추가 | MES",
        colNames: [ '품번', '품명', '규격', '단위', '검사기준'],
        colModel: [

            {name: 'part_code', index: 'part_code',key:true, sortable: false,fixed:true,width:80},
            {name: 'part_name', index: 'part_name', sortable: false,fixed:true,width:100},
            {name: 'spec', index: 'spec', sortable: false,fixed:true,width:120},
            {name: 'unit_name', index: 'unit_name', sortable: false,fixed:true,width:60},
            {name: 'qc_level_name', index: 'qc_level_name', sortable: false,fixed:true,width:60}
        ],
        // 페이지 수 보기 (1 / 100) = true
        // 높이 : 450px
        autowidth: true,
        height: 406,
        // 디폴트 조회 개수 : 100
        rowNum: 100,
        // 단위 별 조회 개수
        rowList: [100, 200, 300, 500, 1000],
        // pager 세팅
        pager: "#mes_add_grid_pager",
        loadComplete:function(){
            if ($("#mes_add_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_add_grid  tr.jqgfirstrow").css("height","1px");

        }
    });

    $("#mes_add_grid2").jqGrid({

        datatype: "local",
        // 다중 select
        multiselect: true,
        // 타이틀
        caption: "발주추가 | MES",
        colNames: [ '품번', '품명', '규격','도면REV', '단위', '검사기준','발주수량','납기일'],
        colModel: [

            {name: 'part_code', index: 'part_code', width: 80,key:true, sortable: false,fixed:true},
            {name: 'part_name', index: 'part_name', width: 100, sortable: false,fixed:true},
            {name: 'spec', index: 'spec', width: 120, sortable: false,fixed:true},
            {name: '', index: '', width: 150, sortable: false,fixed:true,hidden:true},
            {name: 'unit_name', index: 'unit_name', width: 100, sortable: false,fixed:true},
            {name: 'qc_level_name', index: 'qc_level_name', width: 60, sortable: false,fixed:true},
            {name: 'ord_qty', index: 'ord_qty', width: 100, sortable: false, align: 'right',formatter:'number',fixed:true,
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
                                            $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
                                            return false;
                                        } else if(parseFloat_change(value) <= 0) {
                                            alert("발주수량이 0보다 커야합니다.");
                                            e.target.value = '';
                                            $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
                                            return false;
                                        }
                                        $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
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
                                        $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
                                         return false;
                                    } else if(parseFloat_change(value) <= 0) {
                                        alert("발주수량이 0보다 커야합니다.");
                                        e.target.value = '';
                                        $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);

                                }
                            }

                        ]
                    }
            },
            {name: 'end_date', index: 'end_date', width: 100, sortable: false,formatter: formmatterDate2, editable: true,fixed:true,
                editoptions: {
                    dataInit: function (element) {
                        $(element).attr("readonly","readonly").datepicker({
                            format: 'yyyymmdd',
                            autoclose: true,
                            language:   "kr",
                            widgetPositioning:{
                                horizontal: 'auto',
                                vertical: 'bottom'
                            }

                        }).on('changeDate', function(e) {
                            $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);

                        }).on('hide', function(ev) {
                            $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
                        });
                    }

                }
            }
        ],
        autowidth: true,
        height: 280,
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
        onCellSelect: function (rowid, icol, cellcontent, e) {

        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {
            var data = $('#mes_add_grid2').jqGrid('getRowData', rowid);

            // if (isNaN(data.ord_qty)) {
            //     alert("숫자만 입력가능합니다.");
            //     data.ord_qty = data.ord_qty.replace(/[^\.0-9]/g,'');
            //     $('#mes_add_grid2').jqGrid('setCell', rowid, 'ord_qty', data.ord_qty);
            //
            //     if(parseFloat_change(data.ord_qty) <= 0) {
            //         alert("발주수량이 0보다 커야합니다.");
            //         $('#mes_add_grid2').jqGrid('setCell', rowid, 'ord_qty', '');
            //         $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
            //         return false;
            //     }else {
            //         $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
            //     }
            //     return false;
            // }else if(parseFloat_change(data.ord_qty) <= 0) {
            //         alert("발주수량이 0보다 커야합니다.");
            //         $('#mes_add_grid2').jqGrid('setCell', rowid, 'ord_qty', '');
            //     $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
            //         return false;
            //     }





        },
        loadComplete:function(){
            if ($("#mes_add_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_add_grid2  tr.jqgfirstrow").css("height","1px");

        }
    });

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

                        if (typeof ui_dialog_interaction != "undefined") {
                            return ui_dialog_interaction.apply(this, arguments);
                        } else {
                            return true;
                        }
                    };
                    $.ui.dialog.prototype._allowInteractionRemapped = true;
                } else {
                    $.error("You must upgrade jQuery UI or else.");
                }
            }
        }

    });
}

function datepicker_modal1() {
    datepicker_makes("#datepicker3", 0);

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
    $("#view_select").select2();
    select_data_makes('select[name=t_payment]','/sysCommonAllGet','code_value','code_name1',{keyword:'MT_ORD_PAY'});
    select_data_makes('select[name=t_delivery]','/sysCommonAllGet','code_value','code_name1',{keyword:'MT_ORD_DELIVERY'});
    select_data_makes('select[name=shipping_addr]','/sysCommonAllGet','code_value','code_name1',{keyword:'MT_ORD_SHIPPING'});


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

function select_change1(value) {
    if (value !== ''){
        ccn_ajax('/sysPartTypeOneGet',{keyword:'',keyword2:value}).then(function (value) {
            for(var i=1; i<=3;i++) {
                group_cb(value,i);
            }
        });
    }
}