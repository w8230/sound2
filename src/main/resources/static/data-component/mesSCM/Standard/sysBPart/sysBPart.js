/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: ['part_code']
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid',$('#mes_grid').closest('[class*="col-"]'));
    selectBox();

    modal_start1();

    modal_start2();
    suppModal_start();

    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: '/sysBPartGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/sysBPartGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {

    modal_reset(".modal_value", main_data.readonly);
    modalValuePush("#gubun_select","#part_type_code","#part_type_name");
    $("input[name=max_qty]").val(0);
    $("input[name=min_qty]").val(0);
    main_data.check = 'I';

    $("#addDialog").dialog('open');

}


function update_btn(jqgrid_data) {

    modal_reset(".modal_value", []);

    main_data.check = 'U';

    ccn_ajax('/sysBPartOneGet', {keyword:jqgrid_data.part_code}).then(function (data) {
        modal_edits('.modal_value', main_data.readonly, data); // response 값 출력

        setTimeout(function () {
             $("#loc_select").val(data.loc_code).trigger("change");
        },10);
        $("#addDialog").dialog('open');
    });
}


function delete_btn() {
    var ids = $("#mes_grid").getGridParam('selarrrow');
    if (ids.length === 0) {
        alert("삭제하는 데이터를 선택해주세요");
    } else {
        if (confirm("삭제하겠습니까?")) {
            main_data.check = 'D';
            wrapWindowByMask2();
            ccn_ajax("/sysBPartDelete", {keyword: ids.join(",")}).then(function (data) {
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
}

function select_change1(value) {
    select_makes_sub("#partGrp_select","/sysBPartGroupSelectGet","part_grp_code","part_grp_name",{keyword:value},"Y");
    select_makes_sub("#partGrp_select2","/sysBPartGroupSelectGet","part_grp_code","part_grp_name",{keyword:value},"N");
}

function upload_btn() {
    $('#uploadDialog').dialog('open');
    $("#modal2_grid").jqGrid('clearGridData');
    $(".upload-name").val("");
    jqGridResize2('#modal2_grid',$('#modal2_grid').closest('[class*="col-"]'));
}

////////////////////////////호출 함수//////////////////////////////////

function selectBox() {
    select_makes2("#gubun_select", "/sysPartTypeGet", "part_type_code", "part_type_name").then(function (data) {
        select_makes_sub("#partGrp_select","/sysBPartGroupSelectGet","part_grp_code","part_grp_name",{keyword:data},"Y");
        select_makes_sub("#partGrp_select2","/sysBPartGroupSelectGet","part_grp_code","part_grp_name",{keyword:data},"N");
    });

}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['품목구분', '품목코드', '품목명','창고', '보관로케이션', '업체명', '규격', '단위', 'L/T', '검사등급', '재고최대', '재고최소', '등록자', '수정일'],
        colModel: [
            {name: 'part_grp_name', index: 'part_grp_name', width: 40},
            {name: 'part_code', index: 'part_code', key: true, width: 40},
            {name: 'part_name', index: 'part_name', width: 40},
            {name: 'cargo_name', index: 'cargo_name', width: 40},
            {name: 'loc_name', index: 'loc_name', width: 40},
            {name: 'supp_name', index: 'supp_name', width: 40},
            {name: 'spec', index: 'spec', width: 40},
            {name: 'unit_name', index: 'unit_name', width: 40},
            {name: 'LT', index: 'LT', width: 40},
            {name: 'qc_level_name', index: 'qc_level_name', width: 40},
            {name: 'max_qty', index: 'stock_max', width: 40},
            {name: 'min_qty', index: 'stock_min', width: 40},
            {name: 'user_name', index: 'manager', width: 30},
            {name: 'update_date', index: 'modified_date', width: 50,formatter: formmatterDate},
        ],
        caption: "자재정보관리 | MES",
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

        }
    });
}