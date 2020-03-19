<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<script type="text/javascript" src="/data-component/admin/auth/sysAuthProgram/sysAuthProgram.js" charset="UTF-8"></script>


<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0">
            <div class="row">
                <div class="col-md-4">
<%--                    <table class="table wt-100">--%>
<%--                        <tbody>--%>
<%--                        <tr>--%>
<%--                            <td class="wt-px-100 t-align-c td-title padding-a-0">사이트조회</td>--%>
<%--                            <td class="wt-px-200">--%>
<%--                                <select name="" class="form-control" id="site_group">--%>

<%--                                </select>--%>
<%--                            </td>--%>
<%--                            <td></td>--%>
<%--                        </tr>--%>
<%--                        </tbody>--%>
<%--                    </table>--%>
                </div>

                <div class="col-md-8">
                    <table class="table wt-100">
                        <tbody>
                        <tr>
                            <td class="wt-px-100 t-align-c td-title padding-a-0">업무분류</td>
                            <td class="wt-px-200">
                                <select name="keyword2" class="form-control keyword condition_main" id="code_group" onchange="main_select_change(this);">
                                </select>
                            </td>
                            <td class="t-align-c wt-px-50">
                                <a id="add_btn"
                                   class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                                   tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                                   id="showDialog" onclick="check_add_btn();">
                                <span><i class="fa fa-plus bigger-110 blue"></i>
                                    <span>저장</span>
                                </span>
                                </a>
                            </td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 table-responsive">
                    <div class="row">
                        <div class="col-md-4 test11">
                            <table id="mes_grid"></table>

                        </div>
                        <div class="col-md-8">

                            <div class="test12">
                                <table id="mes_grid2"></table>

                                <span class="oi oi-person"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



