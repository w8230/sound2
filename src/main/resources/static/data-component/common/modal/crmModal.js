////////////////////////////시작 함수/////////////////////////////////////
function crmModal_start() {

    crmModal_make();
    crmModal_jqGrid();
    crm_datepickerInput_modal();
    jqGridResize("#crmSearchGrid", $('#crmSearchGrid').closest('[class*="col-"]'));
}


////////////////////////////클릭 함수/////////////////////////////////////

function crmModal_get_btn(page) {
    var crm_send_data = value_return(".crm_condition");
    crm_send_data.start_date = crm_send_data.start_date.replace(/\-/g, '');
    crm_send_data.end_date = crm_send_data.end_date.replace(/\-/g, '');
    $("#crmSearchGrid").setGridParam({
        url: '/crmOrderModalGet',
        datatype: "json",
        page: page,
        postData: crm_send_data,
    }).trigger("reloadGrid");
}

function crmModal_check() {
    if ($( "#crmSearchGrid" ).getGridParam( "selrow" )) {
        var ids = $( "#crmSearchGrid" ).getGridParam( "selrow" );



        ccn_ajax('/wmsOutOrderSubOneGet', {keyword:'',keyword2: ids}).then(function (data) {
            crmModal_bus(data);
            $("#crm-search-dialog").dialog('close');
        });

    }else {
        alert("선택하십시오");
    }
}


function crmModal_close() {
    $("#crm-search-dialog").dialog('close');
    suppModal_close_bus();

}

////////////////////////////호출 함수/////////////////////////////////////



function crmModal_make() {
    $("#crm-search-dialog").dialog({
        autoOpen:false,
        modal: true,
        width:'1300',
        height: 'auto',
        resizable: false,
    });

}

function crmModal_jqGrid() {
    $('#crmSearchGrid').jqGrid({
        datatype: "local",
        // 다중 select
        mtype: 'POST',
        // 타이틀
        caption: "수주현황조회 | MES",
        colNames: ['','접수일', '수주번호', '수주처', 'End User', '진행상태', '진행여부', '납기일', 'Part No','수량','단위','수축튜브','비고'],
        colModel: [
            {name:'radio',index:'radio',align:"center",width:30 ,sortable: false, formatter: function (cellValue, option,rowObject) {
                    return '<input type="radio" name="radio_' + option.gid + '" onclick="jqGrid_row_check(\'#crmSearchGrid\''+','+'\''+rowObject.ord_no+'\''+');"/>';
            }},
            {name: 'work_date', index: 'work_date', sortable: false, width: 40 ,formatter: formmatterDate2},
            {name: 'ord_no', index: 'ord_no', key:true, sortable: false, width: 60},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 60},
            {name: 'end_supp_name', index: 'end_supp_name', sortable: false, width: 60},
            {name: 'status1_name', index: 'status1_name', sortable: false, width: 30},
            {name: 'status2_name', index: 'status2_name', sortable: false, width: 30},
            {name: 'end_date', index: 'end_date', sortable: false, width: 40,formatter:formmatterDate2},
            {name: 'part_desc', index: 'part_desc', sortable: false, width: 110},
            {name: 'qty', index: 'qty', sortable: false, width: 50, align: 'right',formatter:'number'},
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 30},
            {name: 'tube_name', index: 'tube_name', sortable: false, width: 50},
            {name: 'remark', index: 'remark', sortable: false, width: 60},
        ],
        autowidth: true,
        height: 250,
        rowNum: 100,
        pager: '#crmSearchGridPager',
        jsonReader: {cell:""},
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {
            var radio = $(e.target).closest('tr').find('input[type="radio"]');
            $('input[name="radio_SuppSearchGrid"]').removeAttr("checked").trigger('change');
            radio.prop('checked', true).trigger('change');
            return true; // allow row selection
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            crmModal_check();

        }

    });
}

function crm_datepickerInput_modal() {
    datepicker_makes("#crm_datepicker", -1);
    datepicker_makes("#crm_datepicker2", 0);
}


