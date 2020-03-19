<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script src="http://malsup.github.com/jquery.form.js"></script>
<script type="text/javascript" src="/data-component/mesQMS/Standard/qmsTestStd/qmsTestStd_modal1.js" charset="UTF-8"></script>
<form method="POST" action="/qmsTestStdAdd" id="qmsTestStd">
<div id="addDialog" title="외경검사기준추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">공정</div>
            <div class="profile-info-value">
                <input type="text" name="line_name" id="line_name" class="form-control modal_value" readonly>
                <input type="hidden" name="line_code" id="line_code" class="form-control modal_value">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">제품명</div>
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
            <div class="profile-info-name">1차</div>
            <div class="profile-info-value t-align-c">
                <div class="col-xs-12 padding0">
                    <div class="col-xs-5 padding0">
                        <input type="text" name="diameter1_start" class="form-control modal_value">
                    </div>
                    <div class="col-xs-2 padding0" style="margin-top:3px;">
                        <span>~</span>
                    </div>
                    <div class="col-xs-5 padding0">
                        <input type="text" name="diameter1_stop" class="form-control modal_value">
                    </div>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">2차</div>
            <div class="profile-info-value t-align-c">
                <div class="col-xs-12 padding0">
                    <div class="col-xs-5 padding0">
                        <input type="text" name="diameter2_start" class="form-control modal_value">
                    </div>
                    <div class="col-xs-2 padding0" style="margin-top:3px;">
                        <span>~</span>
                    </div>
                    <div class="col-xs-5 padding0">
                        <input type="text" name="diameter2_stop" class="form-control modal_value">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</form>