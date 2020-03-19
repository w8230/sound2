/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [],
    auth:{}
};

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
    main_data.send_data.keyword = 'MAT_PROD_LIST';
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: '/sysPartNameGroupGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");

}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/sysPartNameGroupGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}


function add_btn() {
     if(main_data.auth.check_add != "N") {
          modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'I'; // 저장인지 체크
        modalValuePush("#gubun_select", "#code_type", "#code_type_name");
        modalValuePush("#code_value_select", "#code_value", "#code_value_name");

        $("#addDialog").dialog('open'); // 모달 열기
     } else {
         alert("추가권한이 없습니다.");
     }
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U';
        ccn_ajax('/sysPartNameGroupSubOneGet', jqgrid_data).then(function (data2) {

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
        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                wrapWindowByMask2();
                main_data.check = 'D';
                callback(function () {
                    ccn_ajax("/sysPartNameGroupDel", {keyword: ids.join(gu5)}).then(function (data) {
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



////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysPartNameGroupSub"}).then(function (data) {
        main_data.auth = data;
    });
}


function selectBox() {
    $('#gubun_select').select2();
    ccn_ajax('/sysCommon2AllGet',{keyword:$('#gubun_select').val(),keyword2:'CODE'}).then(function (value1) {
        $('#code_value_select').empty();
        var option = null;
        for(var j=0;j<value1.length;j++){
            option = $("<option></option>").text(value1[j].code_name1).val(value1[j].code_name1);
            $('#code_value_select').append(option);
        }
        $('#code_value_select').select2();

    });
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['idx','생성순','코드'],
        colModel: [
            {name: 'idx', index: 'idx', hidden:true, key:true, sortable: false, width: 250,fixed: true},
            {name: 'code_name1', index: 'code_name1', sortable: false, width: 250,fixed: true},
            {name: 'code_name2', index: 'code_name2', sortable: false, width: 250,fixed: true},

        ],
        caption: "품명세부분류관리 | MES",
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

