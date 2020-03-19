/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
/**
 * @desc : 사용자관리 main 데이터
 * @생성자 : 김종효
 * @생성일 : 2019-11-12
 * */
var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    check2: 'Y',
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////
/**
 * @desc : 사용자관리 main 시작 함수
 * @생성자 : 김종효
 * @생성일 : 2019-11-12
 * */
$(document).ready(function () {
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqGridResize("#mes_grid2", $('#mes_grid2').closest('[class*="col-"]'));
    datepickerInput();
    /*----모달----*/
    modal_start1();
    crmModal_start();
    selectBox();
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
        url: "/wmsOutOrderGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
    $('#mes_grid2').jqGrid('clearGridData');
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/wmsOutOrderGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
    $('#mes_grid2').jqGrid('clearGridData');
}

function under_get(rowid) {

    $("#mes_grid2").setGridParam({
        url: '/wmsOutOrderSubGet',
        datatype: "json",
        page: 1,
        postData: {keyword: rowid,keyword2:''}
    }).trigger("reloadGrid");
}


function add_btn() {
    if (main_data.auth.check_add !="N") {
        main_data.check = 'I';
        main_data.check2 = 'Y';
        modal_reset(".modal_value", []);
        $("#datepicker3").datepicker('setDate', 'today');
        $("#ord_no").prop("disabled",false).trigger('change');
        $("#mes_modal_grid").jqGrid('clearGridData');

        $("#addDialog").dialog('open');
        jqGridResize2("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]'));
    } else {
        alert("추가권한이 없습니다,");
    }
}




function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        var check = '';
        var check2 = [];
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            ids.forEach(function (id) {
                check = $('#mes_grid').jqGrid('getRowData', id).status_name;
                if (check === '완료') {
                    check2.push(id);
                }

            })
            if (check2.length > 0) {
                alert(check2.join(",") + " 전표가 출고 완료 되어있습니다.");
            } else {
                if (confirm("삭제하겠습니까?")) {
                    main_data.check = 'D';
                    wrapWindowByMask2();
                    ccn_ajax("/wmsOutOrderDel", {keyword: ids.join(gu5)}).then(function (data) {
                        if (data.result === 'NG') {
                            alert(data.message);
                        } else {
                            get_btn_post($("#mes_grid").getGridParam('page'));
                        }
                        $('#mes_grid2').jqGrid('clearGridData');
                        closeWindowByMask();
                    }).catch(function (err) {
                        closeWindowByMask();
                        console.error(err); // Error 출력
                    });
                }
            }
            $('#mes_grid').jqGrid("resetSelection");


        }
    } else {
        alert("삭제권한이 없습니다.");
    }
}


////////////////////////////호출 함수/////////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "wmsOutOrder"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);

}

function selectBox() {
    $('#wms_qc_select').select2();
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        mtype: 'POST',
        datatype: "local",
        // 다중 select
        multiselect: true,
        // 타이틀
       caption: "제품출고 지시 | MES",
       colNames: ['요청일자','요청번호','처리구분','등록자','등록일시','처리자','출고일시'],
       colModel: [
           {name: 'work_date', index: 'work_date' ,formatter: formmatterDate2, sortable: false,fixed:true,width:150},
           {name: 'req_no', index: 'req_no', key: true, sortable: false,fixed:true,width:150},
           {name: 'status_name', index: 'status_name', sortable: false,fixed:true,width:100},
           {name: 'user_name', index: 'user_name', sortable: false,fixed:true,width:150},
           {name: 'update_date', index: 'update_date', sortable: false,formatter: formmatterDate,fixed:true,width:180},
           {name: 'out_user_name', index: 'out_user_name', sortable: false,fixed:true,width:150},
           {name: 'out_update_date', index: 'out_update_date',formatter: formmatterDate, sortable: false,fixed:true,width:180}

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
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            if (data.status_name === '완료') {
                main_data.check2 = 'N';
            } else {
                main_data.check2 = 'Y';
            }
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
        datatype: "local",
        caption: "제품출고 지시 | MES",
       colNames: ['전표번호','품번','품명','규격','조립정보','단위','요청수량','출고수량'],
       colModel: [
           {name: 'req_no', index: 'req_no', width: 150, sortable: false,fixed:true},
           {name: 'part_code', index: 'part_code', width: 150, sortable: false,fixed:true},
           {name: 'part_name', index: 'part_name', width: 150, sortable: false,fixed:true},
           {name: 'spec', index: 'spec', width: 150, sortable: false,fixed:true},
           {name: 'part_desc', index: 'part_desc', width: 250, sortable: false,fixed:true},
           {name: 'unit_name', index: 'unit_name', width: 100, sortable: false,fixed:true},
           {name: 'req_qty', index: 'req_qty', width: 100, sortable: false, align: 'right',formatter:'number',fixed:true},
           {name: 'qty', index: 'qty', width: 100, sortable: false, align: 'right',formatter:'number',fixed:true}

       ],
        autowidth: true,
        viewrecords: true,
        height: 194,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager2',
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }

    });

}

var save_rowid;



