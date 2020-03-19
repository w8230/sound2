/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [''],
    auth:{}
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    jqGridResize('#mes_grid2', $('#mes_grid2').closest('[class*="col-"]'));
    selectBox();
    authcheck();
    jqgridPagerIcons();
    common_get(1);
});


////////////////////////////클릭 함수//////////////////////////////////

// 조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // 해당 클래스명을 가진 항목의 name에 맞도록 객체 생성
    main_data.send_data_post = main_data.send_data; // 수정,삭제 시 다시 조회하기 위한 데이터 저장
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/popErrorTypeGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 수정 삭제 시 호출하는 조회
function get_btn_post(page) {
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/popErrorTypeGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}


function add_btn() {
    if (main_data.auth.check_add !="N") {
        var gu5 = String.fromCharCode(5);
       var data = value_return(".condition_main");
       var ids = $("#mes_grid2").getGridParam('selarrrow').slice();
        if (ids.length === 0 ){
            alert("옮길 데이터를 선택해주세요");
            return false;
        }else {
            var send_data = {};
            send_data.line_code = data.keyword;
            send_data.keyword = ids.join(gu5);

            var text = '저장하겠습니까?';

            if (confirm(text)) {
                ccn_ajax("/popErrorTypeAdd", send_data).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn(1);
                        $("#mes_grid2").trigger("reloadGrid");
                    }

                }).catch(function (err) {
                    alert("저장실패");
                });
            }
        }
    } else {
        alert("추가권한이 없습니다,");
    }
}

// 삭제 버튼
function delete_btn() {
    if (main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                main_data.check = 'D';
                var line_code = $('#mes_grid').jqGrid('getRowData', ids[0]).line_code;
                wrapWindowByMask2();
                ccn_ajax("/popErrorTypeDel", {line_code:line_code,keyword: ids.join(gu5)}).then(function (data) {
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
    ccn_ajax("/menuAuthGet", {keyword: "popErrorType"}).then(function (data) {
        main_data.auth = data;
    });
}


function common_get(page) {
    $("#mes_grid2").setGridParam({ // 그리드 조회
        url: '/sysCommonGet',
        datatype: "json",
        page: page,
        postData: {keyword:'LINE_ERROR',keyword2:'Y'}
    }).trigger("reloadGrid");
}


function selectBox() {
    select_data_makes("#line_select", "/sysProdLineAllGet", "line_code", "line_name",{keyword:''});
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['line_code','공정', '불량코드', '불량명'],
        colModel: [
            {name: 'line_code', index: 'line_code',hidden:true, sortable: false},
            {name: 'line_name', index: 'line_name', sortable: false, width: 200,fixed:true},
            {name: 'error_code', index: 'error_code',key:true, sortable: false, width: 200,fixed:true},
            {name: 'error_name', index: 'error_name', sortable: false, width: 200,fixed:true}
        ],
        caption: "공정별불량유형관리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});

    $('#mes_grid2').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['불량코드', '불량명'],
        colModel: [
            {name: 'code_value', index: 'code_value', key: true, sortable: false, width: 200,fixed:true},
            {name: 'code_name1', index: 'code_name1', sortable: false, width: 200,fixed:true}
        ],
        caption: "공정별불량유형관리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid2_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true,
        loadComplete:function(){
            if ($("#mes_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid2_pager', {search: false, add: false, edit: false, del: false});
}
