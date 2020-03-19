<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesQMS/Shipment/qmsProdList/qmsProdList_modal1.js" charset="UTF-8"></script>
<div id="addDialog" title="성적서조회" style="display:none">
    <div class="profile-user-info profile-user-info-striped" id="modal1_column">
        <div class="profile-info-row">
            <div class="profile-info-name wt-px-250">검사항목</div>
            <c:forEach var="num" begin="1" end="20" step="1">
                <div class="profile-info-name wt-px-75">${num}</div>
            </c:forEach>
        </div>

        <%--        <div class="profile-info-row">--%>
        <%--            <div class="profile-info-name">Connector와 Cable의 결합 상태 확인</div>--%>
        <%--            <c:forEach begin="1" end="20" step="1">--%>
        <%--                <div class="profile-info-value wt-px-75">--%>
        <%--                    <select class="form-control">--%>
        <%--                        <option>O</option>--%>
        <%--                        <option>X</option>--%>
        <%--                        <option>N/A</option>--%>
        <%--                    </select>--%>
        <%--                </div>--%>
        <%--            </c:forEach>--%>
        <%--        </div>--%>
    </div>
</div>
