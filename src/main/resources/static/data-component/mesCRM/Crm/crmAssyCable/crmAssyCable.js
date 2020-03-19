/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////


var main_data = {

    send_data: {},
    part_code:'',
    auth:{}
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    jqGridResize('#mes_grid2', $('#mes_grid2').closest('[class*="col-"]'));
    selectBox();
    modal_start1();
    authcheck();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.keyword = "B";


    $('#mes_grid2').jqGrid('clearGridData');
    $('#mes_grid2').jqGrid("resetSelection");
    main_data.part_code ='';
    $("#mes_grid").setGridParam({
        url: '/sysPartGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}



function left_get_btn(page) {
    $("#mes_grid2").setGridParam({
        url: '/crmAssyCableGet',
        datatype: "json",
        page: page,
        postData: {keyword:main_data.part_code}
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        if (typeof main_data.part_code !== "undefined" && main_data.part_code !=='') {
            $('#mes_modal_grid').jqGrid('clearGridData');
            $('#mes_modal_grid').jqGrid("resetSelection");
            $("#part_group1_modal_select option:eq(0)").prop("selected", true).trigger("change");
            $("#part_group2_modal_select option:eq(0)").prop("selected", true).trigger("change");
            $("#part_name_modal_select option:eq(0)").prop("selected", true).trigger("change");
            $("#addDialog").dialog('open');
            jqGridResize2("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]'));
        }else {
            alert("품목을 선택해주세요");
        }
    } else {
        alert("추가권한이 없습니다,");
    }
}



function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid2").getGridParam('selarrrow'); // 체크된 그리드 로우
        if (ids.length === 0) {
            alert("삭제하는 데이터를 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                wrapWindowByMask2();
                ccn_ajax("/crmAssyCableDel", {cable_code:main_data.part_code,part_code: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        left_get_btn(1);
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


////////////////////////////호출 함수//////////////////////////////////
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

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "crmAssyCable"}).then(function (data) {
        main_data.auth = data;
    });
}

function group_cb(value,i) {
    $('#part_group'+i).text(value["part_group"+i]);
    ccn_ajax('/sysPartGroupAllGet',{keyword:value.part_type_code,keyword2:i}).then(function (value1) {
        $('#part_group_select'+i).empty();
        var option = null;
        var allSelect = ($("<option></option>").text("전체").val(""));
        $('#part_group_select'+i).append(allSelect);
        for(var j=0;j<value1.length;j++){
            option = $("<option></option>").text(value1[j].part_grp_name).val(value1[j].part_grp_code);
            $('#part_group_select'+i).append(option);
        }
        $('#part_group_select'+i).select2();
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        // mtype: 'POST',
        colNames: ['품번','품명','품목군','제품군'],
        colModel: [
            {name: 'part_code', index: 'part_code', key: true, sortable: false, width: 150,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 200,fixed:true},
            {name: 'part_grp_name1', index: 'part_grp_name1', sortable: false, width: 200,fixed:true},
            {name: 'part_grp_name2', index: 'part_grp_name2', sortable: false, width: 200,fixed:true}

        ],
        caption: "조립케이블 구성 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
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
            main_data.part_code = rowid;
            left_get_btn(1);

        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});

    $('#mes_grid2').jqGrid({
        datatype: "local",
        mtype: 'POST',
        // mtype: 'POST',
        colNames: ['품번','품명','규격', '품목군','제품군'],
        colModel: [
            {name: 'part_code', index: 'part_code', key: true, sortable: false, width: 150,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 200,fixed:true},
            {name: 'spec', index: 'spec', sortable: false, width: 200,fixed:true},
            {name: 'part_grp_name1', index: 'part_grp_name1', sortable: false, width: 200,fixed:true},
            {name: 'part_grp_name2', index: 'part_grp_name2', sortable: false, width: 200,fixed:true}
        ],
        caption: "조립케이블 구성 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid2_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
        },
        loadComplete:function(){
            if ($("#mes_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid2_pager', {search: false, add: false, edit: false, del: false});
}
var save_rowid;