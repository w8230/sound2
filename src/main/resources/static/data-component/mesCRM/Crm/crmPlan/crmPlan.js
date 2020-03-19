/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly:[],
    auth:{},
    rows:300
};

var colNames_sub = {
    a:['s','제품코드','제품명','분류', '1월', '2월', '3월', '소계', '전체계', '차이', '생산량','시점재고', '생산시기','년도','분기'],
    b:['s','제품코드','제품명','분류', '4월', '5월', '6월', '소계', '전체계', '차이', '생산량','시점재고', '생산시기','년도','분기'],
    c:['s','제품코드','제품명','분류', '7월', '8월', '9월', '소계', '전체계', '차이', '생산량','시점재고', '생산시기','년도','분기'],
    d:['s','제품코드','제품명','분류', '10월', '11월', '12월', '소계', '전체계', '차이', '생산량','시점재고', '생산시기','년도','분기'],
}

var colNames = ['s','제품코드','제품명','분류', '1월', '2월', '3월', '소계', '전체계', '차이', '생산량','시점재고', '생산시기','년도','분기']
////////////////////////////시작 함수/////////////////////////////////
$(document).ready(function () {
    authcheck();
    jqGrid_main();
    jqGrid_header();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    selectBox();
    datepickerInput();
    modal_start1();
    partModal_start('B');
    $(document).on("change",".ui-pg-selbox",function () {
        prevCellVal_reset();
    })

    jqgridPagerIcons();

});



////////////////////////////클릭 함수////////////////////////////////


function rows_check() {
    main_data.rows =$("#mes_grid").getGridParam("rowNum");

}

function get_btn(page) {
    rows_check();
    prevCellVal_reset();
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.keyword = main_data.send_data.keyword.replace("년", '');
    main_data.send_data_post = main_data.send_data;
    bungi_change(main_data.send_data.keyword2);

    console.log(main_data);
    jqGridResize2("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    $("#mes_grid").setGridParam({
        url: "/crmPlanGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");


}




function get_btn_post(page) {
    rows_check();
    prevCellVal_reset();
    bungi_change(main_data.send_data_post.keyword2);
    jqGridResize2("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    $("#mes_grid").setGridParam({
        url: "/crmPlanGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");

}


function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly);
        modalValuePush("#bungi_select","#quarter","#quarter_name");
        $("#plan_year_name").val($("#datepicker").val());
        $("#plan_year").val($("#datepicker").val().replace("년", ""));
        $("#part_name_modal").prop("disabled",false).trigger('change');
        main_data.check = 'I';

        var value =  $('#bungi_select').val();
        if (value === "1"){
            $("#month1").text("1월");
            $("#month2").text("2월");
            $("#month3").text("3월");
        } else if(value ==="2"){
            $("#month1").text("4월");
            $("#month2").text("5월");
            $("#month3").text("6월");
        } else if(value ==="3"){
            $("#month1").text("7월");
            $("#month2").text("8월");
            $("#month3").text("9월");
        } else {
            $("#month1").text("10월");
            $("#month2").text("11월");
            $("#month3").text("12월");
        }

        $("#addDialog").dialog('open');
    } else {
        alert("추가권한이 없습니다,");
    }
}

function bungi_change(value) {
    if (value === '1'){
        colNames = colNames_sub.a;
    } else if (value === '2'){
        colNames = colNames_sub.b;
    } else if(value === '3'){
        colNames = colNames_sub.c;
    } else if(value === '4'){
        colNames = colNames_sub.d;
    }

    $('#mes_grid').jqGrid('destroyGroupHeader');
    $.jgrid.gridUnload('#mes_grid');
    jqGrid_main();
    jQuery("#mes_grid").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: 'month_plan1', numberOfColumns: 3, titleText: '<center>'+value+'분기</center>'},

        ]
    });

}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거

        main_data.check = 'U'; // 수정인지 체크


        var send_data = {
            keyword :jqgrid_data.plan_year,
            keyword2   :jqgrid_data.quarter,
            keyword3   :jqgrid_data.part_code
        }

        ccn_ajax('/crmPlanOneGet', send_data).then(function (data) { // user의 하나 출력
            ccn_ajax("/wmsStockTotalOneGet", {keyword2:send_data.keyword3}).then(function (data2) {
                modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
                $("#stock_qty").val(data2.qty);

                $("#quarter_name").val(data.quarter+'분기');
                $("#plan_year_name").val(data.plan_year+'년');
                $("#part_name_modal").prop("disabled",true).trigger('change');

                $("#addDialog").dialog('open');
            });
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}

function excel_download() {
    if (confirm("엑셀로 저장하시겠습니까?")) {
        var $preparingFileModal = $("#preparing-file-modal");

        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name":"crmPlan",
                "row0":$('#datepicker').val().replace("년", ''),
                "row1":$('#bungi_select').val(),
                "row2":$('#part_name_input').val()
            },
            successCallback: function (url) {
                $preparingFileModal.dialog('close');
            },
            failCallback: function (responseHtml, url) {
                $preparingFileModal.dialog('close');
                $("#error-modal").dialog({modal: true});
            }
        });
        return false;
    }
}

