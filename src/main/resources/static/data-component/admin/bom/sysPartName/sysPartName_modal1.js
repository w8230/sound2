////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    selectBox_modal1();
    modal_make1();
}

////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    modal_objact.keyword = main_data.check;
    modal_objact.center_wire_code = parseInt(parseFloat(modal_objact.center_wire)*10,10);
    modal_objact.frequency_code = parseInt(modal_objact.frequency,10);
    modal_objact.part_name = String( modal_objact.center_wire_code)+modal_objact.jacket+String(modal_objact.frequency_code)+modal_objact.prod_type1+modal_objact.center_wire1;
    modal_objact.part_type = main_data.send_data.keyword;
    modal_objact.part_group1 = main_data.send_data.keyword2;
    modal_objact.part_group2 = main_data.send_data.keyword3;
    console.log(modal_objact);

    if (effectiveness1(modal_objact)) {
        var text = '저장하겠습니까?';
        if (main_data.check === "U") {
            text = '수정하겠습니까?';
        }
        if (confirm(text)) {
            modal_objact.keyword = main_data.check;
            console.log(modal_objact);

            ccn_ajax("/sysPartNameAdd", modal_objact).then(function (data) {
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
function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.series === '') {
        alert("시리즈를 입력해주세요");
        return false;
    } else if (modal_objact.center_wire === '') {
        alert("Center Wire(Ø)를 입력해주세요");
        return false;
    }  else if (modal_objact.frequency === '') {
        alert("규격_1(GH_z)를 입력해주세요");
        return false;
    } else {
        return true;
    }
}

function selectBox_modal1() {
    select_data_makes('#prod_type1_select','/sysPartNameGroupAllGet','code_name1','code_name2',{keyword:'PROD_TYPE1',keyword2:'CODE'});
    select_data_makes('#prod_jacket_select','/sysPartNameGroupAllGet','code_name1','code_name2',{keyword:'PROD_JACKET',keyword2:'CODE'});
    select_data_makes('#prod_center_conductor','/sysPartNameGroupAllGet','code_name1','code_name2',{keyword:'PROD_CENTER_CONDUCTOR',keyword2:'CODE'});
    select_data_makes('#route_select','/popRouteGroupAllGet','route_code','route_name',{keyword:'1'});
}

function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 400,
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
