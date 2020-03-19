/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [],
    auth:{}
};
////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    authcheck();
    modal_start1();
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

    $("#mes_grid").setGridParam({
        url: '/popPlan1Get',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/popPlan1Get',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly);
        main_data.check = 'I'; // 저장인지 체크
        $("#datepicker3").prop("disabled",false).trigger('change');
        $("#part_group_select_modal1").prop("disabled",false).trigger('change');
        $("#part_prod_select_modal1").prop("disabled",false).trigger('change');
        $("#part_name_select_modal1").prop("disabled",false).trigger('change');

        $('#part_group_select_modal1 option:eq(0)').prop("selected", true).trigger("change");
        $('#part_prod_select_modal1 option:eq(0)').prop("selected", true).trigger("change");
        $('#part_name_select_modal1 option:eq(0)').prop("selected", true).trigger("change");
        $('#prod_type_select option:eq(0)').prop("selected", true).trigger("change");
        $('#prod_dept_select option:eq(0)').prop("selected", true).trigger("change");

        var date = new Date();
        var date2 = new Date();
        date2.setDate(date.getDate()+1);
        $('#datepicker3').datepicker('setDate',date);
        $('#datepicker4').datepicker('setDate',date2);

        $("#addDialog").dialog('open');
    } else {
        alert("추가권한이 없습니다,");
    }
}
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        main_data.check = 'U';
        modal_reset(".modal_value", []);
        jqgrid_data.end_date = jqgrid_data.end_date.replace(/[^0-9]/g, '');
        jqgrid_data.plan_date = jqgrid_data.plan_date.replace(/[^0-9]/g, '');

        ccn_ajax('/popPlan1OneGet', jqgrid_data).then(function (data) {
            data.plan_date = data.plan_date.substring(0,4)+'-'+data.plan_date.substring(4,6)+'-'+data.plan_date.substring(6);
            data.end_date = data.end_date.substring(0,4)+'-'+data.end_date.substring(4,6)+'-'+data.end_date.substring(6);

            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            part_type_select_ajax('#part_prod_select_modal1', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:'B', keyword2:data.part_grp_code}).then(function (){
                $('#part_prod_select_modal1').val(data.part_grp_code2).trigger("change");
                part_type_select_ajax('#part_name_select_modal1', "/sysPartNameAllGet","part_code" ,"part_name",{keyword:'B', keyword2:data.part_grp_code, keyword3:data.part_grp_code2}).then(function (data3){
                    $('#part_name_select_modal1').val(data.part_code).trigger("change");
                });
            }).catch(function (err){
                $('#part_prod_select_modal1').empty();
                $('#part_name_select_modal1').empty();
            });

            $("#datepicker3").prop("disabled",true).trigger('change');
            $("#part_group_select_modal1").prop("disabled",true).trigger('change');
            $("#part_prod_select_modal1").prop("disabled",true).trigger('change');
            $("#part_name_select_modal1").prop("disabled",true).trigger('change');
            $("#addDialog").dialog('open');
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}
function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var gu4 = String.fromCharCode(4);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
        console.log(ids);

        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                main_data.check = 'D';
                wrapWindowByMask2();

                var data;
                var list = [];
                var list2 = [];
                ids.forEach(function (id) {
                    data = $('#mes_grid').jqGrid('getRowData', id);
                    if(data.status !== '0') {
                        list2.push(data.plan_no1);
                    }
                    list.push(data.plan_no1 + gu4 + data.status);
                })
                if(list2.length > 0 ){
                    alert(list2[0]+"는 대기 상태가 아닙니다.");
                    closeWindowByMask();
                }else {
                    ccn_ajax("/popPlan1Del", {keyword: list.join(gu5)}).then(function (data) {
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
        }
    } else {
        alert("삭제권한이 없습니다.");
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
    console.log(value);
    console.log($('#part_group_select').val());
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

////////////////////////////호출 함수//////////////////////////////////
function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popPlan1"}).then(function (data) {
        main_data.auth = data;
    });
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
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['등록번호','현황','status','제품명','계획량','생산량','작업구분','생산구분','품목군','part_grp_code','제품군','part_grp_code2','part_code','등록자','등록일','마감일','Remark','비고','계획일'],
        colModel: [
            {name: 'plan_no1', index: 'plan_no1',key:true,sortable: false, width: 150,fixed:true},
            {name: 'status_name', index: 'status_name',sortable: false, width: 100,fixed:true},
            {name: 'status', index: 'status',sortable: false,hidden:true},
            {name: 'part_name', index: 'part_name',sortable: false, width: 150,fixed:true},
            {name: 'plan_qty', index: 'plan_qty',sortable: false, width: 100, align: 'right',formatter:'number',fixed:true},
            {name: 'work_qty', index: 'work_qty',sortable: false, width: 100, align: 'right',formatter:'number',fixed:true},
            {name: 'prod_type_name', index: 'prod_type_name',sortable: false, width: 100,fixed:true},
            {name: 'prod_dept_name', index: 'prod_dept_name',sortable: false, width: 100,fixed:true},
            {name: 'part_grp_name1', index: 'part_grp_name1',sortable: false, width: 150,fixed:true},
            {name: 'part_grp_code', index: 'part_grp_name1',sortable: false,hidden:true},
            {name: 'part_grp_name2', index: 'part_grp_name2',sortable: false, width: 150,fixed:true},
            {name: 'part_grp_code2', index: 'part_grp_code2',sortable: false,hidden:true},
            {name: 'part_code', index: 'part_code',sortable: false,hidden:true},
            {name: 'user_name', index: 'user_name',sortable: false, width: 150,fixed:true},
            {name: 'update_date', index: 'update_date',sortable: false, width: 180,formatter: formmatterDate,fixed:true},
            {name: 'end_date', index: 'end_date',sortable: false, width: 150,formatter: formmatterDate2,fixed:true},
            {name: 'remark', index: 'remark',sortable: false, width: 300,fixed:true},
            {name: 'remark1', index: 'remark1',sortable: false, width: 300,fixed:true},
            {name: 'plan_date', index: 'plan_date',sortable: false,hidden:true}
        ],
        caption: "생산계획(1단계) | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
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
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

