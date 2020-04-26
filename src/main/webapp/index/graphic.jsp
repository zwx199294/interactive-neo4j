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
<link rel="stylesheet" href="css/graphic.css">
<script src="js/vue.js"></script>
<script src="js/element-ui/lib/index.js"></script>
</head>
<body class="body">
	<div id="app" class="left" v-cloak>
		<el-container class="container"> <el-header style="height: 50px;">
		<div style="display: flex; justify-content: center;">
			<div style="width: 75%;max-width: 350px;">
				<img src="imgs/scjg/scjgj_logo.png" height="50px"
					width="100%" style="max-width: 350px;">
			</div>
			<div style="width: 22%;max-width: 150px;">
				<img src="imgs/scjg/yjsycb_logo.png" height="45px"
					width="100%" style="max-width: 150px;">
			</div>
		</div>
		</el-header> <el-main>
		<div style="text-align: center;">
			<img src="./imgs/scjg/graphic.jpg" style="width: 100%; max-width: 620px;">
		</div>
		</el-main> <el-footer style="padding: 0px;margin-top: 100px;">
		<div class="bottom">
			<div style="width: 100%; max-width: 800px; margin: 0 auto;">
				<el-row :gutter="20"> <el-col :span="3">
				<div class="">
					<img alt="" src="./imgs/scjg/scju_red.png">
				</div>
				</el-col> <el-col :span="8">
				<div class="">
					<span>版权所有：湖南省市场监督管理局</span><br> <span>地
						址：湖南省长沙市芙蓉南路二段118号</span>
				</div>
				</el-col> <el-col :span="6">
				<div class="">
					<span>邮 编：410004</span><br> <span>电 话：0731-8569300</span>
				</div>
				</el-col> <el-col :span="7">
				<div class="" style="word-wrap: break-word;">
					<span>公安机关备案号：43010302000524</span><br> <span>网站标识码：4300000077</span>
				</div>
				</el-col> </el-row>
			</div>
		</div>
		</el-footer> </el-container>
	</div>


</body>
<script type="text/javascript">
	var app = new Vue({
		el : '#app',
			})
</script>
</html>
