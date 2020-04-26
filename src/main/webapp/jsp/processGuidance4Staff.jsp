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
<link rel="stylesheet" href="js/element-ui/lib/theme-chalk/index.css">
<script src="assets/jquery.min.js"></script>
<link rel="stylesheet" href="css/processGuidance4Staff.css">
<script type="text/javascript" src="js/vue.js"></script>
<script src="js/element-ui/lib/index.js"></script>
</head>
<body style="background: url(./imgs/backgroud-img.png) no-repeat top #FFFFFF;">

	<input id="guideprocessId" type="hidden" value="<%=guideprocessId%>" />
	<input id="themeName" type="hidden" value="<%=themeName%>" />
	<input id="themeId" type="hidden" value="<%=themeId%>" />
	<input id="areaCode" type="hidden" value="<%=areaCode%>" />
	<input id="areaCodeUp" type="hidden" value="<%=areaCodeUp%>" />

	<div style="width: 1200px; margin: 0 auto;">
		<div class="div_nai">
			<a href="index/index.jsp">首页</a>
			<span>-&gt;<a href="index/themeService.jsp">主题式服务</a></span>
			<span>-&gt;所需材料</span>
		</div>
		
		<div id="app" class="left" v-cloak>
			<div class="left_head">
				<div class="head_d"></div>
				<div class="head_title"><%=themeName %>（告知办理人信息）</div>
				<div class="backstage" @click="gotoApplicant">前往申请人页面&rarr;</div>
			</div>
			<!-- tab页 -->
			<div class="left_nav">
				<div v-for="item in tabs" class="font_public"
					:class="{left_nav_selected: item.isSelected, left_nav_noselected: !item.isSelected}"
					@click="selectTab(item)">
					<span>{{item.name}}</span>
				</div>
			</div>
			<!-- 申请人信息 -->
			<div class="left_content_table" v-show="tabs[0].isSelected">
				<table class="basicInfo_table">
					<tbody>
						<tr>
							<th class="basicInfo_table_th th_border">申请人账号</th>
							<td class="basicInfo_table_td">zhangsan</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">申请人姓名</th>
							<td class="basicInfo_table_td">张三</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">申请人联系电话</th>
							<td class="basicInfo_table_td">13012345678</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">申请事项名称</th>
							<td class="basicInfo_table_td"><%=themeName %></td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">承诺时限</th>
							<td class="basicInfo_table_td">7个工作日</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">送达方式</th>
							<td class="basicInfo_table_td">快递送达</td>
						</tr>
					</tbody>
				</table>
				<div class="applicant">申请人需求</div>
				<table class="left_table left_table_data">
					<thead>
						<tr class="font_public thread_tr">
							<th width="5%" style="border-left: #e9eaf4 1px solid;">序号</th>
							<th width="50%">问题</th>
							<th width="45%" style="border-right: #e9eaf4 1px solid;">答案</th>
						</tr>
					</thead>
					<tbody>
						<tr class="content_tr" v-for="(item, index) in questionAnswered">
							<td class="content_td">{{index+1}}</td>
							<td class="content_td">{{item.askId}}</td>
							<td class="content_td">{{item.answerId}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- 申请人提交的材料 -->
			<div class="left_content_table" v-show="tabs[1].isSelected">
				<table class="left_table left_table_data" v-loading="materialsPage.loading">
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
							<td class="content_td">{{(materialsPage.current_page-1)*materialsPage.rows+index+1}}</td>
							<td :rowspan="item.proc_namespan" :style="{ display: item.proc_namedis }" 
								class="content_td">{{item.proc_name}}</td>
							<td class="content_td" align="left">{{item.amName}}</td>
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
				<!-- 分页开始 -->
				<!-- <pagination :rows="materialsPage.rows" :total="materialsPage.total" :pages="materialsPage.pages" 
					:current_page="materialsPage.current_page" @current-change="handleCurrentChange1"></pagination> -->
				<!-- 分页结束 -->
			</div>
			<!-- 所需材料结束 -->
			<!-- 材料分发清单 -->
			<div class="left_content_table" v-show="tabs[2].isSelected">
				<table class="left_table left_table_data" v-loading="materialHandOutPage.loading">
					<thead>
						<tr class="font_public thread_tr">
							<th width="5%" style="border-left: #e9eaf4 1px solid;">序号</th>
							<th width="15%">事项</th>
							<th width="5%">事项序号</th>
							<th width="25%">材料名称</th>
							<th width="15%">审批部门</th>
							<th width="5%">层级</th>
							<th width="14%">地址</th>
							<th width="6%">部门联系人</th>
							<th width="10%" style="border-right: #e9eaf4 1px solid;">联系人电话</th>
						</tr>
					</thead>
					<tbody>
						<tr class="content_tr" v-for="(item, index) in materialHandOut">
							<td class="content_td">{{(materialHandOutPage.current_page-1)*materialHandOutPage.rows+index+1}}</td>
							<td :rowspan="item.proc_namespan" :style="{ display: item.proc_namedis }" 
								class="content_td">{{item.proc_name}}</td>
							<td class="content_td">{{item.inner_num}}</td>
							<td class="content_td" style="text-align: left;">
								<el-popover v-if="item.special_type!='normal'" placement="top" title="说明" width="200" trigger="hover">
    								<div class="popover-content" v-html="item.special_des"></div>
    								<span v-if="item.special_type=='many'" style="color: #67c23a;" slot="reference">{{item.amName}}</span>
    								<span v-if="item.special_type=='output'" style="color: #f56c6c;" slot="reference">{{item.amName}}</span>
  								</el-popover>
    								<span v-if="item.special_type=='normal'">{{item.amName}}</span>
							</td>
							<td :rowspan="item.proc_namespan" :style="{ display: item.proc_namedis }" class="content_td">{{item.name}}</td>
							<td :rowspan="item.proc_namespan" :style="{ display: item.proc_namedis }" class="content_td">{{item.tier}}</td>
							<td :rowspan="item.proc_namespan" :style="{ display: item.proc_namedis }" class="content_td">{{item.area}}</td>
							<td :rowspan="item.proc_namespan" :style="{ display: item.proc_namedis }" class="content_td">李四</td>
							<td :rowspan="item.proc_namespan" :style="{ display: item.proc_namedis }" class="content_td">13078945612</td>
						</tr>
					</tbody>
				</table>
				<!-- 分页开始 -->
				<!-- <pagination :rows="materialHandOutPage.rows" :total="materialHandOutPage.total" :pages="materialHandOutPage.pages" 
					:current_page="materialHandOutPage.current_page" @current-change="handleCurrentChange2"></pagination> -->
				<!-- 分页结束 -->
			</div>
			<!-- 办理证照结束 -->
		</div>
	</div>
</body>
<script src="js/processGuidance4Staff.js"></script>
</html>