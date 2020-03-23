/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    readonly: ['part_name_code'],
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    jqGrid_main(); // main 그리드 생성
    jqGridResize("#mes_grid" , $('#mes_grid').closest('[class*="col-"]')); //그리드 리 사이즈
    /*----모달----*/
    modal_start1(); // 모달1 시작 함수
    authcheck();
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로


});


////////////////////////////클릭 함수/////////////////////////////////////
// 조회 버튼
function get_btn(page) {
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/sysPartNameGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N"){
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'I'; // 저장인지 체크
        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert("추가권한이 없습니다,");
    }
}

// 그리드 내용 더블 클릭 시 실행
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거

        main_data.check = 'U'; // 수정인지 체크
        ccn_ajax('/sysPartNameOneGet', {keyword: jqgrid_data.part_name_code}).then(function (data) { // user의 하나 출력
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#addDialog").dialog('open');
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                main_data.check = 'D';
                wrapWindowByMask2();
                ccn_ajax("/sysPartNameDel", {keyword: ids.join(gu5)}).then(function (data) {
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


////////////////////////////호출 함수/////////////////////////////////////


function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysPartName"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames : ['품목명코드','품목명','등록자','등록일'],
        colModel : [
            {name:'part_name_code',index:'part_name_code',key: true ,sortable: false,width:150,fixed: true},
            {name:'part_name',index:'part_name',sortable: false,width:150,fixed: true},
            {name:'user_name',index:'user_name',sortable: false,width:150,fixed: true},
            {name:'update_date',index:'update_date',formatter:formmatterDate,sortable: false,width:180,fixed: true}
        ],
        caption: "품목명관리 | MES",
        autowidth: true,
        height: 600,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 400],
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
    }).navGrid("#mes_grid_pager", {search: false, add: false, edit: false, del: false});
}



