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

        if (effectiveness_main(main_data.condition_data)) {
            modal_reset(".modal_value", main_data.readonly);
            $("#part_name").val(main_data.condition_data.keyword4);
            $("select[name=prod_type] option:eq(0)").prop("selected", true).trigger("change");
            $("select[name=material_type] option:eq(0)").prop("selected", true).trigger("change");
            $("select[name=loc_code] option:eq(0)").prop("selected", true).trigger("change");
            $("select[name=unit_code] option:eq(0)").prop("selected", true).trigger("change");
            $("select[name=qc_level] option:eq(0)").prop("selected", true).trigger("change");

            main_data.check = 'I';


            $("#addDialog").dialog('open');
        }


    } else {
        alert("추가권한이 없습니다,");
    }
}

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.keyword5 = '';
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

function select_type_change(value) {
    part_type_select_ajax("#part_group1_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name",{keyword:value}).then(function (data) {
        select_makes3('#part_group2_select', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:value, keyword2:data[0].part_grp_code});
    });
    if (value === 'D'){
        select_makes3('#part_name_select', "/sysPartNameGroupAllGet","code_name2" ,"code_name2",{keyword:'MAT_PROD', keyword2:'CODE'});
    } else if (value === 'A') {
        select_makes3('#part_name_select', "/sysPartNameGroupAllGet","code_name2" ,"code_name2",{keyword:'MAT_PRODUCT', keyword2:'CODE'});

    }
}

function select_change1(value) {
    select_makes3('#part_group2_select', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:$("#part_type_select").val(), keyword2:value});
}


////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysPart"}).then(function (data) {
        main_data.auth = data;
    });
}


function selectBox() {
    $("#part_type_select").select2();
    part_type_select_ajax("#part_group1_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name",{keyword:'D'}).then(function (data) {
        select_makes3('#part_group2_select', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:'D', keyword2:data[0].part_grp_code});
    });

    select_makes3('#part_name_select', "/sysPartNameGroupAllGet","code_name2" ,"code_name2",{keyword:'MAT_PROD', keyword2:'CODE'});


}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['품번','품명','규격1','규격2','재질','제조사','공급사','제조사2','공급사2','제조사3','공급사3','용도','자재유형','품목군','제품군','보관로케이션','단위','L/T','검사등급','재고최대','재고최소','등록자','수정일'],
        colModel: [
            {name: 'part_code', index: 'part_code', key:true, sortable: false, width: 150,fixed: true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 150,fixed: true},
            {name: 'spec1', index: 'spec1', sortable: false, width: 150,fixed: true},
            {name: 'spec2', index: 'spec2', sortable: false, width: 150,fixed: true},
            {name: 'material', index: 'material', sortable: false, width: 150,fixed: true},
            {name: 'maker_name', index: 'maker_name', sortable: false, width: 150,fixed: true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150,fixed: true},
            {name: 'maker_name2', index: 'maker_name2', sortable: false, width: 150,fixed: true},
            {name: 'supp_name2', index: 'supp_name2', sortable: false, width: 150,fixed: true},
            {name: 'maker_name3', index: 'maker_name3', sortable: false, width: 150,fixed: true},
            {name: 'supp_name3', index: 'supp_name3', sortable: false, width: 150,fixed: true},
            {name: 'prod_type_name', index: 'prod_type_name', sortable: false, width: 100,fixed: true},
            {name: 'material_type_name', index: 'material_type_name', sortable: false, width: 100,fixed: true},
            {name: 'part_grp_name1', index: 'part_grp_name1', sortable: false, width: 150,fixed: true},
            {name: 'part_grp_name2', index: 'part_grp_name2', sortable: false, width: 150,fixed: true},
            {name: 'loc_name', index: 'loc_name', sortable: false, width: 100,fixed: true},
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 100,fixed: true},
            {name: 'lt', index: 'lt', sortable: false, width: 100,fixed: true},
            {name: 'qc_level_name', index: 'qc_level_name', sortable: false, width: 150,fixed: true},
            {name: 'max_qty', index: 'max_qty', sortable: false, width: 100,fixed: true,align:'right',formatter:'number'},
            {name: 'min_qty', index: 'min_qty', sortable: false, width: 100,fixed: true,align:'right',formatter:'number'},
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