<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/Pop/popPlan1/popPlan1_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="생산계획(1단계)등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">계획일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="hidden" name="plan_no1" class="modal_value">
                    <input type="hidden" name="status" class="modal_value">
                    <input type="text" id="datepicker3" name="plan_date"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품목군</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" name="part_grp_code" id="part_group_select_modal1" onchange="select_change1_modal1(this.value)" style="width:100%" autofocus>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">제품군</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" name="part_grp_code2" id="part_prod_select_modal1" onchange="select_change2_modal1(this.value)" style="width:100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">제품명</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" name="part_code" id="part_name_select_modal1" style="width:100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">계획수량</div>
            <div class="profile-info-value">
                <input type="text" name="plan_qty" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">작업구분</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" name="prod_type" id="prod_type_select" style="width:100%">
                    <option value="1">양산</option>
                    <option value="2">개발</option>
                    <option value="3">재고</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">생산구분</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" name="prod_dept" id="prod_dept_select" style="width:100%">
                </select>
            </div>
        </div><div class="profile-info-row">
        <div class="profile-info-name">마감일자</div>
        <div class="profile-info-value">
            <div class="input-icon input-icon-right">
                <input type="text" id="datepicker4" name="end_date"
                       class="form-control h-25 modal_value" readonly>
                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
            </div>
        </div>
    </div>
        <div class="profile-info-row">
            <div class="profile-info-name">Remark</div>
            <div class="profile-info-value">
                <input type="text" name="remark" class="form-control modal_value"  autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">비고</div>
            <div class="profile-info-value">
                <input type="text" name="remark1" class="form-control modal_value"  autocomplete="off">
            </div>
        </div>
    </div>
</div>
