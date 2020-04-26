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
	String themeName = request.getParameter("themeName");
	String groupName = request.getParameter("groupName");
	String themeId = request.getParameter("themeId");
	String searchName = request.getParameter("searchName");
%>
		<title></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<meta name="description" content="overview &amp; stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<base href="<%=basePath%>">
		<link rel="stylesheet" href="js/element-ui/lib/theme-chalk/index.css">
		<link rel="stylesheet" href="css/theme.css">
		<script src="assets/jquery.min.js"></script>
		<script src="js/vue.js"></script>
		<script src="js/element-ui/lib/index.js"></script>
	</head>
	<body class="body">
		<input type="hidden" value="<%=themeName %>" id="themeName" />
		<input type="hidden" value="<%=themeId %>" id="themeId" />
		<input type="hidden" value="<%=groupName %>" id="groupName" />
		<input id="searchName" type="hidden" value="<%=searchName%>" />
		<div id="app" class="left" v-cloak>
			<el-container class="container">
				<el-header>
					<div class="header_logo">
						<a href="#" target="_self">
							<img src="./imgs/scjg/scjgj_logo.png">
						</a>
					</div>
					<div class="header_logo">
						<img style="padding-left: 25px;" src="./imgs/scjg/yjsycb_logo.png">
					</div>
				</el-header>
				<el-main>
					<div class="banner" id="banner_area" style="background-image: url(./imgs/scjg/banner_bg.png);">
						<div class="main-content">
							<h1>我要办事</h1>
							<div class="area-div">
								<span id="area-select" class="area-select" @click="selectAreaClick">
									<span id="bsqy">湖南省</span> <img src="./imgs/scjg/trangle_down.png">
								</span>
								<div id="area-select-content" class="area-select-content" style="display: none;">
									<img src="./imgs/scjg/close.png" class="close" @click="closeClick">
									<ul class="area-select-content-nav">
										<li><a class="on" @click="cityClick('湖南省')">湖南省<i></i></a></li>
									</ul>
									<ul class="area-select-content-ul">
										<li class="area-selector" v-for="(item, index) in districtDatas" @click="cityClick(item.name)">
											<a :title="item.name">{{item.name}}</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="search-input-div">
								<el-input class="search-input" v-model="search.name" placeholder="请输入内容" @keyup.enter.native="searchClick">
									<el-button slot="append" @click="searchClick">搜索</el-button>
								</el-input>
							</div>
						</div>
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
							<!-- <li class="li-btn">
								<el-button size="small">热点刷新</el-button>
							</li> -->
						</ul>
					</div>
					<div class="wyb">
						<span class="wyb-line"></span>
						<span class="wyb-text">我要办</span>
						<span class="wyb-line"></span>
					</div>
					<!-- 事项 -->
					<div class="item-type">
						<ul class="item-type-ul" v-for="item in themeDatas">
							<li class="item-type-li"><img :src="'./imgs/scjg/theme/'+item.id+'.png'"></li>
							<li class="item-type-li">
								<span :title="item.themeName" class="item-type-li-title" @click="gotoAsk(item.themeName,item.id)">
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
				</el-main>
				<el-footer style="padding: 0px;margin-top: 20px;">
					<div class="bottom">
						<div style="width: 70%;margin: 0 auto;">
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
	<script src="js/theme.js"></script>
</html>
