////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    selectBox_modal1();
    datepickerInput_modal1();
}

////////////////////////////클릭 함수/////////////////////////////////////
function select_change1_modal1(value) {
    if(main_data.check != 'U'){
        if(value =='' || value == null){
            $('#part_prod_select_modal1').empty();
            $('#part_name_select_modal1').empty();
        }else {
            part_type_select_ajax('#part_prod_select_modal1', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:'B', keyword2:value}).then(function (data2){
                console.log(data2);
                part_type_select_ajax('#part_name_select_modal1', "/sysPartNameAllGet","part_code" ,"part_name",{keyword:'B', keyword2:value, keyword3:data2[0].part_grp_code2})
            }).catch(function (err){
                $('#part_prod_select_modal1').empty();
                $('#part_name_select_modal1').empty();
            });
        }
    }
}
function select_change2_modal1(value) {
    if(main_data.check != 'U'){

        if(value =='' || value == null){
            $('#part_name_select_modal1').empty();
        }else {
            part_type_select_ajax('#part_name_select_modal1', "/sysPartNameAllGet","part_code" ,"part_name",{keyword:'B', keyword2:$('#part_group_select_modal1').val(), keyword3:value}).catch(function (err){
                $('#part_name_select_modal1').empty();
            });
        }
    }

}
function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    modal_objact.plan_date = modal_objact.plan_date.replace(/\-/g, '');
    modal_objact.end_date = modal_objact.end_date.replace(/\-/g, '');
    modal_objact.keyword = main_data.check;
    console.log(modal_objact);
    if (effectiveness1(modal_objact)) {
        var text = '저장하겠습니까?';

        if (main_data.check === "U" && (modal_objact.status === '1' || modal_objact.status === '0')) {
            text = '수정하겠습니까?';
        }
        if (confirm(text)) {
            modal_objact.keyword = main_data.check;
            ccn_ajax("/popPlan1Add", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        get_btn(1);
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page'));
                    }
                }
                $("#addDialog").dialog('close');
            }).catch(function (err) {
                alert("저장실패");
            });
        }
    }
}

////////////////////////////호출 함수/////////////////////////////////////
function datepickerInput_modal1() {
    datepicker_makes("#datepicker3", 0);
    datepicker_makes("#datepicker4", 1);
}

function selectBox_modal1() {
    part_type_select_ajax("#part_group_select_modal1", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name", {keyword: 'B'}).then(function (data) {
        part_type_select_ajax('#part_prod_select_modal1', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:'B', keyword2:data[0].part_grp_code}).then(function (data2){
            part_type_select_ajax('#part_name_select_modal1', "/sysPartNameAllGet","part_code" ,"part_name",{keyword:'B', keyword2:data[0].part_grp_code, keyword3:data2[0].part_grp_code2})
        });
    });

    $('#prod_type_select').select2();
    part_type_select_ajax('#prod_dept_select',"/sysCommonAllGet",'code_value','code_name1',{keyword:'PROD_DEPT'});
}

function effectiveness1(modal_objact) { // 유효성 검사
    return true;
}

function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: '저장',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    addUdate_btn();
                }
            },
            {
                text: '취소',
                'class': 'btn btn-minier',
                click: function () {
                    $(this).dialog('close');
                }
            }
        ],
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
