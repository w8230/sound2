/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    rpt_list:[],
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqGridResize("#mes_grid2", $('#mes_grid2').closest('[class*="col-"]'));
    datepickerInput();

    qmsQcItemAllGet();

    authcheck();
    jqgridPagerIcons();
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: "/qmsProdGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
    $('#mes_grid2').jqGrid('clearGridData');
}

function under_get(rowid) {
    $("#mes_grid2").setGridParam({
        url: '/qmsProdSubGet',
        datatype: "json",
        page: 1,
        postData: {keyword: rowid}
    }).trigger("reloadGrid");
}




////////////////////////////호출 함수/////////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsProd"}).then(function (data) {
        main_data.auth = data;
    });
}


function qmsQcItemAllGet() {
    ccn_ajax("/qmsQcItemAllGet", {keyword: 1,keyword2:1}).then(function (data) {
        main_data.qcItem_list = data;
        main_data.qcItem_list_string=[];
        data.forEach(function (d) {
            main_data.qcItem_list_string.push(d.qc_code+":"+d.qc_name);
        })
        modal_start1();

        return {keyword: 2,keyword2:2};

    }).then(function (data3) {
        ccn_ajax("/qmsQcItemAllGet", data3).then(function (data) {
            modal_start2();
            modal2_column(data);
            main_data.rpt_list = data;

        });
    }).catch(function (err) {
        console.error(err); // Error 출력
    });
}


function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        mtype: 'POST',
        // mtype: 'POST',
        datatype: "local",
        caption: "출하검사진행 | MES",
        colNames: ['입고일자', '전표번호', '업체', '처리자', '등록일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', width: 150, sortable: false, formatter: formmatterDate2,fixed:true},
            {name: 'in_no', index: 'in_no', key: true, width: 150, sortable: false,fixed:true},
            {name: 'supp_name', index: 'supp_name', width: 150, sortable: false,fixed:true},
            {name: 'user_name', index: 'user_name', width: 150, sortable: false,fixed:true},
            {name: 'update_date', index: 'update_date', width: 180, sortable: false, formatter: formmatterDate,fixed:true}
        ],
        autowidth: true,
        viewrecords: true,
        height: 243,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager',
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');

            $myGrid.setRowData(save_rowid, false, {background:"#FFFFFF"}) ;
            save_rowid = rowid;
            $myGrid.setRowData(rowid, false, {background:"rgb(190, 220, 260)"}) ;

            return (cm[i].name === 'cb');
        },
        onCellSelect: function (rowid, icol, cellcontent, e) {
            under_get(rowid);
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            update_btn(rowid);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }

    });

    $('#mes_grid2').jqGrid({
        mtype: 'POST',
        // mtype: 'POST',
        datatype: "local",
        caption: "출하검사진행 | MES",
        colNames: ['전표번호', '품번', '품명', '규격', '단위', '검사구분', '입고수량'],
        colModel: [
            {name: 'in_no', index: 'in_no', width: 150, sortable: false,fixed:true},
            {name: 'part_code', index: 'part_code', width: 150, sortable: false,fixed:true},
            {name: 'part_name', index: 'part_name', width: 150, sortable: false,fixed:true},
            {name: 'spec', index: 'spec', width: 150, sortable: false,fixed:true},
            {name: 'unit_name', index: 'unit_name', width: 100, sortable: false,fixed:true},
            {name: 'qc_level_name', index: 'qc_level_name', width: 150, sortable: false,fixed:true},
            {name: 'in_qty', index: 'in_qty', width: 100, sortable: false, align: 'right',formatter:'number',fixed:true}
        ],
        autowidth: true,
        viewrecords: true,
        height: 194,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid2_pager',
        loadComplete:function(){
            if ($("#mes_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    });
}

var save_rowid;