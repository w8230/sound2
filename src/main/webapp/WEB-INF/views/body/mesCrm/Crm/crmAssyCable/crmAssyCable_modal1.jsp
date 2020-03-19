<%@ page language="java" contentType="text/html; charset=UTF-8" %>

<script type="text/javascript" src="/data-component/mesCRM/Crm/crmAssyCable/crmAssyCable_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="조립케이블 구성 추가" style="display:none">
    <div class="col-lg-12">
        <div class="col-lg-12 padding0" id="content1">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0" >품목군</td>
                    <td class="wt-px-200">
                        <select id="part_group1_modal_select" name="keyword2" class="form-control keyword condition_modal" onchange="select_change1_modal(this.value);" style="width:100%">
                        </select>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0" >제품군</td>
                    <td class="wt-px-200">
                        <select id="part_group2_modal_select" name="keyword3" class="form-control keyword condition_modal"  style="width:100%">
                        </select>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>
            <div class="row">
                <div class="col-md-6">
                    <div class="clearfix">
                        <div class="pull-left tableTools-container">
                            <div class="dt-buttons btn-overlap btn-group">
                                <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                                   tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="modal_get_btn(1);">
                                    <span>
                                        <i class="fa fa-search bigger-110 blue"></i>
                                        <span>조회</span>
                                    </span>
                                </a>
                                <a id="add_btn" class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""  onclick="addupdate_btn();">
                                <span><i class="fa fa-plus bigger-110 blue"></i>
                                    <span>저장</span>
                                </span>
                                </a>
                                <a class="dt-button btn btn-white btn-primary btn-mini btn-bold" onclick="close_modal1_btn()">
			                        <span>
			                            <i class="fa fa-times bigger-110 blue"></i>
			                            <span>닫기</span>
			                        </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div class="row">
                <div class="col-xs-12">
                    <table id="mes_modal_grid"></table>
                    <div id="mes_modal_grid_pager"></div>

                </div>
            </div>
        </div>
    </div>
</div>

