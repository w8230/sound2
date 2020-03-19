<%@ page import="java.util.Date" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script type="text/javascript" src="/data-component/mesSCM/InOut/scmIn/scmIn.js" charset="UTF-8"></script>

<style>
    #scmInDialogLeftGridPager #pg_scmInDialogLeftGridPager table{
        table-layout:auto !important;
    }

</style>
<%--<form name="excelForm" id="excelForm" method="POST" action="/excelDown">--%>
<%--    <input type="submit" id="excelDown" value="EXCEL 다운"/>--%>
<%--</form>--%>
<div class="main-content-inner">

    <div class="page-content">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">조회기간</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="start_date" id="datepicker" class="form-control h-25 condition_main" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="t-align-c" style="width:25px !important;">~</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="end_date" id="datepicker2" class="form-control h-25 condition_main" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">업체</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="supp_name" class="form-control h-25 condition_main" id="supp_name_main" readonly onclick="supp_btn('A');">
                            <input type="hidden" name="keyword" class="form-control h-25 condition_main" id="supp_code_main">
                            <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch"></i>
                        </div>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <a id="get_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""   onclick="get_btn(1)">
                            <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                            </span>
                    </a>
                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" title="" id="showDialog" onclick="add_btn();">
                            <span><i class="fa fa-plus bigger-110 blue"></i>
                            <span>추가</span>
                            </span>
                    </a>
                    <a id="delete_btn" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="delete_btn();">
                        <span>
                        <i class="fa fa-trash bigger-110 blue"></i>
                        <span>삭제</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12 table-responsive">
                <table id="scmInTopGrid"></table>
                <div id="scmInTopGridPager"></div>
            </div>
        </div>

        <hr />

        <div class="row">
            <div class="col-xs-12 table-responsive">
                <table id="scmInBottomGrid"></table>
                <div id="scmInBottomGridPager"></div>
            </div>
        </div>
    </div>
</div>

<%@include file="scmIn_modal1.jsp"%>
<%@include file="scmIn_modal2.jsp"%>
<%@include file="scmIn_modal3.jsp"%>
<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %>

