<%@page import="com.chinacreator.asp.comp.sys.oauth2.common.util.SSOUtils"%>
<%@page import="com.chinacreator.c2.sysmgr.User"%>
<%@page import="com.chinacreator.asp.comp.sys.oauth2.common.CredentialStore"%>
<%@page import="com.chinacreator.asp.comp.sys.oauth2.common.Credential"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%
String path = request.getContextPath();  
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Credential credential=CredentialStore.getCurrCredential();
User user = credential.getUserInfo();
%> 
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<base href="<%=basePath%>">
<link rel="stylesheet" href="css/userents.css">
</head>
<body style="background:url(./imgs/backgroud-img.png)  no-repeat top #F1F1F1;margin: 0;">
		<div class="head-nav">
	       	     	<ul class="title-left fl">
		       	     	<li id="currentTime" class="time"></li>
		       	     	<li class="user_header">您好！&nbsp;&nbsp;<%=user.getRealname() %></li>
		       	     </ul>
		       	     <ul class="title-right fr">
		       	     	<li class="exit" style="width: 120px;" onclick="logout();">登出</li>
		       	     </ul>
		</div>
	<div class="div_body">
	<div style="width: 1000px;margin: 0 auto;">
		<div style="margin-top: 300px;">
			<div class="div_nai">
					<a href="index/index.jsp">首页</a><span>-&gt;企业开办信息列表</span> 
				</div>
			<div class="content">
			 	<div class="content_title">
			 		<div class="text">企业开办信息列表</div>
			 		<!-- <a class="reback" href="index/index.jsp">返回</a> -->
			 	</div>
				<table border="0" cellpadding="0" cellspacing="0" class="content_table" style="min-height:150px;height:150px;">
					<tbody>
					<tr>
					<th>企业名称</th>
					<th>申请时间</th>
					<th>登记机关</th>
					<th>状态</th>
				  </tr>
				  <tr>
					<td>XXX有限公司</td>
					<td>2019-03-25</td>
					<td>长沙市市场监督管理局</td>
					<td><a href="#">查看详情</a></td>
				  </tr>
				  <tr>
					<td>XXX有限公司</td>
					<td>2019-03-25</td>
					<td>长沙市市场监督管理局</td>
					<td><a href="#">查看详情</a></td>
				  </tr>
				  </tbody>
				</table>
			</div>
		</div>
		</div>
	</div>
	<div style="height: 150px;"></div>
	
	<script src="assets/jquery.min.js"></script>
	<script type="text/javascript">
	$(function(){ 
		var nowDate = new Date();     
	    var year = nowDate.getFullYear();    
	    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;    
	    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate(); 
	　　$("#currentTime").text(year+"年"+month+"月"+date+"日");
	});
	</script>
</body>
</html>