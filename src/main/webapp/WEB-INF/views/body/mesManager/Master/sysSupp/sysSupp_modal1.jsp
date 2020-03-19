<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/admin/master/sysSupp/sysSupp_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="업체코드추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">업체코드</div>
            <div class="profile-info-value">
                <input type="text" name="supp_code" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name">업체명</div>
            <div class="profile-info-value">
                <input type="text" name="supp_name" class="form-control modal_value" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">대표자</div>
            <div class="profile-info-value">
                <input type="text" name="ceo" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name">업체명(영문)</div>
            <div class="profile-info-value">
                <input type="text" name="supp_name_en" class="form-control modal_value" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">사업자번호</div>
            <div class="profile-info-value">
                <input type="text" name="supp_no" class="form-control modal_value" onkeyup="num_keyup_under(this)" autocomplete="off"/>
            </div>
            <div class="profile-info-name">전화번호</div>
            <div class="profile-info-value">
                <input type="text" name="tel_no" class="form-control modal_value" onkeyup="num_keyup_under(this)" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">업태</div>
            <div class="profile-info-value">
                <input type="text" name="buss_type" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name">팩스번호</div>
            <div class="profile-info-value">
                <input type="text" name="fax_no" class="form-control modal_value" onkeyup="num_keyup_under(this)" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">종목</div>
            <div class="profile-info-value">
                <input type="text" name="category" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name">결재방법</div>
            <div class="profile-info-value">
                <input type="text" name="give_type" class="form-control modal_value" autocomplete="off"/>
            </div>
        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">주소</div>
            <div class="profile-info-value">
                <input type="text" name="address" class="form-control modal_value" autocomplete="off"/>
            </div>
        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">담당자</div>
            <div class="profile-info-value">
                <input type="text" name="emp_name" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name">담당자(전화)</div>
            <div class="profile-info-value">
                <input type="text" name="emp_tel" class="form-control modal_value" onkeyup="num_keyup_under(this)" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">고객사</div>
            <div class="profile-info-value">
                <select name="corp_type1" id="corp_type1" class="form-control modal_value" style="width:100%">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
            <div class="profile-info-name">협력사</div>
            <div class="profile-info-value">
                <select name="corp_type2" id="corp_type2" class="form-control modal_value" style="width:100%">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">외주업체</div>
            <div class="profile-info-value">
                <select name="corp_type3" id="corp_type3" class="form-control modal_value" style="width:100%">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
            <div class="profile-info-name"></div>
            <div class="profile-info-value"></div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">이메일</div>
            <div class="profile-info-value">
                <input type="text" name="emp_email" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name">사용유무</div>
            <div class="profile-info-value">
                <select name="use_yn" id="use_yn" class="form-control modal_value" style="width:100%">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">비고</div>
            <div class="profile-info-value">
                <input type="text" class="form-control" autocomplete="off"/>
            </div>
        </div>
    </div>
</div>
