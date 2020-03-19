<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/Pop/popPlanSub/popPlanSub_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="생산계획(SUB)등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">공정라우팅</div>
            <div class="profile-info-value">
                <input type="hidden" class="modal_value" name="plan_no3">
                <select class="form-control h-25 modal_value" name="route_code" id="route_select_modal1" onchange="select_change1_modal1(this.value)" style="width:100%">
                </select>
            </div>
            <div class="profile-info-name">공정명</div>
            <div class="profile-info-value">
                <input type="text" class="form-control modal_value" id="line_name_modal1" name="line_name" readonly>
                <input type="hidden" class="modal_value" id="line_code_modal1" name="line_code" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">계획일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" id="datepicker3" name="plan_date"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
            <div class="profile-info-name">마감일</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" id="datepicker4" name="end_date"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품목</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" id="mat_prod_select_modal1" name="mat_code" style="width:100%">
                </select>
                <input type="hidden" class="modal_value" name="mat_name">
            </div>
            <div class="profile-info-name">단위</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" id="unit_select_modal1" name="unit_code" style="width:100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">계획수량</div>
            <div class="profile-info-value">
                <input type="text" class="form-control modal_value" name="plan_qty" onkeyup="num_keyup_float(this)"  autocomplete="off">
            </div>
            <div class="profile-info-name">용도</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" id="prod_type_select_modal1" name="prod_type" style="width:100%">
                    <option value="1">양산</option>
                    <option value="2">개발</option>
                    <option value="3">재고</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">생산구분</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" id="prod_dept_select_modal1" name="prod_dept" style="width:100%">
                </select>
            </div>
            <div class="profile-info-name">작업자</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" id="line_user_select_modal1" name="work_user_code" style="width:100%">
                </select>
            </div>

        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">Remark</div>
            <div class="profile-info-value">
                <input type="text" class="form-control modal_value" name="remark"  autocomplete="off">
            </div>
            <div class="profile-info-name">비고</div>
            <div class="profile-info-value">
                <input type="text" class="form-control modal_value" name="remark1"  autocomplete="off">
            </div>

        </div>
    </div>
</div>
