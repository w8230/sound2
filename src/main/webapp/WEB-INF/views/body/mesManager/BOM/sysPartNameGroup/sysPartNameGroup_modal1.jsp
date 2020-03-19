<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/admin/bom/sysPartNameGroup/sysPartNameGroup_modal1.js"
        charset="UTF-8"></script>

<div id="addDialog" title="품명분류 추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped" id="modal_all_div">
        <div class="profile-info-row">
            <div class="profile-info-name">구분</div>
            <div class="profile-info-value">
                <input type="text" name="code_type_name" id="code_type_name" class="form-control modal_value" readonly>
                <input type="hidden" name="code_type" id="code_type" class="form-control modal_value" readonly>
                <input type="hidden" name="idx" class="form-control modal_value" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">분류항목</div>
            <div class="profile-info-value">
                <input type="text" name="code_value_name" id="code_value_name" class="form-control modal_value" readonly>
                <input type="hidden" name="code_value" id="code_value" class="form-control modal_value" readonly>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name" id="code_name1_text">코드</div>
            <div class="profile-info-value">
                <input type="text" name="code_name1" class="form-control modal_value wt-px-150" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name" id="code_name2_text">표기</div>
            <div class="profile-info-value">
                <input type="text" name="code_name2" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row" id="code_name3_div">
            <div class="profile-info-name" id="code_name3_text">지름</div>
            <div class="profile-info-value">
                <input type="text" id="code_name3_lot" name="code_name3" class="form-control modal_value wt-px-150" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row" id="code_name4_div">
            <div class="profile-info-name" id="code_name4_text">범위</div>
            <div class="profile-info-value">
                <input type="text" name="code_name4"  class="form-control modal_value">
            </div>
        </div>

    </div>
</div>
