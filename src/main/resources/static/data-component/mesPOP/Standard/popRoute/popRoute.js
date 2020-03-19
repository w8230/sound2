/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: ['route_code'],
    auth:{},
    condition_check:'1'
};


var colModel = [
    {name: 'route_type', index: 'route_type', hidden:true,  sortable: false},
    {name: 'route_code', index: 'route_code', key: true, sortable: false, width: 150,fixed:true},
    {name: 'route_name', index: 'route_name', sortable: false, width: 150,fixed:true},
    {name: 'lc1', index: 'lc1', sortable: false, width: 100,fixed:true},
    {name: 'lc2', index: 'lc2', sortable: false, width: 100,fixed:true},
    {name: 'lc3', index: 'lc3', sortable: false, width: 100,fixed:true},
    {name: 'lc4', index: 'lc4', sortable: false, width: 100,fixed:true},
    {name: 'lc5', index: 'lc5', sortable: false, width: 100,fixed:true},
    {name: 'lc6', index: 'lc6', sortable: false, width: 100,fixed:true},
    {name: 'lc7', index: 'lc7', sortable: false, width: 100,fixed:true},
    {name: 'lc8', index: 'lc8', sortable: false, width: 100,fixed:true},
    {name: 'remark', index: 'remark', sortable: false, width: 300,fixed:true},
    {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true},
    {name: 'update_date', index: 'update_date', width: 180, sortable: false, formatter: formmatterDate,fixed:true}
];

var colModel1 = [
    {name: 'route_type', index: 'route_type', hidden:true, sortable: false},
    {name: 'route_code', index: 'route_code', key: true, sortable: false, width: 150,fixed:true},
    {name: 'route_name', index: 'route_name', sortable: false, width: 150,fixed:true},
    {name: 'lc1', index: 'lc1', sortable: false, width: 100,fixed:true},
    {name: 'lc2', index: 'lc2', sortable: false, width: 100,fixed:true},
    {name: 'lc3', index: 'lc3', sortable: false, width: 100,fixed:true},
    {name: 'lc4', index: 'lc4', sortable: false, width: 100,fixed:true},
    {name: 'lc5', index: 'lc5', sortable: false, width: 100,fixed:true},
    {name: 'lc6', index: 'lc6', sortable: false, width: 100,fixed:true},
    {name: 'lc7', index: 'lc7', sortable: false, width: 100,fixed:true},
    {name: 'lc8', index: 'lc8', sortable: false, width: 100,fixed:true},
    {name: 'remark', index: 'remark', sortable: false, width: 300,fixed:true},
    {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true},
    {name: 'update_date', index: 'update_date', width: 180, sortable: false, formatter: formmatterDate,fixed:true}
];


var colModel2 = [
    {name: 'route_type', index: 'route_type', hidden:true, sortable: false},
    {name: 'route_code', index: 'route_code', key: true, sortable: false, width: 150,fixed:true},
    {name: 'route_name', index: 'route_name', sortable: false, width: 150,fixed:true},
    {name: 'lc1', index: 'lc1', sortable: false, width: 100,fixed:true},
    {name: 'remark', index: 'remark', sortable: false, width: 300,fixed:true},
    {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true},
    {name: 'update_date', index: 'update_date', width: 180, sortable: false, formatter: formmatterDate,fixed:true}
];

var colNames =['route_type','라우팅코드', '라우팅명', '공정1','공정2','공정3','공정4','공정5','공정6','공정7','공정8','비고','등록자','등록일'];
var colNames1 =['route_type','라우팅코드', '라우팅명', '공정1','공정2','공정3','공정4','공정5','공정6','공정7','공정8','비고','등록자','등록일'];
var colNames2 =['route_type','라우팅코드', '라우팅명', '공정1','비고','등록자','등록일'];



////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    modal_start1();
    modal_start2();
    selectBox();
    authcheck();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////
// 조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // 해당 클래스명을 가진 항목의 name에 맞도록 객체 생성
    main_data.send_data_post = main_data.send_data; // 수정,삭제 시 다시 조회하기 위한 데이터 저장


    grid_head_value_change(main_data.condition_check);
    $.jgrid.gridUnload('#mes_grid');

    jqGrid_main();
    jqGridResize2('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();



    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/popRouteGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}


function get_btn_post(page) {
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/popRouteGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function add_btn() {
    if(main_data.auth.check_add != "N") {
        main_data.check = 'I';


        if (main_data.condition_check === '1'){
            modal_reset(".modal_value", main_data.readonly);
            $("#addDialog").dialog('open');
        } else {
            modal_reset(".modal_value2", main_data.readonly);
            $("#addDialog2").dialog('open');
        }
    } else {
        alert("추가권한이 없습니다.");
    }
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        main_data.check = 'U';
        var send_data = {};
        send_data.keyword = jqgrid_data.route_code;

        ccn_ajax('/popRouteOneGet', send_data).then(function (data) {

            if (jqgrid_data.route_type === '1'){
                modal_reset(".modal_value", main_data.readonly);
                modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
                $("#addDialog").dialog('open');
            } else {
                modal_reset(".modal_value2", main_data.readonly);
                modal_edits('.modal_value2', main_data.readonly, data); // response 값 출력
                $("#addDialog2").dialog('open');
            }
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
                ccn_ajax("/popRouteDel", {keyword:ids.join(gu5)}).then(function (data) {
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

function selectBox_main_change(value) {
    main_data.condition_check = value;
}

////////////////////////////호출 함수//////////////////////////////////

function grid_head_value_change(value) {

    if (value === '1'){
        colNames = colNames1;
        colModel = colModel1;
    } else if(value === '2'){
        colNames = colNames2;
        colModel = colModel2;
    }

}



function selectBox() {
    $('#group_select').select2();
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popRoute"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: colNames,
        colModel: colModel,
        caption: "공정라우팅 | MES",
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
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}
