var modal_data = {
    supp_check: 'A',
};
////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    selectBox_modal1();
}

////////////////////////////클릭 함수/////////////////////////////////////


function addUdate_btn() {
    if ($("#max_qty").val() === ""){
        $("#max_qty").val(0);
    }
    if ($("#min_qty").val() === ""){
        $("#min_qty").val(0);
    }
    if ($("#ord_qty").val() === ""){
        $("#ord_qty").val(0);
    }

    var modal_objact = value_return(".modal_value");
    console.log(modal_objact);
    if (effectiveness1(modal_objact)) {
        var text = '저장하겠습니까?';
        if (main_data.check === "U") {
            text = '수정하겠습니까?';
        }
        if (confirm(text)) {

            modal_objact.part_type = main_data.condition_data.keyword;
            modal_objact.part_group1 = main_data.condition_data.keyword2;
            modal_objact.part_group2 = main_data.condition_data.keyword3;
            modal_objact.keyword = main_data.check;
            ccn_ajax("/sysPartAdd", modal_objact).then(function (data) {
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
    })
}

function selectBox_modal1() {
    select_makes_base("#modal_part_type_select", "/sysPartTypeGet", "part_type", "part_type_name",{keyword:'1'},'Y').then(function (data) {});
    select_makes_base("#modal_cargo_code_select", "/sysCargoBAllGet", "cargo_code", "cargo_name",{keyword:'',keyword2:''},'N').then(function (data) {
        console.log(data);
        select_makes_base('#modal_loc_code_select','/sysLocAll2Get',"loc_code","loc_name",{keyword:data[1].cargo_code},'N');
     });
    select_makes_base('#modal_unit_code_select','/sysCommonUnitGet','code_value','code_name1',{},'');

    $('#modal_qc_level_select').select2();

}

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.part_type === '') {
        alert("구분을 선택해주세요");
        return false;
    }else if (modal_objact.part_group1 === '') {
        alert("part_group1 을 선택해주세요");
        return false;
    }else if (modal_objact.part_group2 === '') {
        alert("part_group2 을 선택해주세요");
        return false;
    }   else if (modal_objact.part_name === '') {
        alert("품목명을 선택해주세요");
        return false;
    } else {
        return true;
    }
}