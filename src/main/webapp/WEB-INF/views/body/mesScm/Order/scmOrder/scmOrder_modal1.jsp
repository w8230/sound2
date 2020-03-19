<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesSCM/Order/scmOrder/scmOrder_modal1.js" charset="UTF-8"></script>
<style>
    td label {
        font-size: 12px!important;
        margin-right: 8px;
    }
    input[name='attachment']{
        position: relative;
        top: 3px;
    }
    input[type=text][name="ord_qty"] {
        height: 18px !important;
    }
    input[type=text][name="end_date"] {
        height: 18px !important;
    }
</style>
<div id="addDialog" title="발주추가" style="display: none">
    <div class="col-lg-12">
        <div class="col-lg-5">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">업체</td>
                    <td class="wt-px-150 h-25">
                          <span class="input-icon input-icon-right">
                            <input type="text" name="supp_name" class="form-control h-25 modal_value" value="" id="supp_name_modal" onclick="supp_btn('B');" readonly>
                            <input type="hidden" name="keyword6" class="form-control h-25 modal_value modal_value2" value="" id="supp_code_modal">
                          <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch-Main"></i>
                          </span>
                    </td>


                    <td></td>
                    <td></td>


                </tr>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">구분</td>
                    <td class="wt-px-150 h-25">
                        <select name="keyword" class="form-control modal_value" id="part_type_modal1_select"  onchange="select_part_type_change_modal(this.value);" style="width: 100%">
                        </select>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0" id="part_group1">품목군</td>
                    <td class="wt-px-150 h-25">
                        <select class="form-control modal_value" name="keyword2" id="part_group_modal1_select" onchange="select_change1_modal(this.value)"  style="width:100%">
                        </select>
                    </td>


                </tr>
                <tr>

                    <td class="wt-px-100 t-align-c td-title padding-a-0" id="part_group2">제품군</td>
                    <td class="wt-px-150 h-25">
                        <select class="form-control modal_value" name="keyword3" id="part_group_modal1_select2" style="width:100%">
                        </select>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0" id="part_group3">품명</td>
                    <td class="wt-px-150 h-25">
                        <select id="part_name_modal1_select" name="keyword4" class="form-control keyword modal_value" style="width:100%; font-size: 5px !important;">
                        </select>
                    </td>

                </tr>
                </tbody>
            </table>

            <div class="clearfix">
                <div class="pull-left tableTools-container">
                    <div class="dt-buttons btn-overlap btn-group">
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_modal1_btn(1);">
                            <span>
                                <i class="fa fa-search bigger-110 blue"></i>
                                <span>조회</span>
                            </span>
                        </a>
                    </div>
                </div>
                <div class="pull-right">
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" onclick="right_modal1_btn();">
                                <span>
                                    <i class="fa fa-arrow-right bigger-110 blue"></i>
                                </span>
                    </a>
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" style="margin-left:10px;" tabindex="0" aria-controls="dynamic-table" onclick="left_modal1_btn();">
                                <span>
                                    <i class="fa fa-arrow-left bigger-110 pink"></i>
                                </span>
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <table id="mes_add_grid"></table>
                    <div id="mes_add_grid_pager"></div>
                </div>
            </div>
        </div>

        <div class="col-lg-7">
            <table class="table wt-100">
                <tbody>
                <tr>

                    <td class="wt-px-150 h-25 " colspan="4" style="border-top: 0px!important;"></td>
                </tr>

                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">발주일자</td>
                    <td class="wt-px-150 h-25">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="work_date" id="datepicker3" class="form-control h-25 modal_value2">
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">금액표기</td>
                    <td class="wt-px-150 h-25">
                        <select name="view_amount" class="form-control modal_value2" id="view_select" style="width: 100%">
                            <option value="0">표기안함</option>
                            <option value="1">표기</option>
                        </select>
                    </td>
                    <td></td>
                    <td></td>
                </tr>

                </tbody>
            </table>
            <input type="hidden" name="ord_no" id="ord_no" class="form-control h-25 modal_value2">

            <div class="clearfix">
                <div class="pull-left tableTools-container">
                    <div class="dt-buttons btn-overlap btn-group">
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" title="" onclick="add_modal1_btn();">
                            <span>
                                <i class="fa fa-plus bigger-110 blue"></i>
                                <span>저장</span>
                            </span>
                        </a>
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" id="close_btn">
                            <span>
                            	 <i class="fa fa-times bigger-110 blue"></i>
                                <span>취소</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-bottom:20px;">
                <div class="col-xs-12">
                    <table id="mes_add_grid2"></table>
                </div>
            </div>
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">Terms of Payment</td>
                    <td class="wt-px-150">
                        <select name="t_payment" class="form-control modal_value2" style="width: 100%">
                        </select>
                    </td>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">Terms of Delivery</td>
                    <td class="wt-px-150">
                        <select name="t_delivery" class="form-control modal_value2" style="width: 100%">

                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0 ">Delivery</td>
                    <td colspan="3">
                        <input name="delivery" type="text" class="form-control modal_value2" autocomplete="off"/>
                    </td>
                </tr>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">Attachment</td>
                    <td colspan="3">
                        <label><input name="attachment" value="0" type="radio"  />Test Report</label>
                        <label><input name="attachment" value="1" type="radio" />RoHS Report</label>
                        <label><input name="attachment" value="2" type="radio" />C.O.C</label>
                        <label><input name="attachment" value="3" type="radio" />Samples for Incoming Test</label>
                    </td>
                </tr>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">Shipping Nomination</td>
                    <td colspan="3">
                        <select name="shipping_addr" class="form-control modal_value2" style="width: 100%">

                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">비고</td>
                    <td colspan="3">
                       <input name="remark" type="text" class="form-control modal_value2" autocomplete="off"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
