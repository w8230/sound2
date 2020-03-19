var grid_data=[{a:'1'},{a:'2'},{a:'20'}];

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    jqGrid_modal1();
    datepickerInput_modal1();
    selectBox_modal1();
    jqGridResize('#mes_modal_grid',$('#mes_modal_grid').closest('[class*="col-"]'));
}

////////////////////////////클릭 함수/////////////////////////////////////


function inputIntChange() {
    if ($("#install_amount").val() === ""){
        $("#install_amount").val(0);
    }else {
        $("#install_amount").val($("#install_amount").val().replace(/[^\.0-9]/g,''));
    }

}


function add_modal1_btn() {
    var text = '저장하겠습니까?';
    if (main_data.check === "U") {
        text = '수정하겠습니까?';
    }
    if (confirm(text)){
    var check=0;
    var add_data = value_return(".modal_value");
    if (effectiveness1(add_data)){
       var formData = new FormData(document.getElementById('tpmMC_form'));
        formData.append("keyword",main_data.check);

        for (var i = 1; i <=3 ; i ++){
            if (typeof $("#xlsUploads"+i).prop("files")[0] !== "undefined" && $("#xlsUploads"+i).prop("files")[0] !== "" && $("#xlsUploads"+i).prop("files")[0] !== null ) {
                check = 1;
                formData.append("file"+i, $("#xlsUploads"+i).prop("files")[0]);

                if (main_data.check = 'U'){
                    main_data["delCheck"+i] = 0;
                }

            }else {
                check = 0;
            }
            formData.append("check"+i, check);
            if (main_data.check = 'U'){
                formData.append("delCheck"+i,  main_data["delCheck"+i]);
            }
        }

            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                url: "/tpmMCAdd",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        if (main_data.check === "I") {
                            get_btn(1);
                        } else {
                            get_btn_post($("#mes_grid").getGridParam('page'));
                        }
                    }
                    $('#addDialog').dialog('close');
                },
                error: function (e) {
                    alert('업로드에 실패하였습니다.');
                    closeWindowByMask();
                    console.log("ERROR : ", e);
                }
            });
        }


    }
}


function readURL(input,index) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img-text'+index).remove();
            $('#img'+index).attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function readURLRemove(index) {
    $('#img'+index).removeAttr('src');
    if (!$("#img-text"+index).text()){
        var div = $('<div class="img-text" id="img-text'+index+'\">미리보기가 표시됩니다.</div>');
        $('#img_div'+index).prepend(div);
    }

    if (main_data.check = 'U'){
        main_data["delCheck"+index] = 1;
    }

    $("#xlsUploads"+index).val("");
}



// 그리는 더블 클릭 시 발동
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        readURLRemove(1);
        readURLRemove(2);
        readURLRemove(3);
        main_data.delCheck1 = 0;
        main_data.delCheck2 = 0;
        main_data.delCheck3 = 0;

        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거

        main_data.check = 'U'; // 수정인지 체크

        ccn_ajax('/tpmMCOneGet', {machine_code:jqgrid_data.machine_code}).then(function (data) { // user의 하나 출력
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("input[name=install_date]").val(formmatterDate2(data.install_date));

            if (data.image1 !== '' && data.image1 !== null){
                // var image1= data.image1.split("\\");
                // var index1 = image1.length;
                $('#img-text1').remove();
                $('#img1').attr('src','http://sensorview.smart-tobe.co.kr:19816/uploadFile/tpmMC/'+data.image1);
            }


            if (data.image2 !== '' && data.image2 !== null){
                //var image2= data.image2.split("\\");
                //var index2 = image2.length;
                $('#img-text2').remove();
                $('#img2').attr('src','http://sensorview.smart-tobe.co.kr:19816/uploadFile/tpmMC/'+ data.image2);
            }
            if (data.image3 !== '' && data.image3 !== null){
                //var image3= data.image3.split("\\");
                //var index3 = image3.length;
                $('#img-text3').remove();
                $('#img3').attr('src','http://sensorview.smart-tobe.co.kr:19816/uploadFile/tpmMC/'+ data.image3);
            }


            return data;


        }).then(function (data2) {
            $("#mes_modal_grid").jqGrid('clearGridData');

            modal2_get_btn();



            $("#addDialog").dialog('open');
            jqGridResize2("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]'));
        });
    } else {
        alert("수정권한이 없습니다.");
    }
}


function part_add_btn() {

    if (main_data.check === "U"){


    modal_reset(".modal_value2", modal2_data.readonly);
    modal2_data.check = 'I';
    $("#addDialog2").dialog('open');
    }
}

function part_delete_btn() {
    if (main_data.check === "U"){
    var gu4 = String.fromCharCode(4);
    var gu5 = String.fromCharCode(5);
    var list = [];
    var ids = $("#mes_modal_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
    if (ids.length === 0) {
        alert("삭제하는 데이터를 선택해주세요");
    } else {
        if (confirm("삭제하겠습니까?")) {

            ids.forEach(function (id) {
                list.push($("#machine_code").val() +gu4+id);
            })


            modal2_data.check = 'D';
            wrapWindowByMask2();
            ccn_ajax("/tpmMCPartDel", {keyword: list.join(gu5)}).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    modal2_get_btn(1);
                }
                closeWindowByMask();
            }).catch(function (err) {
                closeWindowByMask();
                console.error(err); // Error 출력
            });
        }
    }
    }
}


function close_modal1_btn() {
    $("#addDialog").dialog('close');
}

////////////////////////////호출 함수/////////////////////////////////////

function datepickerInput_modal1() {
    datepicker_makes("#datepicker", 0);

}
function selectBox_modal1() {
    select_makes_sub("#line_select2", "/sysProdLineAllGet", "line_code", "line_name",{keyword:''},'N');

    $('#focus_yn_modal').select2();
}

function modal_make1() {

    $("#addDialog").dialog({
        modal: true,
        width: 800,
        height: 650,
        autoOpen: false,
        resizable: false

    })
}

function jqGrid_modal1() {
    $('#mes_modal_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['부품명','규격','소요수량','구매처','연락처','비고'],
        colModel: [
            {name: 'part_name', index: 'part_name', key:true, sortable: false,fixed:true,width:150},
            {name: 'spec', index: 'spec', sortable: false,fixed:true,width:150},
            {name: 'qty', index: 'qty', sortable: false,fixed:true,width:100},
            {name: 'buy_corp_name', index: 'buy_corp_name', sortable: false,fixed:true,width:150},
            {name: 'corp_tel_no', index: 'corp_tel_no', sortable: false,fixed:true,width:150},
            {name: 'remark', index: 'remark', sortable: false,fixed:true,width:300}
        ],
        width : 465,
        height: 270,
        viewrecords: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
            modal2_update_btn(data);
        },
        loadComplete:function(){
            if ($("#mes_modal_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_modal_grid  tr.jqgfirstrow").css("height","1px");

        }
    });
}

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.machine_code === '') {
        alert("설비코드를 입력해주세요");
        return false;
    } else if (modal_objact.machine_name === '') {
        alert("설비명을 입력해주세요");
        return false;
    }  else if (modal_objact.line_code === '') {
        alert("설치장소를 선택해주세요");
        return false;
    } else {

        return true;
    }
}