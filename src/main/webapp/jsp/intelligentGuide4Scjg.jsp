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
	String areaCode = request.getParameter("areaCode");
	String areaCodeUp = request.getParameter("areaCodeUp");
	String guideprocessId = request.getParameter("guideprocessId");
%>
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<base href="<%=basePath%>">
<link rel="stylesheet" href="js/element-ui/lib/theme-chalk/index.css">
<link rel="stylesheet" href="css/intelligentGuide4Scjg.css">
<link rel="stylesheet" href="js/nav/nav_sytle.css">
<link rel="stylesheet" href="css/components/loginInfo.css">
<script src="assets/jquery.min.js"></script>
<script src="js/vue.js"></script>
<script src="js/element-ui/lib/index.js"></script>
<script type="text/javascript" src="js/components/loginInfo.js"></script>
</head>
<body>
<input type="hidden" value="<%=themeId %>" id="themeId" />
<input type="hidden" value="<%=areaCode %>" id="areaCode" />
<input type="hidden" value="<%=areaCodeUp %>" id="areaCodeUp" />
<input type="hidden" value="<%=guideprocessId %>" id="guideprocessId" />
<div id="app" v-cloak>
	<el-container>
		<el-header>
			<div class="header_logo">
				<a href="#" target="_self">
					<img src="./imgs/scjg/scjgj_logo.png">
				</a>
			</div>
			<div class="header_logo">
				<img style="padding-left: 25px;" src="./imgs/scjg/yjsycb_logo.png">
			</div>
			<login-info></login-info>
		</el-header>
		<el-main style="padding: 0px;min-height: 600px;">
			<div class="banner" style="background-image: url(./imgs/scjg/banner_bg.png);">
				<div class="container">
					<div class="left_t el-icon-arrow-left" @click="goThemes"></div>
					<div style="height: 50px;">
						<span :title="themeName">{{themeName}}</span>
						<p>智能引导，为您提供准确办事指引</p>
					</div>
				</div>
			</div>
			<div class="askArea">
			<div class="contentDiv" v-loading="loading" element-loading-text="正在加载中"
				element-loading-spinner="el-icon-loading" v-if="isShowAskList">
				<div v-if="introduction" class="introduction">
					<span v-html="introduction"></span>
					<!-- <img class="introduction_left" alt="" src="./imgs/scjg/tips.png"> -->
					<img class="introduction_right" alt="" src="./imgs/scjg/trangle.png">
				</div>
			<!-- 问题列表 -->
			<div class="ask_block">
			<div v-for="(ask,index) in askDatas" :class="{ask_padding:ask.value.split('.').length==1}">
				<!-- 分割线 -->
				<div v-if="ask.value.split('.').length==1" class="dividerDiv">
					<div :class="{divider:index!=0}"></div>
				</div>
				<div :class="{ask_content:ask.value.split('.').length>1}">
					<!-- 问题名词解释 -->
					<!-- <el-alert v-if="ask.askDesc" :title="ask.askDesc" type="info" show-icon :closable="false">
  					</el-alert> -->
					<!-- 问题 -->
					<el-row>
  						<el-col :span="24">
  							<span v-if="ask.value.split('.').length==1" class="ask_name_span" v-html="ask.num + '、' + ask.ask">
  							</span>
  							<span v-if="ask.value.split('.').length>1" class="ask_name_span ask_child_font" v-html="ask.ask">
  							</span>
  							<el-popover v-if="ask.definitions" placement="right" width="400" trigger="hover">
  								<span class="ask_explain" v-html="ask.definitions"></span>
	  							<span slot="reference" class="ask_explain_span">
	  								<i class="ask_explain_i el-icon-question"></i>
	  							</span>
							</el-popover>
  							<span class="ask_name_type">{{ask.askType | askType}}</span>
						</el-col>
					</el-row>
					<!-- 答案选项：单选 -->
					<div class="ask_answer" v-if="ask.askType=='s'">
						<el-popover v-for="(answer,index) in ask.answer" :key="index" placement="bottom" width="200" 
							trigger="hover" style="margin-right: 20px;" :content="answer.explainDesc" disabled>
							<el-radio slot="reference" class="ask_answer_ss" v-model="ask.answerValue" 
								:label="answer.answerId" @change="radioEvent(answer,ask)">
								<span v-html="answer.answerName"></span>
							</el-radio>
		 	 			</el-popover>
						<!-- 选项解释 -->
						<div v-for="answer in ask.answerResponseDesc">
							<el-alert v-if="answer.responseDesc" :title="answer.responseDesc" type="info" :closable="false">
  							</el-alert>
						</div>
					</div>
					<!-- 答案选项：多选 -->
					<div class="ask_answer" v-if="ask.askType=='m'">
						<span v-for="(answer,index) in ask.answer" :key="index">
							<el-popover placement="bottom" width="200" trigger="hover" style="margin-right: 20px;" 
								:content="answer.explainDesc" disabled>
								<el-checkbox slot="reference" class="ask_answer_ss" v-model="ask.answerValue" :label="answer.answerId" 
								 	@change="checkboxEvent(ask,answer,$event)" :disabled="answer.disabled">
								 	<span v-html="answer.answerName"></span>
								</el-checkbox>
		 	 				</el-popover>
						</span>
						<!-- 选项解释 -->
						<div v-for="answer in ask.answerResponseDesc">
							<el-alert v-if="answer.responseDesc" :title="answer.responseDesc" type="info" :closable="false">
  							</el-alert>
						</div>
					</div>
					<!-- 答案选项：填空 -->
					<div class="ask_answer" v-if="ask.askType=='f'">
						<el-input style="width:200px;" v-model.trim="ask.inputValue" placeholder="请输入" size="small" 
							@blur="textEvent(ask,$event)"></el-input>
					</div>
				</div>
				</div>
					<!-- 操作按钮 -->
					<el-button class="ask_doit_btn" type="primary" @click="doIt">下一步</el-button>
				</div>
			</div>
			</div>
			<!-- 确认页 -->
			<div v-if="isShowTable" class="contentDiv_table">
				<el-table :data="askDatasTemp" style="width:100%;">
    				<el-table-column align="center" type="index" label="序号" width="100">
    				</el-table-column>
    				<el-table-column prop="question" label="问题" min-width="300">
    				</el-table-column>
    				<el-table-column prop="answer" label="答案" min-width="300">
    				</el-table-column>
				</el-table>
				<div class="table_btn_group">
    				<el-button class="table_btn_left" @click="goback">上一步</el-button>
    				<el-button class="table_btn_right" type="primary" @click="confirm" v-loading.fullscreen.lock="fullscreenLoading" 
    					element-loading-text="正在加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">下一步</el-button>
				</div>
			</div>
			
			<!-- 弹出框 -->
			<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :close-on-press-escape="false" 
				:close-on-click-modal="false" :show-close="false">
  				<span>{{dialogInfo}}</span>
  				<span slot="footer" class="dialog-footer">
    				<el-button type="primary" size="small" @click="goThemes">确 定</el-button>
    				<el-button size="small" @click="refresh">取 消</el-button>
  				</span>
			</el-dialog>
			<!-------------------- 智能问答	---------------------------->
			<div class="rightNav" id="rightNav">
				<!-- <div class="sidebar">
					<div class="child"><i class="el-icon-s-fold"></i></div>
				</div> -->
				<div class="main border">
					<header id="el-drawer__title" class="el-drawer__header" style="margin-bottom: 0px;
    					padding: 15px 20px;border-radius: 8px 8px 0 0;">
						<span role="heading"><i class="el-icon-s-custom"></i>智能问答</span>
						<button type="button" class="el-drawer__close-btn" onclick="hideNav()">
							<i class="el-dialog__close el-icon el-icon-circle-close"></i>
						</button>
					</header>
					<section class="el-drawer__body">
						<div class="m-message" id="m2message">
							<ul id="messages"></ul>
						</div>
						<div class="m-text">
							<!-- <textarea @keydown.enter="listen($event)" id="messCon" maxlength="30" v-model.trim="messCon" placeholder="请输入您的问题"></textarea> -->
							<el-input style="width: 80%;" id="messCon" show-word-limit @keydown.enter.native="listen($event)" size="small" maxlength="20" v-model.trim="messCon" placeholder="请输入您的问题"></el-input>
							<!-- <p class="fontNum"><i>还可以输入<span class="number"><strong>{{fontNum}}</strong></span>字</i></p> -->
							<el-button @click="sendAsk" class="sendBtn" type="primary" size="small" plain>发送</el-button>
						</div>
					</section>
				</div>
			</div>
			<div class="smart_qa">
    			<a href="javascript:showNav();">智<br>能<br>问<br>答</a>
			</div>
			<!-------------------- 智能客服 ---------------------------->
		</el-main>
		<el-footer style="padding: 0;margin-top: 20px;">
			<div class="bottom">
				<div style="width: 70%;margin: 0 auto;">
					<el-row :gutter="20">
  						<el-col :span="3">
  							<div class="">
								<img src="./imgs/scjg/scju_red.png">
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
<script src="js/intelligentGuide4Scjg.js"></script>
</html>