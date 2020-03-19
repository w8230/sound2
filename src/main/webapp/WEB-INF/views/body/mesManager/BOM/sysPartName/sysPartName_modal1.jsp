<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/admin/bom/sysPartName/sysPartName_modal1.js"
        charset="UTF-8"></script>

<div id="addDialog" title="제품명등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">시리즈</div>
            <div class="profile-info-value">
                <input type="text" name="series" class="form-control modal_value" autocomplete="off">
                <input type="hidden" name="part_code" class="modal_value">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">Center Wire(Ø)</div>
            <div class="profile-info-value">
                <input type="text" name="center_wire" class="form-control modal_value" onkeyup="num_keyup_float(this)" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">규격_1(GHz)</div>
            <div class="profile-info-value">
                <input type="text" name="frequency" class="form-control modal_value" onkeyup="num_keyup_float(this)" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">Jacket(재질)</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" name="jacket" id="prod_jacket_select" style="width:100%">
               </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">특수유형</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" name="prod_type1" id="prod_type1_select" style="width:100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">Center Wire(유형)</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" name="center_wire1" id="prod_center_conductor" style="width:100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">공정유형</div>
            <div class="profile-info-value">
                <select class="form-control h-25 modal_value" name="route_code" id="route_select" style="width: 100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">비고</div>
            <div class="profile-info-value">
                <input type="text" class="form-control modal_value" name="remark" autocomplete="off">
            </div>
        </div>
    </div>
</div>
