<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script src="http://malsup.github.com/jquery.form.js"></script>
<script type="text/javascript" src="/data-component/mesQMS/Standard/qmsTestItem/qmsTestItem_modal1.js" charset="UTF-8"></script>
<form method="POST" action="/qmsQcItemAdd" id="qmsTestltem">
<div id="addDialog" title="검사항목추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">검사구분</div>
            <div class="profile-info-value">
                <input type="text" name="qc_group_name" id="qc_group_name" class="form-control modal_value" readonly>
                <input type="hidden" name="qc_group" id="qc_group" class="form-control modal_value">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">코드그룹</div>
            <div class="profile-info-value">
                <input type="text" name="qc_type_name" id="qc_type_name" class="form-control modal_value" readonly>
                <input type="hidden" name="qc_type" id="qc_type" class="form-control modal_value">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">검사코드</div>
            <div class="profile-info-value">
                <input type="text" name="qc_code" class="form-control modal_value"  value="test" autofocus>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">검사명</div>
            <div class="profile-info-value">
                <input type="text"  name="qc_name" class="form-control modal_value" value="test">
            </div>
        </div>
    </div>
</div>
</form>