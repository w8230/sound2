<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesQMS/Shipment/qmsProd/qmsProd_modal1.js" charset="UTF-8"></script>
<style>
    input[type=text][name="qc_qty"] {
        height: 18px !important;
    }
    input[type=text][name="ng_qty"] {
        height: 18px !important;
    }
    select[name="qc_result"]{
        height: 18px !important;
        width: 100% !important;
    }
    select[name="ng_type"]{
        height: 18px !important;
        width: 100% !important;
    }
    input[type=text][name="ng_name"] {
        height: 18px !important;
    }
    select[name="act_type"]{
        height: 18px !important;
        width: 100% !important;
    }

</style>

<div id="addDialog" title="출하검사등록" style="display:none">
    <div class="col-lg-12">
        <div class="col-lg-12 padding0" id="content1">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">입고일자</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" id="work_date" name="work_date"  class="form-control h-25 modal_value" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">전표번호</td>
                    <td class="wt-px-200">
                        <input type="text" id="in_no" name="in_no" class="form-control h-25 modal_value" readonly>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>

            <div class="clearfix">
                <div class="pull-left tableTools-container">
                    <div class="dt-buttons btn-overlap btn-group">
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" onclick="add_modal1_btn();">
                            <span>
                                <i class="fa fa-plus bigger-110 blue"></i>
                                <span>저장</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12">
                    <table id="mes_modal_grid"></table>
                </div>
            </div>
        </div>
    </div>
</div>

