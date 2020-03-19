/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    auth:{}
};

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    authcheck();
    selectBox();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: '/wmsStockListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/wmsStockListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function select_change1(value) {
    if(value === ''){
        $('#part_group2_select').empty();
        var option = null;
        option = $("<option></option>").text('전체').val('');
        $('#part_group2_select').append(option);
        $('#part_group2_select').select2();
    }else{
        part_type_select_ajax_all('#part_group2_select', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:$("#part_type_select").val(), keyword2:value});
    }
}

function excel_download() {
    if (confirm("엑셀로 저장하시겠습니까?")) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name":"wmsStock",
                "row0":$("#part_type_select").val(),
                "row1":$("#part_group1_select").val(),
                "row2":$("#part_group2_select").val()
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

////////////////////////////호출 함수//////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "wmsStock"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    $("#part_type_select").select2();
    part_type_select_ajax_all("#part_group1_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name", {keyword: 'B'}).then(function (data) {
        if($('#part_group1_select').val() === ''){
            $('#part_group2_select').empty();
            var option = null;
            option = $("<option></option>").text('전체').val('');
            $('#part_group2_select').append(option);
            $('#part_group2_select').select2();
        }else{
            part_type_select_ajax_all('#part_group2_select', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:'D', keyword2:data[0].part_grp_code});
        }
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['품목구분', '품목코드', '품목명', '규격', '단위','재고량'],
        colModel: [
            {name: 'part_grp_name', index: 'part_grp_name', width: 150,sortable:false,fixed:true},
            {name: 'part_code', index: 'part_code', width: 150,sortable:false,fixed:true},
            {name: 'part_name', index: 'part_name', width: 150,sortable:false,fixed:true},
            {name: 'spec', index: 'spec', width: 150,sortable:false,fixed:true},
            {name: 'unit_name', index: 'unit_name', width: 150,sortable:false,fixed:true},
            {name: 'qty', index: 'qty', width: 150, align: 'right',formatter:'number',sortable:false,fixed:true}
        ],
        caption: "재고현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

