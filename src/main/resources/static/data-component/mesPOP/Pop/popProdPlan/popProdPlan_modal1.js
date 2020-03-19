////////////////////////////데이터////////////////////////////////////////

var main_data = {
    supp_check: 'A',
};


////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {

    modal_make1();
    jqGrid_modal1();
    datepickerInput_modal1();


    jqGridResize('#mes_modal_grid',$('#mes_modal_grid').closest('[class*="col-"]'));
}


////////////////////////////클릭 함수/////////////////////////////////////


function close_modal1_btn() {
    $("#addDialog").dialog('close');
}

function update_btn(rowid) {


        $("#addDialog").dialog('open');
        jqGridResize2("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]'));

}



////////////////////////////호출 함수/////////////////////////////////////

function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width:'auto',
        height: 'auto',
        autoOpen:false,
        resizable: false,
        buttons: [
            {
                "class": "hide",
            }
        ]
    });
}

function jqGrid_modal1() {
    $('#mes_modal_grid').jqGrid({
        datatype: "local",
        caption: "작업지시관리 | MES",
        colNames: ['작지번호','수주번호','작업구분','품명','규격','작지수량'],
        colModel: [
            {name: 'part_grp_name', index: 'part_grp_name', width: 60, sortable: false},
            {name: 'part_code', index: 'part_code',key:true, width: 60, sortable: false},
            {name: 'part_name', index: 'part_name', width: 60, sortable: false},
            {name: 'spec', index: 'spec', width: 60, sortable: false},
            {name: 'unit_name', index: 'unit_name', width: 60, sortable: false},
            {name: 'unit_name', index: 'unit_name', width: 60, sortable: false},

            ],
        multiselect: true,
        autowidth: true,
        height: 250,


    });
}

function datepickerInput_modal1() {
    datepicker_makes("#datepicker3", 0);
}


