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
    jqGrid_header();
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
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);

}

function jqGrid_header() {
    jQuery("#mes_grid").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: 'a', numberOfColumns: 2, titleText: '<center>조립</center>'},
            {startColumnName: 'b', numberOfColumns: 6, titleText: '<center>단품</center>'},

        ]
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: 'local',
        caption: '생산지시현황 | MES',
        colNames: ['일자','지시번호','수주처','End User','납기일','작업구분','품목','수량','품목그룹','품번','품명','규격','단위','수량'],
        colModel: [
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: 'a', index: 'a', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: 'b', index: 'b', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
        ],
        autowidth: true,
        viewrecords: true,
        hoverrows: false,
        height: 500,
        rowNum: 100,
        rowList: [100, 200,300,400,500],
        pager: '#mes_grid_pager',
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        gridComplete: function() {  // 그리드 생성 후 호출되는 이벤트

            var grid = this;

            $('td[rowspan="1"]', grid).each(function () {

                var spans = $('td[rowspanid="' + this.id + '"]', grid).length + 1;

                if (spans > 1) {

                    $(this).attr('rowspan', spans);

                }
            });
        }

    });




    jqgridPagerIcons();


}
