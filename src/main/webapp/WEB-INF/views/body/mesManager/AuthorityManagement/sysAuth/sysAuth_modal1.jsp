<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/admin/auth/sysAuth/sysAuth_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="권한그룹관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 권한그룹코드 </div>
            <div class="profile-info-value">
                <input type="text" name="auth_code" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 권한그룹명 </div>

            <div class="profile-info-value">
                <input type="text" name="auth_name" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
    </div>
</div>