////////////////////////////호출 함수////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "crmPlan"}).then(function (data) {
        main_data.auth = data;
    });
}

function prevCellVal_reset() {
    prevCellVal = { cellId: undefined, value: undefined,rowid:undefined};
    prevCellVal2 = { cellId: undefined, value: undefined,rowid:undefined};
    prevCellVal3 = { cellId: undefined, value: undefined,rowid:undefined};
    prevCellVal4 = { cellId: undefined, value: undefined,rowid:undefined};
    prevCellVal5 = { cellId: undefined, value: undefined,rowid:undefined};
    prevCellVal6 = { cellId: undefined, value: undefined,rowid:undefined};
}

function datepickerInput() {
    var date = new Date();
    date.setDate(date.getDate());
    $('#datepicker').datepicker({
        autoclose: true,
        format:'yyyy'+'년',
        language: "kr",
        minViewMode: 'years',
    }).datepicker('setDate',date);
}

function selectBox() {
    $('#bungi_select').select2();
}

function jqGrid_header() {
    jQuery("#mes_grid").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: 'month_plan1', numberOfColumns: 3, titleText: '<center>1분기</center>'},

        ]
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: 'local',
        caption: '계획관리 | MES',
        colNames: colNames,
        colModel: [
            {name: 'rownum', index: 'rownum',key:true,hidden:true, sortable: false, width: 120, sorttype:"text", },
            {name: 'part_code', index: 'part_code',hidden:true, sortable: false, width: 120, sorttype:"text", },
            {name: 'part_name', index: 'part_name', sortable: false, width: 120, sorttype:"text",  cellattr:form},
            {name: 'plan_name', index: 'plan_name', sortable: false, width: 50},
            {name: 'month_plan1', index: 'month_plan1', sortable: false, width: 50, align: 'right',formatter:'number'},
            {name: 'month_plan2', index: 'month_plan2', sortable: false, width: 50, align: 'right',formatter:'number'},
            {name: 'month_plan3', index: 'month_plan3', sortable: false, width: 50, align: 'right',formatter:'number'},
            {name: 'plan_qty', index: 'plan_qty', sortable: false, width: 50, align: 'right',formatter:'number'},
            {name: 'total_qty', index: 'total_qty', sortable: false, width: 80, sorttype:"text",  cellattr:form2, align: 'right',formatter:'number'},
            {name: 'diff_qty', index: 'diff_qty', sortable: false, width: 80, sorttype:"text",  cellattr:form3 , align: 'right',formatter:'number'},
            {name: 'prod_qty', index: 'prod_qty', sortable: false, width: 80, sorttype:"text",  cellattr:form4 , align: 'right',formatter:'number'},
            {name: 'stock_qty', index: 'stock_qty', sortable: false, width: 80, sorttype:"text",  cellattr:form5 , align: 'right',formatter:'number'},
            {name: 'prod_desc', index: 'prod_desc', sortable: false, width: 80, sorttype:"text",  cellattr:form6 , align: 'right'},
            {name: 'plan_year', index: 'plan_year', sortable: false, hidden:true, width: 80, sorttype:"text"},
            {name: 'quarter', index: 'quarter', sortable: false, hidden:true, width: 80, sorttype:"text"},
        ],

        autowidth: true,
        viewrecords: true,
        hoverrows: false,
        height: 538,
        rowNum: main_data.rows,
        rowList: [300, 600],
        pager: '#mes_grid_pager',
         loadComplete : function(sss) {

        var ids = $("#mes_grid").getDataIDs() ;
        var count = 0;
        var check = true;
        $.each( ids, function(idx, rowId) {
            count++;
            if (check === false){

                    $("#mes_grid").setRowData(rowId, false, {background:"rgb(155, 185, 239)"}) ;
                    if (count === 3){
                        count = 0;
                        check = true;
                    }

            } else {

                if (count === 3){
                    count = 0;
                    check = false;
                }
            }



            }
        ) ;
    },


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
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        onPaging: function(rowid, status, e) {
            prevCellVal_reset();
        }




    });

    jqgridPagerIcons();



}

