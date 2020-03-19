<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/admin/bom/sysPart/sysPart_modal1.js"
        charset="UTF-8"></script>

<div id="addDialog" title="품목정보 추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text" id="part_code" name="part_code" class="form-control modal_value" readonly placeholder="자동생성">
            </div>
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input type="text" id="part_name" name="part_name" class="form-control modal_value" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">규격1</div>
            <div class="profile-info-value">
                <input type="text" id="spec1" name="spec1" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name">규격2</div>
            <div class="profile-info-value">
                <input type="text" id="spec2" name="spec2" class="form-control modal_value" autocomplete="off">

            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">재질</div>
            <div class="profile-info-value">
                <input type="text" id="material" name="material" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name"></div>
            <div class="profile-info-value">

            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">제조사</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="maker_name" class="form-control h-25 modal_value"
                           id="maker_name_main" onclick="supp_btn('A');" readonly>
                    <i class="ace-icon fa fa-search dark" style="top: -2px;"></i>
                </div>
                <input type="hidden" id="maker_code_main" name="maker_code" class="form-control modal_value" readonly>
            </div>
            <div class="profile-info-name">공급사</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="supp_name" class="form-control h-25 modal_value"
                           id="supp_name_main" onclick="supp_btn('B');" readonly>
                    <i class="ace-icon fa fa-search dark" style="top: -2px;"></i>
                </div>
                <input type="hidden" id="supp_code_main" name="supp_code" class="form-control modal_value" readonly>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">제조사2</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="maker_name2" class="form-control h-25 modal_value"
                           id="maker_name_main2" onclick="supp_btn('A2');" readonly>
                    <i class="ace-icon fa fa-search dark" style="top: -2px;"></i>
                </div>
                <input type="hidden" id="maker_code_main2" name="maker_code2" class="form-control modal_value" readonly>
            </div>
            <div class="profile-info-name">공급사2</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="supp_name2" class="form-control h-25 modal_value"
                           id="supp_name_main2" onclick="supp_btn('B2');" readonly>
                    <i class="ace-icon fa fa-search dark" style="top: -2px;"></i>
                </div>
                <input type="hidden" id="supp_code_main2" name="supp_code2" class="form-control modal_value" readonly>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">제조사3</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="maker_name3" class="form-control h-25 modal_value"
                           id="maker_name_main3" onclick="supp_btn('A3');" readonly>
                    <i class="ace-icon fa fa-search dark" style="top: -2px;"></i>
                </div>
                <input type="hidden" id="maker_code_main3" name="maker_code3" class="form-control modal_value" readonly>
            </div>
            <div class="profile-info-name">공급사3</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="supp_name3" class="form-control h-25 modal_value"
                           id="supp_name_main3" onclick="supp_btn('B3');" readonly>
                    <i class="ace-icon fa fa-search dark" style="top: -2px;"></i>
                </div>
                <input type="hidden" id="supp_code_main3" name="supp_code3" class="form-control modal_value" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">용도</div>
            <div class="profile-info-value">
                <select id="prod_type" name="prod_type" class="form-control keyword modal_value" style="width:100%">
                    <option value="1">양산</option>
                    <option value="2">개발</option>
                </select>
            </div>
            <div class="profile-info-name">자재유형</div>
            <div class="profile-info-value">
                <select id="material_type" name="material_type" class="form-control keyword modal_value" style="width:100%">
                    <option value="1">원자재</option>
                    <option value="2">부자재</option>
                </select>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">보관로케이션</div>
            <div class="profile-info-value">
                <select id="loc_select" name="loc_code" class="form-control keyword modal_value" style="width:100%">
                </select>
            </div>
            <div class="profile-info-name">단위</div>
            <div class="profile-info-value">
                <select id="unit_select" name="unit_code" class="form-control keyword modal_value" style="width:100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">L/T</div>
            <div class="profile-info-value">
                <input type="text" name="lt" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name">검사등급</div>
            <div class="profile-info-value">
                <select id="qc_level_code" name="qc_level" class="form-control keyword modal_value" style="width:100%">
                    <option value="0">무검사</option>
                    <option value="1">샘플검사</option>
                    <option value="2">전수검사</option>
                </select>
            </div>

        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">재고최대</div>
            <div class="profile-info-value">
                <input type="text" id="max_qty" name="max_qty" class="form-control modal_value" onkeyup="num_keyup_float(this)" autocomplete="off">
            </div>
            <div class="profile-info-name">재고최소</div>
            <div class="profile-info-value">
                <input type="text" id="min_qty" name="min_qty" class="form-control modal_value" autocomplete="off" onkeyup="num_keyup_float(this)">
            </div>

        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">발주단위</div>
            <div class="profile-info-value">
                <input type="text" id="ord_qty" name="ord_qty" class="form-control modal_value" autocomplete="off" onkeyup=num_keyup_float(this) >
            </div>
            <div class="profile-info-name"></div>
            <div class="profile-info-value">

            </div>
        </div>
    </div>
</div>

<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %>


