/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////


var main_data = {
    check: 'I',
    supp_check: 'A',
    send_data: {},
    send_data_post: {},
    readonly:[],
    auth:{},
    change: 'Y'
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    selectBox();
    modal_start1();
    suppModal_start();
    partModal_start();
    authcheck();
    jqgridPagerIcons();
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.stop_date = main_data.send_data.stop_date.replace(/\-/g, '');

    main_data.send_data_post = main_data.send_data;

    console.log(main_data.send_data);
    $("#mes_grid").setGridParam({
        url: "/sysPartPriceGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {

    $("#mes_grid").setGridParam({
        url: "/sysPartPriceGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if(main_data.auth.check_add != "N") {
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
            main_data.check = 'I'; // 저장인지 체크
             datepicker_makes("#datepicker3", 0);
            datepicker_makes("#datepicker4", 1);
            $("#datepicker3").prop("disabled",false).trigger('change');
            $("#supp_name_modal").prop("disabled",false).trigger('change');
            $("#part_name_modal").prop("disabled",false).trigger('change');
        $("#currency_select option:eq(0)").prop("selected", true).trigger("change");

            $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert("추가권한이 없습니다.");
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
                ids.forEach(function (id) {
                    data =$('#mes_grid').jqGrid('getRowData', id);
                    list.push(data.supp_code+gu4+data.start_date.replace(/[^0-9]/g,'')+gu4+data.part_code);
                })


                ccn_ajax("/sysPartPriceDel", {keyword: list.join(gu5)}).then(function (data) {
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


function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거

        main_data.check = 'U'; // 수정인지 체크

        jqgrid_data.start_date = jqgrid_data.start_date.replace(/[^0-9]/g, '');

        var send_data = {
            start_date :jqgrid_data.start_date,
            supp_code   :jqgrid_data.supp_code,
            part_code   :jqgrid_data.part_code
        }

        ccn_ajax('/sysPartPriceOneGet', send_data).then(function (data) { // user의 하나 출력
            data.start_date = formmatterDate2(data.start_date);
            data.stop_date = formmatterDate2(data.stop_date);
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#datepicker3").prop("disabled",true).trigger('change');
            $("#supp_name_modal").prop("disabled",true).trigger('change');
            $("#part_name_modal").prop("disabled",true).trigger('change');

            $("#addDialog").dialog('open');
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}

function excel_download() {
    if (confirm("엑셀로 저장하시겠습니까?")) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data: {
                "name":"sysPartPrice",
                "row0": $('#datepicker').val().replace(/-/gi, ""),
                "row1": $('#datepicker2').val().replace(/-/gi, ""),
                "row2": $("#supp_code_main").val(),
                "row3": $('#part_type_select').val(),
                "row4": $('#part_group_select').val(),
                "row5": $('#part_group_select2').val()
            },
            successCallback: function (url) {
                $preparingFileModal.dialog('close');
            },
            failCallback: function (responseHtml, url) {
                $preparingFileModal.dialog('close');
                $("#error-modal").dialog({modal: true});
            }
        });
        return false;
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
        $("#supp_name_main").val("");
        $("#supp_code_main").val("");
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

function select_change1(value){
    if (main_data.change === 'N' && value !== '' && value !== null ) {
        part_type_select_ajax_all("#part_group_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name", {keyword: value}).then(function () {
            $('#part_group_select2').empty();
            var option = $("<option></option>").text('전체').val('');
            $('#part_group_select2').append(option);
            $('#part_group_select2').select2();
        });
    }
}

function select_change2(value) {
    if (value !== '' && value !== null ){
        part_type_select_ajax_all('#part_group_select2', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:$("#part_type_select").val(), keyword2:value}).then(function (){

        }).catch(function (err){
            $('#part_group_select2').empty();
            var option = $("<option></option>").text('전체').val('');
            $('#part_group_select2').append(option);
        });
    } else {
        $('#part_group_select2').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_group_select2').append(option);
    }
}
////////////////////////////호출 함수/////////////////////////////////////
function selectBox() {
    part_type_select_ajax("#part_type_select", "/sysPartTypeGet", "part_type_code", "part_type_name",{keyword:''}).then(function (data) {
        $("select#part_type_select option[value='B']").remove();
        $("#part_type_select").val('D').trigger("change");
        main_data.change='N';
        part_type_select_ajax_all("#part_group_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name", {keyword: 'D'}).then(function () {
            $('#part_group_select2').empty();

            var option = $("<option></option>").text('전체').val('');

            $('#part_group_select2').append(option);

            $('#part_group_select2').select2();

        });
    });
    // select_makes_sub('#part_name_select', "/sysPartNameGroupAllGet","code_name2" ,"code_name2",{keyword:'MAT_PROD', keyword2:'CODE'},'Y');
}


function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);
}


function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysPartPrice"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['rownum','업체명','supp_code', '시작일', '종료일','품번', '품명',  '화폐단위', '단가'],
        colModel: [
            {name: 'rownum', index: 'rownum', key:true,hidden:true, sortable: false},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150,fixed: true},
            {name: 'supp_code', index: 'supp_code',hidden:true, sortable: false},
            {name: 'start_date', index: 'start_date', sortable: false, width: 180, formatter: formmatterDate2,fixed: true},
            {name: 'stop_date', index: 'stop_date', sortable: false, width: 180, formatter: formmatterDate2,fixed: true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 150,fixed: true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 150,fixed: true},
            {name: 'currency_name', index: 'currency_name', sortable: false, width: 150,fixed: true},
            {name: 'unit_price', index: 'unit_price', sortable: false, width: 150, formatter:'number',align:'right',fixed: true},

        ],
        caption: "자재단가관리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
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
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
                $("table#SuppSearchGrid tr.jqgfirstrow").css("height","1px");
        }
    });
}