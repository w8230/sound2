/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////


var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly:[],
};



////////////////////////////시작 함수/////////////////////////////////
$(document).ready(function () {
    jqGrid_main();

    // jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));

    datepickerInput();


    jqgridPagerIcons();
});
////////////////////////////클릭 함수////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.keyword = main_data.send_data.keyword.replace("년", '');
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: "/crmPlanGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");

}


////////////////////////////호출 함수////////////////////////////////
function datepickerInput() {
    datepicker_makes("#datepicker", 0);


}

var data_s = [{a:'2019-01-01',b:'1111',c:'투비'}]

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        caption: "작업지시관리(수동) | MES",
        colNames: ['작지번호','수주번호','작업구분','품명','규격','작지수량'],
        colModel: [
            {name: 'part_grp_name', index: 'part_grp_name', width: 60, sortable: false},
            {name: 'part_code', index: 'part_code',key:true, width: 60, sortable: false},
            {name: 'part_name', index: 'part_name', width: 60, sortable: false},
            {name: 'spec', index: 'spec', width: 60, sortable: false},
            {name: 'unit_name', index: 'unit_name', width: 60, sortable: false},
            {name: 'unit_name', index: 'unit_name', width: 60, sortable: false},

        ],
        multiselect: true,
        height: 250,
        autowidth: true,
        viewrecords: true,

        height: 500,
        rowNum: 100,
        rowList: [100, 200,300,400,500],
        pager: '#mes_grid_pager',

    });




    jqgridPagerIcons();


}
