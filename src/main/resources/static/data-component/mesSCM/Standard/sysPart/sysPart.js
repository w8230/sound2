/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [],
    auth:{},
    condition_data:{}
};


////////////////////////////시작 함수//////////////////////////////////
$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));

    selectBox();
    authcheck();
    modal_start1();
    jqgridPagerIcons();
});

////////////////////////////클릭 함수//////////////////////////////////


function add_btn() {
    if (main_data.auth.check_add !="N") {

        main_data.condition_data = value_return(".condition_main");


        modal_reset(".modal_value", main_data.readonly);
        $("#part_name").val(main_data.condition_data.keyword4);
        $("select[name=prod_type] option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=material_type] option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=loc_code] option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=unit_code] option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=qc_level] option:eq(0)").prop("selected", true).trigger("change");

        main_data.check = 'I';


        $("#addDialog").dialog('open');



    } else {
        alert("추가권한이 없습니다,");
    }
}

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: '/sysPartGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/sysPartGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U';
        ccn_ajax('/sysPartOneGet', {keyword:jqgrid_data.part_code}).then(function (data) {
            modal_edits('.modal_value', main_data.readonly,data); // response 값 출력
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
                ccn_ajax("/sysPartDel", {keyword: ids.join(gu5)}).then(function (data) {
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
    ccn_ajax("/menuAuthGet", {keyword: "sysPart"}).then(function (data) {
        main_data.auth = data;
    });
}


function selectBox() {
    select_makes_base("#part_type_select", "/sysPartTypeGet", "part_type", "part_type_name",{keyword:'1'},'Y').then(function (data) {});




}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['구분','품번','품명','규격','단위','창고','위치','품질레벨','등록자','등록일시'],
        colModel: [
            {name: 'part_type_name', index: 'part_type_name', sortable: false, width: 150,fixed: true},
            {name: 'part_code', index: 'part_code', key:true, sortable: false, width: 150,fixed: true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 150,fixed: true},
            {name: 'spec', index: 'spec', sortable: false, width: 150,fixed: true},
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 100,fixed: true},
            {name: 'cargo_name', index: 'cargo_name', sortable: false, width: 150,fixed: true},
            {name: 'loc_name', index: 'loc_name', sortable: false, width: 100,fixed: true},
            {name: 'qc_level_name', index: 'qc_level_name', sortable: false, width: 150,fixed: true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed: true},
            {name: 'update_date', index: 'update_date', width: 180, sortable: false, formatter: formmatterDate,fixed: true}


        ],
        caption: "자재등록 | MES",
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
                $("table#mes_grid tr.jqgfirstrow").css("height","1px");
            else
                $("table#mes_grid tr.jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function effectiveness_main(data) {
    if (data.keyword2 === "" || data.keyword2 === null){
        alert("품목군을 다시 선택해주세요");
        return false;
    } else if (data.keyword3 === "" || data.keyword3 === null){
        alert("제품군을 다시 선택해주세요");
        return false;
    } else if (data.keyword4 === "" || data.keyword4 === null){
        alert("품명을 선택해주세요");
        return false;
    } else {
        return  true;
    }
    
}