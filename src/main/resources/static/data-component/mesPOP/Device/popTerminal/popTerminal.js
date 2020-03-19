/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: ['terminal_code'],
    auth:{}
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    modal_start1();
    modal_start2();
    authcheck();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////
// 조회버튼
function get_btn(page) {

    main_data.send_data_post = main_data.send_data; // 수정 삭제시 다시 조회하기 위한 데이터저장

    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/popTerminalGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function add_btn() {
    if(main_data.auth.check_add != "N") {
        modal_reset(".modal_value", main_data.readonly);
        main_data.check = 'I';
        $("#addDialog").dialog('open');
    } else {
        alert("추가권한이 없습니다.");
    }
}

function sub_add_btn(rowid) {
    modal_reset(".modal_value2",[]);

    ccn_ajax('/popTerminalOneGet', {keyword:rowid}).then(function (data) {
        modal_edits('.modal_value2',[],data);
        return rowid;

    }).then(function (value) {
        $("#mes_modal_grid").setGridParam({ // 그리드 조회
            url: '/popTerminalSubGet',
            datatype: "json",
            postData: {keyword:rowid}
        }).trigger("reloadGrid");
        $("#addDialog2").dialog('open');
        jqGridResize2('#mes_modal_grid', $('#mes_modal_grid').closest('[class*="col-"]'));
    }) ;

}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", main_data.readonly);
        main_data.check = 'U';
        var send_data = {};
        send_data.keyword = jqgrid_data.terminal_code;
        ccn_ajax('/popTerminalOneGet', send_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#addDialog").dialog('open');
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}


function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                main_data.check = 'D';
                wrapWindowByMask2();
                ccn_ajax("/popTerminalDel", {keyword:ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn($("#mes_grid").getGridParam('page'));
                    }
                    closeWindowByMask();
                }).catch(function (err) {
                    closeWindowByMask();
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert("삭제권한이 없습니다.");
    }
}
////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popTerminal"}).then(function (data) {
        main_data.auth = data;
    });
}

function subBtn(cellvalue, options, rowObject) {
    return ' <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" title="" onclick="sub_add_btn('+'\''+rowObject.terminal_code+'\''+')">\n' +
        '                            <span><i class="fa fa-plus bigger-110 blue"></i>\n' +
        '                            <span>추가</span>\n' +
        '                            </span>\n' +
        '                    </a>';
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({

        datatype: "local",
        mtype: 'POST',
        colNames: ['단말기코드','단말기명','컴퓨터명','화면X','화면Y','바코드양식','등록자','등록일시','세부항목'],
        colModel: [
            {name: 'terminal_code', index: 'terminal_code', key: true, sortable: false, width: 150,fixed:true},
            {name: 'terminal_name', index: 'terminal_name', sortable: false, width: 150,fixed:true},
            {name: 'pc_name', index: 'pc_name', sortable: false, width: 150,fixed:true},
            {name: 'screen_x', index: 'screen_x', sortable: false, width: 100,fixed:true,align:'right'},
            {name: 'screen_y', index: 'screen_y', sortable: false, width: 100,fixed:true,align:'right'},
            {name: 'bcr_form_code', index: 'bcr_form_code', sortable: false, width: 150,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true},
            {name: 'update_date', index: 'update_date', width: 180, sortable: false, formatter: formmatterDate,fixed:true},
            {name: '', index: '', sortable: false, formatter: subBtn,width: 60,fixed:true}
        ],
        caption: "공정마스터관리 | MES",
        autowidth: true,
        height: 600,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}
