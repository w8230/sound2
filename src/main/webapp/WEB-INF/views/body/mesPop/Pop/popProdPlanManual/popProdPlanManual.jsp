<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/data-component/mesPOP/Pop/popProdPlanManual/popProdPlanManual.js" charset="UTF-8"></script>
<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0">
            <table class="table wt-100 ">
                <tbody>

                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">작업지시일자</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="end_date" id="datepicker"
                                   class="form-control h-25" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>

                    <td class="wt-px-100 t-align-c td-title padding-a-0">생산라인</td>
                    <td class="wt-px-200">
                        <select class="form-control">
                            <option>압출</option>
                        </select>
                    </td>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">품목구분</td>
                    <td class="wt-px-200">
                        <select class="form-control">
                            <option>구분</option>
                        </select>
                    </td>
                    <td class="wt-px-100 td-title t-align-c padding-a-0"></td>
                    <td class="wt-px-200">



                    </td>
                    <td ></td>
                </tr>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0" style="border: 0px !important;">품번</td>
                    <td class="wt-px-200" style="border: 0px !important;">
                        <input type="text" name="in_no" id="in_no"  class="form-control h-25 modal_value" >
                    </td>

                    <td class="wt-px-100 t-align-c td-title padding-a-0" style="border: 0px !important;">품명</td>
                    <td class="wt-px-200" style="border: 0px !important;">
                        <input type="text" name="supp_name" class="form-control h-25 modal_value"/>
                    </td>
                    <td class="wt-px-100 td-title t-align-c padding-a-0" style="border: 0px !important;">규격</td>
                    <td class="wt-px-200" style="border: 0px !important;">
                        <input type="text" class="form-control h-25 modal_value" >

                    </td>
                    <td class="wt-px-100 td-title t-align-c padding-a-0" style="border: 0px !important;">작업지시수량</td>
                    <td class="wt-px-200" style="border: 0px !important;">
                        <input type="text" class="form-control h-25 modal_value" >
                    </td>
                    <td style="border: 0px !important;"></td>
                </tr>
                </tbody>

            </table>
        </div>

        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1);">
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
                    <a class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="delete_btn();">
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
                <table id="mes_grid"></table>
                <div id="mes_grid_pager"></div>
            </div>
        </div>
    </div>
</div>


