var modal2_data = {
    part_code: '',
    _this: '',
    qc_qty: 0,
    sub_data: []
}

////////////////////////////시작 함수/////////////////////////////////////
function modal_start2() {
    modal_make2();
}

////////////////////////////클릭 함수/////////////////////////////////////
function update_btn2(rowid, e) {
    $(".modal_value2").val("O");
    $(".modal_sel_value2").val("");

    modal2_data._this = e;
    modal2_data.part_code = rowid;
    var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
    modal2_data.qc_qty = Number(data.qc_qty);

    if ($(modal2_data._this).find(".reportsAdd").text() !== "추가") {
        modal2_edit(rowid);

    }

    $("#addDialog2").dialog('open');
}

function modal2_add_btn() {
    var data = {};
    var data2 = {};
    var data3 = {};
    var list = [];
    data.part_code = modal2_data.part_code;
    for (var i = 0; i < main_data.rpt_list.length; i++) {
        data2 = {};
        data2.qc_code = $("#qc_code" + i).val();
        data2.row = i;
        for (var j = 1; j <= modal2_data.qc_qty && j <= 20; j++) {
            if ($(".qc" + i + "_result" + j).val() === '') {
                alert(j + "번 시리얼을 입력해주세요");
                return false;
            }

            data2["qc_result" + j] = $(".qc" + i + "_result" + j).val();
        }
        list.push(data2);
    }

    var idx;
    idx = findArrayIndex(modal2_data.sub_data, function (item) {
        return item.part_code === data.part_code;
    })


    if (idx !== -1) {
        modal2_data.sub_data.splice(idx, 1);
    }


    data.list = list;
    modal2_data.sub_data.push(data);
    $(modal2_data._this).find(".reportsAdd").text("완료");
    $("#addDialog2").dialog('close');


}

////////////////////////////호출 함수/////////////////////////////////////


function modal2_edit(rowid) {

    var data = {};
    modal2_data.sub_data.forEach(function (s, i) {
        if (s.part_code === rowid) {
            data = s;
        }
    });


    for (var i = 0; i < data.list.length; i++) {
        for (var j = 1; j <= modal2_data.qc_qty; j++) {
            $(".qc" + i + "_result" + j).val(data.list[i]["qc_result" + j]);
        }
    }
}


function modal2_column(data) {
    var div1;
    var div2;
    var div3;

    var input1;
    var main_select = $('<select class="form-control">\n' +
        '                        <option>O</option>\n' +
        '                        <option>X</option>\n' +
        '                        <option>N/A</option>\n' +
        '                    </select>');

    var sub_select;
    data.forEach(function (j, i) {
        $("#modal2_column").append(div1);
        div1 = $(' <div class="profile-info-row"></div>');
        div2 = $('<div class="profile-info-name"></div>').text(j.qc_name);
        input1 = $('<input type="hidden">').attr("id", "qc_code" + (i + 1)).val(j.qc_code);
        div2.append(input1);
        div1.append(div2);
        for (var z = 1; z < 21; z++) {
            div3 = $('<div class="profile-info-value wt-px-75"></div>');
            sub_select = main_select.clone();
            sub_select.addClass("qc" + (i + 1) + "_" + "result" + z).addClass("modal_value2");
            div3.append(sub_select);
            div1.append(div3);
        }
    })

}


function modal_make2() {
    $("#addDialog2").dialog({
        modal: true,
        width: '1900',
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: '등록',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    modal2_add_btn();

                }
            },
            {
                text: '닫기',
                'class': 'btn btn-minier',
                click: function () {
                    $("#addDialog2").dialog('close');
                }
            }
        ]
    });
}