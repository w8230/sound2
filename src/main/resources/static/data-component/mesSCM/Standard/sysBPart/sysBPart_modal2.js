var modal2_data = [];



////////////////////////////시작 함수/////////////////////////////////////
function modal_start2() {
    modal_make2();
    modal2_jqGrid();
    jqGridResize2('#modal2_grid',$('#modal2_grid').closest('[class*="col-"]'));

    var fileTarget = $('.filebox .upload-hidden');
    fileTarget.on('change', function(){
        if(window.FileReader){
            var filename = $(this)[0].files[0].name;
            $("#modal2_grid").jqGrid('clearGridData');
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).siblings('.upload-name').val(filename);
    });

}


////////////////////////////클릭 함수/////////////////////////////////////
function checkFileType(filePath) {
    var fileFormat = filePath.split(".");
    if (fileFormat.indexOf("xlsx") > -1) {
        return true;
    } else {
        return false;
    }
}

function check() {
    var file = $("#xlsUploads").val();
    if (file == "" || file == null) {
        alert("파일을 선택해주세요.");
        return false;
    } else if (!checkFileType(file)) {
        alert("엑셀 파일만 업로드 가능합니다.");
        return false;
    }

    if (confirm("파일을 불러오시겠습니까?")) {
        var options = {
            success : function(data) {
                $("#modal2_grid").setGridParam({
                    datatype: "local",
                    data: data
                }).trigger("reloadGrid");
            },
            type : "POST"
        };
        $("#excelUploadForm").attr("action", "/excel_uploadReader").ajaxSubmit(options);

    }
}

function uploadExcel() {
    var file = $("#xlsUploads").val();
    if (file == "" || file == null) {
        alert("파일을 선택해주세요.");
        return false;
    } else if (!checkFileType(file)) {
        alert("엑셀 파일만 업로드 가능합니다.");
        return false;
    }

    if (confirm("저장 하시겠습니까?")) {
        var options = {
            success : function(message) {
                $("#modal2_grid").jqGrid('clearGridData');
                $(".upload-name").val("");
                alert(message);

            },
            type : "POST"
        };
        $("#excelUploadForm").attr("action", "/excel_upload").ajaxSubmit(options);

    }
}

////////////////////////////호출 함수/////////////////////////////////////
function modal_make2() {

    $("#uploadDialog").dialog({
        autoOpen:false,
        modal: true,

        width: 1300,
        height: 600,
        resizable: false,
        buttons: [
            {
                "class": "hide",
            }
        ]
    })
}

function modal2_jqGrid() {
    $('#modal2_grid').jqGrid({
        datatype: 'local',
        caption: '자재품목 엑셀업로드 | MES',
        colNames: ['품목구분','품목코드','품목명','보관로케이션','업체명','규격','단위','L/T','검사기준','검사구분','재고최대','재고최소'],
        colModel: [
            {name:'part_grp_name',index: 'part_grp_name',width: 50},
            {name:'part_code',index: 'part_code',width: 50},
            {name:'part_name',index: 'part_name',width: 50},
            {name:'loc_name',index: 'loc_name',width: 50},
            {name:'supp_name',index: 'supp_name',width: 50},
            {name:'spec',index: 'spec',width: 50},
            {name:'unit_name',index: 'unit_name',width: 50},
            {name:'LT',index: 'LT',width: 50},
            {name:'i_standard_name',index: 'i_standard_name',width: 50},
            {name:'i_category_name',index: 'i_category_name',width: 50},
            {name:'max_qty',index: 'max_qty',width: 50},
            {name:'min_qty',index: 'min_qty',width: 50},
        ],
        width: 1200,
        height: 300,
        pager: '#modal2_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 400],
        viewrecords: true,

        // beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
        //     var $myGrid = $(this),
        //         i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
        //         cm = $myGrid.jqGrid('getGridParam', 'colModel');
        //     return (cm[i].name === 'cb');
        // },
    }).navGrid('#modal2_grid_pager', {search: false, add: false, edit: false, del: false});
}