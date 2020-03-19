<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesSCM/InOut/scmIn/scmIn_modal3.js"
        charset="UTF-8"></script>
<style>
    .footrow td {
        border: 0px!important;
    }

    input[type=text][name=in_qty] {
        height: 18px !important;
    }
    select[name=result_check] {
        height: 18px !important;
        width: 100%;
    }
</style>
<div id="addDialog3" title="발주확인 조회" style="display:none">
    <div class="col-lg-12">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">조회기간</td>
                    <td class="wt-px-150">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="start_date" id="modal3_datepicker" class="form-control h-25 modal3_condition" readonly >
                            <input type="hidden"  class="form-control h-25" autofocus readonly >
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="t-align-c" style="width:25px !important;">
                        ~
                    </td>
                    <td class="wt-px-150">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="end_date" id="modal3_datepicker2" class="form-control h-25 modal3_condition" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">업체</td>
                    <td class="wt-px-150">
                          <span class="input-icon input-icon-right">
                            <input type="text" name="supp_name" class="form-control h-25  modal3_condition" value="" id="supp_name_modal3" readonly>
                            <input type="hidden" name="keyword" class="form-control h-25  modal3_condition" value="" id="supp_code_modal3">
                          <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch-Main"></i>
                          </span>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>

            <div class="clearfix">
                <div class="pull-left tableTools-container">
                    <div class="dt-buttons btn-overlap btn-group">
                        <a  id="get_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="modal3_get_btn(1);">
                                <span>
                                    <i class="fa fa-search bigger-110 blue"></i>
                                    <span>조회</span>
                                </span>
                        </a>
                        <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" title="" id="showDialog" onclick="modal3_add_btn();">
                                <span><i class="fa fa-check bigger-110 blue"></i>
                                    <span>적용</span>
                                </span>
                        </a>
                        <a id="delete_btn" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="modal3_close();">
                                <span>
                                    <i class="fa fa-times bigger-110 blue"></i>
                                    <span>닫기</span>
                                </span>
                        </a>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-xs-12">
                    <table id="modal3Grid"></table>
                    <div id="modal3GridPager"></div>
                </div>
            </div>
        </div>
    </div>
</div>
