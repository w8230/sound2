/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [],
    auth:{},
    rows:100
};
var code_name4;
var code_name3;



////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    selectBox();
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));

    modal_start1();
    authcheck();
    jqgridPagerIcons();

    code_name4 = $("#code_name4_div").clone();
    $("#code_name4_div").remove();


    code_name3 = $("#code_name3_div").clone();
    $("#code_name3_div").remove();


});


////////////////////////////클릭 함수//////////////////////////////////

function rows_check() {
        main_data.rows =$("#mes_grid").getGridParam("rowNum");

}


function get_btn(page) {
    main_data.send_data = value_return(".condition_main");

    rows_check();
    if (main_data.send_data.keyword !== null){
        main_data.send_data.keyword2 = 'CODE'
        main_data.send_data_post = main_data.send_data;
        grid_head_change(main_data.send_data.keyword,page);
    }




}

function get_btn_post(page) {
    rows_check();
    $("#mes_grid").setGridParam({
        url: '/sysPartNameGroupGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        if ($("#code_value_select").val() !== null) {
            ccn_ajax('/sysCommon2AllGet', {
                keyword: $("#code_value_select").val(),
                keyword2: 'NAME'
            }).then(function (value1) {
                var data = value1[0];
                $("#code_name1_text").text(data.code_name1);
                $("#code_name2_text").text(data.code_name2);
                //$("#code_name3_text").text(data.code_name3);

                if (data.code_name3 === null || data.code_name3 === '') {
                    $("#code_name3_div").remove();
                } else {
                    $("#modal_all_div").append(code_name3);
                    $("#code_name3_text").text(data.code_name3);
                }

                if (data.code_name4 === null || data.code_name4 === '') {
                    if(data.code_name2 === "상품그룹"){
                        $("#code_name4_div").remove();
                        $("#code_name3_div").remove();
                    }else {
                        $("#code_name4_div").remove();
                    }
                } else {
                    $("#modal_all_div").append(code_name4);
                    $("#code_name4_text").text(data.code_name4);
                }


                main_data.check = 'I';

                modal_reset(".modal_value", main_data.readonly);
                modalValuePush("#gubun_select", "#code_type", "#code_type_name");
                modalValuePush("#code_value_select", "#code_value", "#code_value_name");


                $("#addDialog").dialog('open');


            });
        }

    } else {
        alert("추가권한이 없습니다,");
    }
}


