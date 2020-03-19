<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8">
    <link rel="shortcut icon" href="/ui-component/imagesNew/icon/icon.ico">
    <title>SENSORVIEW | LOGIN</title>
    <link rel="stylesheet" href="/ui-component/assets/font-awesome/4.5.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/login.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/jquery-ui.min.css" />
    <script src="/ui-component/assets/js/jquery-1.11.3.min.js"></script>
    <script src="/ui-component/assets/js/jquery-ui.min.js"></script>
    <script src="/ui-component/assets/js/bootstrap.min.js"></script>
</head>
<script>
    $(document).ready(function(){
        $('#user_code').focus();
    });
</script>
<body class="page-body login-page login-form-fall loaded login-form-fall-init">
<div class="login-container">
    <div class="login-header login-caret">
        <div class="login-content">
            <img src="/ui-component/assets/images/logo@2x.png">
        </div>
    </div>
    <form>
        <div class="login-form">
            <div class="login-content">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="fa fa-user"></i>
                        </div>
                        <input type="text" class="form-control" id="user_code" placeholder="아이디를 입력하세요." autocomplete="off">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-lock"></i>
                        </div>
                        <input type="password" class="form-control" id="user_pwd" placeholder="암호를 입력하세요." autocomplete="new-password">
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block btn-login">
                        로그인
                    </button>
                </div>
            </div>
    </div>
    </form>
</div>
</body>
</html>
<script src="/data-component/user/Login.js"></script>

