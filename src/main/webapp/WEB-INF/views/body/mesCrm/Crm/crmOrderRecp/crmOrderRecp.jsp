<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="http://malsup.github.com/jquery.form.js"></script>
<script type="text/javascript" src="/data-component/mesCRM/Crm/crmOrderRecp/crmOrderRecp.js" charset="UTF-8"></script>

<form method="POST" action="/crmOrderRecpAdd" id="crmRecp">
    <div class="main-content-inner">
        <div class="page-content">
            <div class="row">
                <div class="col-xs-12 ">
                    <span class="sp-title">수주정보</span>
                </div>
                <div class="col-xs-9">
                    <table class="table multi_table">
                        <tbody>
                        <tr>
                            <td class="wt-px-100 td-title t-align-c">수주번호</td>
                            <td class="wt-px-200">
                                <input type="text" class="form-control" readonly placeholder="자동생성">
                            </td>
                            <td class="wt-px-100 td-title t-align-c">진행상태</td>
                            <td class="wt-px-200">
                                <select class="form-control main_value" id="status1_select" name="status1" style="width:100%;">
                                    <option value="0">대기</option>
                                    <option value="1">생산중</option>
                                    <option value="2">생산완료</option>
                                    <option value="3">출하</option>
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">진행여부</td>
                            <td class="wt-px-200">
                                <select class="form-control main_value" id="status2_select" name="status2" style="width:100%;">
                                    <option value="1">접수</option>
                                    <option value="2">취소</option>
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">수주처</td>
                            <td class="wt-px-200">
                                <span class="input-icon input-icon-right" style="width: 100%;">
                                    <input type="text" class="form-control main_value" id="supp_name_main" name="supp_name" onclick="supp_btn('A');" readonly/>
                                    <input type="hidden"  class="form-control main_value" id="supp_code_main" name="supp_code"/>
                                    <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch-Main"></i>
                                </span>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">접수일</td>
                            <td class="wt-px-200">
                                <div class="input-icon input-icon-right">
                                    <input type="text" name="work_date" id="datepicker"
                                           class="form-control main_value h-25 condition_main" readonly>
                                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                                </div>
                            </td>

                            <td class="wt-px-100 td-title t-align-c">납기일</td>
                            <td class="wt-px-200">
                                <div class="input-icon input-icon-right">
                                    <input type="text" name="end_date" id="datepicker2"
                                           class="form-control main_value h-25 condition_main" readonly>
                                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                                </div>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <div class="col-xs-12 ">
                    <span class="sp-title">고객정보</span>
                </div>
                <div class="col-xs-9 ">
                    <table class="table multi_table">
                        <tbody>
                        <tr>
                            <td class="wt-px-100 td-title t-align-c">발주번호</td>
                            <td class="wt-px-200">
                                <input type="text" class="form-control main_value" name="supp_ord_no" autocomplete="off">
                            </td>
                            <td class="wt-px-100 td-title t-align-c">담당자</td>
                            <td class="wt-px-200">
                                <input type="text" class="form-control main_value" id="supp_user_name" name="supp_user_name" autocomplete="off">
                            </td>
                            <td class="wt-px-100 td-title t-align-c">연락처</td>
                            <td class="wt-px-200">
                                <input type="text" class="form-control main_value" id="supp_tel_no" name="supp_tel_no" autocomplete="off">
                            </td>
                        </tr>
                        <tr>
                            <td class="wt-px-100 td-title t-align-c">배송지</td>
                            <td colspan="5">
                                <input type="text" class="form-control main_value" id="delivery_addr" name="delivery_addr" autocomplete="off">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-xs-12">
                    <span class="sp-title">수주품목</span>
                </div>
                <div class="col-xs-9">
                    <table class="table multi_table e wt-100">
                        <tbody>
                        <tr>
                            <td class="wt-px-100 td-title t-align-c">품목코드</td>
                            <td class="wt-px-200">
                                 <span class="input-icon input-icon-right " style="width: 100%;">
                                    <input type="text" id="crm_part_code" name="part_code" class="form-control main_value part_value crm_order_value"  readonly value="찾기" onclick="part_btn();">
                                     <i class="ace-icon fa fa-search dark" style="top: -2px;"></i>
                                 </span>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">품명</td>
                            <td class="wt-px-200">
                                <input type="text" name="part_name" readonly value="자동표시" class="form-control main_value part_value crm_order_value">
                            </td>
                            <td class="wt-px-100 td-title t-align-c">규격</td>
                            <td class="wt-px-200">
                                <input type="text" name="spec" readonly value="자동표시" id="spec" class="form-control main_value part_value crm_order_value">
                            </td>
                            <td class="wt-px-100 td-title t-align-c"></td>
                            <td class="wt-px-200">

                            </td>
                        </tr>
                        <tr>
                            <td class="wt-px-100 td-title t-align-c">품목군</td>
                            <td class="wt-px-200">
                                <input type="text" name="part_grp_name1" readonly value="자동표시" class="form-control main_value part_value crm_order_value">
                                <input type="hidden" name="part_group1" readonly value="자동표시" class="form-control main_value part_value crm_order_value">
                            </td>
                            <td class="wt-px-100 td-title t-align-c">제품군</td>
                            <td class="wt-px-200">
                                <input type="text" name="part_grp_name2" readonly value="자동표시" class="form-control main_value part_value crm_order_value">
                                <input type="hidden" name="part_group2" readonly value="자동표시" class="form-control main_value part_value crm_order_value">
                            </td>
                            <td class="wt-px-100 td-title t-align-c">구분</td>
                            <td class="wt-px-200">
                                <input type="text" name="part_type_name" readonly value="자동표시" class="form-control main_value part_value crm_order_value">
                                <input type="hidden" name="part_type" readonly class="form-control main_value part_value">
                            </td>
                            <td class="wt-px-100 td-title t-align-c">End User</td>
                            <td class="wt-px-200">
                              <span class="input-icon input-icon-right " style="width: 100%;">
                                    <input type="text" class="form-control main_value crm_order_value" id="supp_name_modal" onclick="supp_btn('B');" readonly/>
                                    <input type="hidden" class="form-control main_value crm_order_value" id="supp_code_modal" name="end_supp_code"/>
                                    <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch2-Main"></i>
                              </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="wt-px-100 td-title t-align-c">조립구분</td>
                            <td class="wt-px-200">
                                <select id="work_type" class="form-control main_value crm_order_select" name="work_type" style="width: 100%;" onchange="work_type_change(this.value);">
                                    <option value="1">단품</option>
                                    <option value="2">조립</option>
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">커넥터1</td>
                            <td class="wt-px-200">
                                <select id="connector1" name="connector1" class="form-control main_value crm_order_select" style="width: 100%;">
                                    <option value="">선택안함</option>
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">커넥터2</td>
                            <td class="wt-px-200">
                                <select id="connector2" name="connector2" class="form-control main_value crm_order_select" style="width: 100%;">
                                    <option value="">선택안함</option>
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">개별길이</td>
                            <td class="wt-px-200">
                                <input type="text" id="part_length" readonly name="part_length" class="form-control main_value crm_order_value" onkeyup="part_length_keyup();">
                            </td>
                        </tr>
                        <tr>
                            <td class="wt-px-100 td-title t-align-c">단위</td>
                            <td class="wt-px-200">
                                <select class="form-control main_value crm_order_select" id="unit_select" name="unit_type" style="width: 100%;">
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">수량</td>
                            <td class="wt-px-200">
                                <input type="text" name="qty" id="qty" class="form-control main_value crm_order_value" onkeyup="sum_qty_keyup();" autocomplete="off">
                            </td>
                            <td class="wt-px-100 td-title t-align-c">길이단위</td>
                            <td class="wt-px-200">
                                <select class="form-control main_value crm_order_select" id="length_type" name="length_type" style="width: 100%;" autocomplete="off">
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">옵션</td>
                            <td class="t-align-c">
                                <input type="checkbox" name="option1" id="chbox1" value="N" class="main_value" style="margin: 0px!important;" >
                                <label for="chbox1" style="font-size: 11px; margin-right:5px;" >성적서</label>
                                <input type="checkbox" name="option2" id="chbox2" value="N" class="main_value" style="margin: 0px!important;" >
                                <label for="chbox2" style="font-size: 11px">라벨</label>
                            </td>
                        </tr>
                        <tr>
                            <td class="wt-px-100 td-title t-align-c">수축튜브</td>
                            <td class="wt-px-200">
                                <select class="form-control main_value crm_order_select" id="tube" name="tube" style="width: 100%;">
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">비고</td>
                            <td colspan="5">
                                <input type="text" class="form-control main_value crm_order_value" name="remark" autocomplete="off">
                            </td>
                        </tr>
                        <tr>
                            <td class="wt-px-100 td-title t-align-c">통화단위</td>
                            <td class="wt-px-200">
                                <select class="form-control main_value crm_order_select" id="currency_select" name="currency_type" style="width: 100%;">
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">단가</td>
                            <td class="wt-px-200">
                                <input type="text" id="unit_price" name="unit_price" class="form-control main_value crm_order_value"  onkeyup="sum_qty_keyup();" autocomplete="off">
                            </td>
                            <td class="wt-px-100 td-title t-align-c">합계</td>
                            <td class="wt-px-200">
                                <input type="text" name="price" class="form-control main_value crm_order_value" readonly>
                            </td>
                            <td class="td-title t-align-c">구분</td>
                            <td>
                                <select id="req_type" name="req_type" class="form-control main_value crm_order_select">
                                    <option value="1" >구매</option>
                                    <option value="2" >생산</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td class="wt-px-100 td-title t-align-c">영업구분</td>
                            <td class="wt-px-200">
                                <select class="form-control main_value crm_order_select" id="crm_type" name="crm_type" style="width: 100%;">
                                    <option value="1">국내</option>
                                    <option value="2">해외</option>
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">배송방법</td>
                            <td class="wt-px-200">
                                <select class="form-control main_value crm_order_select" id="delivery_select" name="delivery" style="width: 100%;">
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">판매구분</td>
                            <td class="wt-px-200">
                                <select class="form-control main_value crm_order_select" id="sale_type" name="sale_type" style="width: 100%;">
                                    <option value="1">판매</option>
                                    <option value="2">샘플</option>
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">샘플용도</td>
                            <td class="wt-px-200">
                                <input type="text" name="sample" id="sample" class="form-control main_value crm_order_value" autocomplete="off" >
                            </td>
                        </tr>
                        <tr>
                            <td class="wt-px-100 td-title t-align-c">유/무상</td>
                            <td class="wt-px-200">
                                <select class="form-control main_value crm_order_select" id="price_type" name="price_type" style="width: 100%;">
                                    <option value="1">유상</option>
                                    <option value="2">무상</option>
                                </select> </td>
                            <td class="wt-px-100 td-title t-align-c">배송업체</td>
                            <td class="wt-px-200">
                                <select class="form-control main_value crm_order_select" id="delivery_corp_select" name="delivery_corp" style="width: 100%;">
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c ">생산구분</td>
                            <td class="wt-px-200">
                                <select class="form-control main_value crm_order_select" id="prod_type" name="prod_type" style="width: 100%;">
                                    <option value="1">내부</option>
                                    <option value="2">외부</option>
                                </select>
                            </td>
                            <td class="wt-px-100 td-title t-align-c">배송비부담</td>
                            <td class="wt-px-200">
                                <select class="form-control main_value crm_order_select" name="delivery_price" id="delivery_price" style="width: 100%;">
                                    <option value="1">당사</option>
                                    <option value="2">고객</option>
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
            <div class="col-lg-9">
                <div class="clearfix">
                    <div class="pull-right tableTools-container">
                        <div class="dt-buttons btn-overlap btn-group">
                            <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="add_btn();">
                                <span><i class="fa fa-plus bigger-110 blue"></i><span>저장</span></span>
                            </a>
                            <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold">
                                <span><i class="fa fa-times bigger-110 blue"></i><span>닫기</span></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %>
<%@include file="/WEB-INF/views/body/common/modal/part_modal.jsp" %>