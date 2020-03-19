/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly:[],
    auth:{}
}

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main(); // main 그리드 생성
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]')); // 그리드 리사이즈
    selectBox();
    modal_start1();
    datepickerInput();
    authcheck();
    jqgridPagerIcons(); // 그리드 아이콘 설정
});

////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data_post = main_data.send_data;
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');

    $("#mes_grid").setGridParam({
        url: '/sysERateGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/sysERateGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset('.modal_value',main_data.readonly);
        modalValuePush("#currency_select","#currency_code","#currency_name");
        $("#datepicker3").prop("disabled", false);

        var date = new Date();
        var date2 = new Date();
        date2.setDate(date.getDate()+1);
        $('#datepicker3').datepicker('setDate',date);
        $('#datepicker4').datepicker('setDate',date2);
        main_data.check = 'I'; // 추가인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert("추가권한이 없습니다,");
    }
}

function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu4 = String.fromCharCode(4);
        var gu5 = String.fromCharCode(5);

        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                wrapWindowByMask2();
                var list = [];
                var data;
                ids.forEach(function (id) {
                    data = $('#mes_grid').jqGrid('getRowData', id);
                    data.start_date = data.start_date.replace(/\-/g, '');

                    list.push(data.start_date + gu4 + data.currency_code);
                });

                main_data.check = 'D';
                callback(function () {
                    ccn_ajax("/sysERateDel", {keyword: list.join(gu5)}).then(function (data) {
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
                });

            }
        }
    } else {
        alert("삭제권한이 없습니다.");
    }
}


function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        main_data.check='U';
        $("#datepicker3").prop("disabled", true);

        jqgrid_data.start_date=jqgrid_data.start_date.replace(/\-/g, '');
        ccn_ajax('/sysERateOneGet', jqgrid_data).then(function (data) {
            data.start_date=(formmatterDate2(data.start_date));
            data.stop_date=(formmatterDate2(data.stop_date));
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#addDialog").dialog('open');
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}

////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysERate"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);
}

function selectBox() {
    select_data_makes('#currency_select','/sysCommonAllGet','code_value','code_name1',{keyword:'CURRENCY_TYPE'});
}

function jqGrid_main() {
    //jqGrid 생성
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['no','화폐단위','currency_code','시작일', '종료일', '환율', '사용유무'],
        colModel: [
            {name: 'rownum', index:'code_type',key:true,hidden:true},
            {name: 'currency_name', index: 'currency_name',sortable: false, width: 200,fixed:true},
            {name: 'currency_code', index: 'currency_code',hidden:true,sortable: false},
            {name: 'start_date', index: 'start_date',sortable: false, width: 180, formatter: formmatterDate2,fixed:true},
            {name: 'stop_date', index: 'stop_date',sortable: false, width: 180, formatter: formmatterDate2,fixed:true},
            {name: 'exch_rate', index: 'exch_rate',sortable: false, width: 150,fixed:true,align:"right",formatter:'number'},
            {name: 'use_yn', index: 'use_yn',sortable: false, width: 100,fixed:true}
        ],
        caption: "환율관리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) {            // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}
