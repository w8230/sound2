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
    line_code:'',
    part_code:'',
    rows:100
};


var colNames =  ['제품유형','품목군','제품군','품번','품명','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','라인코드']
////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    authcheck();
    modal_start1();
    selectBox();
    commonAllGet_fun('SPEC_ED');
});


////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    rows_check();
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.keyword = 'B';
    main_data.send_data_post = main_data.send_data;
    var line_code = main_data.send_data_post.keyword5;
    commonAllGet_fun2(line_code,page);



}

function get_btn_post(page) {
    rows_check();
    var line_code = main_data.send_data_post.keyword5;
    commonAllGet_fun3(line_code,page);
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly);
        modal_text_reset(".modal_text");
        main_data.check = 'I'; // 저장인지 체크
        main_data.line_code = "";
        main_data.part_code = "";
        var send_data = value_return(".condition_main");
        if (send_data.keyword4 === '' || send_data.keyword4 === null ){
            alert("품명을 선택해주세요");
        } else {
            main_data.line_code = send_data.keyword5;
            main_data.part_code = send_data.keyword4;
            var keyword = send_data.keyword5;
            if (keyword === 'L0100'){
                keyword = 'SPEC_ED';
            } else if(keyword === 'L0200'){
                keyword = 'SPEC_TS';

            } else if(keyword === 'L0300'){
                keyword = 'SPEC_BS';

            }
            ccn_ajax('/sysCommonAllGet', {keyword:keyword}).then(function (data) {
                var name = '';
                var name2 = '';

                data.forEach(function(object,i){
                    for (var j = 1; j <=  6; j++ ){
                        name = "div_data"+i+"_"+j;
                        name2 = "data"+i+"_"+j;
                        $("#"+name).text(object["code_name"+j]);
                        if(object["code_name"+j] === null || object["code_name"+j] === ''){
                            $("input[name="+name2+"]").attr("readonly","readonly");
                        } else {
                            $("input[name="+name2+"]").removeAttr("readonly");
                        }

                    }
                });
                $("#addDialog").dialog('open');
            });
        }

    } else {
        alert("추가권한이 없습니다,");
    }
}
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        main_data.check = 'U';
        modal_reset(".modal_value", []);

        var keyword = jqgrid_data.line_code;
        if (keyword === 'L0100'){
            keyword = 'SPEC_ED';
        } else if(keyword === 'L0200'){
            keyword = 'SPEC_TS';

        } else if(keyword === 'L0300'){
            keyword = 'SPEC_BS';

        }
        ccn_ajax('/sysCommonAllGet', {keyword:keyword}).then(function (data) {
            var name = '';
            var name2 = '';

            data.forEach(function(object,i){
                for (var j = 1; j <=  6; j++ ){
                    name = "div_data"+i+"_"+j;
                    name2 = "data"+i+"_"+j;
                    $("#"+name).text(object["code_name"+j]);
                    if(object["code_name"+j] === null || object["code_name"+j] === ''){
                        $("input[name="+name2+"]").attr("readonly","readonly");
                    } else {
                        $("input[name="+name2+"]").removeAttr("readonly");
                    }

                }
            });

            main_data.line_code =jqgrid_data.line_code;
            main_data.part_code =jqgrid_data.part_code;

            ccn_ajax('/popSpecOneGet', jqgrid_data).then(function (data2) {
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
        var gu4 = String.fromCharCode(4);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
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
                    list.push(data.line_code + gu4 + data.part_code);
                })

                ccn_ajax("/popSpecDel", {keyword: list.join(gu5)}).then(function (data) {
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

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popSpec"}).then(function (data) {
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
    select_data_makes("#line_select", "/sysProdLineAllGet", "line_code", "line_name",{keyword:''});
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames:colNames,
        colModel: [
            {name: 'part_type_name', index: 'part_type_name',sortable: false, width: 100,fixed:true},
            {name: 'part_grp_name1', index: 'part_grp_name1',sortable: false, width: 100,fixed:true},
            {name: 'part_grp_name2', index: 'part_grp_name2',sortable: false, width: 100,fixed:true},
            {name: 'part_code', index: 'part_code',sortable: false,key:true, width: 100,fixed:true},
            {name: 'part_name', index: 'part_name',sortable: false, width: 100,fixed:true},

            {name: 'data0_1', index: 'data0_1',sortable: false, width: 100,fixed:true},
            {name: 'data0_2', index: 'data0_2',sortable: false, width: 100,fixed:true},
            {name: 'data0_3', index: 'data0_3',sortable: false, width: 100,fixed:true},
            {name: 'data0_4', index: 'data0_4',sortable: false, width: 100,fixed:true},
            {name: 'data0_5', index: 'data0_5',sortable: false, width: 100,fixed:true},
            {name: 'data0_6', index: 'data0_6',sortable: false, width: 100,fixed:true},

            {name: 'data1_1', index: 'data1_1',sortable: false, width: 100,fixed:true},
            {name: 'data1_2', index: 'data1_2',sortable: false, width: 100,fixed:true},
            {name: 'data1_3', index: 'data1_3',sortable: false, width: 100,fixed:true},
            {name: 'data1_4', index: 'data1_4',sortable: false, width: 100,fixed:true},
            {name: 'data1_5', index: 'data1_5',sortable: false, width: 100,fixed:true},
            {name: 'data1_6', index: 'data1_6',sortable: false, width: 100,fixed:true},

            {name: 'data2_1', index: 'data2_1',sortable: false, width: 100,fixed:true},
            {name: 'data2_2', index: 'data2_2',sortable: false, width: 100,fixed:true},
            {name: 'data2_3', index: 'data0_3',sortable: false, width: 100,fixed:true},
            {name: 'data2_4', index: 'data2_4',sortable: false, width: 100,fixed:true},
            {name: 'data2_5', index: 'data2_5',sortable: false, width: 100,fixed:true},
            {name: 'data2_6', index: 'data2_6',sortable: false, width: 100,fixed:true},

            {name: 'data3_1', index: 'data3_1',sortable: false, width: 100,fixed:true},
            {name: 'data3_2', index: 'data3_2',sortable: false, width: 100,fixed:true},
            {name: 'data3_3', index: 'data3_3',sortable: false, width: 100,fixed:true},
            {name: 'data3_4', index: 'data3_4',sortable: false, width: 100,fixed:true},
            {name: 'data3_5', index: 'data3_5',sortable: false, width: 100,fixed:true},
            {name: 'data3_6', index: 'data3_6',sortable: false, width: 100,fixed:true},

            {name: 'data4_1', index: 'data4_1',sortable: false, width: 100,fixed:true},
            {name: 'data4_2', index: 'data4_2',sortable: false, width: 100,fixed:true},
            {name: 'data4_3', index: 'data4_3',sortable: false, width: 100,fixed:true},
            {name: 'data4_4', index: 'data4_4',sortable: false, width: 100,fixed:true},
            {name: 'data4_5', index: 'data4_5',sortable: false, width: 100,fixed:true},
            {name: 'data4_6', index: 'data4_6',sortable: false, width: 100,fixed:true},

            {name: 'line_code', index: 'line_code',hidden:true,sortable: false, width: 100,fixed:true}


        ],
        caption: "설비조건 | MES",
        autowidth: true,
        shrinkToFit:false,
        overflow:'visible',
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
    header_make();
}

function header_make() {
    jQuery("#mes_grid").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: 'data0_1', numberOfColumns: 6, titleText: '<center>기준정보</center>'},
            {startColumnName: 'data1_1', numberOfColumns: 6, titleText: '<center>데이터1</center>'},
            {startColumnName: 'data2_1', numberOfColumns: 6, titleText: '<center>데이터2</center>'},
            {startColumnName: 'data3_1', numberOfColumns: 6, titleText: '<center>데이터3</center>'},
            {startColumnName: 'data4_1', numberOfColumns: 6, titleText: '<center>데이터4</center>'},

        ]
    });
}


