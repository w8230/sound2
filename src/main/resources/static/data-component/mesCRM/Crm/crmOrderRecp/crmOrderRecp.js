/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_data = {
    supp_check:'A',
    auth:{}
}

////////////////////////////시작 함수/////////////////////////////////
$(document).ready(function () {
    selectBox();
    datepickerInput();
    suppModal_start();
    partModal_start('CRM');
    authcheck();
    jqgridPagerIcons();
    part_gu2 = 'Y';
});
////////////////////////////클릭 함수////////////////////////////////

function add_btn() {
    if (main_data.auth.check_add !="N") {
        var data = value_return(".main_value");
        data.work_date = data.work_date.replace(/\-/g, '');
        data.end_date =  data.end_date.replace(/\-/g, '');
        data.price= data.price.replace(/[^\.0-9]/g,'');
        data.ord_no = '';
        data.keyword = "I";

        if ($('input:checkbox[name="option1"]').is(":checked")) {
            data.option1 = 'Y';
        }
        if ($('input:checkbox[name="option2"]').is(":checked")) {
            data.option2 = 'Y';
        }

        data.work_type =$('#work_type').val();

        if (data.work_type === "1"){
            data.connector1 ="";
            data.connector2 ="";
            data.part_length =0;
        }
        if (effectiveness(data)){
            if (confirm("저장 하시겠습니까?")) {
                ccn_ajax("/crmOrderRecpAdd", data).then(function (data2) {
                    if (data2.result === 'NG') {
                        alert(data2.message);
                    } else {
                        modal_reset(".crm_order_value", []);

                        $(".part_value").val("자동표시");
                        $("#crm_part_code").val("찾기");

                        $("#connector1").empty();
                        $("#connector2").empty();

                        $("#connector1").append($("<option></option>").text("선택안함").val(""));
                        $("#connector2").append($("<option></option>").text("선택안함").val(""));


                        $(".crm_order_select").each(function () {
                            $(this).find('option:first').prop("selected", true).trigger("change");
                        })


                        $("#chbox1").prop("checked", false);
                        $("#chbox2").prop("checked", false);

                    }
                }).catch(function (err) {
                    console.error(err); // Error 출력
                });
             }
         }
    } else {
        alert("추가권한이 없습니다,");
    }
}

function  partModal_bus(rowid,name) {
        modal_reset(".part_value", []);
    ccn_ajax('/sysPartOneGet', {keyword:rowid}).then(function (data) {
        modal_edits('.part_value',[], data);
        $("#spec").val(data.spec);
    });
    connectorSelect(rowid);
}

function part_btn() {
    $("#partSearchGrid").jqGrid('clearGridData');
    $("#part_type_select_modal  option:eq(1)").prop("selected", true).trigger("change");


    part_gu = 'Y';

    $("#part-search-dialog").dialog('open');
    jqGridResize2("#partSearchGrid", $('#partSearchGrid').closest('[class*="col-"]'));
}


