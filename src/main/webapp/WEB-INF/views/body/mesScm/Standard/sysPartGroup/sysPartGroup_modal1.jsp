<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesSCM/Standard/sysPartGroup/sysPartGroup_modal1.js"
        charset="UTF-8"></script>

<div id="addDialog" title="자재그룹추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 구분</div>
            <div class="profile-info-value">
                <input type="text" name="part_type_name" id="part_type_name" class="form-control modal_value" readonly>
                <input type="hidden" name="part_type" id="part_type_code" class="form-control modal_value">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 관리항목</div>
            <div class="profile-info-value">
                <input type="text" name="part_level_name" id="part_level_name" class="form-control modal_value" readonly>
                <input type="hidden" name="part_level" id="part_level" class="form-control modal_value">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 그룹코드</div>
            <div class="profile-info-value">
                <input type="text" name="part_grp_code" class="form-control modal_value">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 그룹명</div>
            <div class="profile-info-value">
                <input type="text" name="part_grp_name" class="form-control modal_value">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 비고</div>
            <div class="profile-info-value">
                <input type="text" name="remark" class="form-control modal_value">
            </div>
        </div>

    </div>
</div>
