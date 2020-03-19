/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var grid_data = [];

var main_data = {
    check: 'I',
    supp_check: 'A',
    send_data: {},
    send_data_post: {},
    readonly:[],
    auth:{}
};

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqgridPagerIcons();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    authcheck();
    suppModal_start();
    datepickerInput();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");

    if (main_data.send_data.keyword2 !== ''){
        main_data.send_data.keyword = main_data.send_data.keyword.replace(/\-/g, '');
        main_data.send_data_post = main_data.send_data;
        $("#mes_grid").setGridParam({
            url: '/scmPartCloseGet',
            datatype: "json",
            page: page,
            postData: main_data.send_data
        }).trigger("reloadGrid");
    } else {
        alert("업체를 선택해주세요");
    }
}



function supp_btn(what) {
    main_data.supp_check = what;

    $("#SuppSearchGrid").jqGrid('clearGridData');
    $("#supp-search-dialog").dialog('open');
    $('#gubun_select option:eq(0)').prop("selected", true).trigger("change");
    $('#supp_code_search').val('').trigger("change");

    jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));

}

function suppModal_bus(code, name) {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val(name);
        $("#supp_code_main").val(code);
    } else if (main_data.supp_check === 'B') {
        $("#supp_name_modal").val(name);
        $("#supp_code_modal").val(code);
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');

}

function suppModal_close_bus() {
    if (main_data.supp_check === 'A') {

    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

function add_btn() {
    if(main_data.auth.check_add != "N") {

        var ids =  $("#mes_grid").getRowData(); // 체크된 그리드 로우
        if (ids.length === 0) {
            alert("마감처리하는 데이터를 조회해주세요");
        } else {
            if (confirm("마감처리 하겠습니까?")) {
                var send_data = {};
                send_data.keyword = main_data.send_data_post.keyword;
                send_data.keyword2 = main_data.send_data_post.keyword2;
                send_data.keyword3 = $("#remark").val();
                console.log(send_data);
                wrapWindowByMask2();
                ccn_ajax("/scmPartCloseAdd", send_data).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        $('#mes_grid').trigger("reloadGrid");
                        $("#remark").val("");

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



////////////////////////////호출 함수//////////////////////////////////
function datepickerInput() {
    datepicker_makes("#datepicker", 0);
}


function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "scmPartClose"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['입고일자', '업체', '전표번호', '구분', '품번', '품명', '입고수량'],
        colModel: [
            {name: 'work_date', index: 'work_date' ,formatter: formmatterDate2, sortable: false,fixed:true,width:150},
            {name: 'supp_name', index: 'supp_name', sortable: false,fixed:true,width:150},
            {name: 'ch_no', index: 'ch_no', sortable: false,fixed:true,width:150},
            {name: 'this_name', index: 'this_name', sortable: false,fixed:true,width:150},
            {name: 'part_code', index: 'part_code', sortable: false,fixed:true,width:150},
            {name: 'part_name', index: 'part_name', sortable: false,fixed:true,width:150},
            {name: 'qty', index: 'qty', sortable: false, align: 'right',formatter:'number',width:100,fixed:true}
        ],
        caption: "마감처리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

