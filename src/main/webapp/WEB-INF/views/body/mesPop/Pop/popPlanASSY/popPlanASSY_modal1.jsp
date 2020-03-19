<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/Pop/popPlanASSY/popPlanASSY_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="생산계획(ASSY)등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">계획일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="hidden" class="modal_value" name="plan_no3">

                    <input type="text" id="datepicker3" name="plan_date"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
            <div class="profile-info-name">품목군</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" name="part_grp_code" id="part_group_select_modal1" onchange="select_change1_modal1(this.value)" style="width:100%" autofocus>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">제품군</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" name="part_grp_code2" id="part_prod_select_modal1" style="width:100%" onchange="select_change2_modal1(this.value)">
                </select>
            </div>
            <div class="profile-info-name">제품명</div>
            <div class="profile-info-value">
                <input type="hidden" class="modal_value" name="part_name">
                <select class="form-control h-25 modal_value" name="part_code" id="part_name_select_modal1" style="width:100%" onchange="select_change3_modal1(this.value)">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">커넥터1</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" name="part_code1" id="part_code1_select_modal1" style="width:100%" >
                </select>
            </div>
            <div class="profile-info-name">커넥터2</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" name="part_code2" id="part_code2_select_modal1" style="width:100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">길이</div>
            <div class="profile-info-value">
                <input type="text" class="form-control h-25 modal_value" name="part_length" onkeyup="num_keyup_float(this)"  autocomplete="off">
            </div>
            <div class="profile-info-name">단위</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" id="unit_select_modal1" name="unit_type" style="width:100%" >
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
                <select class="form-control h-25 modal_value" id="prod_type_select" name="prod_type" style="width:100%">
                    <option value="">선택안함</option>
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
            <div class="profile-info-name">마감일</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" id="datepicker4" name="end_date"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
            <div class="profile-info-name"></div>
            <div class="profile-info-value"></div>
        </div>
        <div class="profile-info-row">

        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">Remark</div>
            <div class="profile-info-value">
                <input type="text" name="remark" class="form-control modal_value" name="remark"  autocomplete="off">
            </div>
            <div class="profile-info-name">비고</div>
            <div class="profile-info-value">
                <input type="text" name="remark1" class="form-control modal_value" name="remark1"  autocomplete="off">
            </div>
        </div>
    </div>
</div>
