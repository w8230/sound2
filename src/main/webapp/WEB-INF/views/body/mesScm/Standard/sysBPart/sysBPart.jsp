<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<script type="text/javascript" src="/ui-component/assets/js/jquery.fileDownload.js"></script>
<script type="text/javascript" src="/data-component/mesSCM/Standard/sysBPart/sysBPart.js" charset="UTF-8"></script>
<script type="text/javascript">
    //<![CDATA[
    $(function() {
        $("#btn-excel").on("click", function () {
            if (confirm("엑셀로 저장하시겠습니까?")) {
                var $preparingFileModal = $("#preparing-file-modal");
                $preparingFileModal.dialog({ modal: true });
                $("#progressbar").progressbar({value: false});
                $.fileDownload ("/excel_download", {
                    data : {"name":"sysBPart"},
                    successCallback: function (url) {
                        $preparingFileModal.dialog('close');
                    },
                    failCallback: function (responseHtml, url) {
                        $preparingFileModal.dialog('close');
                        $("#error-modal").dialog({ modal: true });
                    }
                });
                return false;
            }else{
                alert('다운로드가 취소되었습니다.');
            }

        });

    });
    //]]>
</script>
<div id="progressbar1" data-value="0"></div>
<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">구분</td>
                    <td class="wt-px-200">
                        <select name="keyword" id="gubun_select" class="form-control keyword condition_main" onchange="select_change1(this.value);" style="width: 100%">

                        </select>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">품목구분</td>
                    <td class="wt-px-200">
                        <select name="keyword2" id="partGrp_select" class="form-control keyword condition_main" style="width: 100%">
                            <option value="">전체</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1);">
                                <span>
                                    <i class="fa fa-search bigger-110 blue"></i>
                                    <span>조회</span>
                                </span>
                    </a>
                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="add_btn()">
                                <span><i class="fa fa-plus bigger-110 blue"></i>
                                    <span>추가</span>
                                </span>
                    </a>
                    <a class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="delete_btn();">
                                <span>
                                    <i class="fa fa-trash bigger-110 blue"></i>
                                    <span>삭제</span>
                                </span>
                    </a>
                    <a class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" id="btn-excel" tabindex="0" aria-controls="dynamic-table" >
                                <span>
                                    <i class="fa fa-download bigger-110 blue"></i>
                                    <span>저장</span>
                                </span>
                    </a>
                    <a class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" onclick="upload_btn()">
                                <span>
                                    <i class="fa fa-upload bigger-110 blue"></i>
                                    <span>엑셀 업로드</span>
                                </span>
                    </a>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12 table-responsive">
                <table id="mes_grid"></table>
                <div id="mes_grid_pager"></div>
            </div>
        </div>
    </div>
    <div title="데이터 저장중입니다...." id="preparing-file-modal" style="display: none;">
        <div id="progressbar" style="width: 100%; height: 22px; margin-top: 20px;"></div>
    </div>
    <div title="알림" id="error-modal" style="display: none;">
        <p>저장 실패. 관리자에게 문의하세요</p>
    </div>
</div>
<%@include file="sysBPart_modal1.jsp" %>
<%@include file="sysBPart_modal2.jsp" %>
<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %>