<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesCRM/Crm/crmPlan/crmPlan_modal1.js"
        charset="UTF-8"></script>

<div id="addDialog" title="계획추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 분기</div>
            <div class="profile-info-value">
                <input type="text" name="quarter_name" id="quarter_name" class="form-control modal_value" readonly>
                <input type="hidden" name="quarter" id="quarter" class="form-control modal_value" />
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 년도</div>
            <div class="profile-info-value">
                <input type="text" name="plan_year_name" id="plan_year_name" class="form-control modal_value" readonly>
                <input type="hidden" name="plan_year" id="plan_year" class="form-control modal_value" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 제품코드</div>
            <div class="profile-info-value">
            <div class="input-icon input-icon-right">
                <input type="text" name="part_name" class="form-control h-25 modal_value"
                       id="part_name_modal" onclick="part_btn();" readonly>
                <input type="hidden" name="part_code" class="form-control h-25 modal_value"
                       id="part_code_modal">
                <i class="ace-icon fa fa-search dark" style="top: -2px;" ></i>
            </div>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 수정시점 재고</div>
            <div class="profile-info-value">
                <input type="text" name="stock_qty" id="stock_qty" class="form-control modal_value" readonly placeholder="자동표시">
            </div>
        </div>

    </div>
    <div class="profile-user-info profile-user-info-striped" style="border-top: 0px;">
        <div class="profile-info-row">
            <div class="profile-info-name"></div>
            <div class="profile-info-name" id="month1">1월</div>
            <div class="profile-info-name" id="month2">2월</div>
            <div class="profile-info-name" id="month3">3월</div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">확정</div>
            <div class="profile-info-value">
                <input type="text" name="month1_plan1" class="form-control modal_value"  autocomplete="off" >
            </div>
            <div class="profile-info-value">
                <input type="text" name="month2_plan1" class="form-control modal_value" autocomplete="off" >
            </div>
            <div class="profile-info-value">
                <input type="text" name="month3_plan1" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">협의</div>
            <div class="profile-info-value">
                <input type="text" name="month1_plan2" class="form-control modal_value"  autocomplete="off" >
            </div>
            <div class="profile-info-value">
                <input type="text" name="month2_plan2" class="form-control modal_value"  autocomplete="off" >
            </div>
            <div class="profile-info-value">
                <input type="text" name="month3_plan2" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">예상</div>
            <div class="profile-info-value">
                <input type="text" name="month1_plan3" class="form-control modal_value"  autocomplete="off" >
            </div>
            <div class="profile-info-value">
                <input type="text" name="month2_plan3" class="form-control modal_value"  autocomplete="off" >
            </div>
            <div class="profile-info-value">
                <input type="text" name="month3_plan3" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
    </div>
</div>
