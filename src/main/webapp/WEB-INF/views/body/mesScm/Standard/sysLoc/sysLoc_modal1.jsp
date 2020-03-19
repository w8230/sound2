<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesSCM/Standard/sysLoc/sysLoc_modal1.js"
        charset="UTF-8"></script>

<div id="addDialog" title="로케이션추가" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 구분</div>
            <div class="profile-info-value">
                <input type="text" name="cargo_name" id="cargo_name" class="form-control modal_value" readonly>
                <input type="hidden" name="cargo_code" id="cargo_code" class="form-control modal_value">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 위치코드</div>
            <div class="profile-info-value">
                <input type="text" name="loc_code" class="form-control modal_value">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 위치명</div>
            <div class="profile-info-value">
                <input type="text" name="loc_name" class="form-control modal_value">
            </div>
        </div>

    </div>
</div>