////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
}

////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    if ($("#screen_x").val() === "") {
        $('#scrren_x').val(0);
    }
    if ($("#screen_y").val() === "") {
        $('#scrren_y').val(0);
    }


    var modal_objact = value_return(".modal_value");
    if (effectiveness1(modal_objact)) {
        var text = '저장하겠습니까?';
        if (main_data.check === "U") {
            text = '수정하겠습니까?';
        }
        if (confirm(text)) {
            modal_objact.keyword = main_data.check;
            ccn_ajax("/popTerminalAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        get_btn(1);
                    } else {
                        get_btn($("#mes_grid").getGridParam('page'));
                    }
                }
                $("#addDialog").dialog('close');
            }).catch(function (err) {
                alert("저장실패");
            });
        }
    }
}
function inputIntChange_x() {
    if ($("#screen_x").val() !== ""){

        $("#screen_x").val($("#screen_x").val().replace(/[^0-9]/g,''));
    }
}

function inputIntChange_y() {
    if ($("#screen_y").val() !== ""){

        $("#screen_y").val($("#screen_y").val().replace(/[^0-9]/g,''));
    }
}

////////////////////////////호출 함수/////////////////////////////////////
function modal_make1() {

    $("#addDialog").dialog({
        modal: true,
        width: 800,
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

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.terminal_code === '') {
        alert("단말기코드를 선택해주세요");
        return false;
    }
    else if (modal_objact.terminal_name === '') {
        alert("단말기명을 입력해주세요");
        return false;
    } else {

        return true;
    }
}