
////////////////////////////시작 함수/////////////////////////////////////
function modal_start2() {
    modal_make2();
    selectBox_modal2();
}


////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn2() {
    var modal_objact = value_return(".modal_value2");
    if (effectiveness2(modal_objact)) {
        var text = '저장하겠습니까?';
        if (main_data.check === "U") {
            text = '수정하겠습니까?';
        }
        if (confirm(text)) {
            modal_objact.keyword = main_data.check;
            modal_objact.route_type = main_data.condition_check;
            modal_objact.line_code2 = '';
            modal_objact.line_code3 = '';
            modal_objact.line_code4 = '';
            modal_objact.line_code5 = '';
            modal_objact.line_code6 = '';
            modal_objact.line_code7 = '';
            modal_objact.line_code8 = '';
            ccn_ajax("/popRouteAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        get_btn(1);
                    } else {
                        get_btn($("#mes_grid").getGridParam('page'));
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

function selectBox_modal2() {
    select_makes_sub("#line_select1_2", "/getLine", "line_code", "line_name",{keyword:'2'},'N');

}


function modal_make2() {
    $("#addDialog2").dialog({
        autoOpen:false,
        modal: true,
        width: 'auto',
        height: 'auto',
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

function effectiveness2(modal_objact) { // 유효성 검사
    if (modal_objact.route_code === '') {
        alert("라우팅코드를 입력해주세요");
        return false;
    }
    else if (modal_objact.route_name === '') {
        alert("라우팅명을 입력해주세요");
        return false;
    } else {
        return true;
    }
}


