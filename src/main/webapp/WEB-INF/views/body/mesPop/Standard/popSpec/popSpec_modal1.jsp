<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/Standard/popSpec/popSpec_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="설비조건 등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name" style="border-right: 1px solid white; width:300px!important;">기준정보</div>
            <div class="profile-info-name" style="border-right: 1px solid white; width:300px!important;">데이터1</div>
            <div class="profile-info-name" style="border-right: 1px solid white; width:300px!important;">데이터2</div>
            <div class="profile-info-name" style="border-right: 1px solid white; width:300px!important;">데이터3</div>
            <div class="profile-info-name" style="width:300px!important;">데이터4</div>
        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped">

        <div class="profile-info-row">
            <div class="profile-info-name modal_text wt-px-150" id="div_data0_1"></div>
            <div class="profile-info-value wt-px-150">
                <input type="text" name="data0_1"  class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text wt-px-150" id="div_data1_1"></div>
            <div class="profile-info-value wt-px-150">
                <input type="text" name="data1_1" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text wt-px-150" id="div_data2_1"></div>
            <div class="profile-info-value wt-px-150">
                <input type="text" name="data2_1" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text wt-px-150" id="div_data3_1"></div>
            <div class="profile-info-value wt-px-150">
                <input type="text" name="data3_1" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text wt-px-150" id="div_data4_1"></div>
            <div class="profile-info-value wt-px-150">
                <input type="text" name="data4_1" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name modal_text" id="div_data0_2"></div>
            <div class="profile-info-value">
                <input type="text" name="data0_2" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data1_2"></div>
            <div class="profile-info-value">
                <input type="text" name="data1_2" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data2_2"></div>
            <div class="profile-info-value">
                <input type="text" name="data2_2" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data3_2"></div>
            <div class="profile-info-value">
                <input type="text" name="data3_2" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data4_2"></div>
            <div class="profile-info-value">
                <input type="text" name="data4_2" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name modal_text" id="div_data0_3"></div>
            <div class="profile-info-value">
                <input type="text" name="data0_3" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data1_3"></div>
            <div class="profile-info-value">
                <input type="text" name="data1_3" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data2_3"></div>
            <div class="profile-info-value">
                <input type="text" name="data2_3" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data3_3"></div>
            <div class="profile-info-value">
                <input type="text" name="data3_3" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data4_3"></div>
            <div class="profile-info-value">
                <input type="text" name="data4_3" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name modal_text" id="div_data0_4"></div>
            <div class="profile-info-value">
                <input type="text" name="data0_4" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data1_4"></div>
            <div class="profile-info-value">
                <input type="text" name="data1_4" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data2_4"></div>
            <div class="profile-info-value">
                <input type="text" name="data2_4" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data3_4"></div>
            <div class="profile-info-value">
                <input type="text" name="data3_4" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data4_4"></div>
            <div class="profile-info-value">
                <input type="text" name="data4_4" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name modal_text" id="div_data0_5"></div>
            <div class="profile-info-value">
                <input type="text" name="data0_5" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data1_5"></div>
            <div class="profile-info-value">
                <input type="text" name="data1_5" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data2_5"></div>
            <div class="profile-info-value">
                <input type="text" name="data2_5" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data3_5"></div>
            <div class="profile-info-value">
                <input type="text" name="data3_5" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data4_5"></div>
            <div class="profile-info-value">
                <input type="text" name="data4_5" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row modal_text">
            <div class="profile-info-name" id="div_data0_6"></div>
            <div class="profile-info-value">
                <input type="text" name="data0_6" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data1_6"></div>
            <div class="profile-info-value">
                <input type="text" name="data1_6" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data2_6"></div>
            <div class="profile-info-value">
                <input type="text" name="data2_6" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data3_6"></div>
            <div class="profile-info-value">
                <input type="text" name="data3_6" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name modal_text" id="div_data4_6"></div>
            <div class="profile-info-value">
                <input type="text" name="data4_6" class="form-control modal_value" autocomplete="off">
            </div>
        </div>


    </div>
</div>