<script>
// $(document).ready(function () {
//
//        var topGrid_data =
//            [
//                {indate:"2019-11-14",num:"P01-123112215",supp:"투비시스템",state:"입고",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112216",supp:"투비시스템",state:"입고",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112217",supp:"투비시스템",state:"입고",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112218",supp:"투비시스템",state:"검사대기",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112219",supp:"투비시스템",state:"입고완료",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112220",supp:"투비시스템",state:"검사대기",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112221",supp:"투비시스템",state:"검사대기",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112222",supp:"투비시스템",state:"검사대기",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112223",supp:"투비시스템",state:"검사대기",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112224",supp:"투비시스템",state:"입고",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112225",supp:"투비시스템",state:"입고",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112226",supp:"투비시스템",state:"입고완료",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112227",supp:"투비시스템",state:"입고완료",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112228",supp:"투비시스템",state:"입고완료",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112229",supp:"투비시스템",state:"입고",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112230",supp:"투비시스템",state:"입고완료",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//                {indate:"2019-11-14",num:"P01-123112231",supp:"투비시스템",state:"입고",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//            ];
//        var bottomGrid_data =
//            [
//                {num:"P01-123112215",group:"투비시스템",state:"입고",manager:"LEE",outdate:"2019-11-15 09:00:00"},
//            ];
//
//
//
//
//        $( "#datepicker").datepicker({
//            autoclose: true,
//            format:'yyyy-mm-dd',
//            language: "kr",
//        });
//        $( "#datepicker2").datepicker({
//            autoclose: true,
//            format:'yyyy-mm-dd',
//            language: "kr"
//        });
//      var ss =   new Date();
//        var date = new Date();
//        date.setDate(date.getDate() - 1);
//
//
//        $( "#datepicker3").datepicker({
//            autoclose: true,
//            format:'yyyy-mm-dd',
//            language: "kr"
//        }).datepicker('setDate',date);
//
//        $("#p_group").select2();
//        /**
//         * @DESC : jquery ui dialog
//         * @생성일 : 2019-10-30
//         * @생성자 : 김재일
//         * **/
//        $('#scmIn-add-dialog').dialog({
//            autoOpen:false,
//            modal: true,
//            width: 1300,
//            height: 600,
//            number:1
//
//        });
//
//        $( "#showDialog" ).on('click', function(e) {
//            e.preventDefault();
//            $('#scmIn-add-dialog').dialog('open');
//            //var text=$('.ui-dialog').attr('style');
//            //console.log(text);
//        });
//
//        // $( "#supp-search-dialog" ).dialog({
//        //     autoOpen:false,
//        //     modal: true,
//        //     width: 800,
//        //     height: 470,
//        //     number:2
//        // });
//
//        $("#SuppSearch-i").on('click', function(e) {
//            e.preventDefault();
//            $( "#supp-search-dialog" ).dialog('open');
//            jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));
//            //$('.ui-dialog').attr('style','z-index: 9999 !improtant');
//            //$('.ui-widget-overlay').attr('style','z-index:9998 !important');
//            //var text=$('.ui-dialog').attr('style');
//            //$('.ui-dialog').attr('style',text+' z-index:9999 !important');
//        });
//
//        $("#SuppSearch-i-Main").on('click', function(e) {
//            e.preventDefault();
//            $( "#supp-search-dialog" ).dialog('open');
//            jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));
//            //var text=$('.ui-dialog').attr('style');
//            //$('.ui-dialog').attr('style',text+' z-index:9999 !important');
//        });
//
//        /**
//         * @DESC : jqGrid 생성
//         * @생성일 : 2019-10-30
//         * @생성자 : 김재일
//         * **/
//        var grid_selector = "#scmInTopGrid";
//        var pager_selector = "#scmInTopGridPager";
//        var parent_column = $(grid_selector).closest('[class*="col-"]');
//
//        var grid_selector2 = "#scmInBottomGrid";
//        var pager_selector2 = "#scmInBottomGridPager";
//        var parent_column2 = $(grid_selector2).closest('[class*="col-"]');
//
//        var grid_selector3 = "#scmInDialogLeftGrid";
//        var pager_selector3 = "#scmInDialogLeftGridPager";
//        var parent_column3 = $(grid_selector3).closest('[class*="col-"]');
//
//        var grid_selector4 = "#scmInDialogRightGrid";
//        var parent_column4 = $(grid_selector4).closest('[class*="col-"]');
//
//        var grid_selector5 = "#SuppSearchGrid";
//        var parent_column5 = $(grid_selector5).closest('[class*="col-"]');
//
//
//        /**
//         * @DESC : jqGrid resize
//         * @생성일 : 2019-10-30
//         * @생성자 : 김재일
//         * **/
//        $(window).on('resize.jqGrid', function () {
//            $(grid_selector).jqGrid( 'setGridWidth', parent_column.width());
//        })
//
//        $(window).on('resize.jqGrid', function () {
//            $(grid_selector2).jqGrid( 'setGridWidth', parent_column2.width());
//        })
//
//        // 리사이즈 세팅
//        $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
//            if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
//                setTimeout(function() {
//                    $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
//                }, 20);
//            }
//        })
//
//        $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
//            if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
//                setTimeout(function() {
//                    $(grid_selector2).jqGrid( 'setGridWidth', parent_column2.width() );
//                }, 20);
//            }
//        })
//
//
//        /**
//         * @DESC : jqGrid 생성
//         * @생성일 : 2019-10-30
//         * @생성자 : 김재일
//         * **/
//        $(grid_selector).jqGrid({
//            data: topGrid_data,
//            datatype: "local",
//            // 다중 select
//            multiselect: true,
//            // 타이틀
//            caption: "입고등록 | MES",
//            colNames: ['입고일자','전표번호','업체','상태','처리자','출고일시'],
//            colModel: [
//                {name: 'indate', index: 'indate', width: 60},
//                {name: 'num', index: 'num', width: 60},
//                {name: 'supp', index: 'supp', width: 60},
//                {name: 'state', index: 'state', width: 60},
//                {name: 'manager', index: 'manager', width: 60},
//                {name: 'outdate', index: 'outdate', width: 60},
//            ],
//            viewrecords: true,
//            height: 150,
//            rowNum: 100,
//            rowList:[100,200,300,500,1000],
//            pager: pager_selector,
//
//        });
//
//        $(grid_selector2).jqGrid({
//            data: bottomGrid_data,
//            datatype: "local",
//            caption: "입고등록 | MES",
//            colNames: ['전표번호','품목그룹','품번','품명','업체명','규격','단위','입고수량','불량수량','실입고수량'],
//            colModel: [
//                {name: 'num', index: 'code', width: 60},
//                {name: 'group', index: 'name', width: 60},
//                {name: 'p_num', index: 'cargo', width: 60},
//                {name: 'p_name', index: 'location', width: 60},
//                {name: 'c_name', index: 'cargo', width: 60},
//                {name: 'standard', index: 'cargo', width: 60},
//                {name: 'unit', index: 'standard', width: 60},
//                {name: 'in_num', index: 'unit', width: 60},
//                {name: 'bad_num', index: 'max', width: 60},
//                {name: 'real_num', index: 'min', width: 60},
//            ],
//            viewrecords: true,
//            height: 200,
//            rowNum: 100,
//            rowList:[100,200,300,500,1000],
//            pager: pager_selector2,
//
//        }); /**
//         * @DESC : jqGrid 생성
//         * @생성일 : 2019-10-30
//         * @생성자 : 김재일
//         * **/
//        $(grid_selector).jqGrid({
//            data: topGrid_data,
//            datatype: "local",
//            // 다중 select
//            multiselect: true,
//            // 타이틀
//            caption: "입고등록 | MES",
//            colNames: ['입고일자','전표번호','업체','상태','처리자','출고일시'],
//            colModel: [
//                {name: 'indate', index: 'indate', width: 60},
//                {name: 'num', index: 'num', width: 60},
//                {name: 'supp', index: 'supp', width: 60},
//                {name: 'state', index: 'state', width: 60},
//                {name: 'manager', index: 'manager', width: 60},
//                {name: 'outdate', index: 'outdate', width: 60},
//            ],
//            viewrecords: true,
//            height: 150,
//            rowNum: 100,
//            rowList:[100,200,300,500,1000],
//            pager: pager_selector,
//
//        });
//
//        $(grid_selector2).jqGrid({
//            data: bottomGrid_data,
//            datatype: "local",
//            caption: "입고등록 | MES",
//            colNames: ['전표번호','품목그룹','품번','품명','업체명','규격','단위','입고수량','불량수량','실입고수량'],
//            colModel: [
//                {name: 'num', index: 'code', width: 60},
//                {name: 'group', index: 'name', width: 60},
//                {name: 'p_num', index: 'cargo', width: 60},
//                {name: 'p_name', index: 'location', width: 60},
//                {name: 'c_name', index: 'cargo', width: 60},
//                {name: 'standard', index: 'cargo', width: 60},
//                {name: 'unit', index: 'standard', width: 60},
//                {name: 'in_num', index: 'unit', width: 60},
//                {name: 'bad_num', index: 'max', width: 60},
//                {name: 'real_num', index: 'min', width: 60},
//            ],
//            viewrecords: true,
//            height: 200,
//            rowNum: 100,
//            rowList:[100,200,300,500,1000],
//            pager: pager_selector2,
//
//        });
//
//        $(grid_selector3).jqGrid({
//            data: bottomGrid_data,
//            datatype: "local",
//            // 다중 select
//            multiselect: true,
//            // 타이틀
//            caption: "입고등록 | MES",
//            colNames: ['품목그룹','품번','품명','규격','단위','포장수량','검사등급'],
//            colModel: [
//                {name: 'gruoup', index: 'gruoup'},
//                {name: 'num', index: 'num'},
//                {name: 'name', index: 'name'},
//                {name: 'standard', index: 'standard'},
//                {name: 'unit', index: 'unit'},
//                {name: 'package', index: 'package'},
//                {name: 'grade', index: 'grade'},
//            ],
//            // 페이지 수 보기 (1 / 100) = true
//            // 높이 : 450px
//            width : 521,
//            height: 300,
//            // 디폴트 조회 개수 : 100
//            rowNum: 100,
//            // 단위 별 조회 개수
//            rowList:[100,200,300,500,1000],
//            // pager 세팅
//            pager: pager_selector3,
//            // jqGrid load 시 실행 함수 = setTimeout
//            // setTimeout함수는 함수 뒤 시간이 지나면 호출됨. 현재 : 0 (1000 = 1초)
//            // 호출되는 함수는 pager icon 함수
//
//        });
//
//        $(grid_selector4).jqGrid({
//            data: bottomGrid_data,
//            datatype: "local",
//            // 다중 select
//            multiselect: true,
//            // 타이틀
//            caption: "입고등록 | MES",
//            colNames: ['품목그룹','품번','품명','규격','단위','검사등급','입고수량'],
//            colModel: [
//                {name: 'group', index: 'gruoup', width: 60},
//                {name: 'num', index: 'num', width: 60},
//                {name: 'name', index: 'name', width: 60},
//                {name: 'standard', index: 'standard', width: 60},
//                {name: 'unit', index: 'unit', width: 60},
//                {name: 'grade', index: 'grade', width: 60},
//                {name: 'in_num', index: 'in_num', width: 60},
//            ],
//            // 페이지 수 보기 (1 / 100) = true
//            // 높이 : 450px
//            width: 621,
//            height: 355,
//            // 디폴트 조회 개수 : 100
//            rowNum: 100,
//            // 단위 별 조회 개수
//            rowList:[100,200,300,500,1000],
//            // pager 세팅
//            // jqGrid load 시 실행 함수 = setTimeout
//            // setTimeout함수는 함수 뒤 시간이 지나면 호출됨. 현재 : 0 (1000 = 1초)
//            // 호출되는 함수는 pager icon 함수
//
//        });

        // $(grid_selector5).jqGrid({
        //     data: suppGrid_data,
        //     datatype: "local",
        //     // 다중 select
        //     multiselect: true,
        //     // 타이틀
        //     caption: "업체조회 | MES",
        //     colNames: ['업체코드','업체명','사업자번호','대표','주소'],
        //     colModel: [
        //         {name: 'suppcode', index: 'suppcode',width: 80},
        //         {name: 'suppname', index: 'suppname',width: 80},
        //         {name: 'suppum', index: 'suppum',width: 200},
        //         {name: 'ceo', index: 'ceo',width: 80},
        //         {name: 'address', index: 'address',width: 200},
        //     ],
        //     // 페이지 수 보기 (1 / 100) = true
        //     // 높이 : 450px
        //     width : 750,
        //     height: 250,
        //     // 디폴트 조회 개수 : 100
        //     rowNum: 100,
        //     // 단위 별 조회 개수
        //     // pager 세팅
        //     // jqGrid load 시 실행 함수 = setTimeout
        //     // setTimeout함수는 함수 뒤 시간이 지나면 호출됨. 현재 : 0 (1000 = 1초)
        //     // 호출되는 함수는 pager icon 함수
        //     loadComplete : function() {
        //
        //     }
        // });

        // pager 아이콘 생성 함수
        // function updatePagerIcons(table) {
        //     var replace =
        //         {
        //             'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
        //             'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
        //             'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
        //             'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
        //         };
        //     $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
        //         var icon = $(this);
        //         var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
        //
        //         if($class in replace) icon.attr('class', 'ui-icon '+replace[$class]);
        //     })
        // }

        // 넓이 조절 함수


        /**
         * @DESC : Jquery ui dialog
         * @생성일 : 2019-11-01
         * @생성자 : 김재일
         * **/
        // $("#close_btn").on('click',function(e){
        //     e.preventDefault();
        //     $("#scmIn-add-dialog").dialog('close');
        // });
        //
        // $("#close_btn2").on('click',function(e){
        //     e.preventDefault();
        //     $("#supp-search-dialog").dialog('close');
        // });
        //
        // suppModal_start();
        //
        // $(window).triggerHandler('resize.jqGrid');
    // });
</script>


