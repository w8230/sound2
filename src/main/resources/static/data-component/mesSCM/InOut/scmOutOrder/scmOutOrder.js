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
    auth: {}
};

////////////////////////////시작 함수/////////////////////////////////////
/**
 * @desc : 사용자관리 main 시작 함수
 * @생성자 : 김종효
 * @생성일 : 2019-11-12
 * */
$(document).ready(function () {
    jqGrid_main();
    jqGridResize("#scmOutOrderTopGrid", $('#scmOutOrderTopGrid').closest('[class*="col-"]'));
    jqGridResize("#scmOutOrderBottomGrid", $('#scmOutOrderBottomGrid').closest('[class*="col-"]'));
    datepickerInput();
    /*----모달----*/
    modal_start1();
    authcheck();
    selectBox();
    jqgridPagerIcons();

});


////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;
    $("#scmOutOrderTopGrid").setGridParam({
        url: "/scmOutOrderGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
    $('#scmOutOrderBottomGrid').jqGrid('clearGridData');
}

function get_btn_post(page) {
    $("#scmOutOrderTopGrid").setGridParam({
        url: '/scmOutOrderGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
    $('#scmOutOrderBottomGrid').jqGrid('clearGridData');
}

function under_get(rowid) {

    $("#scmOutOrderBottomGrid").setGridParam({
        url: '/scmOutOrderSup1Get',
        datatype: "json",
        page: 1,
        postData: {keyword: rowid}
    }).trigger("reloadGrid");
}


function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", []);
        modal_reset(".modal_value2", []);
        $("#scmOutOrderDialogLeftGrid").jqGrid('clearGridData');
        $("#scmOutOrderDialogRightGrid").jqGrid('clearGridData');
        $("#part_type_modal1_select").val('D').trigger("change");
        $("#datepicker3").datepicker('setDate', 'today');

        main_data.check = 'I';
        main_data.check2 = 'Y';
        $("#line_select option:eq(0)").prop("selected", true).trigger("change");
        $("#usage_select option:eq(0)").prop("selected", true).trigger("change");


        $("#scmOutOrder-add-dialog").dialog('open');
        jqGridResize2("#scmOutOrderDialogLeftGrid", $('#scmOutOrderDialogLeftGrid').closest('[class*="col-"]'));
        jqGridResize2("#scmOutOrderDialogRightGrid", $('#scmOutOrderDialogRightGrid').closest('[class*="col-"]'));

    } else {
        alert("추가권한이 없습니다,");
    }
}




function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#scmOutOrderTopGrid").getGridParam('selarrrow');
        var check = '';
        var check2 = [];
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            ids.forEach(function (id) {
                check = $('#scmOutOrderTopGrid').jqGrid('getRowData', id).status;
                if (check === '1') {
                    check2.push(id);
                }

            })
            if (check2.length > 0) {
                alert(check2.join(",") + " 전표가 출고 완료 되어있습니다.");
            } else {
                if (confirm("삭제하겠습니까?")) {
                    main_data.check = 'D';
                    wrapWindowByMask2();
                    ccn_ajax("/scmOutOrderDel", {ord_no: ids.join(gu5)}).then(function (data) {
                        if (data.result === 'NG') {
                            alert(data.message);
                        } else {
                            get_btn_post($("#scmOutOrderTopGrid").getGridParam('page'));
                        }
                        $('#scmOutOrderBottomGrid').jqGrid('clearGridData');
                        closeWindowByMask();
                    }).catch(function (err) {
                        closeWindowByMask();
                        console.error(err); // Error 출력
                    });
                }
            }
            $('#scmOutOrderTopGrid').jqGrid("resetSelection");
        }
    } else {
        alert("삭제권한이 없습니다.");
    }
}


////////////////////////////호출 함수/////////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "scmOutOrder"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);

}

function selectBox() {
    $('#qc_select').select2();
}


function jqGrid_main() {
    $("#scmOutOrderTopGrid").jqGrid({
        mtype: 'POST',
        datatype: "local",
        // 다중 select
        multiselect: true,
        // 타이틀
       caption: "출고요청 | MES",
       colNames: ['출고일자','전표번호','처리구분','처리코드','공정','용도','등록자','등록일시'],
       colModel: [
           {name: 'work_date', index: 'work_date' ,formatter: formmatterDate2,width:150, sortable: false,fixed:true},
           {name: 'ord_no', index: 'ord_no', key: true, sortable: false,width:150,fixed:true},
           {name: 'status_name', index: 'status_name', sortable: false,width:150,fixed:true},
           {name: 'status', index: 'status',hidden:true, sortable: false},
           {name: 'line_name', index: 'line_name', sortable: false,width:150,fixed:true},
           {name: 'usage_name', index: 'usage_name', sortable: false,width:150,fixed:true},
           {name: 'user_name', index: 'user_name', sortable: false,width:150,fixed:true},
           {name: 'update_date', index: 'update_date',formatter: formmatterDate,width:180, sortable: false,fixed:true}

       ],
        autowidth: true,
        viewrecords: true,
        height: 243,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#scmOutOrderTopGridPager',
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
            var data = $('#scmOutOrderTopGrid').jqGrid('getRowData', rowid);
            if (data.status === '1') {
                main_data.check2 = 'N';
            } else {
                main_data.check2 = 'Y';
            }
            update_btn(rowid);

        },
        loadComplete:function(){
            if ($("#scmOutOrderTopGrid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }

    });

    $('#scmOutOrderBottomGrid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        caption: "출고요청 | MES",
       colNames: ['전표번호','품번','품명','규격','단위','요청수량','출고수량'],
       colModel: [
           {name: 'ord_no', index: 'ord_no', width: 185, sortable: false,fixed:true},
           {name: 'part_code', index: 'part_code', width: 150, sortable: false,fixed:true},
           {name: 'part_name', index: 'part_name', width: 150, sortable: false,fixed:true},
           {name: 'spec', index: 'spec', width: 160, sortable: false,fixed:true},
           {name: 'unit_name', index: 'unit_name', width: 150, sortable: false,fixed:true},
           {name: 'qty', index: 'qty', width: 160, sortable: false, align: 'right',formatter:'number',fixed:true},
           {name: 'out_qty', index: 'out_qty', width: 160, sortable: false, align: 'right',formatter:'number',fixed:true}
       ],
        autowidth: true,
        viewrecords: true,
        height: 194,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#scmOutOrderBottomGridPager',
        loadComplete:function(){
            if ($("#scmOutOrderBottomGrid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }

    });

}
var save_rowid;



