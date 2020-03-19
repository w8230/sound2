<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/admin/master/sysERate/sysERate_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="환율 추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">화폐단위</div>
            <div class="profile-info-value">
                <input type="text" name="currency_name" id="currency_name" class="form-control modal_value" readonly/>
                <input type="hidden" name="currency_code" id="currency_code" class="form-control modal_value" />
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">시작일</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="start_date" id="datepicker3"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">종료일</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="stop_date" id="datepicker4"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">환율</div>
            <div class="profile-info-value">
                <input type="text" name="exch_rate" class="form-control modal_value" onkeyup="num_keyup_float(this)" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 사용유무</div>
            <div class="profile-info-value">
                <select name="use_yn" id="use_yn" class="form-control modal_value ynCheck" style="width: 100%;">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
        </div>
    </div>
</div>
