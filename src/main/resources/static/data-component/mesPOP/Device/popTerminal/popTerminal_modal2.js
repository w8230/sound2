////////////////////////////시작 함수/////////////////////////////////////
function modal_start2() {
    modal_make2();

    jqGrid_modal();
    jqGridResize('#mes_modal_grid', $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
}

////////////////////////////클릭 함수/////////////////////////////////////
function add_btn_modal2() {
    var modal_objact = value_return(".modal_value2");
    if (effectiveness1_modal2(modal_objact)) {
        var text = '저장하겠습니까?';
        if (confirm(text)) {
            ccn_ajax("/popTerminalSubAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    $("#mes_modal_grid").trigger("reloadGrid");
                    // get_btn($("#mes_grid").getGridParam('page'));
                }
                modal_reset(".modal_value2", []);
                $('#terminal_code').val(modal_objact.terminal_code);
                $('#terminal_name').val(modal_objact.terminal_name);
            }).catch(function (err) {
                alert("저장실패");
            });
        }
    }
}

function delete_btn_modal2() {
    var gu5 = String.fromCharCode(5);
    var ids = $("#mes_modal_grid").getGridParam('selarrrow');
    if (ids.length === 0) {
        alert("삭제하는 데이터를 선택해주세요");
    } else {
        if (confirm("삭제하겠습니까?")) {
            main_data.check = 'D';
            wrapWindowByMask2();
            ccn_ajax("/popTerminalSubDel", {terminal_code:$('#terminal_code').val(),keyword:ids.join(gu5)}).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    $("#mes_modal_grid").trigger("reloadGrid");
                }
                closeWindowByMask();
            }).catch(function (err) {
                closeWindowByMask();
                console.error(err); // Error 출력
            });
        }
    }
}

function close_modal2() {
    $('#addDialog2').dialog('close');
}
////////////////////////////호출 함수/////////////////////////////////////
function modal_make2() {

    $("#addDialog2").dialog({
        modal: true,
        width: 800,
        height: 'auto',
        autoOpen: false,
        resizable: false,
    })
}

function jqGrid_modal() {
    $('#mes_modal_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['세부코드','세부내용','적용값'],
        colModel: [
            {name: 'item_code', index: 'item_code', key: true, sortable: false,fixed:true,width:200},
            {name: 'item_name', index: 'item_name', sortable: false,fixed:true,width:400},
            {name: 'item_value', index: 'item_value', sortable: false,fixed:true,width:200}
        ],
        caption: "공정마스터세부항목추가 | MES",
        width: 300,
        height: 300,
        viewrecords: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        loadComplete:function(){
            if ($("#mes_modal_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_modal_grid  tr.jqgfirstrow").css("height","1px");

        }

    });
}

function effectiveness1_modal2(modal_objact) {
    if (modal_objact.item_code === '') {
        alert("세부코드를 선택해주세요");
        return false;
    }
    else if (modal_objact.item_name === '') {
        alert("세부내용을 입력해주세요");
        return false;
    } else if (modal_objact.item_value === '') {
        alert("적용값을 입력해주세요");
        return false;
    } else {
        return true;
    }
}