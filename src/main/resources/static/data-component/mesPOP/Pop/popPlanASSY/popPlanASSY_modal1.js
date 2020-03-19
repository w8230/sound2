////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    datepickerInput_modal1();
    selectBox_modal1();
}

////////////////////////////클릭 함수/////////////////////////////////////
function select_change1_modal1(value) {
    if(main_data.check=='I'){
        if(value != null && value != '') {
            part_type_select_ajax("#part_prod_select_modal1", "/sysPartGroup2AllGet", "part_grp_code2", "part_grp_name2", {keyword: 'B', keyword2: value}).then(function (value2) {

                if($('#part_prod_select').val() !=''&& $('#part_prod_select').val() != null){
                    $('#part_prod_select_modal1').val($('#part_prod_select').val()).trigger("change");
                }else {
                    $('#part_prod_select_modal1 option:eq(0)').prop("selected", true).trigger("change");

                }


            }).catch(function (err){
                $('#part_prod_select_modal1').empty();
                $('#part_name_select_modal1').empty();
                $('#part_code1_select_modal1').empty();
                $('#part_code2_select_modal1').empty();
            });
        }
    }
}
function select_change2_modal1(value) {
    if(main_data.check=='I'){
        if(value != null && value != ''){
            part_type_select_ajax("#part_name_select_modal1", "/sysPartNameAllGet", "part_code", "part_name", {keyword: 'B', keyword2: $('#part_group_select_modal1').val(), keyword3: value}).then(function(value2){
                part_type_select_ajax("#part_code1_select_modal1", "/crmAssyCableAllGet", "part_code", "part_name", {keyword:value2[0].part_code});
                part_type_select_ajax("#part_code2_select_modal1", "/crmAssyCableAllGet", "part_code", "part_name", {keyword:value2[0].part_code});
            }).catch(function (err){
                $('#part_code1_select_modal1').empty();
                $('#part_code2_select_modal1').empty();
            });
        }
    }
}

function select_change3_modal1(value) {
    if(main_data.check == 'I'){
        if (value != null && value != '') {
            part_type_select_ajax("#part_code1_select_modal1", "/crmAssyCableAllGet", "part_code", "part_name", {keyword: value}).catch(function (err){
                $('#part_code1_select_modal1').empty();
            });;
            part_type_select_ajax("#part_code2_select_modal1", "/crmAssyCableAllGet", "part_code", "part_name", {keyword: value}).catch(function (err){
                $('#part_code2_select_modal1').empty();
            });;
        }
    }

}

function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    modal_objact.plan_date = modal_objact.plan_date.replace(/\-/g, '');
    modal_objact.end_date = modal_objact.end_date.replace(/\-/g, '');
    modal_objact.keyword = main_data.check;
    modal_objact.part_name = $('#part_name_select_modal1 option:checked').text();

    console.log(modal_objact);
    if (effectiveness1(modal_objact)) {
        var text = '저장하겠습니까?';

        if (main_data.check === "U") {
            text = '수정하겠습니까?';
        }
        if (confirm(text)) {
            modal_objact.keyword = main_data.check;
            ccn_ajax("/popPlanASSYAdd", modal_objact).then(function (data) {
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


function effectiveness1(modal_objact) { // 유효성 검사
    // if (modal_objact. === '') {
    //     alert(" 입력해주세요");
    //     return false;
    // } else if (modal_objact. === '') {
    //     alert(" 입력해주세요");
    //     return false;
    // } else {
    return true;
    // }
}

function selectBox_modal1(){
    $('#prod_type_select').select2();
    part_type_select_ajax("#part_group_select_modal1", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name", {keyword: 'B'}).then(function(data2){
        part_type_select_ajax("#part_prod_select_modal1", "/sysPartGroup2AllGet", "part_grp_code2", "part_grp_name2", {keyword: 'B', keyword2:data2[0].part_grp_code}).then(function(data3) {
            part_type_select_ajax("#part_name_select_modal1", "/sysPartNameAllGet", "part_code", "part_name", {keyword: 'B', keyword2: data2[0].part_grp_code, keyword3: data3[0].part_grp_code2}).then(function(data4){
                part_type_select_ajax("#part_code1_select_modal1", "/crmAssyCableAllGet", "part_code", "part_name", {keyword:data4.part_code});
                part_type_select_ajax("#part_code2_select_modal1", "/crmAssyCableAllGet", "part_code", "part_name", {keyword:data4.part_code});
            }).catch(function (err){
                $('#part_code1_select_modal1').empty();
                $('#part_code2_select_modal1').empty();
            });
        }).catch(function (err){
            $('#part_name_select_modal1').empty();
            $('#part_code1_select_modal1').empty();
            $('#part_code2_select_modal1').empty();
        });
    }).catch(function (err){
        $('#part_prod_select_modal1').empty();
        $('#part_name_select_modal1').empty();
        $('#part_code1_select_modal1').empty();
        $('#part_code2_select_modal1').empty();
    });
    select_makes('#unit_select_modal1','/sysCommonUnitGet','code_value','code_name1'    );
    select_makes_sub('#prod_dept_select_modal1',"/sysCommonAllGet",'code_value','code_name1',{keyword:'PROD_DEPT'},'N');
    select_makes_sub('#line_user_select_modal1','/popLineUserAllGet','user_code','user_name',{keyword:'L2000'},'N');
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
