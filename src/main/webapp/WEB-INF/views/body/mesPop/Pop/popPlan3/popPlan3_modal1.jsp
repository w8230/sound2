<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/Pop/popPlan3/popPlan3_modal1.js" charset="UTF-8"></script>
<style>



    input[type=text][name="remark"] {
        height: 18px !important;
    }
    input[type=text][name="remark1"] {
        height: 18px !important;
    }
    input[type=text][name="plan_date"] {
        height: 18px !important;
    }
    input[type=text][name="end_date"] {
        height: 18px !important;
    }
    input[type=text][name="plan_qty"] {
        height: 18px !important;
    }

</style>
<div id="addDialog" title="생산계획등록(3단계)" style="display:none">
    <div class="clearfix margin-at">
        <div class="col-xs-12">
            <div class="col-xs-12 padding0" id="content1">
                <table id="mes_modal1_grid1"></table>

            </div>
        </div>
    </div>
</div>