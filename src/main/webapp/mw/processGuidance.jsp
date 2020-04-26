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
	String guideprocessId = request.getParameter("guideprocessId");
%>
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<base href="<%=basePath%>">
<link rel="stylesheet" href="css/mw/weui.css">
<link rel="stylesheet" href="css/mw/weuix.css">
<script type="text/javascript" src="js/mw/zepto.min.js"></script>
<script type="text/javascript" src="js/mw/zepto.weui.min.js"></script>
<script type="text/javascript" src="js/mw/iscroll-lite.min.js"></script>
<script src="assets/jquery.min.js"></script>
<script type="text/javascript" src="js/vue.js"></script>
<script>
	$(function() {
		TagNav('#tagnav', {
			type : 'scrollToNext',
			curClassName : 'weui-state-active',
			index : 0
		});
	});
</script>
<style type="text/css">
[v-cloak] {
	display: none;
}

.basicInfo_table {
	width: 100%;
}

.basicInfo_table_th {
	width: 30%;
}

.basicInfo_table_td {
	width: 70%;
	word-break: break-all;
}

.applicant {
	text-align: center;
	font-size: 22px;
	font-weight: bold;
}



.head {
	width: 100%;
	margin: 5px;
}

.head ul li {
	float: left;
	list-style: none;
}
</style>
</head>
<body >
	<input id="guideprocessId" type="hidden" value="<%=guideprocessId%>" />
	<input id="themeId" type="hidden" value="<%=themeId%>" />
	<div id="app" v-cloak>
		<!-- logo -->
		<div class="head">
			<ul>
				<li style="width: 75%;max-width: 350px;"><img src="imgs/scjg/scjgj_logo.png" height="40px"
					width="100%" style="max-width: 350px;"></li>
				<li style="width: 22%;max-width: 150px;"><img src="imgs/scjg/yjsycb_logo.png" height="35px"
					width="100%" style="max-width: 150px;"></li>
			</ul>
		</div>

		<!-- 导航 -->
		<div id="tagnav" class="weui-navigator weui-navigator-wrapper"
			style="touch-action: none;">
			<ul class="weui-navigator-list"
				style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
				<li v-for="item in tabs" @click="selectTab(item)"><a
					href="javascript:;">{{item.name}}</a></li>
			</ul>
		</div>
</body>
<!-- 基本信息 -->
<div v-show="tabs[0].isSelected">
	<table class="basicInfo_table">
		<tbody>
			<tr>
				<th class="basicInfo_table_th th_border">“一件事”名称</th>
				<td class="basicInfo_table_td">{{baseInfo.themeName}}</td>
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
				<td class="basicInfo_table_td">{{baseInfo.addressTime}} <img v-if="baseInfo.baiduAddress"
					title="点击进入百度地图" src="./imgs/addr.jpg" width="32" height="26"
					@click="viewAddr" style="cursor: pointer;">
				</td>
			</tr>
			<tr>
				<th class="basicInfo_table_th">办公时间</th>
				<td class="basicInfo_table_td">{{baseInfo.workingHour}}</td>
			</tr>
		</tbody>
	</table>

	<div class="applicant">办理结果</div>
	<table class="left_table left_table_data">
		<thead>
			<tr class="font_public thread_tr">
				<th width="5%" style="border-left: #e9eaf4 1px solid;">序号</th>
				<th width="35%">证照名称</th>
				<th width="15%" style="border-right: #e9eaf4 1px solid;">法律依据</th>
			</tr>
		</thead>
		<tbody>
			<tr class="content_tr" v-for="(item, index) in licenses">
				<td class="content_td">{{index+1}}</td>
				<td class="content_td">{{item.rsName}}</td>
				<td class="content_td">{{item.orgName}}</td>
			</tr>
			<tr class="content_tr" v-if="licenses.length==0">
				<td class="content_td" colspan="5">暂无数据</td>
			</tr>
		</tbody>
	</table>
</div>

<!-- 所需材料开始 -->
<div v-show="tabs[1].isSelected">
	<div class="left_content_table">
		<table class="left_table left_table_data">
			<thead>
				<tr class="font_public thread_tr">
					<th width="5%" style="border-left: #e9eaf4 1px solid;">序号</th>
					<th width="36%">材料名称</th>
				</tr>
			</thead>
			<tbody>
				<tr class="content_tr" v-for="(item, index) in materials">
					<td class="content_td">{{(current_page-1)*rows+index+1}}</td>
					<td class="content_td" style="text-align: left;">{{item.amName}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<!-- 办理流程 -->
<div align="center" v-show="tabs[2].isSelected">
	<img alt="暂无流程" src="./imgs/flowchart/<%=themeId%>.png" width="100%" />
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






</div>
</html>
<script src="js/mw/processGuidance.js"></script>