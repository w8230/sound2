<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/admin/bom/sysSPart/sysSPart_modal1.js"
        charset="UTF-8"></script>
<style>

    select[name="prod_dept"]{
        height: 18px !important;
        width: 100% !important;
    }
    select[name="prod_type"]{
        height: 18px !important;
        width: 100% !important;
    }
    input[type=text][name="remark"] {
        height: 18px !important;
    }


</style>
<div id="addDialog" title="제품등록" style="display:none">
    <div class="clearfix margin-at">
        <div class="col-xs-12">
            <div class="col-xs-12 padding0" id="content1">
                <table id="mes_modal1_grid1"></table>
                <div id="mes_modal1_grid1_pager"></div>
            </div>
        </div>
    </div>
</div>