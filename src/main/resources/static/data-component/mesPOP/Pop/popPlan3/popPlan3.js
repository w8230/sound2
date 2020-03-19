/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    readonly: [],
    auth:{},
    check2 : 'Y'
};
////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();

    authcheck();
    modal_start1();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    jqGridResize('#mes_grid2', $('#mes_grid2').closest('[class*="col-"]'));
    selectBox();
    datepickerInput();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data_post = main_data.send_data;
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.stop_date = main_data.send_data.stop_date.replace(/\-/g, '');
    $('#mes_grid2').jqGrid("clearGridData");
    main_data.send_data.keyword = '';
    $("#mes_grid").setGridParam({
        url: '/popPlan2Get2',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $('#mes_grid2').jqGrid("clearGridData");
    $("#mes_grid").setGridParam({
        url: '/popPlan2Get2',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}


function under_get(rowid) {
    $("#mes_grid2").setGridParam({
        url: '/popPlan3Get',
        datatype: "json",
        page: 1,
        postData: {keyword: rowid}
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        main_data.check = 'I'; // 저장인지 체크
        $("#addDialog").dialog('open');
    } else {
        alert("추가권한이 없습니다,");
    }
}

function select_change1(value) {
    part_type_select_ajax_all('#part_prod_select', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:'B', keyword2:value}).then(function (){
        $('#part_name_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_name_select').append(option);
        $('#part_name_select').select2();
    }).catch(function (err){
        $('#part_prod_select').empty();
        $('#part_name_select').empty();
        var option = $("<option></option>").text('전체').val('');
        var option2 = $("<option></option>").text('전체').val('');
        $('#part_prod_select').append(option);
        $('#part_name_select').append(option2);
    });


}
function select_change2(value) {
    if(value == null || value == ''){
        $('#part_name_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_name_select').append(option);
    }else {
        part_type_select_ajax_all('#part_name_select', "/sysPartNameAllGet","part_code" ,"part_name",{keyword:'B', keyword2:$('#part_group_select').val(), keyword3:value}).catch(function (err){
            $('#part_name_select').empty();
            var option = $("<option></option>").text('전체').val('');
            $('#part_name_select').append(option);
        });

    }
}


function update_btn(jqGrid_data) {
        $('#mes_modal1_grid1').jqGrid('clearGridData');

        ccn_ajax("/popPlan3AllGet", {keyword: jqGrid_data.plan_no2}).then(function (data) {

            var num = data.length;

            main_data.check = 'I'
            if (num > 0 ){
                main_data.check = 'U'
            }

            if ( main_data.check == 'U' && main_data.auth.check_edit =="N") {
                alert("수정권한이 없습니다.");
            } else if( main_data.check == 'I' && main_data.auth.check_add =="N"){
                alert("추가권한이 없습니다.");
            } else {
                if (data.length !== 0){
                    $("#mes_modal1_grid1").setGridParam({
                        datatype: "local",
                        data: data
                    }).trigger("reloadGrid");
                }

                modal1_data = {
                    plan_no2 : jqGrid_data.plan_no2,
                    plan_qty:jqGrid_data.plan_qty,
                    plan_date:jqGrid_data.plan_date.replace(/\-/g, ''),
                    end_date:jqGrid_data.end_date.replace(/\-/g, ''),
                    work_user_code:jqGrid_data.work_user_code,
                    work_user_name:jqGrid_data.work_user_name,
                    line_code:jqGrid_data.line_code
                }


                $("#addDialog").dialog('open');
                jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
            }

        });

}


////////////////////////////호출 함수//////////////////////////////////
function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);
}

function selectBox() {
    part_type_select_ajax_all("#part_group_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name", {keyword: 'B'}).then(function () {
        $('#part_prod_select').empty();
        $('#part_name_select').empty();
        var option = $("<option></option>").text('전체').val('');
        var option2 = $("<option></option>").text('전체').val('');
        $('#part_prod_select').append(option);
        $('#part_name_select').append(option2);
        $('#part_prod_select').select2();
        $('#part_name_select').select2();
    });

    select_makes_sub("#line_select", "/sysProdLineAllGet", "line_code", "line_name",{keyword:'1'},'Y');
}



function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popPlan3"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: 'local',
        caption: '생산계획(3단계) | MES',
        colNames: ['등록번호', '공정명', 'line_code', '품명', '계획량','생산량','계획일','품목군','제품군','제품명','제품유형','용도','생산구분','등록자','작업자','work_user_code','등록일','마감일','Remark','비고','status'],
        colModel: [
            {name: 'plan_no2', index: 'plan_no2', width: 150,key:true, sortable: false,fixed:true},
            {name: 'line_name', index: 'line_name', width: 100, sortable: false,fixed:true},
            {name: 'line_code', index: 'line_code', hidden:true, sortable: false},
            {name: 'part_name', index: 'part_name', width: 150, sortable: false,fixed:true},
            {name: 'plan_qty', index: 'plan_qty', width: 100, sortable: false, align: 'right',formatter:'number',fixed:true},
            {name: 'work_qty', index: 'work_qty', width: 100, sortable: false, align: 'right',formatter:'number',fixed:true},
            {name: 'plan_date', index: 'plan_date', width: 100, sortable: false,formatter: formmatterDate2,fixed:true},
            {name: 'part_grp_name1', index: 'part_grp_name1', width: 150, sortable: false,fixed:true},
            {name: 'part_grp_name2', index: 'part_grp_name2', width: 150, sortable: false,fixed:true},
            {name: 'part_name2', index: 'part_name2', width: 150, sortable: false,fixed:true},
            {name: 'part_type_name', index: 'part_type_name', width: 100, sortable: false,fixed:true},
            {name: 'prod_type_name', index: 'prod_type_name', width: 100, sortable: false,fixed:true},
            {name: 'prod_dept_name', index: 'prod_dept_name', width: 100, sortable: false,fixed:true},
            {name: 'user_name', index: 'user_name', width: 150, sortable: false,fixed:true},
            {name: 'work_user_name', index: 'work_user_name', width: 150, sortable: false,fixed:true},
            {name: 'work_user_code', index: 'work_user_code', hidden:true, sortable: false},
            {name: 'update_date', index: 'update_date', width: 180, sortable: false,formatter: formmatterDate,fixed:true},
            {name: 'end_date', index: 'end_date', width: 150, sortable: false,formatter: formmatterDate2,fixed:true},
            {name: 'remark', index: 'remark', width: 300, sortable: false,fixed:true},
            {name: 'remark1', index: 'remark1', width: 300, sortable: false,fixed:true},
            {name: 'status', index: 'status', hidden:true, sortable: false}
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
            if (data.status === '0' || data.status === '1') {
                main_data.check2 = 'Y';
            } else {
                main_data.check2 = 'N';
            }
            update_btn(data);
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
        datatype: 'local',
        caption: '생산계획(3단계) | MES',
        colNames: ['지시번호', '공정명', '품명', '계획량','생산량' ,'용도','생산구분','품목군','제품군','등록자','작업자','등록일','마감일','Remark','비고'],
        colModel: [
            {name: 'plan_no3', index: 'plan_no3', width: 150, sortable: false,fixed:true},
            {name: 'line_name', index: 'line_name', width: 100, sortable: false,fixed:true},
            {name: 'part_name', index: 'part_name', width: 150, sortable: false,fixed:true},
            {name: 'plan_qty', index: 'plan_qty', width: 100, sortable: false, align: 'right',formatter:'number',fixed:true},
            {name: 'work_qty', index: 'work_qty', width: 100, sortable: false, align: 'right',formatter:'number',fixed:true},
            {name: 'prod_type_name', index: 'prod_type_name', width: 100, sortable: false,fixed:true},
            {name: 'prod_dept_name', index: 'prod_dept_name', width: 100, sortable: false,fixed:true},
            {name: 'part_grp_name1', index: 'part_grp_name1', width: 150, sortable: false,fixed:true},
            {name: 'part_grp_name2', index: 'part_grp_name2', width: 150, sortable: false,fixed:true},
            {name: 'user_name', index: 'user_name', width: 150, sortable: false,fixed:true},
            {name: 'work_user_name', index: 'work_user_name', width: 150, sortable: false,fixed:true},
            {name: 'update_date', index: 'update_date', width: 180, sortable: false,formatter: formmatterDate,fixed:true},
            {name: 'end_date', index: 'end_date', width: 150, sortable: false,formatter: formmatterDate2,fixed:true},
            {name: 'remark', index: 'remark', width: 300, sortable: false,fixed:true},
            {name: 'remark1', index: 'remark1', width: 300, sortable: false,fixed:true}
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