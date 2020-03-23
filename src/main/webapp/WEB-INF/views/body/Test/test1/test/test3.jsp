<%--
  Created by IntelliJ IDEA.
  User: USER
  Date: 2020-03-23
  Time: 오후 5:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <style>
        table {
            width: 100%;
            margin: auto;
            border: 1px solid #444444;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #444444;
            padding: 10px;
        }
        .theadTitle{
            border-bottom: 1px solid #ffffff !important;
            width:85%;
            letter-spacing: 10px;
            font-size: 21px;
        }
        .signAreaTitle{
            font-size: 12px;
        }
        .signArea{
            border-bottom: 1px solid #ffffff !important;
            height: 80px;
        }
        .menuTable > tbody > tr > .menu {
            letter-spacing: 3px;
            font-size: 13px;
            width: 10%;
            background-color: #efefef;
            text-align: center;
            font-weight: bold;
        }
        .contentArea{
            height: 120px;
        }
        .LastContentArea{
            height: 400px;
        }
        .all-content{
            width: 21cm;
            min-height: 29.7cm;
            padding: 2cm;
            margin: 1cm auto;
            border-radius: 5px;
            background: white;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }
        .smallTable{
            width: 300px !important;
            float: right;
        }
        .smallTable > tbody > tr > .title {
            width: 50px;
            text-align: center;
            font-size: 12px;
            letter-spacing: 3px;
        }
        .footerSign > td{
            border: 1px solid #ffffff !important;
            text-align: right;
            font-size: 12px;
        }
        .imageArea{
            border-right: 1px solid #ffffff;
        }
    </style>
</head>
<body>
<div class="all-content">
    <table class="titleTable">
        <thead>
        <tr>
            <th colspan="3" rowspan="2" class="theadTitle">작업의뢰서</th>
            <th rowspan="1" class="signAreaTitle">승인</th>
        </tr>
        <tr>
            <th class="signArea"></th>
        </tr>

        </thead>
    </table>
    <table class="menuTable">
        <tbody>
        <tr>
            <td class="menu">현장명</td>
            <td></td>
            <td class="menu">제품명</td>
            <td></td>
        </tr>
        <tr>
            <td class="menu">발주처</td>
            <td></td>
            <td class="menu">수량</td>
            <td></td>
        </tr>
        <tr>
            <td class="menu">납기일</td>
            <td></td>
            <td class="menu">작성일</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="4" class="contentArea">
                <img src="/ui-component/imagesNew/test.jpg"/>
            </td>
        </tr>
        <tr>
            <td colspan="4" class="contentArea"></td>
        </tr>
        <tr>
            <td colspan="4" class="contentArea"></td>
        </tr>
        <tr>
            <td colspan="4" class="contentArea"></td>
        </tr>
        <tr>
            <td colspan="4" class="LastContentArea">
                <table class="smallTable">
                    <tr>
                        <td class="title">힌지</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="title">핸들</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="title">데드락</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="title">힌지</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="title">레드락</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="title">도장</td>
                        <td></td>
                    </tr>
                    <tr class="footerSign">
                        <td class="title"></td>
                        <td>(주) 사운드 방음</td>
                    </tr>
                </table>
            </td>
        </tr>
        </tbody>
    </table>
</div>
</body>
</html>
