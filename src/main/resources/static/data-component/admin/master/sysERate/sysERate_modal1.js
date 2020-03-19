////////////////////////////시작 함수/////////////////////////////////////

function modal_start1() {
    modal_make1();
    datepickerInput_modal1();
    selectBox_modal1();
}

////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    modal_objact.start_date = modal_objact.start_date.replace(/\-/g, '');
    modal_objact.stop_date = modal_objact.stop_date.replace(/\-/g, '');

    if (effectiveness1(modal_objact)) {
        var text = '저장하겠습니까?';
        if (main_data.check === "U") {
            text = '수정하겠습니까?';
        }
        if (confirm(text)) {

            modal_objact.keyword = main_data.check;

            ccn_ajax("/sysERateAdd", modal_objact).then(function (data) {
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
    datepicker_makes("#datepicker3", -1);
    datepicker_makes("#datepicker4", 0);
}

function selectBox_modal1() {
    $('#use_yn').select2();
}

//모달생성
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
// 유효성 검사
function effectiveness1(modal_objact) {
    if (modal_objact.currecy_name === '') {
        alert("화폐단위 를 입력해주세요");
        return false;
    } else if (modal_objact.start_date === '') {
        alert("시작일를 입력해주세요");
        return false;
    } else if (modal_objact.stop_date === '') {
        alert("종료일을 입력해주세요");
        return false;
    }else if (modal_objact.currency_unit === '') {
        alert("단위를 입력해주세요");
        return false;
    }else if (modal_objact.exch_rate === '') {
        alert("환율을 입력해주세요");
        return false;
    } else {
        return true;
    }
}