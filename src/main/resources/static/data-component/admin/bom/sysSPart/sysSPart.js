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
    prod_dept_string:[]
};
////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));

    sysCommonAllGet();
    selectBox();
    authcheck();

});


////////////////////////////클릭 함수//////////////////////////////////


function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: '/sysSPartGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/sysSPartGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {

        main_data.check = 'I';
        $('#mes_modal1_grid1').jqGrid("clearGridData");
       var data = value_return(".condition_main");
       data.keyword = "B";
        if (effectiveness_main(data)){
            ccn_ajax("/sysSPartAdd2", data).then(function (data2) {
                $("#mes_modal1_grid1").setGridParam({
                    url: '/sysSPartGet',
                    datatype: "json",
                    page: 1,
                    postData: data
                }).trigger("reloadGrid");
                $("#addDialog").dialog('open');
                jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));

            });
        }

    } else {
        alert("추가권한이 없습니다,");
    }
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        main_data.check = 'U';
        $('#mes_modal1_grid1').jqGrid("clearGridData");
        var data = {}
        data.keyword4 = jqgrid_data.parent_part_code;

        $("#mes_modal1_grid1").setGridParam({
            url: '/sysSPartGet',
            datatype: "json",
            page: 1,
            postData: data
        }).trigger("reloadGrid");
        $("#addDialog").dialog('open');
        jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
    } else {
        alert("수정권한이 없습니다.");
    }
}


function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var del_data = value_return(".condition_main");
        if (del_data.keyword4 === '' || del_data.keyword4 === null) {
            alert("품명을 다시 선택해주세요");
        } else {
            if (confirm("삭제하겠습니까?")) {
                main_data.check = 'D';
                wrapWindowByMask2();
                ccn_ajax("/sysSPartDel", {keyword: del_data.keyword4}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn(1);
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


function select_main_change1(value) {
    part_type_select_ajax("#part_group2_select", "/sysPartGroup2AllGet", "part_grp_code2", "part_grp_name2",{keyword:'B', keyword2:value}).then(function (data2) {
        part_type_select_ajax("#part_name_select", "/sysPartNameAllGet", "part_code", "part_name",{keyword:'B', keyword2:value, keyword3:data2[0].part_grp_code2}).then(function (data3) {
            if (data3.length !== 0){
                $("#route_name_main").val(data3[0].route_name);
                $("#route_code_main").val(data3[0].route_code);
            } else {
                $("#route_name_main").val("");
                $("#route_code_main").val("");
            }

        }).catch(function (err) {
            $("#part_name_select").empty();
            $("#route_name_main").val("");
            $("#route_code_main").val("");
        });
    }).catch(function (err) {
        $("#part_group2_select").empty();
        $("#part_name_select").empty();
        $("#route_name_main").val("");
        $("#route_code_main").val("");
    });
}

function select_main_change2(value) {
    part_type_select_ajax("#part_name_select", "/sysPartNameAllGet", "part_code", "part_name",{keyword:'B', keyword2:$("#part_group1_select").val(), keyword3:value}).then(function (data3) {
        if (data3.length !== 0){
            $("#route_name_main").val(data3[0].route_name);
            $("#route_code_main").val(data3[0].route_code);
        } else {
            $("#route_name_main").val("");
            $("#route_code_main").val("");
        }

    }).catch(function (err) {
        $("#part_name_select").empty();
        $("#route_name_main").val("");
        $("#route_code_main").val("");
    });
}


function select_main_change3(value) {
    ccn_ajax("/sysPartNameOneGet", {keyword:value}).then(function (data) {
        if (data !== null){
            $("#route_name_main").val(data.route_name);
            $("#route_code_main").val(data.route_code);
        } else {
            $("#route_name_main").val("");
            $("#route_code_main").val("");
        }
    });
}

////////////////////////////호출 함수//////////////////////////////////

function sysCommonAllGet() {
    ccn_ajax("/sysCommonAllGet", {keyword: 'PROD_DEPT'}).then(function (data) {
        main_data.prod_dept_string=[];
        data.forEach(function (d) {
            main_data.prod_dept_string.push(d.code_value+":"+d.code_name1);
        })
        modal_start1();
        jqgridPagerIcons();

    });
}




function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysSPart"}).then(function (data) {
        main_data.auth = data;
    });
}



function selectBox() {
    part_type_select_ajax("#part_group1_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name",{keyword:'B'}).then(function (data) {
        part_type_select_ajax("#part_group2_select", "/sysPartGroup2AllGet", "part_grp_code2", "part_grp_name2",{keyword:'B', keyword2:data[0].part_grp_code}).then(function (data2) {
            part_type_select_ajax("#part_name_select", "/sysPartNameAllGet", "part_code", "part_name",{keyword:'B', keyword2:data[0].part_grp_code, keyword3:data2[0].part_grp_code2}).then(function (data3) {
                if (data3.length !== 0){
                    $("#route_name_main").val(data3[0].route_name);
                    $("#route_code_main").val(data3[0].route_code);
                } else {
                    $("#route_name_main").val("");
                    $("#route_code_main").val("");
                }

            }).catch(function (err) {
                $("#part_name_select").empty();
                $("#route_name_main").val("");
                $("#route_code_main").val("");
            });
        }).catch(function (err) {
            $("#part_group2_select").empty();
            $("#part_name_select").empty();
            $("#route_name_main").val("");
            $("#route_code_main").val("");
        });
    });

}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['parent_part_code','코드','품명','공정구분','생산구분','용도','제품유형','품목군','제품군','등록자','등록일자','비고'],
        colModel: [
            {name: 'parent_part_code', index: 'parent_part_code', key:true,hidden:true, sortable: false},
            {name: 'part_code', index: 'part_code', sortable: false, width: 200,fixed: true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 200,fixed: true},
            {name: 'line_name', index: 'line_name', sortable: false, width: 150,fixed: true},
            {name: 'prod_dept_name', index: 'prod_dept_name', sortable: false, width: 150,fixed: true},
            {name: 'prod_type_name', index: 'prod_type_name', sortable: false, width: 150,fixed: true},
            {name: 'part_type_name', index: 'part_type_name', sortable: false, width: 150,fixed: true},
            {name: 'part_grp_name1', index: 'part_grp_name1', sortable: false, width: 150,fixed: true},
            {name: 'part_grp_name2', index: 'part_grp_name2', sortable: false, width: 150,fixed: true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed: true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 180, formatter: formmatterDate,fixed: true},
            {name: 'remark', index: 'remark', sortable: false, width: 300,fixed: true}
        ],
        caption: "제품등록 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],

        // multiselect: true,
        // beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
        //     var $myGrid = $(this),
        //         i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
        //         cm = $myGrid.jqGrid('getGridParam', 'colModel');
        //     return (cm[i].name === 'cb');
        // },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);

        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_grid tr.jqgfirstrow").css("height","1px");
            else
                $("table#mes_grid tr.jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function effectiveness_main(data) {
    if (data.keyword2 === "" || data.keyword2 === null){
        alert("품목군을 다시 선택해주세요");
        return false;
    } else if (data.keyword3 === "" || data.keyword3 === null){
        alert("제품군을 다시 선택해주세요");
        return false;
    } else if (data.keyword4 === "" || data.keyword4 === null){
        alert("품명을 선택해주세요");
        return false;
    } else {
        return  true;
    }

}