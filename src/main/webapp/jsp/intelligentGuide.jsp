<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String themeId = request.getParameter("themeId");
	String themeName = request.getParameter("themeName");
%>
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<base href="<%=basePath%>">
<link rel="stylesheet" href="css/intelligentGuide.css">
<script src="assets/jquery.min.js"></script>
<script src="js/sea.js"></script>
<script src="js/intelligentGuide.js"></script>
</head>
<body
	style="background: url(./imgs/backgroud-img.png) no-repeat top #FFFFFF;">
	<div style="display: none;" id="themeId"><%=themeId %></div>
	<div style="display: none;" id="themeName"><%=themeName %></div>
	<div class="overlay"></div>
	<div id="AjaxLoading" class="showbox">
		<div class="loadingWord">
			<img src="./imgs/loading.gif">加载中，请稍候...
		</div>
	</div>
	<div style="width: 1200px; margin: 0 auto;">
		<div style="margin-top: 400px;">
			<div class="div_nai">
				<a href="index/index.jsp">首页</a>&nbsp;
				<span>-&gt;<a href="index/select.jsp">我要开办企业</a></span>&nbsp;
				<span>-&gt;<a href="index/themeService.jsp">主题式服务</a></span>&nbsp;
				<span>-&gt;<%=themeName %></span>
			</div>
		</div>
		<div class="left">
			<!-- 智能导办头部 -->
			<div class="left_head">
				<div class="head_d"></div>
				<div class="head_img">
					<img alt="" src="./imgs/csx/u44.png">
				</div>
				<div class="head_title"><%=themeName %></div>
			</div>
			<!-- 问题列表  -->
			<div class="left_aks" id="leftAks"></div>
		</div>
		<div class="right">
			<div class="right_t">
				<div class="right_t_l">
					<img class="t_l_img" alt="" src="./imgs/csx/znxzs.png">
				</div>
				<div class="right_t_r">
					<span class="t_r_span">智能小助手</span>
				</div>
			</div>
			<div class="right_t_content">
				<span class="t_content_one">您好，我是您的智能小助手，我将一步一步教</span> <span
					class="t_content_one">您如何进行企业开办。</span><br />
				<br /> <span class="t_content_two">当前为<label
					style="color: #3498F5;">第2步</label>，共3步
				</span><br /> <span class="t_content_three">请您选择左侧选项，我将为您智能生成开办企业的所需材料，办理证照等信息。</span><br />
				<br /> <span class="t_content_one">如需帮助请咨询下方的机器人或在线客服。</span>
			</div>
			<div class="right_robot">
				<div class="robot_div_img">
					<img class="robot_img" alt="" src="./imgs/csx/jiqiren.png">
				</div>
				<div class="robot_div">
					<div class="robot_div_t">
						您好，我是智能机器人“小企”<br />有疑问就请点我咨询吧！
					</div>
					<div id="goRobot" class="robot_div_btn">点击咨询</div>
				</div>
			</div>
			<!-- <div class="right_t">
				<div class="right_t_l">
					<img class="t_l_img" alt="" src="./imgs/csx/kf.png">
				</div>
				<div class="right_t_r">
					<span class="t_r_span">在线客服</span>
				</div>
			</div>
			<div class="right_t_content1">
				<div class="t_content1_center">
					<div class="t_content1_div">
						<img alt="" src="./imgs/csx/call1.png"> <br /> <span>客服一</span>
					</div>
					<div class="t_content1_div">
						<img alt="" src="./imgs/csx/call2.png"> <br /> <span>客服二</span>
					</div>
					<div class="t_content1_div" style="float: right;">
						<img alt="" src="./imgs/csx/call3.png"> <br /> <span>客服三</span>
					</div>
				</div>
			</div> -->
			<div class="right_t">
				<div class="right_t_l">
					<img class="t_l_img" alt="" src="./imgs/csx/dhkf.png">
				</div>
				<div class="right_t_r">
					<span class="t_r_span">电话客服</span>
				</div>
			</div>
			<div class="right_t_content2">
				<div class="t_content2_l">
					<div class="content2_l_t"></div>
					<div class="content2_l_t" style="margin-top: 60px;"></div>
				</div>
				<div class="t_content2_r">
					<div class="phone_t">市民热线</div>
					<div class="phone">12345</div>
					<div class="phone_t">服务热线</div>
					<div class="phone">0731-84069315</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>