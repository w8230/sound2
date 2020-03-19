<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesPOP/Device/popTerminal/popTerminal_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="공정마스터 단말기추가" style="display:none">
    <div class="col-lg-12">
        <div class="col-lg-6 padding0" id="content1">
            <div class="profile-user-info profile-user-info-striped">
                <div class="profile-info-row">
                    <div class="profile-info-name">단말기코드</div>
                    <div class="profile-info-value">
                       <input name="terminal_code" type="text" class="form-control modal_value"  autocomplete="off">
                    </div>
                </div>
                <div class="profile-info-row">
                    <div class="profile-info-name">단말기명</div>
                    <div class="profile-info-value">
                        <input name="terminal_name" type="text" class="form-control modal_value"  autocomplete="off">
                    </div>
                </div>
                <div class="profile-info-row">
                    <div class="profile-info-name">컴퓨터코드</div>
                    <div class="profile-info-value">
                        <input name="pc_code" type="text" class="form-control modal_value"  autocomplete="off">
                    </div>
                </div>
                <div class="profile-info-row">
                    <div class="profile-info-name">화면 X</div>
                    <div class="profile-info-value">
                        <input name="screen_x" id="screen_x" type="text" class="form-control modal_value"  autocomplete="off" onchange="inputIntChange_x();">
                    </div>
                </div>
                <div class="profile-info-row">
                    <div class="profile-info-name">화면 Y</div>
                    <div class="profile-info-value">
                        <input name="screen_y" id="screen_y" type="text" class="form-control modal_value"  autocomplete="off" onchange="inputIntChange_y();">
                    </div>
                </div>
                <div class="profile-info-row">
                    <div class="profile-info-name">바코드 양식</div>
                    <div class="profile-info-value">
                        <input name="bcr_form_code" type="text" class="form-control modal_value"  autocomplete="off">
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-6 padding0" id="content2">
            <div class="profile-user-info profile-user-info-striped">
                <div class="profile-info-row">
                    <div class="profile-info-name">바코드 스캐너</div>
                    <div class="profile-info-value">
                        <input name="port_scan" type="text" class="form-control modal_value" maxlength="5"  autocomplete="off">
                    </div>
                </div>
                <div class="profile-info-row">
                    <div class="profile-info-name">바코드 프린터</div>
                    <div class="profile-info-value">
                        <input name="port_print" type="text" class="form-control modal_value" maxlength="5"  autocomplete="off">
                    </div>
                </div>
                <div class="profile-info-row">
                    <div class="profile-info-name">실적수집 포트</div>
                    <div class="profile-info-value">
                        <input name="port_prod" type="text" class="form-control modal_value" maxlength="5"  autocomplete="off">
                    </div>
                </div>
                <div class="profile-info-row">
                    <div class="profile-info-name">측정기 포트</div>
                    <div class="profile-info-value">
                        <input name="port_test" type="text" class="form-control modal_value" maxlength="5"  autocomplete="off">
                    </div>
                </div>
                <div class="profile-info-row">
                    <div class="profile-info-name">여유포트1</div>
                    <div class="profile-info-value">
                        <input name="port_1"type="text" class="form-control modal_value" maxlength="5"  autocomplete="off">
                    </div>
                </div>
                <div class="profile-info-row">
                    <div class="profile-info-name">여유포트2</div>
                    <div class="profile-info-value">
                        <input name="port_2" type="text" class="form-control modal_value" maxlength="5"  autocomplete="off">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>