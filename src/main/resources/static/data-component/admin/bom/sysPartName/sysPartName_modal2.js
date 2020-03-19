////////////////////////////시작 함수/////////////////////////////////////
function modal_start2() {
    selectBox_modal2();
    modal_make2();
}

////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn2() {
    var modal_objact = value_return(".modal_value2");
    modal_objact.keyword = main_data.check;
    modal_objact.part_type = main_data.send_data.keyword;
    modal_objact.part_group1 = main_data.send_data.keyword2;
    modal_objact.part_group2 = main_data.send_data.keyword3;

    if (effectiveness2(modal_objact)) {
        var text = '저장하겠습니까?';
        if (main_data.check === "U") {
            text = '수정하겠습니까?';
        }
        if (confirm(text)) {
            modal_objact.keyword = main_data.check;
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
                $("#addDialog2").dialog('close');
            }).catch(function (err) {
                alert("저장실패");
            });
        }
    }
}
////////////////////////////호출 함수/////////////////////////////////////
function effectiveness2(modal_objact) { // 유효성 검사
    if (modal_objact.part_name === '') {
        alert("제품명을 입력해주세요");
        return false;
    }  else if (modal_objact.frequency === '') {
        alert("규격을 입력해주세요");
        return false;
    } else {
        return true;
    }
}

function selectBox_modal2() {
    select_data_makes('#route_select2','/popRouteGroupAllGet','route_code','route_name',{keyword:'1'});
}

function modal_make2() {
    $("#addDialog2").dialog({
        modal: true,
        width: 300,
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: '저장',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    addUdate_btn2();
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
