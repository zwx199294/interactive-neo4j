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
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
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
	<div id="app" class="left" v-cloak>
		<el-container class="container" v-loading.fullscreen="fullscreenLoading" 
			element-loading-text="正在加载中" element-loading-spinner="el-icon-loading" 
			element-loading-background="rgba(0, 0, 0, 0.8)">
			<el-header>
				<div class="header_logo">
					<a href="#" target="_self">
						<img style="width: 100%;" src="./imgs/scjg/scjgj_logo.png">
					</a>
				</div>
				<div class="header_logo">
					<img style="padding-left: 25px;" src="./imgs/scjg/yjsycb_logo.png">
				</div>
				<login-info></login-info>
			</el-header>
			<el-main>
				<div class="banner" id="banner_area" style="background-image: url(./imgs/scjg/banner_bg.png);">
					<div class="main-content">
						<span class="title">一件事一次办智能导办</span>
						<el-row style="margin-top: 20px;">
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<div>
										<img src="imgs/scjg/icon1.png" height="66px" width="66px">
									</div>
									<div class="banner_text">一厅办理</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<div>
										<img src="imgs/scjg/icon2.png" height="66px" width="66px">
									</div>
									<div class="banner_text">一站导办</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<div>
										<img src="imgs/scjg/icon3.png" height="66px" width="66px">
									</div>
									<div class="banner_text">一次告知</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<div>
										<img src="imgs/scjg/icon4.png" height="66px" width="66px">
									</div>
									<div class="banner_text">一次表单</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<div>
										<img src="imgs/scjg/icon5.png" height="66px" width="66px">
									</div>
									<div class="banner_text">一窗受理</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<div>
										<img src="imgs/scjg/icon6.png" height="66px" width="66px">
									</div>
									<div class="banner_text">一网通办</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<div>
										<img src="imgs/scjg/icon7.png" height="66px" width="66px">
									</div>
									<div class="banner_text">一次办好</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<div>
										<img src="imgs/scjg/icon8.png" height="66px" width="66px">
									</div>
									<div class="banner_text">一单送达</div>
								</div>
							</el-col>
						</el-row>
						<div class="search-input-div">
							<el-input class="search-input" v-model="search.name" placeholder="热门搜索:我要开办企业" clearable @clear="searchClick" @keyup.enter.native="searchClick">
								<el-button slot="append" @click="searchClick">搜索</el-button>
							</el-input>
						</div>
					</div>
					<!-- <img src="imgs/scjg/index_banner_front.png" height="90px" width="100%" style="margin-top: -1%; position: absolute;"> -->
				</div>
				
				<div class="hot-point">
					<ul class="hot-word-ul">
						<li class="hot-word-li">
							<span class="hot-word-span" title="食品添加剂生产许可证"><a class="hot-word-span-a" @click="gotoAsk('食品添加剂生产许可证','A1017')">食品添加剂生产许可证</a></span>
							<img src="./imgs/scjg/hot.png">
						</li>
						<li class="hot-word-li">
							<span class="hot-word-span" title="食品生产许可证（不含特殊食品）"><a class="hot-word-span-a" @click="gotoAsk('食品生产许可证（不含特殊食品）','A1016')">食品生产许可证（不含特殊食品）</a></span>
							<img src="./imgs/scjg/hot.png">
						</li>
						<li class="hot-word-li">
							<span class="hot-word-span" title="食品生产许可证（含特殊食品）"><a class="hot-word-span-a" @click="gotoAsk('食品生产许可证（含特殊食品）','A1020')">食品生产许可证（含特殊食品）</a></span>
							<img src="./imgs/scjg/hot.png">
						</li>
						<li class="hot-word-li">
							<span class="hot-word-span" title="我要办食盐定点生产企业审批"><a class="hot-word-span-a" @click="gotoAsk('我要办食盐定点生产企业审批','A1018')">我要办食盐定点生产企业审批</a></span>
							<img src="./imgs/scjg/hot.png">
						</li>
					</ul>
				</div>
				
				<!-- 事项 -->
				<div class="item-type">
					<ul class="item-type-ul" v-for="item in themeDatas">
						<li class="item-type-li"><img :src="'./imgs/scjg/theme/'+item.id+'.png'"></li>
						<li class="item-type-li">
							<span :title="item.themeName" class="item-type-li-title" @click="gotoAsk(item.themeName,item.id,item.noneAsk)">
								{{item.themeName}}
								<span class="item-type-li-flag" v-if="item.themeNameTag != ''">{{item.themeNameTag}}</span>
							</span>
							<div class="item-type-span-desc">{{item.shortExplain}}</div>
						</li>
						<li class="li-btn" style="margin-top: 10px;">
							<el-button v-if="item.id=='A1001'" @click="gotointerpret(item.themeName,item.id)" size="small">解读</el-button>
						</li>
					</ul>
				</div>
				<div class="sy_list">
					<ul class="nav-ul">
						<li class="nav-ul-li li1" id="nav-ul-li-qrcode">
							<el-popover placement="left" width="120" trigger="hover">
								<div style="text-align: center;">
									<div id="qrcode" class="qrcode"></div>
									<div class="nav-ul-pop-span">"一件事一次办"图解</div>
								</div>
								<a slot="reference" @click="scanClick" class="nav-ul-a" target="_blank">
									<img class="nav-img" src="./imgs/qr.png" id="qrcode-img">
									<span id="goto-qrcode" class="show-txt li1" style="top:0;display: none;"><br>扫码<br>查看</span>
								</a>
							</el-popover>
						</li>
						<li class="nav-ul-li li2" id="nav-ul-li-top" style="display: none;">
							<a class="nav-ul-a" href="javascript:scroll(0,0)">
								<img class="nav-img" style="margin-top: 18px;" src="./imgs/scjg/tops.png">
								<span id="goto-top" class="show-txt li2" style="display: none;"><br>返回<br>顶部</span>
							</a>
						</li>
						
					</ul>
				</div>
			</el-main>
			<el-footer style="padding: 0px;margin-top: 100px;">
				<div class="bottom">
					<div style="width: 70%; margin: 0 auto;">
						<el-row :gutter="20">
							<el-col :span="3">
								<div class="">
									<img alt="" src="./imgs/scjg/scju_red.png">
								</div>
							</el-col>
							<el-col :span="8">
								<div class="">
									<span>版权所有：湖南省市场监督管理局</span><br>
									<span>地 址：湖南省长沙市芙蓉南路二段118号</span>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="">
									<span>邮 编：410004</span><br>
									<span>电 话：0731-8569300</span>
								</div>
							</el-col>
							<el-col :span="7">
								<div class="">
									<span>公安机关备案号：43010302000524</span><br>
									<span>网站标识码：4300000077</span>
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
			</el-footer>
		</el-container>
	</div>
</body>
<script src="js/index.js"></script>
</html>
