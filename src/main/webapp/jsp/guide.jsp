<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%
String path = request.getContextPath();  
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";  
%> 
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<base href="<%=basePath%>">
<link rel="stylesheet" href="css/chosen.css">
<script src="assets/jquery.min.js"></script>
<script src="js/chosen.jquery.min.js"></script>
<link rel="stylesheet" href="css/guide.css">
</head>
<body style="background:url(./imgs/backgroud-img.png)  no-repeat top #F1F1F1;margin: 0;">
	<div class="div_body">
		<div style="width: 1000px;margin: 0 auto;">
			<div style="margin-top: 360px;">
				<div class="div_nai">
					<a href="index/index.jsp">首页</a><span>-&gt;<a href="index/entstart.jsp">我要开办企业</a></span><span>-&gt;我要开办</span> 
				</div>
			</div>
			<div style="margin-top: 15px;">
				<select id="entSc" data-placeholder="请选择我要开办的企业" class="chosen-select" tabindex="2">
	            	<option value=""></option>
	            </select>			
			</div>
			<div class="div_list" id="ent_list"></div>
		</div>
	</div>
	<div style="height: 150px;"></div>
	<script src="js/guide.js"></script>
</body>
</html>