/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: ['part_grp_code2'],
    auth:{}
};
////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));

    modal_start1();
    selectBox();
    authcheck();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // 해당 클래스명을 가진 항목의 name에 맞도록 객체 생성
    main_data.send_data_post = main_data.send_data; // 수정,삭제 시 다시 조회하기 위한 데이터 저장
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/sysPartNameGroup2Get',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}


function get_btn_post(page) {
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/sysPartNameGroup2Get',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}



function add_btn() {
    if (main_data.auth.check_add !="N") {

        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 명을 가진 항목들의 내용을 리셋,비워줌 main_data readonly 에 추가한 name의 항목에 readonly 옵션을 추가
        modalValuePush("#part_type_select","#part_type_code","#part_type_name"); // name1의 값을 name2,name3 에 넣어줌
        modalValuePush("#part_group_select","#part_grp_code","#part_grp_name"); // name1의 값을 name2,name3 에 넣어줌
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
        var data = {};
        data.keyword = jqgrid_data.part_type_code;
        data.keyword2 = jqgrid_data.part_grp_code;
        data.keyword3 = jqgrid_data.part_grp_code2;


        ccn_ajax('/sysPartNameGroup2OneGet', data).then(function (data2) {

                modal_edits('.modal_value', main_data.readonly, data2); // response 값 출력
                $("#addDialog").dialog('open');
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}



function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var gu4 = String.fromCharCode(4);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                wrapWindowByMask2();
                main_data.check = 'D';
                var list = [];
                var data;

                ids.forEach(function (rowid) {
                    data = $('#mes_grid').jqGrid('getRowData', rowid);
                    list.push(data.part_type_code +gu4+ data.part_grp_code+gu4+ data.part_grp_code2 )
                })


                callback(function () {
                    ccn_ajax("/sysPartNameGroup2Del", {keyword: list.join(gu5)}).then(function (data) {
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
                });

            }
        }
    } else {
        alert("삭제권한이 없습니다.");
    }
}


function selectBox_main_change1(value) {
    select_makes3("#part_group_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name",{keyword:value});
}

////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysPartNameGroup2"}).then(function (data) {
        main_data.auth = data;
    });
}


function selectBox() {
    part_type_select_ajax("#part_type_select", "/sysPartTypeGet", "part_type_code", "part_type_name",{keyword:''}).then(function (data) {
        select_makes3("#part_group_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name",{keyword:data[0].part_type_code});
    });

}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['part_type_code','part_grp_code','코드','제품군'],
        colModel: [
            {name: 'part_type_code', index: 'part_type_code', hidden:true, sortable: false, width: 250,fixed: true},
            {name: 'part_grp_code', index: 'part_grp_code', hidden:true, sortable: false, width: 250,fixed: true},
            {name: 'part_grp_code2', index: 'part_grp_code2', sortable: false, width: 250,fixed: true},
            {name: 'part_grp_name2', index: 'part_grp_name2', sortable: false, width: 250,fixed: true},
        ],
        caption: "제품군관리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],

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

        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

