/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////


var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly:['supp_code'],
    auth:{}
}


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    selectBox();
    modal_start1();
    authcheck();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data_post = main_data.send_data;
    console.log(main_data.send_data);
    $("#mes_grid").setGridParam({
        url: '/sysSuppListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/sysSuppListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly);
        $('#corp_type1').val('Y').trigger('change');
        $('#corp_type2').val('N').trigger('change');
        $('#corp_type3').val('N').trigger('change');
        $('#use_yn').val('Y').trigger('change');

        main_data.check = 'I';
        $("#addDialog").dialog('open');
    } else {
        alert("추가권한이 없습니다,");
    }
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U';
        var send_data = {};
        send_data.keyword = jqgrid_data.supp_code;

        ccn_ajax('/sysSuppOneGet', send_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $('#corp_type1').val(data.corp_type1);
            $('#corp_type2').val(data.corp_type2);
            $('#corp_type3').val(data.corp_type3);
            $("#addDialog").dialog('open');
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}

function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu4 = String.fromCharCode(4);
        var gu5 = String.fromCharCode(5);

        var ids = $("#mes_grid").getGridParam('selarrrow');
        var ids2 = {};
        var list = [];

        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                main_data.check = 'D';
                wrapWindowByMask2();
                for(var i=0;i<ids.length;i++){
                    ids2 = $("#mes_grid").jqGrid('getRowData',ids[i]);
                    list.push(ids2.site_code+gu4+ids2.supp_code);
                }
                ccn_ajax("/sysSuppListDel",{keyword: list.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page'));
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
    ccn_ajax("/menuAuthGet", {keyword: "sysSupp"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    $('#gubun_select').select2();
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['sitecode','업체코드','업체명','대표자','업체명(영문)','사업자번호','전화번호','업태','팩스번호','종목','결재방법','주소','등록자','등록일'],
        colModel: [
            {name: 'site_code',index:'site_code',hidden:true},
            {name: 'supp_code', index: 'supp_code',key:true, width: 150,fixed: true},
            {name: 'supp_name', index: 'supp_name', width: 200,fixed: true},
            {name: 'ceo', index: 'ceo', width: 200,fixed:true},
            {name: 'supp_name_en', index: 'supp_name_en', width: 200,fixed: true},
            {name: 'supp_no', index: 'supp_no', width: 200,fixed: true},
            {name: 'tel_no', index: 'tel_no', width: 150,fixed: true},
            {name: 'buss_type', index: 'buss_type', width: 100,fixed: true},
            {name: 'fax_no', index: 'fax_no', width: 150,fixed: true},
            {name: 'category', index: 'category', width: 100,fixed: true},
            {name: 'give_type', index: 'give_type', width: 100,fixed: true},
            {name: 'address', index: 'address', width: 450,fixed: true},
            {name: 'user_name', index: 'user_name', width: 150,fixed: true},
            {name: 'create_date', index: 'create_date', width: 180, formatter: formmatterDate,fixed: true}
        ],
        caption: "업체코드관리 | MES",
        autowidth: true,
        height: 562,
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
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') == 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

