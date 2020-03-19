<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesSCM/InOut/scmIn/scmIn_modal2.js"
        charset="UTF-8"></script>

<div id="scmInAddDialog" title="자재입고수량등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">

            <c:forEach  begin="1" end="5" step="1">
                <div class="profile-info-name wt-px-50"> </div>
                <div class="profile-info-name wt-px-50">
                   LOT
                </div>
                <div class="profile-info-name wt-px-50">
                    수량
                </div>
            </c:forEach>

        </div>
        <c:forEach var="num" begin="1" end="10" step="1">
                <div class="profile-info-row">
                    <c:forEach var="num2" begin="${num}" end="${num+40}" step="10">

                        <div class="profile-info-name wt-px-50">${num2}</div>
                        <div class="profile-info-value wt-px-75">
                            <input type="text" name="lot${num2}" id="scmIn_sub${num2}" class="form-control  modal_value3 modal2_check1" autocomplete="off">
                        </div>
                        <div class="profile-info-value wt-px-75">
                            <input type="text" name="in_qty${num2}" id="scmIn2_sub${num2}" class="form-control  modal_value3 modal2_check2" autocomplete="off">
                        </div>
                    </c:forEach>
                </div>
        </c:forEach>



    </div>
</div>