var prevCellVal = { cellId: undefined, value: undefined,rowid:undefined };
var form = function(rowId, val, rawObject, cm, rdata) {
    var result;


    if (prevCellVal.value == val) {

        result = ' style="display: none" rowspanid="' + prevCellVal.cellId + '"';

    } else {

        var cellId = this.id + '_row_' + rowId + '_' + cm.name;

        result = ' rowspan="1" id="' + cellId + '"';

        prevCellVal = { cellId: cellId, value: val };
        //$(this).css('background',"#ff0000");

    }

    return result;

};


var prevCellVal2 = { cellId: undefined, value: undefined,rowid:undefined};
var form2 = function(rowId, val, rawObject, cm, rdata) {

    var result;

    if (prevCellVal2.rowid == rawObject.part_code) {

        result = ' style="display: none" rowspanid="' + prevCellVal2.cellId + '"';

    } else {
        
        var cellId = this.id + '_row_' + rowId + '_' + rawObject.part_code+"_"+cm.name;

        result = ' rowspan="1" id="' + cellId + '"';

        prevCellVal2 = { cellId: cellId, value: val,rowid: rawObject.part_code};

    }

    return result;

};
var prevCellVal3 = { cellId: undefined, value: undefined,rowid:undefined};
var form3 = function(rowId, val, rawObject, cm, rdata) {

    var result;

    if (prevCellVal3.rowid == rawObject.part_code) {

        result = ' style="display: none" rowspanid="' + prevCellVal3.cellId + '"';

    } else {
        
        var cellId = this.id + '_row_' + rowId + '_' + rawObject.part_code+"_"+cm.name;

        result = ' rowspan="1" id="' + cellId + '"';

        prevCellVal3 = { cellId: cellId, value: val,rowid: rawObject.part_code};

    }

    return result;

};
var prevCellVal4 = { cellId: undefined, value: undefined,rowid:undefined};
var form4 = function(rowId, val, rawObject, cm, rdata) {

    var result;

    if (prevCellVal4.rowid == rawObject.part_code) {

        result = ' style="display: none" rowspanid="' + prevCellVal4.cellId + '"';

    } else {
        
        var cellId = this.id + '_row_' + rowId + '_' + rawObject.part_code+"_"+cm.name;

        result = ' rowspan="1" id="' + cellId + '"';

        prevCellVal4 = { cellId: cellId, value: val,rowid: rawObject.part_code};

    }

    return result;

};
var prevCellVal5 = { cellId: undefined, value: undefined,rowid:undefined};
var form5 = function(rowId, val, rawObject, cm, rdata) {

    var result;

    if (prevCellVal5.rowid == rawObject.part_code) {

        result = ' style="display: none" rowspanid="' + prevCellVal5.cellId + '"';

    } else {
        
        var cellId = this.id + '_row_' + rowId + '_' + rawObject.part_code+"_"+cm.name;

        result = ' rowspan="1" id="' + cellId + '"';

        prevCellVal5 = { cellId: cellId, value: val,rowid: rawObject.part_code};

    }

    return result;

};
var prevCellVal6 = { cellId: undefined, value: undefined,rowid:undefined};
var form6 = function(rowId, val, rawObject, cm, rdata) {

    var result;

    if (prevCellVal6.rowid == rawObject.part_code) {

        result = ' style="display: none" rowspanid="' + prevCellVal6.cellId + '"';

    } else {
        
        var cellId = this.id + '_row_' + rowId + '_' + rawObject.part_code+"_"+cm.name;

        result = ' rowspan="1" id="' + cellId + '"';

        prevCellVal6 = { cellId: cellId, value: val,rowid: rawObject.part_code};

    }

    return result;

};