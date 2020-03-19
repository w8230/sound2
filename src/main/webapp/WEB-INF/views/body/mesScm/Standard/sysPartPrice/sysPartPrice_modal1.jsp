<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesSCM/Standard/sysPartPrice/sysPartPrice_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="자재단가" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 업체 </div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="supp_name" class="form-control h-25 modal_value"
                           id="supp_name_modal" onclick="supp_btn('B');" readonly>
                    <input type="hidden" name="supp_code" class="form-control h-25 modal_value"
                           id="supp_code_modal">
                    <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch2"></i>
                </div>
            </div>


        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 품목 </div>

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
            <div class="profile-info-name"> 시작일 </div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="start_date" id="datepicker3"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 종료일 </div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="stop_date" id="datepicker4"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>

        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 화폐 </div>
            <div class="profile-info-value">
                <input type="hidden" autofocus>
                <select name="currency_code" class="form-control modal_value" id="currency_select" style="width: 100%;">

                </select>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 단가 </div>
            <div class="profile-info-value wt-px-200">
                <input type="text" name="unit_price" class="form-control modal_value" autocomplete="off" onkeyup="num_keyup_float(this)">
            </div>
        </div>

    </div>
</div>


