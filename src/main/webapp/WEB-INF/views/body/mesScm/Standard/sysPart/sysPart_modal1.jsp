<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesSCM/Standard/sysPart/sysPart_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="품목정보 추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text" id="part_code" name="part_code" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <select id="modal_part_name_code_select" name="part_name_code" class="form-control keyword modal_value" style="width:100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">규격</div>
            <div class="profile-info-value">
                <input type="text" id="spec" name="spec" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">단위</div>
            <div class="profile-info-value">
                <select id="modal_unit_code_select" name="unit_code" class="form-control keyword modal_value" style="width:100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">구분</div>
            <div class="profile-info-value">
                <select id="modal_part_type_select"  name="part_type" class="form-control keyword modal_value" style="width:100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">창고</div>
            <div class="profile-info-value">
                <select id="modal_cargo_code_select"  name="cargo_code" class="form-control keyword modal_value" style="width:100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">위치</div>
            <div class="profile-info-value">
                <select id="modal_loc_code_select"  name="loc_code" class="form-control keyword modal_value" style="width:100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품질레벨</div>
            <div class="profile-info-value">
                <select id="modal_qc_level_select"  name="qc_level" class="form-control keyword modal_value" style="width:100%">
                    <option value="0">무검사</option>
                    <option value="1">샘플검사</option>
                    <option value="2">전수검사</option>
                </select>
            </div>
        </div>

    </div>
</div>




