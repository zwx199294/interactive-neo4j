<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String themeId = request.getParameter("themeId");
	String themeName = request.getParameter("themeName");
	String guideprocessId = request.getParameter("guideprocessId");
	String areaCode = request.getParameter("areaCode");
	String areaCodeUp = request.getParameter("areaCodeUp");
%>
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<base href="<%=basePath%>">
<link rel="stylesheet" href="css/chosen.css">
<script src="assets/jquery.min.js"></script>
<link rel="stylesheet" href="js/element-ui/lib/theme-chalk/index.css">
<link rel="stylesheet" href="css/processGuidance4New.css">
<script type="text/javascript" src="js/vue.js"></script>
<script src="js/element-ui/lib/index.js"></script>
<script type="text/javascript" src="js/qrcode.min.js"></script>
</head>
<body style="background: url(./imgs/backgroud-img.png) no-repeat top #FFFFFF;">

	<input id="guideprocessId" type="hidden" value="<%=guideprocessId%>" />
	<input id="themeName" type="hidden" value="<%=themeName%>" />
	<input id="themeId" type="hidden" value="<%=themeId%>" />
	<input id="areaCode" type="hidden" value="<%=areaCode%>" />
	<input id="areaCodeUp" type="hidden" value="<%=areaCodeUp%>" />
	<iframe style="display: none;" id="download_iframe"></iframe>

	<div style="width: 1200px; margin: 0 auto;">
		<div class="div_nai">
			<a href="index/index.jsp">首页</a>
			<span>-&gt;<a href="index/themeService.jsp">主题式服务</a></span>
			<span>-&gt;<a href="javascript: goToAsk();"><%=themeName %></a></span>
			<span>-&gt;所需材料</span>
		</div>
		
		<div id="app" class="left" v-cloak>
			<div class="left_head">
				<div class="head_d"></div>
				<div class="head_title"><%=themeName %>（告知申请人信息）</div>
				<!-- <div class="backstage" @click="gotoStaff">前往工作人员页面&rarr;</div> -->
			</div>
			<!-- tab页 -->
			<div class="left_nav">
				<div v-for="item in tabs" class="font_public"
					:class="{left_nav_selected: item.isSelected, left_nav_noselected: !item.isSelected}"
					@click="selectTab(item)">
					<span>{{item.name}}</span>
				</div>		
				<!-- 二维码 -->
				<el-popover placement="bottom" width="150" trigger="hover">
				    <div style="text-align: center;">
					    <span style="margin-bottom: 15px;">扫一扫，收藏到手机</span>
					    <div id="qrcode" style="text-align: center;display: inline-block;margin-top: 10px;"></div>
				    </div>
	    			<div slot="reference" style="float: right;margin-top: 12px;text-align: center;margin-right: 20px;cursor: pointer;">
				   		<img  src="./imgs/qr.png">
				   	</div>
  				</el-popover>
			</div>
			<!-- 基本信息 -->
			<div class="left_content_table" v-show="tabs[0].isSelected">
				<table class="basicInfo_table">
					<tbody>
						<tr>
							<th class="basicInfo_table_th th_border">“一件事”名称</th>
							<td class="basicInfo_table_td"><%=themeName %></td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">是否收费（收费标准）</th>
							<td class="basicInfo_table_td">{{baseInfo.cost}}</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">承诺时限</th>
							<td class="basicInfo_table_td">{{baseInfo.deadline}}</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">结果送达</th>
							<td class="basicInfo_table_td">{{baseInfo.sendResult}}</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">监督投诉渠道</th>
							<td class="basicInfo_table_td">{{baseInfo.monitor}}</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">办公地址</th>
							<td class="basicInfo_table_td">
								{{baseInfo.addressTime}}
								<img title="点击进入百度地图" src="./imgs/addr.jpg" width="32" height="26" 
									@click="viewAddr" style="cursor: pointer;">
							</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th">办公时间</th>
							<td class="basicInfo_table_td">{{baseInfo.workingHour}}</td>
						</tr>
					</tbody>
				</table>
				<div class="applicant">办理证照</div>
				<table class="left_table left_table_data">
					<thead>
						<tr class="font_public thread_tr">
							<th width="5%" style="border-left: #e9eaf4 1px solid;">序号</th>
							<th width="35%">证照名称</th>
							<th width="30%">受理机关</th>
							<th width="15%">受理条件</th>
							<th width="15%" style="border-right: #e9eaf4 1px solid;">法律依据</th>
						</tr>
					</thead>
					<tbody>
						<tr class="content_tr" v-for="(item, index) in licenses">
							<td class="content_td">{{index+1}}</td>
							<td class="content_td">{{item.rsName}}</td>
							<td class="content_td">{{item.orgName}}</td>
							<td class="content_td">
								<a v-if="item.approveId" style="cursor: pointer;" 
									@click="lookLicense(item.approveId, 1)">查看详情</a>
							</td>
							<td class="content_td">
								<a v-if="item.approveId" style="cursor: pointer;" 
									@click="lookLicense(item.approveId, 2)">查看详情</a>
							</td>
						</tr>
						<tr class="content_tr" v-if="licenses.length==0">
							<td class="content_td" colspan="5">暂无数据</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- 所需材料开始 -->
			<div v-show="tabs[1].isSelected">
				<div class="left_download">
					<img class="left_download_img" src="imgs/csx/u220.png">
					<div class="download" @click="downloadBatch">
						<span>批量下载</span>
					</div>
				</div>
				<div class="left_content_table">
					<table class="left_table left_table_data">
						<thead>
							<tr class="font_public thread_tr">
								<th width="5%" style="border-left: #e9eaf4 1px solid;">序号</th>
								<th width="20%">办理环节</th>
								<th width="36%">材料名称</th>
								<th width="10%">材料类型</th>
								<th width="5%">份数</th>
								<th width="14%">来源渠道</th>
								<th width="10%" style="border-right: #e9eaf4 1px solid;">材料范本</th>
							</tr>
						</thead>
						<tbody>
							<tr class="content_tr" v-for="(item, index) in materials">
								<td class="content_td">{{(current_page-1)*rows+index+1}}</td>
								<td :rowspan="item.proc_namespan" :style="{ display: item.proc_namedis }" 
									class="content_td">{{item.proc_name}}</td>
								<td class="content_td" style="text-align: left;">{{item.amName}}</td>
								<td class="content_td">{{item.amType}}</td>
								<td class="content_td">{{item.amCopies}}</td>
								<td class="content_td">{{item.sourceChannel}}</td>
								<td class="content_td">
									<a v-if="item.blankTable" :download="item.blankTable"
										:href="'enclosu/entmaterial/blank_table/'+item.blankTable">空白模板</a>
									<br v-if="item.blankTable" /> 
									<a v-if="item.sampleTable" :download="item.sampleTable"
										:href="'enclosu/entmaterial/blank_table/'+item.sampleTable">示范文本</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- 分页开始 -->
				<div class="page">
					<div class="pagelist">
						<span class="jump" v-show="current_page>1" @click="pageUp">上一页</span>
						<span v-show="current_page>6" class="jump" @click="jumpPage(1)">1</span>
						<span class="ellipsis" v-show="efont">...</span> 
						<span class="jump" v-for="num in indexs" :class="{bgprimary:current_page==num}"
							 @click="jumpPage(num)">{{num}}</span>
						<span class="ellipsis" v-show="efont&&current_page<pages-4">...</span>

						<span class="jump" v-show="current_page<pages" @click="pageDown">下一页</span>
						<span v-show="current_page<pages-1" class="jump" @click="jumpPage(pages)">{{pages}}</span> 
						<span class="jumppoint">跳转到：</span>
						<span class="jumpinp"><input type="number" v-model.trim="changePage"></span> 
						<span class="jump gobtn" @click="jumpPage(changePage)">GO</span>
						<span style="margin-left: 10px;">共{{total}}条</span>
					</div>
				</div>
				<!-- 分页结束 -->
			</div>
			<!-- 所需材料结束 -->
			<!-- 办理证照开始 -->
			<!-- <div class="left_content_table" v-show="tabs[2].isSelected">
				<table class="left_table left_table_data">
					<thead>
						<tr class="font_public thread_tr">
							<th width="5%" style="border-left: #e9eaf4 1px solid;">序号</th>
							<th width="35%">证照名称</th>
							<th width="30%">受理机关</th>
							<th width="15%">受理条件</th>
							<th width="15%" style="border-right: #e9eaf4 1px solid;">法律依据</th>
						</tr>
					</thead>
					<tbody>
						<tr class="content_tr" v-for="(item, index) in licenses">
							<td class="content_td">{{index+1}}</td>
							<td class="content_td">{{item.rsName}}</td>
							<td class="content_td">{{item.orgName}}</td>
							<td class="content_td">
								<a v-if="item.approveId" style="cursor: pointer;" 
									@click="lookLicense(item.approveId, 1)">查看详情</a>
							</td>
							<td class="content_td">
								<a v-if="item.approveId" style="cursor: pointer;" 
									@click="lookLicense(item.approveId, 2)">查看详情</a>
							</td>
						</tr>
						<tr class="content_tr" v-if="licenses.length==0">
							<td class="content_td" colspan="5">暂无数据</td>
						</tr>
					</tbody>
				</table>
			</div> -->
			<!-- 办理证照结束 -->
			<!-- 办理流程 -->
			<div align="center" v-show="tabs[2].isSelected">
				<el-image v-if="!ie" src="./imgs/flowchart/<%=themeId %>.png">
      				<div slot="error">
        				<i class="el-icon-picture-outline"></i>暂无流程
     				 </div>
    			</el-image>
    			<img v-if="ie" alt="暂无流程" src="./imgs/flowchart/<%=themeId %>.png" />
			</div>
			<!-- 您的情况及要求 -->
			<div class="left_content_table" v-show="tabs[3].isSelected">
				<table class="left_table left_table_data">
					<thead>
						<tr class="font_public thread_tr">
							<th width="5%" style="border-left: #e9eaf4 1px solid;">序号</th>
							<th width="50%">问题</th>
							<th width="45%" style="border-right: #e9eaf4 1px solid;">答案</th>
						</tr>
					</thead>
					<tbody>
						<tr class="content_tr" v-for="(item, index) in QuestionAnswered">
							<td class="content_td">{{index+1}}</td>
							<td class="content_td">{{item.askId}}</td>
							<td class="content_td">{{item.answerId}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="table_btn_group">
				<div class="table_btn_left" @click="goback">
					<i class="el-icon-arrow-left el-icon--left"></i>上一步
				</div>
				<div class="table_btn_right" @click="manage">开始办理</div>
			</div>
		</div>
	</div>
</body>
<script src="js/processGuidance4New.js"></script>
</html>