function connectorSelect(rowid) {
    select_makes_sub('#connector1','/crmAssyCableAllGet','part_code','part_name',{keyword:rowid},'N')
    select_makes_sub('#connector2','/crmAssyCableAllGet','part_code','part_name',{keyword:rowid},'N')
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
        ccn_ajax('/sysSuppOneGet', {keyword:code}).then(function (data) {
            // console.log(data);
            $("#supp_name_main").val(name);
            $("#supp_code_main").val(code);
            $("#supp_user_name").val(data.emp_name);
            $("#supp_tel_no").val(data.emp_tel);
            $("#delivery_addr").val(data.address);
        });


    } else if (main_data.supp_check === 'B') {

        $("#supp_name_modal").val(name);
        $("#supp_code_modal").val(code);
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

function suppModal_close_bus() {
    $("#SuppSearchGrid").jqGrid('clearGridData');
}



function part_length_keyup() {
    var part_length =  $('#part_length').val();
    part_length = part_length.replace(/[^\.0-9]/g,'');
    $('#part_length').val(part_length);
}

function sum_qty_keyup() {
   var qty =  $('input[name=qty]').val();
   var unit_price = $('input[name=unit_price]').val();

   if (isNaN(qty)){
       qty = qty.replace(/[^\.0-9]/g,'');
       $('input[name=qty]').val(qty);

   } else if (isNaN(unit_price)) {
       unit_price = unit_price.replace(/[^\.0-9]/g,'');
       $('input[name=unit_price]').val(unit_price);

   }


   if (qty !== '' && unit_price !=='') {
        $('input[name=price]').val(comma(parseFloat((parseFloat(qty)*parseFloat(unit_price)).toFixed(2))));
   }else {
       $('input[name=price]').val("");
   }

}


////////////////////////////호출 함수////////////////////////////////
function datepickerInput() {
    datepicker_makes("#datepicker", 0);
    datepicker_makes("#datepicker2", 1);

}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "crmOrderRecp"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    $("#status1_select").select2();
    $("#status2_select").select2();
    $("#work_type").select2();
    $("#connector1").select2({disabled: true});
    $("#connector2").select2({disabled: true});
    select_makes("#unit_select", "/sysCommonUnitGet", "code_value", "code_name1");
    select_data_makes('#length_type','/sysCommonAllGet','code_value','code_name1',{keyword:'UNIT_LENGTH'});
    select_makes_sub('#tube','/sysCommonAllGet','code_value','code_name1',{keyword:'SLEEVE_TYPE'},'N');
    select_data_makes('#currency_select','/sysCommonAllGet','code_value','code_name1',{keyword:'CURRENCY_TYPE'});
    select_data_makes('#delivery_select','/sysCommonAllGet','code_value','code_name1',{keyword:'DELIVERY'});
    select_data_makes('#delivery_corp_select','/sysCommonAllGet','code_value','code_name1',{keyword:'DELIVERY_CORP'});
    $("#crm_type").select2();
    $("#price_type").select2();
    $("#sale_type").select2();
    $("#prod_type").select2();
    $("#delivery_price").select2();
    $("#req_type").select2();

}


function work_type_change(value) {
    if (value === '1'){
        $("#connector1").select2({disabled: true});
        $("#connector2").select2({disabled: true});
        $("#part_length").attr("readonly","readonly");
    } else if (value === '2'){
        $("#connector1").select2({disabled: false});
        $("#connector2").select2({disabled: false});
        $("#part_length").removeAttr("readonly");
    }

}


function effectiveness(data) {
    if (data.supp_code === ''){
        alert("수주업체를 선택해주세요");
        return false;
    } else if (data.supp_ord_no === '') {
        alert("발주번호를 입력해주세요");
        return false;
    } else if (data.supp_user_name === '') {
        alert("담당자를 입력해주세요");
        return false;
    } else if (data.supp_tel_no === '') {
        alert("연락처를 입력해주세요");
        return false;
    } else if (data.delivery_addr === '') {
        alert("배송지를 입력해주세요");
        return false;
    } else if (data.part_code === '' || data.part_code === '찾기') {
        alert("품목코드를 선택해주세요");
        return false;
    } else if (data.end_supp_code === '') {
        alert("End User를 선택해주세요");
        return false;
    }




     if (data.work_type === '2'){
        if (data.connector1 === '') {
            alert("커넥터1를 입력해주세요");
            return false;
        } else if (data.connector2 === '') {
            alert("커넥터2를 입력해주세요");
            return false;
        } else if (data.part_length === '') {
            alert("개별길이를 입력해주세요");
            return false;
        }
    }

    if (data.part_type === 'A' && data.req_type === '2'){
        alert("상품은 생산 할수 없습니다.");
        return false;
    }



    if (data.qty === ''){
        alert("수량을 입력해주세요");
        return false;
    } else if (data.unit_price === ''){
        alert("단가를 입력해주세요");
        return false;
    }else if (data.price === ''){
        alert("수량과 단가를 다시 확인해주세요");
        return false;
    } else {
        return true;
    }

    
}
