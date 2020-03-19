<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="/ui-component/assets/js/jquery.fileDownload.js"></script>
<script type="text/javascript" src="/data-component/mesCRM/Crm/crmPlan/crmPlan.js" charset="UTF-8"></script>
<style>
    #gbox_mes_grid  .ui-jqgrid-htable th div{
        padding-top: 0px;
        overflow: visible;
        font-size: 5px;
    }

    #gview_mes_grid > .ui-jqgrid-hdiv {
        line-height: 1 !important;
        max-height: 50px!important;

    }
</style>

<div id="progressbar1" data-value="0"></div>
<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">조회</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="keyword" id="datepicker"
                                   class="form-control h-25 condition_main" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>

                    <td class="wt-px-100 td-title t-align-c padding-a-0">분기</td>
                    <td class="wt-px-200">
                       <select id="bungi_select" name="keyword2" class="form-control condition_main">
                           <option value="1">1분기</option>
                           <option value="2">2분기</option>
                           <option value="3">3분기</option>
                           <option value="4">4분기</option>
                       </select>
                    </td>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">제품명</td>
                    <td class="wt-px-200">
                       <input type="text" id="part_name_input" name="keyword3" class="form-control condition_main"  autocomplete="off" />
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1)">
                            <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                            </span>
                    </a>
                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="add_btn()">
                            <span><i class="fa fa-plus bigger-110 blue"></i>
                            <span>추가</span>
                            </span>
                    </a>
                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" title=""
                       onclick="excel_download();">
                            <span><i class="fa fa-download bigger-110 blue"></i>
                            <span>저장</span>
                            </span>
                    </a>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12 table-responsive">
                <table id="mes_grid"></table>
                <div id="mes_grid_pager"></div>
            </div>
        </div>
        <div title="데이터 저장중입니다...." id="preparing-file-modal" style="display: none;">
            <div id="progressbar" style="width: 100%; height: 22px; margin-top: 20px;"></div>
        </div>
        <div title="알림" id="error-modal" style="display: none;">
            <p>저장 실패. 관리자에게 문의하세요</p>
        </div>
    </div>
</div>

<%@include file="crmPlan_modal1.jsp"%>
<%@include file="/WEB-INF/views/body/common/modal/part_modal.jsp" %>
