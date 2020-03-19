<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesSCM/InOut/scmOutOrder/scmOutOrder_modal1.js" charset="UTF-8"></script>
<style>
    input[type=text][name="qty"] {
        height: 18px !important;
    }
    #scmOutOrderDialogLeftGridPager #pg_scmOutOrderDialogLeftGridPager table{
        table-layout:auto !important;
    }
</style>
<div id="scmOutOrder-add-dialog"  title="출고요청추가" style="display: none">
    <div class="clearfix margin-at">
        <div class="col-xs-5">
            <table class="table wt-100">
                <tbody>
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
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" onclick="get_modal1_btn(1);">
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
                    <table id="scmOutOrderDialogLeftGrid"></table>
                    <div id="scmOutOrderDialogLeftGridPager"></div>
                </div>
            </div>
        </div>

        <div class="col-xs-7">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">출고일자</td>
                    <td class="wt-px-150 h-25">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="work_date" id="datepicker3" class="form-control h-25 modal_value2" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="wt-px-100 td-title"></td>
                    <td class="wt-px-150 h-25"></td>
                </tr>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">공정</td>
                    <td class="wt-px-150">
                        <select name="cargo_code_to" id="line_select" class="form-control modal_value2" style="width: 100%">

                        </select>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">용도</td>
                    <td class="wt-px-150">
                        <select name="usage" id="usage_select" class="form-control modal_value2" style="width: 100%">
                            <option value="1">양산</option>
                            <option value="2">개발</option>
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="clearfix">
                <div class="pull-left tableTools-container">
                    <div class="dt-buttons btn-overlap btn-group">
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" onclick=" add_modal1_btn();">
                        <span>
                            <i class="fa fa-plus bigger-110 blue"></i>
                            <span>저장</span>
                        </span>
                        </a>
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" id="close_btn" onclick="close_modal1_btn();">
                        <span>
                             <i class="fa fa-times bigger-110 blue"></i>
                            <span>취소</span>
                        </span>
                        </a>
                    </div>
                </div>
            </div>
            <input type="hidden" name="ord_no" id="ord_no" class="form-control h-25 modal_value2">
            <div class="row">
                <div class="col-xs-12">
                    <table id="scmOutOrderDialogRightGrid"></table>
                </div>
            </div>
        </div>
    </div>
</div>

