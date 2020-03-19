/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: ['part_length','plan_qty'],
    auth:{}
};
////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {

    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    authcheck();
    datepickerInput();
    selectBox();
    modal_start1();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.stop_date = main_data.send_data.stop_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: '/popPlanASSYGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/popPlanASSYGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add != "N") {
        main_data.check = 'I';
        modal_reset(".modal_value", main_data.readonly);

        if($('#part_group_select').val() != '' && $('#part_group_select').val() != null ){
            $('#part_group_select_modal1').val($('#part_group_select').val()).trigger("change");
            // if($('#part_prod_select').val() !=''&& $('#part_prod_select').val() != null){}
        }else {
            $('#part_group_select_modal1 option:eq(0)').prop("selected", true).trigger("change");
        }

        $('#unit_select_modal1 option:eq(0)').prop("selected", true).trigger("change");
        $('#prod_type_select option:eq(0)').prop("selected", true).trigger("change");
        $('#prod_dept_select_modal1 option:eq(0)').prop("selected", true).trigger("change");
        $('#line_user_select_modal1 option:eq(0)').prop("selected", true).trigger("change");

        var date = new Date();
        var date2 = new Date();
        date2.setDate(date.getDate()+1);
        $('#datepicker3').datepicker('setDate',date);
        $('#datepicker4').datepicker('setDate',date2);
        make_disable(false);
        $("#addDialog").dialog('open');
    } else {
        alert("추가권한이 없습니다,");
    }
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        main_data.check = 'U';
        console.log(jqgrid_data);
        modal_reset(".modal_value", []);
        ccn_ajax('/popPlanASSYOneGet', jqgrid_data).then(function (data) {
            data.plan_date = data.plan_date.substring(0,4)+'-'+data.plan_date.substring(4,6)+'-'+data.plan_date.substring(6);
            data.end_date = data.end_date.substring(0,4)+'-'+data.end_date.substring(4,6)+'-'+data.end_date.substring(6);
            console.log(data);
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력


            $('#part_group_select_modal1').val(data.part_grp_code).trigger("change");

            part_type_select_ajax("#part_prod_select_modal1", "/sysPartGroup2AllGet", "part_grp_code2", "part_grp_name2", {keyword: 'B', keyword2:data.part_grp_code}).then(function () {
                $('#part_prod_select_modal1').val(data.part_grp_code2).trigger("change");
                part_type_select_ajax("#part_name_select_modal1", "/sysPartNameAllGet", "part_code", "part_name", {keyword: 'B', keyword2: data.part_grp_code, keyword3: data.part_grp_code2}).then(function(value2){
                    $('#part_name_select_modal1').val(data.part_code).trigger("change");
                    part_type_select_ajax("#part_code1_select_modal1", "/crmAssyCableAllGet", "part_code", "part_name", {keyword:data.part_code}).then(function (){
                        $('#part_code1_select_modal1').val(data.part_code1).trigger("change");
                    });
                    part_type_select_ajax("#part_code2_select_modal1", "/crmAssyCableAllGet", "part_code", "part_name", {keyword:data.part_code}).then(function(){
                        $('#part_code2_select_modal1').val(data.part_code2).trigger("change");
                    });
                    make_disable(true);
                    $("#addDialog").dialog('open');

                });
            });
        });
    }else {
        alert("수정권한이 없습니다.");
    }
}

function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                wrapWindowByMask2();
                main_data.check = 'D';
                callback(function () {
                    ccn_ajax("/popPlanASSYDel", {keyword: ids.join(gu5)}).then(function (data) {
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

function make_disable(what) {
    $("#datepicker3").prop("disabled",what).trigger('change');
    $("#part_group_select_modal1").prop("disabled",what).trigger('change');
    $("#part_prod_select_modal1").prop("disabled",what).trigger('change');
    $("#part_name_select_modal1").prop("disabled",what).trigger('change');
    $("#part_code1_select_modal1").prop("disabled",what).trigger('change');
    $("#part_code2_select_modal1").prop("disabled",what).trigger('change');
    $("#unit_select_modal1").prop("disabled",what).trigger('change');
}


function select_change1(value) {
    part_type_select_ajax_all('#part_prod_select', "/sysPartGroup2AllGet", "part_grp_code2", "part_grp_name2", {keyword: 'B', keyword2: value});
}
////////////////////////////호출 함수//////////////////////////////////
function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);
}

function selectBox() {
    part_type_select_ajax_all("#part_group_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name", {keyword: 'B'}).then(function () {
        $('#part_prod_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_prod_select').append(option);
        $('#part_prod_select').select2();
    });
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popPlanASSY"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['등록번호','품명','커넥터1','커넥터2','길이','단위','계획량','생산량','계획일','용도','생산구분','품목군','제품군','등록자','작업자','등록일','마감일','Remark','비고'],
        colModel: [
            {name: 'plan_no3', index: 'plan_no3', key:true,sortable: false, width: 150,fixed:true},
            {name: 'part_name', index: 'part_name',sortable: false, width: 150,fixed:true},
            {name: 'part_name1', index: 'part_name1',sortable: false, width: 150,fixed:true},
            {name: 'part_name2', index: 'part_name2',sortable: false, width: 150,fixed:true},
            {name: 'part_length', index: 'part_length',sortable: false, width: 100,fixed:true,formatter:'number',align:'right'},
            {name: 'unit_name', index: 'unit_name',sortable: false, width: 100,fixed:true},
            {name: 'plan_qty', index: 'plan_qty',sortable: false, width: 100, align: 'right',formatter:'number',fixed:true},
            {name: 'work_qty', index: 'work_qty',sortable: false, width: 100, align: 'right',formatter:'number',fixed:true},
            {name: 'plan_date', index: 'plan_date',sortable: false, width: 150, formatter: formmatterDate2,fixed:true},
            {name: 'prod_type_name', index: 'prod_type_name',sortable: false, width: 100,fixed:true},
            {name: 'prod_dept_name', index: 'prod_dept_name',sortable: false, width: 100,fixed:true},
            {name: 'part_grp_name', index: 'part_grp_name',sortable: false, width: 150,fixed:true},
            {name: 'part_grp_name2', index: 'part_grp_name2',sortable: false, width: 150,fixed:true},
            {name: 'user_name', index: 'user_name',sortable: false, width: 150,fixed:true},
            {name: 'work_user_name', index: 'work_user_name',sortable: false, width: 150,fixed:true},
            {name: 'update_date', index: 'update_date',sortable: false, width: 180, formatter: formmatterDate,fixed:true},
            {name: 'end_date', index: 'end_date',sortable: false, width: 150, formatter: formmatterDate2,fixed:true},
            {name: 'remark', index: 'remark',sortable: false, width: 300,fixed:true},
            {name: 'remark1', index: 'remark1',sortable: false, width: 300,fixed:true}
        ],
        caption: "생산계획등록(ASSY) | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        multiselect : true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
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

