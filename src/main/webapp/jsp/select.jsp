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
<script src="assets/jquery.min.js"></script>
<link rel="stylesheet" href="css/select.css">
</head>
<script type="text/javascript">
	function goTab(e) {
		if (e == '1') {
			gotopage("themeService.jsp");
		} else if (e == '2') {
			gotopage("entstart.jsp");
		}
	}
	function gotopage(url) {
		if (isIE()) {
			window.location.href = url;
		} else {
			window.location.href = "index/" + url;
		}
	}
	//判读是否为IE浏览器
	function isIE() {
		if (window.navigator.userAgent.indexOf('Trident') != -1) {
			return true;
		} else {
			return false;
		}
	}
</script>
<body
	style="background: url(./imgs/backgroud-img.png) no-repeat top #FFFFFF; margin: 0;">
	<div class="div_body">
		<div style="width: 1000px; margin: 0 auto;">
			<div style="margin-top: 400px;">
				<div style="margin-top: 290px;">
					<div class="div_nai">
						<a href="index/index.jsp">首页</a><span>-&gt;我要开办企业</span>
					</div>
				</div>
			</div>
			<div class="div_inline">
				<div class="div_all">
					<div class="title">主题式服务</div>
					<div class="content">一次引导，高效办事</div>
				</div>
				<div class="aks_btn" onclick="javascript:goTab('1');">立即体验</div>
			</div>
			<div class="div_inline" style="background-color: #004eba;">
				<div class="div_all">
					<div class="title">自定义开办</div>
					<div class="content">自选经营范围，快速办理</div>
				</div>
				<div class="aks_btn" style="color: #004eba;" onclick="javascript:goTab('2');">立即体验</div>
			</div>
		</div>
	</div>
	<div style="height: 150px;"></div>
</body>
</html>