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
};

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid',$('#mes_grid').closest('[class*="col-"]'));

    modal_start1();
    partModal_start();
    selectBox();
    authcheck();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////


function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: "/qmsTestStdGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/qmsTestStdGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly);
        $("#part_name_modal").prop("disabled", false);
        main_data.check = 'I';
        modalValuePush("#line_select","#line_code","#line_name");

        $("#addDialog").dialog('open');
    } else {
        alert("추가권한이 없습니다,");
    }
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U';
        var send_data = {};
        send_data.part_code = jqgrid_data.part_code;
        send_data.line_code = jqgrid_data.line_code;
        $("#part_name_modal").prop("disabled", true);
        ccn_ajax('/qmsTestStdOneGet', send_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#addDialog").dialog('open');
        });
    } else {
        alert("수정권한이 없습니다.");
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
                main_data.check = 'D';
                wrapWindowByMask2();

                var data;
                var list = [];
                ids.forEach(function (id) {
                    data =$('#mes_grid').jqGrid('getRowData', id);
                    list.push(data.line_code+gu4+data.part_code);
                })

                ccn_ajax("/qmsTestStdDelete", {keyword: list.join(gu5)}).then(function (data) {
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

function select_change1(value) {
    part_type_select_ajax_all('#part_group1_select', "/sysPartGroupAllGet","part_grp_code" ,"part_grp_name",{keyword:value}).then(function (){
        $('#part_group2_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_group2_select').append(option);
        $('#part_group2_select').select2();
    }).catch(function (err){
        $('#part_group1_select').empty();
        $('#part_group2_select').empty();
        var option = $("<option></option>").text('전체').val('');
        var option2 = $("<option></option>").text('전체').val('');
        $('#part_group1_select').append(option);
        $('#part_group2_select').append(option2);
    });


}
function select_change2(value) {
    if(value == null || value == ''){
        $('#part_group2_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_group2_select').append(option);
    }else {
        part_type_select_ajax_all('#part_group2_select', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:$('#part_type_select').val(), keyword2:value}).catch(function (err){

        });

    }
}
////////////////////////////호출 함수//////////////////////////////////





function selectBox() {
    select_makes3("#line_select", "/sysProdLineAllGet", "line_code", "line_name",{keyword:''});
    part_type_select_ajax("#part_type_select", "/sysPartTypeGet", "part_type_code", "part_type_name",{keyword:''}).then(function (data) {
        part_type_select_ajax_all("#part_group1_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name",{keyword:data[0].part_type_code}).then(function (data2){

            $('#part_group2_select').empty();

            var option2 = $("<option></option>").text('전체').val('');

            $('#part_group2_select').append(option2);

            $('#part_group2_select').select2();
        });
    }).catch(function (err){
        $('#part_group1_select').empty();
        $('#part_group2_select').empty();
        var option = $("<option></option>").text('전체').val('');
        var option2 = $("<option></option>").text('전체').val('');
        $('#part_group1_select').append(option);
        $('#part_group2_select').append(option2);
        $('#part_group1_select').select2();
        $('#part_group2_select').select2();
    });
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsTestStd"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: "POST",
        datatype: "local",
        colNames: ['제품코드','라인명','라인코드','제품명','1차','2차','등록자','수정일'],
        colModel: [
            {name: 'part_code', index: 'part_code',key:true, width: 50, sortable:false,hidden:true},
            {name: 'line_name', index: 'line_name', width: 50, sortable:false,hidden:true},
            {name: 'line_code', index: 'line_code', width: 50, sortable:false,hidden:true},
            {name: 'part_name', index: 'part_name', width: 50, sortable:false},
            {name: 'diameter1', index: 'diameter1', width: 50, sortable:false},
            {name: 'diameter2', index: 'diameter2', width: 50, sortable:false},
            {name: 'user_name', index: 'user_name', width: 50, sortable:false},
            {name: 'update_date', index: 'update_date', width: 50, sortable:false, formatter:formmatterDate}
        ],
        caption: "외경검사기준 | MES",
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
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        }
    });
}