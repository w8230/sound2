<%--
  Created by IntelliJ IDEA.
  User: USER
  Date: 2020-03-23
  Time: 오후 1:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="/data-component/common/html2canvas.js"></script>
    <script>
        $(function() {
            $("#get").click(function() {


                $("#res").load("/test2", function () {

                });
            });

        });







    </script>
</head>
<body>
    <button id="get">이미지 저장</button>
    <div id="res" ></div>
</body>
</html>
