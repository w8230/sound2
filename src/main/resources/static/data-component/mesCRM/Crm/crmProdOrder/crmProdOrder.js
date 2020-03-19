/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    auth:{}

};

////////////////////////////시작 함수/////////////////////////////////
$(document).ready(function () {
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
});
////////////////////////////클릭 함수////////////////////////////////
function get_btn(page) {
    modal_reset(".main_value",[]);
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: "/crmProdOrderGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");

}

function get_btn_post(page) {
    modal_reset(".main_value",[]);
    $("#mes_grid").setGridParam({
        url: '/crmProdOrderGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function update_btn(rowid) {
    ccn_ajax('/crmProdOrderOneGet', {ord_no: rowid}).then(function (data) {
        data.price= comma(data.price);
        data.unit_price= comma(data.unit_price);

        modal_edits(".main_value",[],data);
    });
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                main_data.check = 'D';
                wrapWindowByMask2();
                ccn_ajax("/crmProdOrderDel", {keyword: ids.join(gu5)}).then(function (data) {
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


function add_btn() {
    if(main_data.auth.check_add != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
        if (ids.length === 0) {
            alert("지시하는 데이터를 선택해주세요");
        } else {
            if (confirm("지시하겠습니까?")) {
                main_data.check = 'I';
                wrapWindowByMask2();
                ccn_ajax("/crmProdOrderAdd", {keyword: ids.join(gu5)}).then(function (data) {
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
        alert("추가권한이 없습니다.");
    }
}

function excel_download() {
    if (confirm("엑셀로 저장하시겠습니까?")) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data: {
                "name":"crmProdOrder",
                "row0":$('#datepicker').val().replace(/-/gi,""),
                "row1": $('#datepicker2').val().replace(/-/gi,""),
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
    ccn_ajax("/menuAuthGet", {keyword: "crmProdOrder"}).then(function (data) {
        main_data.auth = data;
    });
}


function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);

}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: 'local',
        caption: '구매생산지시 | MES',
        colNames: ['접수일', '수주번호', '수주처', 'End User', '진행상태', '진행여부', '납기일', '지시상태', 'Part No','규격','수량','단위','수축튜브','비고'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 150 ,formatter: formmatterDate2,fixed:true},
            {name: 'ord_no', index: 'ord_no', key:true, sortable: false, width: 150,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150,fixed:true},
            {name: 'end_supp_name', index: 'end_supp_name', sortable: false, width: 150,fixed:true},
            {name: 'status1_name', index: 'status1_name', sortable: false, width: 100,fixed:true},
            {name: 'status2_name', index: 'status2_name', sortable: false, width: 100,fixed:true},
            {name: 'end_date', index: 'end_date', sortable: false, width: 150,formatter:formmatterDate2,fixed:true},
            {name: 'status3_name', index: 'status3_name', sortable: false, width: 100,fixed:true},
            {name: 'part_desc', index: 'part_desc', sortable: false, width: 450,fixed:true},
            {name: 'spec', index: 'spec', sortable: false, width: 150,fixed:true},
            {name: 'qty', index: 'qty', sortable: false, width: 100, align: 'right',formatter:'number',fixed:true},
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 100,fixed:true},
            {name: 'tube_name', index: 'tube_name', sortable: false, width: 100,fixed:true},
            {name: 'remark', index: 'remark', sortable: false, width: 400,fixed:true}
        ],
        multiselect: true,
        autowidth: true,
        viewrecords: true,
        height: 562,
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
            update_btn(rowid)
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    });

}

var save_rowid;