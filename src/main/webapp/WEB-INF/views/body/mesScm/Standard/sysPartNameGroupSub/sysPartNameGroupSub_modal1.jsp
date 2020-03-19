<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesSCM/Standard/sysPartNameGroupSub/sysPartNameGroupSub_modal1.js"
        charset="UTF-8"></script>

<div id="addDialog" title="품명세부분류 추가" style="display:none">
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
            <div class="profile-info-name">생성순</div>
            <div class="profile-info-value">
                <input type="text"  name="code_name1" class="form-control modal_value">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">코드</div>
            <div class="profile-info-value">
                <input type="text"  name="code_name2" class="form-control modal_value">
            </div>
        </div>
    </div>
</div>
