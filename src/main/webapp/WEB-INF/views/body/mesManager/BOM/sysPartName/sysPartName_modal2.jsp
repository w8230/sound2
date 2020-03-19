<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/admin/bom/sysPartName/sysPartName_modal2.js"
        charset="UTF-8"></script>

<div id="addDialog2" title="제품명등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">제품명</div>
            <div class="profile-info-value">
                <input type="text" name="part_name" class="form-control modal_value2" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">규격</div>
            <div class="profile-info-value">
                <input type="text" name="frequency" class="form-control modal_value2" autocomplete="off">
                <input type="hidden" name="part_code" class="modal_value2">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">공정유형</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value2" name="route_code" id="route_select2" style="width: 100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">비고</div>
            <div class="profile-info-value">
                <input type="text" class="form-control modal_value2" name="remark" autocomplete="off">
            </div>
        </div>
    </div>
</div>
