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
%>
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<base href="<%=basePath%>">
<link rel="stylesheet" href="js/element-ui/lib/theme-chalk/index.css">
<link rel="stylesheet" href="css/themeService.css">
<script src="assets/jquery.min.js"></script>
<script src="js/vue.js"></script>
<script src="js/element-ui/lib/index.js"></script>
</head>
<body style="background: url(./imgs/backgroud-img.png) no-repeat top #FFFFFF;">
	<div style="width: 1200px; margin: 0 auto;">
		<div class="div_nai">
			<a href="index/index.jsp">首页</a>
			<span>-&gt;主题式服务</span>
		</div>
		<div id="app" class="left" v-cloak>
			<el-card shadow="always">
				<div class="search-input">
					<el-input placeholder="请输入主题名称" v-model="searchInput" @clear="searchClean" @keyup.enter.native="searchThis" clearable>
    					<el-button style="background: #f4faff;" slot="append" icon="el-icon-search" @click="searchThis">搜一下</el-button>
  					</el-input>
				</div>
				<div class="left_head">
					<div v-for="item in themeGroup" @click="selectTheme(item)">
						<span class="font_public"
							:class="{left_head_checked: item.iscurTab,left_head_nochecked: !item.iscurTab}">
							{{item.groupName}}
						</span>
					</div>
				</div>
				<div v-for="(item, index) in mattersData" class="boxfd"
					:class="{boxle: index%5==0}" @click="goIntelligent(item)">
					<el-card style="height: 100px;background: #F4FAFF;" shadow="hover">
						<span class="box_span">{{item.themeName}}</span>
   	 				</el-card>
				</div>
			</el-card>
		</div>
		<!-- <div class="right">
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
					class="t_content_two">当前为<label style="color: #3498F5;">第1步</label>，共3步
				</span><br /> <span class="t_content_three">请在左侧的主题式服务分类中，选取您所要办理的事。</span><br />
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
		</div> -->
	</div>
</body>
<script src="js/themeService.js"></script>
</html>