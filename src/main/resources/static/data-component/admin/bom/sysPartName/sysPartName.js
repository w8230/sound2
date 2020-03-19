/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: ['series','center_wire','frequency'],
    auth:{},
    check2: 'N',
    rows:100

};

var colNames = ['코드','명칭','규격','공정유형','제품유형','품목군','제품군','등록자','등록일시','비고'];

var colNames1 = ['코드','명칭','규격','공정유형','제품유형','품목군','제품군','등록자','등록일시','비고'];
var colNames2 = ['코드','시리즈','명칭','Center Wire(Ø)','규격_1(GHz)','공정유형','제품유형','품목군','제품군','등록자','등록일시','비고'];

var colModel = [
    {name: 'part_code', index: 'part_code', key:true,sortable: false, width: 150,fixed:true},
    {name: 'part_name', index: 'part_name', sortable: false, width: 200,fixed:true},
    {name: 'frequency', index: 'frequency', sortable: false, width: 200,fixed:true},
    {name: 'route_name', index: 'route_name', sortable: false, width: 150,fixed:true},
    {name: 'part_type_name', index: 'part_type', sortable: false, width: 150,fixed:true},
    {name: 'part_grp_name1', index: 'part_grp_name1', sortable: false, width: 150,fixed:true},
    {name: 'part_grp_name2', index: 'part_grp_name2', sortable: false, width: 150,fixed:true},
    {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true},
    {name: 'update_date', index: 'update_date', sortable: false, width: 180,formatter: formmatterDate,fixed:true},
    {name: 'remark', index: 'remark', sortable: false, width: 300,fixed:true}
];

var colModel1 = [
    {name: 'part_code', index: 'part_code', key:true,sortable: false, width: 150,fixed:true},
    {name: 'part_name', index: 'part_name', sortable: false, width: 200,fixed:true},
    {name: 'frequency', index: 'frequency', sortable: false, width: 200,fixed:true},
    {name: 'route_name', index: 'route_name', sortable: false, width: 150,fixed:true},
    {name: 'part_type_name', index: 'part_type', sortable: false, width: 150,fixed:true},
    {name: 'part_grp_name1', index: 'part_grp_name1', sortable: false, width: 150,fixed:true},
    {name: 'part_grp_name2', index: 'part_grp_name2', sortable: false, width: 150,fixed:true},
    {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true},
    {name: 'update_date', index: 'update_date', sortable: false, width: 180,formatter: formmatterDate,fixed:true},
    {name: 'remark', index: 'remark', sortable: false, width: 300,fixed:true}
];

var colModel2 = [
    {name: 'part_code', index: 'part_code', key:true,sortable: false, width: 150,fixed:true},
    {name: 'series', index: 'series', sortable: false, width: 100,fixed:true},
    {name: 'part_name', index: 'part_name', sortable: false, width: 100,fixed:true},
    {name: 'center_wire', index: 'center_wire', sortable: false, width: 100,fixed:true,formatter:'number',align:"right"},
    {name: 'frequency', index: 'frequency', sortable: false, width: 100,fixed:true,formatter:'number',formatoptions:{ decimalPlaces: 1},align:"right"},
    {name: 'route_name', index: 'route_name', sortable: false, width: 150,fixed:true},
    {name: 'part_type_name', index: 'part_type', sortable: false, width: 150,fixed:true},
    {name: 'part_grp_name1', index: 'part_grp_name1', sortable: false, width: 150,fixed:true},
    {name: 'part_grp_name2', index: 'part_grp_name2', sortable: false, width: 150,fixed:true},
    {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true},
    {name: 'update_date', index: 'update_date', sortable: false, width: 180,formatter: formmatterDate,fixed:true},
    {name: 'remark', index: 'remark', sortable: false, width: 300,fixed:true}
];

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    selectBox();
    modal_start1();
    modal_start2();
    authcheck();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////

function rows_check() {
    main_data.rows =$("#mes_grid").getGridParam("rowNum");

}

function get_btn(page) {
    rows_check();
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.keyword = "B";
    main_data.send_data_post = main_data.send_data;


    grid_head_change(main_data.send_data_post);
    $.jgrid.gridUnload('#mes_grid');
    jqGrid_main();
    jqGridResize2('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();



    $("#mes_grid").setGridParam({
        url: '/sysPartNameGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}



function grid_head_change(data){

    if (data.keyword == 'B' && data.keyword2 == '01' && data.keyword3=='01'){
        colNames = colNames2;
        colModel = colModel2;
        main_data.check2 = 'Y';
    } else {
        colNames = colNames1;
        colModel = colModel1;
        main_data.check2 = 'N';
    }

}

function get_btn_post(page) {
    rows_check();
    $("#mes_grid").setGridParam({
        url: '/sysPartNameGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'I'; // 저장인지 체크
        main_data.send_data = value_return(".condition_main");
        main_data.send_data.keyword = 'B';

        if (main_data.send_data.keyword == 'B' && main_data.send_data.keyword2 == '01' && main_data.send_data.keyword3=='01'){
            $('#prod_type1_select option:eq(0)').prop("selected", true).trigger("change");
            $('#prod_jacket_select option:eq(0)').prop("selected", true).trigger("change");
            $('#route_select option:eq(0)').prop("selected", true).trigger("change");

            $("#prod_jacket_select").prop("disabled",false).trigger('change');
            $("#prod_type1_select").prop("disabled",false).trigger('change');
            $("#prod_center_conductor").prop("disabled",false).trigger('change');


            $("#addDialog").dialog('open');
        } else {

            modal_reset(".modal_value2", main_data.readonly);
            $('#route_select2 option:eq(0)').prop("selected", true).trigger("change");
            $("#addDialog2").dialog('open');
        }






    } else {
        alert("추가권한이 없습니다,");
    }
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'U'; // 수정인지 체크

        ccn_ajax('/sysPartNameOneGet',{keyword: jqgrid_data.part_code}).then(function (data) {
          if( main_data.check2 == 'Y') {
           modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#prod_jacket_select").prop("disabled",true).trigger('change');
            $("#prod_type1_select").prop("disabled",true).trigger('change');
            $("#prod_center_conductor").prop("disabled",true).trigger('change');

            $("#addDialog").dialog('open');

          } else {
              modal_reset(".modal_value2", main_data.readonly);
              modal_edits('.modal_value2', [], data); // response 값 출력
              $("#addDialog2").dialog('open');
          }

        });
    } else {
        alert("수정권한이 없습니다.");
    }
}

function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // multiselect 된 그리드의 row
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                main_data.check = 'D'; // 삭제인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
                wrapWindowByMask2();
                ccn_ajax("/sysPartNameDel", {keyword: ids.join(gu5)}).then(function (data) {
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
    part_type_select_ajax("#part_group_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name",{keyword:value}).then(function (data2){
        part_type_select_ajax('#part_prod_select', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:value, keyword2:data2[0].part_grp_code})
    }).catch(function (err){
        $('#part_group_select').empty();
        $('#part_prod_select').empty();
    });
}
function select_change2(value) {
    part_type_select_ajax('#part_prod_select', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:'B', keyword2:value}).catch(function (err){
        $('#part_prod_select').empty();
    });
}

////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysPartName"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {

        part_type_select_ajax("#part_group_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name",{keyword:'B'}).then(function (data2){
            part_type_select_ajax('#part_prod_select', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:'B', keyword2:data2[0].part_grp_code})
        }).catch(function (err){

            $('#part_prod_select').empty();
        });

}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: colNames,
        colModel: colModel,
        caption: "제품명등록 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: main_data.rows,
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

