<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesQMS/Import/qmsRecv/qmsRecv_modal1.js" charset="UTF-8"></script>
<style>
    .filebox label {
        display: inline-block;
        padding: .5em .75em;
        color: #fff;
        font-size: 6pt;
        line-height: normal;
        vertical-align: middle;
        background-color: #337ab7;
        cursor: pointer;
        border: 1px solid #2e6da4;
        border-radius: .25em;
        -webkit-transition: background-color 0.2s;
        transition: background-color 0.2s;
        margin-bottom: 0px!important;
    }

    .filebox label:hover {
        background-color: #2e6da4;
    }

    .filebox label:active {
        background-color:#2e6da4;
    }

    .filebox input[type="file"] {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }

    div .filebox{
        vertical-align: middle;
        text-align: center;
    }

    input[type=text][name="qc_qty"] {
        height: 18px !important;
    }
    input[type=text][name="ng_qty"] {
        height: 18px !important;
    }
    select[name=qc_result] {
        height: 18px !important;
        width: 100%;
    }
    select[name=ng_type] {
        height: 18px !important;
        width: 100%;
    }
    input[type=text][name="ng_name"] {
        height: 18px !important;
    }
    select[name=act_type] {
        height: 18px !important;
        width: 100%;
    }
</style>

<div id="addDialog" title="수입검사등록" style="display:none">
    <div class="col-lg-12">
        <div class="col-lg-12 padding0" id="content1">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">입고일자</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="work_date" id="datepicker3" class="form-control h-25 modal_value" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">전표번호</td>
                    <td class="wt-px-200">
                        <input type="text" name="in_no" id="in_no"  class="form-control h-25 modal_value" readonly>
                    </td>

                    <td class="wt-px-100 t-align-c td-title padding-a-0">업체명</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="supp_name" class="form-control h-25 modal_value"
                                   id="supp_name_modal"  readonly>
                            <input type="hidden" name="supp_code" class="form-control h-25 modal_value"
                                   id="supp_code_modal">
                            <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch"></i>
                        </div>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>

            <div class="clearfix">
                <div class="pull-left tableTools-container">
                    <div class="dt-buttons btn-overlap btn-group">
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" onclick="addupdate_btn()">
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

