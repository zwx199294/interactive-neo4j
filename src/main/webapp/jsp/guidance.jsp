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
	String guideprocessId = request.getParameter("guideprocessId");
%>
		<title></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<meta name="description" content="overview &amp; stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<base href="<%=basePath%>">
		<link rel="stylesheet" href="js/element-ui/lib/theme-chalk/index.css">
		<link rel="stylesheet" href="css/guidance.css">
		<link rel="stylesheet" href="css/normalize.css" />
		<link rel="stylesheet" href="css/jquery.lighter.css"/>
		<link rel="stylesheet" href="css/components/loginInfo.css">
		<script src="assets/jquery.min.js"></script>
		<script src="js/vue.js"></script>
		<script src="js/element-ui/lib/index.js"></script>
		<script type="text/javascript" src="js/qrcode.min.js"></script>
		<script src="js/jquery.lighter.js" type="text/javascript"></script>
		<script type="text/javascript" src="js/components/loginInfo.js"></script>
	</head>
	<body class="body">
		<input id="guideprocessId" type="hidden" value="<%=guideprocessId%>" />
		<input id="themeId" type="hidden" value="<%=themeId%>" />
		<iframe style="display: none;" id="download_iframe"></iframe>
		<div id="app" class="left" v-cloak>
			<el-container>
				<el-header>
					<div class="header_logo">
						<a href="#" target="_self"> <img src="./imgs/scjg/scjgj_logo.png">
						</a>
					</div>
					<div class="header_logo">
						<img style="padding-left: 15px;" src="./imgs/scjg/yjsycb_logo.png">
					</div>
					<login-info></login-info>
				</el-header>
				<el-main>
					<!-- 导航开始 -->
					<div class="banner" style="background-image: url(./imgs/scjg/banner_bg.png);">
						<div class="container">
							<div class="left_t el-icon-arrow-left" @click="goback"></div>
							<div style="height: 50px;">
								<span :title="baseInfo.themeName">{{baseInfo.themeName}}</span>
								<p>智能导服，为您提供个性化、精准的一次告知服务</p>
							</div>
						</div>
					</div>
					<!-- 导航结束 -->
					
					<!-- tab页签开始 -->
					<div class="tab-nav">
						<ul class="tab-nav-ul">
							<li v-for="item in tabs" :id="'tab-'+item.id" :class="item.isSelected ? 'tab-nav-li active': 'tab-nav-li'" @click="selectTab(item)">
								<span class="tab-nav-span">
									{{item.name}}
								</span>
							</li>
							<li class="tab-nav-li-goto"><el-button type="primary" @click="manage">开始办理</el-button></li>
						</ul>
					</div>
					<!-- tab页签结束 -->
					
					
					<div style="width: 70%; margin: 0 auto;">
					<!-- 基本信息开始 -->
					<div class="anmao-nofixed mao" id="jbxx" style="top: -70px;"></div>
					<div class="dh">
						<span class="dh-title">基本信息</span>
						<!-- 二维码 -->
						<!-- <el-popover placement="bottom" width="150" trigger="hover">
							<div style="text-align: center;">
								<span style="margin-bottom: 15px;">扫一扫，收藏到手机</span>
								<div id="qrcode" class="qrcode"></div>
							</div>
							<div slot="reference" class="qrcode-img">
								<img src="./imgs/qr.png"><span class="qrcode-span">扫一扫，收藏到手机</span>
							</div>
						</el-popover> -->
					</div>
					<table border="0" cellspacing="0" cellpadding="0" class="table-bordered">
						<tbody>
							<tr>
								<th><img src="./imgs/scjg/li_icon1.png"><span>“一件事”名称</span></th>
								<td>
									{{baseInfo.themeName}}
								</td>
							</tr>
							<tr>
								<th><img src="./imgs/scjg/li_icon2.png"><span>是否收费（收费标准）</span></th>
								<td>{{baseInfo.cost}}</td>
							</tr>
							<tr>
								<th><img src="./imgs/scjg/li_icon3.png"><span>承诺时限</span></th>
								<td>{{baseInfo.deadline}}</td>
							</tr>
							<tr>
								<th><img src="./imgs/scjg/li_icon5.png"><span>结果送达</span></th>
								<td>{{baseInfo.sendResult}}</td>
							</tr>
							<tr>
								<th><img src="./imgs/scjg/li_icon4.png"><span>监督投诉渠道</span></th>
								<td>{{baseInfo.monitor}}</td>
							</tr>
							<tr>
								<th><img src="./imgs/scjg/li_icon7.png"><span>办公地址</span></th>
								<td>{{baseInfo.addressTime}} 
								<!-- <img v-if="baseInfo.baiduAddress" title="点击进入百度地图" src="./imgs/addr.jpg" width="32"
									 height="26" @click="viewAddr" style="cursor: pointer;"> -->
								<div style="cursor: pointer;float: right;" title="点击进入百度地图" @click="viewAddr">
									<img v-if="baseInfo.baiduAddress" src="./imgs/scjg/daohang_icon.png" >
									<span style="padding-left:4px;" class="goto-map">我想去</span>
								</div>
								</td>
							</tr>
							<tr>
								<th style="border-bottom: 0px solid #ebeef5;"><img src="./imgs/scjg/li_icon6.png"><span>办公时间</span></th>
								<td style="border-bottom: 0px solid #ebeef5;">
									{{baseInfo.workingHour}}</td>
							</tr>
						</tbody>
					</table>
					<!-- 基本信息结束 -->
					
					<!-- 所需材料开始 -->
					<div class="anmao-nofixed mao" id="sxcl"></div>
					<div class="dh">
						<span class="dh-title">所需材料</span>
						<div class="left_download">
							<el-button icon="el-icon-download" size="small" @click="downloadBatch">批量下载</el-button>
						</div>
					</div>
					<table border="0" cellspacing="0" cellpadding="0" class="table-other">
						<thead>
							<tr>
								<th width="5%">序号</th>
								<!-- <th width="20%">办理环节</th> -->
								<th width="10%" style="display: none;">id</th>
								<th width="30%">材料名称</th>
								<th width="10%">材料类型</th>
								<th width="5%">份数</th>
								<th width="10%">填报说明</th>
								<th width="10%">来源渠道</th>
								<th width="10%" style="border-right: 0px solid #ebeef5;">材料范本</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in materials">
								<td>{{index+1}}</td>
								<td style="display: none;">{{item.id}}</td>
								<!-- <td :rowspan="item.proc_namespan" :style="{ display: item.proc_namedis }">{{item.proc_name}}</td> -->
								<td>{{item.amName}}</td>
								<td>{{item.amType}}</td>
								<td>{{item.amCopies}}</td>
								<td><a v-if="item.fillinNotes" class="info" @click="lookMaterial(item)">查看详情</a> 
									<span v-else></span></td>
								<td>{{item.sourceChannel}}</td>
								<td style="border-right: 0px solid #ebeef5;"><a class="info" v-if="item.blankTable" :download="item.blankTable"
									 :href="'enclosu/entmaterial/blank_table/'+item.blankTable">空白模板</a>
									<br v-if="item.blankTable" /> <a class="info" v-if="item.sampleTable" :download="item.sampleTable" :href="'enclosu/entmaterial/sample_table/'+item.sampleTable">示范文本</a>
								</td>
							</tr>
						</tbody>
					</table>
					<!-- 所需材料结束 -->
					
					<!-- 办理结果开始 -->
					<div class="anmao-nofixed mao" id="bljg"></div>
					<div class="dh">
						<span class="dh-title">办理结果</span>
					</div>
					<table border="0" cellspacing="0" cellpadding="0" class="table-other" v-if="licenses.length > 0">
						<thead>
							<tr>
								<th width="5%">序号</th>
								<th width="35%">证照名称</th>
								<th width="35%" style="border-right: 0px solid #ebeef5;">受理机关</th>
								<!-- <th width="15%">受理条件</th>
								<th width="15%" style="border-right: 0px solid #ebeef5;">法律依据</th> -->
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in licenses">
								<td>{{index+1}}</td>
								<td>{{item.rsName}}</td>
								<td style="border-right: 0px solid #ebeef5;">{{item.orgName}}</td>
								<!-- <td><a class="info" v-if="item.approveId" @click="lookLicense(item.approveId, 1)">查看详情</a>
								</td>
								<td style="border-right: 0px solid #ebeef5;"><a class="info" v-if="item.approveId"
									 @click="lookLicense(item.approveId, 2)">查看详情</a></td> -->
							</tr>
						</tbody>
					</table>
					<div v-else align="center" class="bllc">
							<span style="color: #333333;"><i class="el-icon-warning-outline"></i>&nbsp;暂无办理结果</span>
					</div> 
					<!-- 办理结果结束 -->
					
					<!-- 办理流程开始 -->
					<div class="anmao-nofixed mao" id="bllc"></div>
					<div class="dh">
						<span class="dh-title">办理流程</span>
					</div>
					<div align="center" class="bllc">
						<el-image class="outline-image" v-if="!ie" src="./imgs/flowchart/<%=themeId%>.png">
							<div slot="error">
								<i class="el-icon-picture-outline"></i>&nbsp;暂无办理流程
							</div>
						</el-image>
						<img v-if="ie" alt="暂无流程" src="./imgs/flowchart/<%=themeId%>.png" />
					</div>
					<!-- 办理流程结束 -->
					
					<!-- 您的情况及要求开始 -->
					<div class="anmao-nofixed mao" id="yq"></div>
					<div class="dh">
						<span class="dh-title">您的情况及要求</span>
					</div>
					<table border="0" cellspacing="0" cellpadding="0" class="table-other" v-if="baseInfo.noneAsk === 0">
						<thead>
							<tr>
								<th width="5%">序号</th>
								<th width="35%">问题</th>
								<th width="35%" style="border-right: 0px solid #ebeef5;">答案</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in questionAnswereds">
								<td>{{index+1}}</td>
								<td>{{item.askId}}</td>
								<td style="border-right: 0px solid #ebeef5;">{{item.answerId}}</td>
							</tr>
						</tbody>
					</table>
						<div v-else align="center" class="bllc">
							<span style="color: #333333;"><i class="el-icon-warning-outline"></i>&nbsp;暂无您的情况及要求</span>
						</div> 
					<!-- 您的情况及要求结束 -->
					
						<div class="table_btn_group">
		    				<el-button class="table_btn_left" @click="goback">上一步</el-button>
		    				<el-button class="table_btn_right" type="primary" @click="manage">开始办理</el-button>
						</div>
						
					</div>
					
					
					<!-- 查看填报说明开始 -->
					<el-dialog class="fill-note-dialog" title="查看详情" :visible.sync="fillinNoteDialog" width="40%"
					 :close-on-click-modal="false"> 
						<span v-html="fillinNotes"></span>
						<div slot="footer" class="dialog-footer">
							<el-button type="primary" @click="fillinNoteDialog = false" size="small">我知道了</el-button>
						</div>
					</el-dialog>
					<!-- 查看填报说明结束 -->
					
					<!-- 主体资格证明文件、合并各方公司关于通过合并协议的决议或决定填报说明开始 -->
					<el-dialog class="fill-note-dialog" title="查看详情" :visible.sync="fillinNoteZTZGDialog" width="40%"
					  :close-on-click-modal="false">
						<div v-for="(item, index) in fillinNoteZTZGDatas">
							<span style="float: left;" v-html="item.notLinkName"></span>
							<a class="fill-note-a" v-if="item.imgUrl" :href="item.imgUrl" data-lighter>
							  {{item.linkName}}
							</a>
							<span v-else>{{item.linkName}}</span>
						</div>
						<div slot="footer" class="dialog-footer">
							<el-button type="primary" @click="fillinNoteZTZGDialog = false" size="small">我知道了</el-button>
						</div>
					</el-dialog>
					<!-- 主体资格证明文件、合并各方公司关于通过合并协议的决议或决定填报说明结束 -->
					
					<!-- 合并各方公司关于通过合并协议的决议或决定填报说明开始 -->
					<!-- <el-dialog class="fill-note-dialog" title="查看详情" :visible.sync="fillinNoteHBJYDialog" width="40%"
					 :close-on-click-modal="false">
						<div v-for="(item, index) in fillinNoteHBJYDatas">
							<span style="float: left;" v-html="item.notLinkName"></span>
							<a class="fill-note-a" v-if="item.imgUrl" :href="item.imgUrl" data-lighter>
							  {{item.linkName}}
							</a>
							<span v-else>{{item.linkName}}</span>
						</div>
						<div slot="footer" class="dialog-footer">
							<el-button size="small">查看范本</el-button>
							<el-button type="primary" @click="fillinNoteHBJYDialog = false" size="small">我知道了</el-button>
						</div>
					</el-dialog> -->
					<!-- 合并各方公司关于通过合并协议的决议或决定填报说明结束 -->
					
					<!-- 住所证明填报说明开始 -->
					<el-dialog class="fill-note-dialog" title="查看详情" :visible.sync="fillinNoteZSZMDialog" width="50%"
					  :close-on-click-modal="false">
						<div v-for="(item, index) in fillinNoteZSZMDatas">
							<a class="fill-note-a" :href="item.imgUrl" data-lighter title="点击查看大图">
							  	<!-- 住所证明 -->
								<img style="width: 100%;" :src="item.imgUrl" title="点击查看大图">
							</a>
						</div>
						<div slot="footer" class="dialog-footer">
							<el-button type="primary" @click="fillinNoteZSZMDialog = false" size="small">我知道了</el-button>
						</div>
					</el-dialog>
					<!-- 住所证明填报说明结束 -->
					
					<!-- 二维码悬浮开始 -->
					<div class="qrcode-fixed-div">
						<div id="qrcode" class="qrcode-fixed"></div>
						<div class="qrcode-title-fixed">扫一扫，收藏到手机</div>
					</div>
				<!-- 二维码悬浮结束 -->
				</el-main>
				<el-footer style="padding: 0px;margin-top: 20px;">
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
										<span>版权所有：湖南省市场监督管理局</span><br> <span>地
											址：湖南省长沙市芙蓉南路二段118号</span>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="">
										<span>邮 编：410004</span><br> <span>电 话：0731-8569300</span>
									</div>
								</el-col>
								<el-col :span="7">
									<div class="">
										<span>公安机关备案号：43010302000524</span><br> <span>网站标识码：4300000077</span>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-footer>
			</el-container>
		</div>
	</body>
	<script src="js/guidance.js"></script>
</html>
