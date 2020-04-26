<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<base href="<%=basePath%>">
<link rel="stylesheet" href="js/element-ui/lib/theme-chalk/index.css">
<link rel="stylesheet" href="css/index.css">
<link rel="stylesheet" href="css/components/loginInfo.css">
<script src="assets/jquery.min.js"></script>
<script src="js/vue.js"></script>
<script src="js/element-ui/lib/index.js"></script>
<script type="text/javascript" src="js/qrcode.min.js"></script>
<script type="text/javascript" src="js/components/loginInfo.js"></script>
</head>
<body class="body">
	<script type="text/javascript">
		window.location.href = 'jsp/graphDemo.html';
	</script>
</body>
</html>
