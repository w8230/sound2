var modal2_data = {
    check:'I',
    readonly: ['part_name'],
}

////////////////////////////시작 함수/////////////////////////////////////
function modal_start2() {
    modal_make2();

}

////////////////////////////클릭 함수/////////////////////////////////////

function modal2_get_btn() {
    $("#mes_modal_grid").setGridParam({ // 그리드 조회
        url: '/tpmMCPartAllGet',
        datatype: "json",
        postData: {keyword:$("#machine_code").val()}
    }).trigger("reloadGrid");
}


function modal2_addUdate_btn() {
    var modal_objact = value_return(".modal_value2");
    if (effectiveness2(modal_objact)) {
        var text = '저장하겠습니까?';
        if (modal2_data.check === "U") {
            text = '수정하겠습니까?';
        }
        if (confirm(text)) {

            modal_objact.keyword = modal2_data.check;
            modal_objact.machine_code = $("#machine_code").val();
            ccn_ajax("/tpmMCPartAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    modal2_get_btn(1);
                }
                $("#addDialog2").dialog('close');
            }).catch(function (err) {
                alert("저장실패");
            });
        }
    }
}

function  modal2_update_btn(jqgrid_data) {

    modal_reset(".modal_value2", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거

    modal2_data.check = 'U'; // 수정인지 체크

    ccn_ajax('/tpmMCPartOneGet', {machine_code:$("#machine_code").val(),part_name:jqgrid_data.part_name}).then(function (data) { // user의 하나 출력
        modal_edits('.modal_value2', modal2_data.readonly, data); // response 값 출력

        $("#addDialog2").dialog('open');
    });
}


////////////////////////////호출 함수/////////////////////////////////////


function modal_make2() {

    $("#addDialog2").dialog({
        modal: true,
        width: 400,
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: "저장",
                'id': "addUdate_btn",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    modal2_addUdate_btn();
                }
            },
            {
                text: "취소",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    })
}


function effectiveness2(modal_objact) { // 유효성 검사
    if (modal_objact.part_name === '') {
        alert("품명을 입력해주세요");
        return false;
    } else if (modal_objact.spec === '') {
        alert("규격을 입력해주세요");
        return false;
    }  else if (modal_objact.qty === '') {
        alert("수량을 입력해주세요");
        return false;
    } else if (modal_objact.buy_corp_name === '') {
        alert("구매처를 입력해주세요");
        return false;
    } else if (modal_objact.corp_tel_no === '') {
        alert("연락처를 입력해주세요");
        return false;
    }else {

        return true;
    }
}