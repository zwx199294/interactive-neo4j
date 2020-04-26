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
<link rel="stylesheet" href="css/selectArea.css">
<link rel="stylesheet" href="js/element-ui/lib/theme-chalk/index.css">
<script src="assets/jquery.min.js"></script>
<script src="js/sea.js"></script>
<script type="text/javascript" src="js/vue.js"></script>
<script src="js/element-ui/lib/index.js"></script>
</head>
<body
	style="background: url(./imgs/backgroud-img.png) no-repeat top #FFFFFF;">
	<input id="themeName" type="hidden" value="<%=themeName%>" />
	<input id="themeId" type="hidden" value="<%=themeId%>" />
	<div style="width: 1200px; margin: 0 auto;">
		<div style="margin-top: 400px;">
			<div class="div_nai">
				<a href="index/index.jsp">首页</a>
				<span>-&gt;<a href="index/select.jsp">我要开办企业</a></span>
				<span>-&gt;<a href="index/themeService.jsp">主题式服务</a></span>
				<span>-&gt;选择区域</span>
			</div>
		</div>
		<div class="left" id="app">
			<div class="left_head">
				<div class="head_div1">
					<span class="head_t">选择区域</span>
				</div>
			</div>
			<div>
				<div class="desc">
					为了确定给您服务的部门，请选择您要办事的区域。如果开办企业（或其他市场主体），请选择企业开办地点，如果是个人办事，请选择户口（或者暂住证）所在地。
				</div>
				<el-form style="margin-top: 40px;" size="small" label-width="100px"> 
					<el-form-item label="请选择区域"> 
						<el-cascader style="width: 300px;" v-model="value" 
							:options="options">
						</el-cascader>
					</el-form-item> 
				</el-form>
				<div class="ksbl_btn" @click="gotoNext">下一步</div>
			</div>
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
					class="t_content_one">您如何进行企业开办。</span><br /> <br /> <span
					class="t_content_two">当前为<label style="color: #3498F5;">第2步</label>，共3步
				</span><br /> <span class="t_content_three">请在左侧的选择区域中选择您所在的区域。</span><br />
				<br /> <span class="t_content_one">如需帮助请咨询下方的机器人或在线客服。</span>
			</div>
			<div class="right_robot">
				<div class="robot_div_img">
					<img class="robot_img" alt="" src="./imgs/csx/jiqiren.png">
				</div>
				<div class="robot_div">
					<div class="robot_div_t">
						您好，我是智能机器人”小企“<br />有疑问就请点我咨询吧！
					</div>
					<div id="goRobot" class="robot_div_btn">点击咨询</div>
				</div>
			</div>
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
<script type="text/javascript" src="js/selectArea.js"></script>
</html>