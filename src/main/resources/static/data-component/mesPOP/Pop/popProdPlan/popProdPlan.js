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

    modal_start1();

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
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);

}

var data_s = [{a:'여기를 클릭',b:'여기를 클릭',c:'여기를 클릭'}]

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        data:data_s,
        datatype: 'local',
        caption: '작업지시관리 | MES',
        colNames: ['일자','수주번호','수주처','End User','납기일','작업구분','품목그룹','품번','품명','규격','단위','수주수량'],
        colModel: [
            {name: 'a', index: 'a', sortable: false, width: 60},
            {name: 'b', index: 'b', sortable: false, width: 60},
            {name: 'c', index: 'c', sortable: false, width: 60},
            {name: 'd', index: 'd', sortable: false, width: 60},
            {name: 'e', index: 'e', sortable: false, width: 60},
            {name: 'f', index: 'f', sortable: false, width: 60},
            {name: 'g', index: 'g', sortable: false, width: 60},
            {name: 'h', index: 'h', sortable: false, width: 60},
            {name: 'i', index: 'i', sortable: false, width: 60},
            {name: 'j', index: 'j', sortable: false, width: 60},
            {name: 'k', index: 'k', sortable: false, width: 60},
            {name: 'l', index: 'l', sortable: false, width: 60},

        ],
        autowidth: true,
        viewrecords: true,
        hoverrows: false,
        height: 500,
        rowNum: 100,
        rowList: [100, 200,300,400,500],
        pager: '#mes_grid_pager',
        onCellSelect: function (rowid, icol, cellcontent, e) {
            update_btn();
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창

        }


    });




    jqgridPagerIcons();


}
