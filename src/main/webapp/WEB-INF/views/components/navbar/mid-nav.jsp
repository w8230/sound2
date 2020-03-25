<%@ page import="org.springframework.util.ObjectUtils" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script src="/data-component/header/header2.js"></script>
<div id="navbar" class="navbar navbar-default ace-save-state" >
    <div class="navbar-container ace-save-state" id="navbar-container" >

        <div class="col-lg-12">
            <button type="button" class="navbar-toggle menu-toggler navbar-brand" id="menu-toggler2" data-target="#sidebar2" style="float:left; height: 30px; width: 30px; margin-top:16px; background-color: #00000033">
                <i class="fa fa-list"></i>
            </button>
            <button type="button" class="navbar-toggle menu-toggler navbar-brand" id="menu-toggler" data-target="#sidebar" style="float:left; height: 30px; width: 30px; margin-top:16px; background-color: #00000033">
                <i class="fa fa-folder-open-o"></i>
        </button>

            <a href="/" class="navbar-brand">
                <img src="/ui-component/assets/images/logo@2x-1.png" id="main_logo_img" width="140px">
            </a>
            <div class="form-group">
                <a href="javascript:void(0);" class="navbar-brand top_m">
                    <i class="fa fa-user"></i> ${sessionScope.userData.user_name}님 반갑습니다.
                    <input type="hidden" value="${sessionScope.userData.site_code}" id="hstcd">
                    <input type="hidden" value="${sessionScope.userData.user_code}" id="huscd">
                    <input type="hidden" value="${sessionScope.userData.user_name}" id="husnm">
                    <br>
                    <button type="button" class="btn btn-minier btn-dark" onclick="password_add_btn();">암호변경</button>
                    <button type="button" class="btn btn-minier btn-dark" onclick="logout();">로그아웃</button>
                </a>
            </div>
        </div>
    </div>
</div>

<%--<button type="button" class="navbar-toggle menu-toggler" id="menu-toggler" data-target="#sidebar">--%>
<%--    <span class="sr-only">사이드 메뉴</span>--%>
<%--    <span class="icon-bar"></span>--%>
<%--    <span class="icon-bar"></span>--%>
<%--    <span class="icon-bar"></span>--%>
<%--</button>--%>
<%-- 상단 아이콘 메뉴 --%>
<div id="sidebar2" class="sidebar h-sidebar navbar-collapse collapse ace-save-state" data-sidebar="true"
     data-sidebar-scroll="true" data-sidebar-hover="true">
    <ul class="nav nav-list of-hidden">
        <%--<li class="hover">--%>
            <%--<a href="/">--%>
                <%--<i class="menu-icon fa fa-home"></i>--%>
                <%--<span class="menu-text"> 메인홈 </span>--%>
            <%--</a>--%>
            <%--<b class="arrow"></b>--%>
        <%--</li>--%>
        <c:set var="doneLoop" value="false"/>
        <c:set var="doneLoop2" value="false"/>
        <c:forEach var="main_list" items="${main_list}" varStatus="starus">
            <c:set var="doneLoop" value="false"/>
            <c:set var="doneLoop3" value="true"/>
            <li id="mid-nav" class="hover <c:out value="${main_list.menu_name}"/>">
                <c:forEach var="under_list2" items="${allSub_list[starus.index]}">
                    <c:if test="${doneLoop != true}">
                        <c:if test="${under_list2.level == 2 }">
                            <c:set var="doneLoop3" value="false"/>
                        </c:if>
                        <c:if test="${doneLoop3 != true}">
                            <c:if test="${under_list2.level == 3 }">

                                <c:if test="${main_list.menu_name != '게시판'}">
                                    <a href='<c:out value="${under_list2.menu_code}"/>'>

                                </c:if>

                                    <c:if test="${main_list.menu_name eq '관리자'}">
                                        <i class="menu-icon fa fa-cogs"></i>
                                    </c:if>
                                    <c:if test="${main_list.menu_name eq '자재관리'}">
                                        <i class="menu-icon fa fa-cogs"></i>
                                    </c:if>
                                    <c:if test="${main_list.menu_name eq '출하관리'}">
                                        <i class="menu-icon fa fa-cogs"></i>
                                    </c:if>
                                    <c:if test="${main_list.menu_name eq '영업관리'}">
                                        <i class="menu-icon fa fa-cogs"></i>
                                    </c:if>
                                    <c:if test="${main_list.menu_name eq '품질관리'}">
                                        <i class="menu-icon fa fa-cogs"></i>
                                    </c:if>
                                    <c:if test="${main_list.menu_name eq '생산관리'}">
                                        <i class="menu-icon fa fa-cogs"></i>
                                    </c:if>
                                    <c:if test="${main_list.menu_name eq '외주관리'}">
                                        <i class="menu-icon fa fa-cogs"></i>
                                    </c:if>
                                    <c:if test="${main_list.menu_name eq '설비관리'}">
                                        <i class="menu-icon fa fa-cogs"></i>
                                    </c:if>
                                    <c:if test="${main_list.menu_name eq '게시판'}">
                                    <a onclick="viewBoard('<c:out value="${under_list2.menu_code}"/>');" style="cursor:pointer;">
                                        <i class="menu-icon fa fa-cogs"></i>
                                    </c:if>
                                    <span class="menu-text2"><c:out value="${main_list.menu_name}"/></span>
                                </a>
                                <b class="arrow"></b>
                                <c:set var="doneLoop" value="true"/>
                            </c:if>
                        </c:if>
                    </c:if>
                </c:forEach>
            </li>
        </c:forEach>
    </ul>
</div>
<%@include file="/WEB-INF/views/body/common/modal/password_modal.jsp" %>