function update_btn(jqgrid_data) {
        if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U';
        ccn_ajax('/sysPartNameGroupOneGet', jqgrid_data).then(function (data2) {
            ccn_ajax('/sysCommon2AllGet',{keyword:data2.code_value,keyword2:'NAME'}).then(function (value1) {
                var data = value1[0];
                console.log(data);
                $("#code_name1_text").text(data.code_name1);
                $("#code_name2_text").text(data.code_name2);
                //$("#code_name3_text").text(data.code_name3);

                if (data.code_name3 === null || data.code_name3 === '') {
                    $("#code_name3_div").remove();
                } else {
                    $("#modal_all_div").append(code_name3);
                    $("#code_name3_text").text(data.code_name3);
                }

                if (data.code_name4 === null || data.code_name4 === ''){
                    if(data.code_name2 === "상품그룹"){
                        $("#code_name4_div").remove();
                        $("#code_name3_div").remove();
                    }else {
                        $("#code_name4_div").remove();
                    }
                } else {
                    $("#modal_all_div").append(code_name4);
                    $("#code_name4_text").text(data.code_name4);
                }



                modal_edits('.modal_value', main_data.readonly, data2); // response 값 출력
                $("#addDialog").dialog('open');
            });
        });
    } else {
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
                    ccn_ajax("/sysPartNameGroupDel", {keyword: ids.join(gu5)}).then(function (data) {
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


function select_change1(value) {
    ccn_ajax('/sysCommon2AllGet',{keyword:value,keyword2:''}).then(function (value1) {
        $('#code_value_select').empty();
        var option = null;

        for(var j=0;j<value1.length;j++){
            option = $("<option></option>").text(value1[j].code_name1).val(value1[j].code_value);
            $('#code_value_select').append(option);
        }
        $('#code_value_select').select2();

    });
}


////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysPartNameGroup"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    $('#gubun_select').select2();
    ccn_ajax('/sysCommon2AllGet',{keyword:$('#gubun_select').val(),keyword2:''}).then(function (value1) {
        $('#code_value_select').empty();
        var option = null;
        for(var j=0;j<value1.length;j++){
            option = $("<option></option>").text(value1[j].code_name1).val(value1[j].code_value);
            $('#code_value_select').append(option);
        }
        $('#code_value_select').select2();

    });
}
var colNames =['코드','자재그룹','LOT'];


function grid_head_change(value,page) {
    ccn_ajax('/sysCommon2AllGet',{keyword:value,keyword2:'NAME'}).then(function (value1) {
        grid_head_value_change(value1[0]);
        $.jgrid.gridUnload('#mes_grid');

        jqGrid_main();
        jqGridResize2('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
        jqgridPagerIcons();



        $("#mes_grid").setGridParam({
            url: '/sysPartNameGroupGet',
            datatype: "json",
            page: page,
            postData: main_data.send_data
        }).trigger("reloadGrid");
    });


}


function grid_head_value_change(value) {
    colNames[1] = value.code_name1;
    colNames[2] = value.code_name2;
    console.log(value.code_name1);
    console.log(value.code_name2);
    console.log(value.code_name3);
    console.log(value.code_name4);

    if (value.code_name3 === null || value.code_name3 === ''){
        colModel = colModel3;
        colNames.splice(4,1);
        colNames.splice(3,1);
    } else {

        colNames[3] = value.code_name3;


        if (value.code_name4 === null || value.code_name4 === ''){
            if(value.code_name2 === "상품그룹"){
                colModel = colModel4;
                colNames.splice(4,1);
            }else {
                colModel = colModel2;
                colNames.splice(4,1);
            }
        } else {
            colModel = colModel1;
            colNames[4] = value.code_name4;
        }

    }


}

var colModel = [
    {name: 'idx', index: 'idx', key:true, sortable: false, width: 250,fixed: true},
    {name: 'code_name1', index: 'code_name1', sortable: false, width: 250,fixed: true},
    {name: 'code_name2', index: 'code_name2', sortable: false, width: 250,fixed: true}
];

var colModel1 = [
    {name: 'idx', index: 'idx', hidden:true, key:true, sortable: false, width: 250,fixed: true},
    {name: 'code_name1', index: 'code_name1', sortable: false, width: 250,fixed: true},
    {name: 'code_name2', index: 'code_name2', sortable: false, width: 250,fixed: true},
    {name: 'code_name3', index: 'code_name3', sortable: false, width: 250,fixed: true},
    {name: 'code_name4', index: 'code_name4', sortable: false, width: 250,fixed: true}
];


var colModel2 = [
    {name: 'idx', index: 'idx', hidden:true, key:true, sortable: false, width: 250,fixed: true},
    {name: 'code_name1', index: 'code_name1', sortable: false, width: 250,fixed: true},
    {name: 'code_name2', index: 'code_name2', sortable: false, width: 250,fixed: true},
    {name: 'code_name3', index: 'code_name3', sortable: false, width: 250,fixed: true},
];

var colModel3 = [
    {name: 'idx', index: 'idx', hidden:true, key:true, sortable: false, width: 250,fixed: true},
    {name: 'code_name1', index: 'code_name1', sortable: false, width: 250,fixed: true},
    {name: 'code_name2', index: 'code_name2', sortable: false, width: 250,fixed: true}
];

var colModel4 = [
    {name: 'idx', index: 'idx',  hidden:true,key:true, sortable: false, width: 250,fixed: true},
    {name: 'code_name1', index: 'code_name1', sortable: false, width: 250,fixed: true},
    {name: 'code_name2', index: 'code_name2', sortable: false, width: 250,fixed: true},
    {name: 'code_name3', index: 'code_name3', sortable: false, width: 250,fixed: true,hidden:true}
];

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: colNames,
        colModel: colModel,
        caption: "유형관리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: main_data.rows ,
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

        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

