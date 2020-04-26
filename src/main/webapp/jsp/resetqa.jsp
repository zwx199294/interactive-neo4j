<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<base href="<%=basePath%>">
<link rel="stylesheet" href="css/resetqa.css">
<script src="js/sea.js"></script>
<script src="assets/jquery.min.js"></script>
<link rel="stylesheet" href="css/jquery.searchableSelect.css">
<script src="js/jquery.searchableSelect.js"></script>
<script src="js/resetqa.js"></script>

</head>

<body>
	<div class="overlay"></div>
	<div id="AjaxLoading" class="showbox">
		<div class="loadingWord">
			<img src="./imgs/loading.gif"><span id="load">加载中，请稍候...</span>
		</div>
	</div>

	<div id="app" class="opr" align="center">
		<div class="thema_input">
			选择主题：<select id="theme-select">
				<option value="">全部</option>
			</select>
		</div>
		<div style="margin-left: 30px;" class="update_btn" id="update">更新</div>
		<div class="text_area">
			<div class="log">更新日志：</div>
			<textarea id="area" rows="10" cols="80" class="area"
				disabled="disabled"></textarea>
		</div>
	</div>

</body>
</html>