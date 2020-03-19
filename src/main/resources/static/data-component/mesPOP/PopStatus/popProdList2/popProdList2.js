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
    datepickerInput();
    authcheck();
    selectBox();
    jqgridPagerIcons();


});


////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.stop_date = main_data.send_data.stop_date.replace(/\-/g, '');
    $("#mes_grid").setGridParam({
        url: '/popProdRangeGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}
////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popProdList2"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);
}

function selectBox() {
    select_makes_sub("#line_select", "/sysProdLineAllGet", "line_code", "line_name",{keyword:''},'Y');

}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['생산일자','지시번호','작업순번','제품명','계획량','생산량','용도','생산구분','품목군','제품군','생산자','생산일시','Remark','비고','바코드'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 60, formatter: formmatterDate2},
            {name: 'plan_no3', index: 'plan_no3', sortable: false, width: 60},
            {name: 'work_seq', index: 'work_seq', sortable: false, width: 60,align:'right'},
            {name: 'part_name', index: 'part_name', sortable: false, width: 60},
            {name: 'plan_qty', index: 'plan_qty', sortable: false, width: 60,align:'right', formatter: 'number'},
            {name: 'work_qty', index: 'work_qty', sortable: false, width: 60,align:'right', formatter: 'number'},
            {name: 'prod_type_name', index: 'prod_type_name', sortable: false, width: 30},
            {name: 'prod_dept_name', index: 'prod_dept_name', sortable: false, width: 60},
            {name: 'part_grp_name1', index: 'part_grp_name1', sortable: false, width: 60},
            {name: 'part_grp_name2', index: 'part_grp_name2', sortable: false, width: 60},
            {name: 'user_name', index: 'user_name', sortable: false, width: 40},
            {name: 'start_date', index: 'start_date', sortable: false, width: 60, formatter: formmatterDate},
            {name: 'remark', index: 'remark', sortable: false, width: 60},
            {name: 'remark1', index: 'remark1', sortable: false, width: 60},
            {name: 'bcr_no', index: 'bcr_no', sortable: false, width: 60}
        ],
        caption: "공정별 작업현황 | MES",
        autowidth: true,
        height: 243,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});

    $('#mes_grid2').jqGrid({
        mtype: 'POST',
        datatype: "local",
        caption: "공정별 작업현황 | MES",
        colNames: ['품목군','제품군','품번','품명','규격','LOT NO','투입량','바코드'],
        colModel: [
            {name: '', index: '', width: 60, sortable: false},
            {name: '', index: '', width: 60, sortable: false},
            {name: '', index: '', width: 60, sortable: false},
            {name: '', index: '', width: 60, sortable: false},
            {name: '', index: '', width: 60, sortable: false},
            {name: '', index: '', width: 60, sortable: false},
            {name: '', index: '', width: 60, sortable: false},
            {name: '', index: '', width: 60, sortable: false}
        ],
        autowidth: true,
        viewrecords: true,
        height: 194,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid2_pager'

    });

}
