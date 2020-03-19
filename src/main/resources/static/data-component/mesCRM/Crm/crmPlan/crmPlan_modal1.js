////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    selectBoxModal();

}

////////////////////////////클릭 함수/////////////////////////////////////
function select_change1(value) {
    //select_makes_sub("#partGrp_select","/sysBPartGroupSelectGet","part_grp_code","part_grp_name",{keyword:value},"N");
}

function  partModal_bus(rowid,name) {
    modal_reset(".part_value", []);
    $("#part_name_modal").val(name);
    $("#part_code_modal").val(rowid);
    ccn_ajax("/wmsStockTotalOneGet", {keyword2:rowid}).then(function (data) {
           $("#stock_qty").val(data.qty);
    });

}

function part_btn() {
    $("#partSearchGrid").jqGrid('clearGridData');
    $("#part-search-dialog").dialog('open');
    jqGridResize2("#partSearchGrid", $('#partSearchGrid').closest('[class*="col-"]'));
}

function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    if (effectiveness1(modal_objact)) {
        var text = '저장하겠습니까?';
        if (main_data.check === "U") {
            text = '수정하겠습니까?';
        }
        if (confirm(text)) {

            modal_objact.keyword = main_data.check;

            ccn_ajax("/crmPlanAdd", modal_objact).then(function (data) {
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
function selectBoxModal() {
    // select_makes2("#gubun_select", "/getPartType", "part_type_code", "part_type_name").then(function (data) {
    //     select_makes_sub("#partGrp_select","/sysBPartGroupSelectGet","part_grp_code","part_grp_name",{keyword:data},"N");
    // });

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
        ]
    })
}

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.part_code === '') {
        alert("제품을 선택해주세요");
        return false;
    } else if (modal_objact.stock_qty === '') {
        alert("제품을 선택해주세요");
        return false;
    } else if (modal_objact.month1_plan1 === '') {
        alert("확정을 입력해주세요");
        return false;
    } else if (modal_objact.month2_plan1 === '') {
        alert("확정을 입력해주세요");
        return false;
    } else if (modal_objact.month3_plan1 === '') {
        alert("확정을 입력해주세요");
        return false;
    } else if (modal_objact.month1_plan2 === '') {
        alert("협의를 입력해주세요");
        return false;
    } else if (modal_objact.month2_plan2 === '') {
        alert("협의를 입력해주세요");
        return false;
    } else if (modal_objact.month3_plan2 === '') {
        alert("협의를 입력해주세요");
        return false;
    } else if (modal_objact.month1_plan3 === '') {
        alert("예상을 입력해주세요");
        return false;
    } else if (modal_objact.month2_plan3 === '') {
        alert("예상을 입력해주세요");
        return false;
    } else if (modal_objact.month3_plan3 === '') {
        alert("예상을 입력해주세요");
        return false;
    }else {
        return true;
    }
}