function commonAllGet_fun(keyword) {
    ccn_ajax('/sysCommonAllGet', {keyword:keyword}).then(function (data) {
        var count = 5;
        for (var i = 0; i < data.length ; i++){
            for (var j = 1; j <= 6 ; j++) {
                if(data[i]["code_name"+j] !== '' && data[i]["code_name"+j] !== null ){
                    colNames[count] = data[i]["code_name"+j];


                } else {
                    colNames[count] = '';
                }
                count++;
            }

        }

        jqGrid_main();
        //jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
        jqgridPagerIcons();

    });

}

function commonAllGet_fun2(keyword,page) {
    if (keyword === 'L0100'){
        keyword = 'SPEC_ED';
    } else if(keyword === 'L0200'){
        keyword = 'SPEC_TS';

    } else if(keyword === 'L0300'){
        keyword = 'SPEC_BS';

    }
    
    
    
    ccn_ajax('/sysCommonAllGet', {keyword:keyword}).then(function (data) {
        var count = 5;
        for (var i = 0; i < data.length ; i++){
            for (var j = 1; j <= 6 ; j++) {
                if(data[i]["code_name"+j] !== '' && data[i]["code_name"+j] !== null ){
                    colNames[count] = data[i]["code_name"+j];


                } else {
                    colNames[count] = '';
                }
                count++;
            }

        }
        $('#mes_grid').jqGrid('destroyGroupHeader');
        $.jgrid.gridUnload('#mes_grid');
        jqGrid_main();
        //jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
        jqgridPagerIcons();

        $("#mes_grid").setGridParam({
            url: '/popSpecGet',
            datatype: "json",
            page: page,
            postData: main_data.send_data
        }).trigger("reloadGrid");

    });

}

function commonAllGet_fun3(keyword,page) {
    if (keyword === 'L0100'){
        keyword = 'SPEC_ED';
    } else if(keyword === 'L0200'){
        keyword = 'SPEC_TS';

    } else if(keyword === 'L0300'){
        keyword = 'SPEC_BS';

    }



    ccn_ajax('/sysCommonAllGet', {keyword:keyword}).then(function (data) {
        var count = 5;
        for (var i = 0; i < data.length ; i++){
            for (var j = 1; j <= 6 ; j++) {
                if(data[i]["code_name"+j] !== '' && data[i]["code_name"+j] !== null ){
                    colNames[count] = data[i]["code_name"+j];


                } else {
                    colNames[count] = '';
                }
                count++;
            }

        }
        $('#mes_grid').jqGrid('destroyGroupHeader');
        $.jgrid.gridUnload('#mes_grid');
        jqGrid_main();
        //jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
        jqgridPagerIcons();

        $("#mes_grid").setGridParam({
            url: '/popSpecGet',
            datatype: "json",
            page: page,
            postData: main_data.send_data_post
        }).trigger("reloadGrid");

    });

}
function rows_check() {
    main_data.rows =$("#mes_grid").getGridParam("rowNum");

}

