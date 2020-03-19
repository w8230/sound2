<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/admin/bom/sysPartNameGroup2/sysPartNameGroup2_modal1.js"
        charset="UTF-8"></script>

<div id="addDialog" title="제품군추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped" id="modal_all_div">
        <div class="profile-info-row">
            <div class="profile-info-name">제품유형</div>
            <div class="profile-info-value">
                <input type="text" name="part_type_name" id="part_type_name" class="form-control modal_value" readonly>
                <input type="hidden" name="part_type_code" id="part_type_code" class="form-control modal_value" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품목군</div>
            <div class="profile-info-value">
                <input type="text" name="part_grp_name" id="part_grp_name"  class="form-control modal_value" readonly>
                <input type="hidden" name="part_grp_code" id="part_grp_code"  class="form-control modal_value" readonly>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name" id="code_name1_text">코드</div>
            <div class="profile-info-value">
                <input type="text" name="part_grp_code2"  class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name" id="code_name2_text">제품군</div>
            <div class="profile-info-value">
                <input type="text"  name="part_grp_name2" class="form-control modal_value wt-px-150" autocomplete="off">
            </div>
        </div>
    </div>
</div>
