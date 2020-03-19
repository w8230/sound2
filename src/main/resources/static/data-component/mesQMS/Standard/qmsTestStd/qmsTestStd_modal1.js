////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
}

////////////////////////////클릭 함수/////////////////////////////////////


function addUdate_btn() {
    var send_data = value_return(".modal_value");
    send_data.part_grp_code = $('#gubun_select2').val();
    var text = '저장하겠습니까?';
    if (main_data.check === "U") {
        text = '수정하겠습니까?';
    }
    send_data.keyword = main_data.check;

    if (confirm(text)) {
        var options = {
            data: send_data,
            success: function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === 'I') {
                        get_btn(1);
                    } else {
                        get_btn_post($('#mes_grid').getGridParam('page'));
                    }
                    $('#addDialog').dialog('close');
                }
            },
            type: 'POST'
        };
        $('#qmsTestStd').ajaxSubmit(options);
    }


    // var modal_objact = value_return(".modal_value");
    // modal_objact.part_grp_code = $('#gubun_select2').val();
    // var text = '저장하겠습니까?';
    // if (main_data.check === "U") {
    //     text = '수정하겠습니까?';
    // }
    // if (confirm(text)) {
    //
    //     modal_objact.keyword = main_data.check;
    //
    //     ccn_ajax("/qmsTestStdAdd", modal_objact).then(function (data) {
    //         if (data.result === 'NG') {
    //             alert(data.message);
    //         } else {
    //             if (main_data.check === "I") {
    //                 get_btn(1);
    //             } else {
    //                 get_btn_post($("#mes_grid").getGridParam('page'));
    //             }
    //         }
    //         $("#addDialog").dialog('close');
    //     }).catch(function (err) {
    //         alert("저장실패");
    //     });
    // }
}


function  partModal_bus(rowid,name) {
    modal_reset(".part_value", []);
    $("#part_name_modal").val(name);
    $("#part_code_modal").val(rowid);
}

function part_btn() {
    $("#partSearchGrid").jqGrid('clearGridData');
    $("#part_type_select_modal  option:eq(0)").prop("selected", true).trigger("change");
    part_gu = 'Y';
    $("#part-search-dialog").dialog('open');
    jqGridResize2("#partSearchGrid", $('#partSearchGrid').closest('[class*="col-"]'));
}

////////////////////////////호출 함수/////////////////////////////////////


function modal_make1() {

    $("#addDialog").dialog({
        modal: true,
        width: '350px',
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
        ]
    })
}

