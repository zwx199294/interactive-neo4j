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
<link rel="stylesheet" href="css/intelligentGuide4New.css">
<script src="assets/jquery.min.js"></script>
<script src="js/vue.js"></script>
<script src="js/element-ui/lib/index.js"></script>
</head>
<body style="background: url(./imgs/backgroud-img.png) no-repeat top #F8F8F8;">
	<input type="hidden" value="<%=themeId %>" id="themeId" />
	<input type="hidden" value="<%=themeName %>" id="themeName" />
	<input type="hidden" value="<%=areaCode %>" id="areaCode" />
	<input type="hidden" value="<%=areaCodeUp %>" id="areaCodeUp" />
	<input type="hidden" value="<%=guideprocessId %>" id="guideprocessId" />
	
	<div class="contentDiv">
		<div class="div_nai">
			<a href="index/index.jsp">首页</a>
			<span>-&gt;<a href="index/themeService.jsp">主题式服务</a></span>
			<span>-&gt;<%=themeName %></span>
		</div>
		<div id="app" class="left" v-cloak>
			<!-- 智能导办头部 -->
			<div class="left_head">
				<div class="head_d"></div>
				<div class="head_title">
					<%=themeName %><span v-if="isShowTable">-确认已回答问题</span>
				</div>
			</div>
			<!-- 问题列表  -->
			<div class="left_aks" v-loading="loading" element-loading-text="正在加载中"
				element-loading-spinner="el-icon-loading" v-if="isShowAskList">
				<div v-if="introduction" class="introduction">
					&nbsp;&nbsp;&nbsp;&nbsp;{{introduction}}</div>
				<!-- 问题列表 -->
				<div v-for="(ask,index) in askDatas">
					<div class="ask_content">
						<!-- 问题名词解释 -->
						<el-alert v-if="ask.askDesc" :title="ask.askDesc" type="info" show-icon :closable="false">
  						</el-alert>
						<!-- 问题 -->
						<el-row>
  							<el-col :span="24">
  								<span class="aks_img"></span>
  								<span class="aks_name_span">{{ask.ask}}</span>
  								<el-popover v-if="ask.definitions" placement="right" width="400" trigger="hover">
  									<span class="aks_explain">{{ask.definitions}}</span>
	  								<span slot="reference" style="color: #f6b03c;font-size: 20px;" class="el-icon-info"></span>
								</el-popover>
							</el-col>
						</el-row>
						<!-- 答案选项：单选 -->
						<div class="aks_answer" v-if="ask.askType=='s'">
							<el-popover v-for="(answer,index) in ask.answer" :key="index" placement="top" title="提示" width="200" 
								trigger="hover" style="margin-right: 10px;" :content="answer.explainDesc" :disabled="answer.explainDesc==''">
								<el-radio slot="reference" style="margin-left: 0px;margin-bottom: 5px;" v-model="ask.answerValue" :label="answer.answerId" 
									border size="mini" @change="radioEvent(answer,ask)">{{answer.answerName}}</el-radio>
	 	 					</el-popover>
							<!-- 选项解释 -->
							<div v-for="answer in ask.answerResponseDesc">
								<el-alert v-if="answer.responseDesc" :title="answer.responseDesc" type="info" show-icon :closable="false">
  								</el-alert>
							</div>
						</div>
						<!-- 答案选项：多选 -->
						<div class="aks_answer" v-if="ask.askType=='m'">
							<span v-for="(answer,index) in ask.answer" :key="index">
								<el-popover placement="top" title="提示" width="200" trigger="hover" style="margin-right: 10px;" 
									:content="answer.explainDesc" :disabled="answer.explainDesc==''">
									<el-checkbox slot="reference" style="margin-left: 0px;margin-bottom: 5px;" v-model="ask.answerValue" :label="answer.answerId" 
										border size="mini" @change="checkboxEvent(ask,answer,$event)">{{answer.answerName}}</el-checkbox>
		 	 					</el-popover>
							</span>
							<!-- 选项解释 -->
							<div v-for="answer in ask.answerResponseDesc">
								<el-alert v-if="answer.responseDesc" :title="answer.responseDesc" type="info" show-icon :closable="false">
  								</el-alert>
							</div>
						</div>
						<!-- 答案选项：填空 -->
						<div class="aks_answer" v-if="ask.askType=='f'">
							<el-input style="width:200px;" v-model.trim="ask.inputValue" placeholder="请输入" size="small" @blur="textEvent(ask,$event)"></el-input>
						</div>
					</div>
					<!-- 分割线 -->
					<div class="divider"></div>
				</div>
				<!-- 选择区域 -->
				<div class="ask_content">
					<el-alert title="为了确定给您服务的部门，请选择您所在的区域。" type="info" show-icon
						:closable="false">
	  				</el-alert>
					<el-row>
	  					<el-col :span="24">
	  						<span class="aks_img"></span>
	  						<span class="aks_name_span">请选择区域</span>
						</el-col>
					</el-row>
					<div class="aks_answer">
						<el-cascader style="width: 200px;" size="small " v-model="value" :options="options">
						</el-cascader>
					</div>
				</div>
				<!-- 操作按钮 -->
				<div class="aks_btn" @click="doIt">
					下一步<i class="el-icon-arrow-right el-icon--right"></i></div>
			</div>
			<!-- 确认页 -->
			<div v-if="isShowTable">
				<el-table :data="askDatasTemp" style="width: 100%">
    				<el-table-column type="index" label="序号" width="100">
    				</el-table-column>
    				<el-table-column prop="question" label="问题" width="500">
    				</el-table-column>
    				<el-table-column prop="answer" label="答案" width="600">
    				</el-table-column>
				</el-table>
				<div class="table_btn_group">
					<div class="table_btn_left" @click="goback">
						<i class="el-icon-arrow-left el-icon--left"></i>上一步</div>
					<div class="table_btn_right" @click="confirm" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在加载中"
    					element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">确定</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script src="js/intelligentGuide4New.js"></script>
</html>