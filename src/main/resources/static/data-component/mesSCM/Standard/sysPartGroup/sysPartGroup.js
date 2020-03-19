/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: ['part_grp_code'],
    auth:{}
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    selectBox();
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));

    modal_start1();
    authcheck();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: '/sysPartGroupGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/sysPartGroupGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly);
        modalValuePush("#part_type_select", "#part_type_code", "#part_type_name");
        modalValuePush("#part_group_select", "#part_level", "#part_level_name");
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
        ccn_ajax('/sysPartGroupOneGet', jqgrid_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
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
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                wrapWindowByMask2();
                var list = [];
                var data;

                ids.forEach(function (id) {
                    data = $('#mes_grid').jqGrid('getRowData', id);
                    list.push(data.part_type+gu4+data.part_level+gu4+data.part_grp_code);
                });

                main_data.check = 'D';
                callback(function () {
                    ccn_ajax("/sysPartGroupDel", {keyword: list.join(gu5)}).then(function (data) {
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

function select_change1(value) {
    ccn_ajax('/sysPartTypeOneGet',{keyword:'',keyword2:value}).then(function (value) {
        $('#part_group_select').empty();
        var option = null;
        for (var j = 1; j <= 3; j++) {
            option = $("<option></option>").text(value['part_group'+j]).val(j);
            $('#part_group_select').append(option);
        }
        $('#part_group_select').select2();
    })
}

////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysPartGroup"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    part_type_select_ajax("#part_type_select", "/sysPartTypeGet", "part_type_code", "part_type_name",{keyword:''}).then(function (data) {
        ccn_ajax('/sysPartTypeOneGet',{keyword:'',keyword2:data[0].part_type_code}).then(function (value) {
            $('#part_group_select').empty();
            var option = null;
            for (var j = 1; j <= 3; j++) {
                option = $("<option></option>").text(value['part_group'+j]).val(j);
                $('#part_group_select').append(option);
            }
            $('#part_group_select').select2();
        })
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({

        datatype: "local",
        mtype: 'POST',
        colNames: ['part_type','part_level','그룹코드', '그룹명', '비고', '등록자', '수정일'],
        colModel: [
            {name: 'part_type', index: 'part_type', hidden:true,sortable: false, width: 60},
            {name: 'part_level', index: 'part_level',hidden:true, sortable: false, width: 60},
            {name: 'part_grp_code', index: 'part_grp_code', key: true, sortable: false, width: 60},
            {name: 'part_grp_name', index: 'part_grp_name', sortable: false, width: 60},
            {name: 'remark', index: 'remark', sortable: false, width: 60},
            {name: 'user_name', index: 'user_name', sortable: false, width: 60},
            {name: 'update_date', index: 'update_date', width: 60, sortable: false, formatter: formmatterDate}
        ],
        caption: "품목그룹관리 | MES",
        autowidth: true,
        height: 550,
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

        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

