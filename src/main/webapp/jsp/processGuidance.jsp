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
<script src="js/sea.js"></script>
<script src="js/processGuidance.js"></script>
<link rel="stylesheet" href="css/processGuidance.css">
</head>
<body
	style="background: url(./imgs/backgroud-img.png) no-repeat top #F1F1F1; margin: 0; background-color: #FFFFFF;">

	<input id="guideprocessId" type="hidden" value="<%=request.getParameter("guideprocessId")%>" />
	<input id="themeName" type="hidden" value="<%=request.getParameter("themeName")%>" />

	<iframe style="display: none;" id="download_iframe"></iframe>

	<div style="width: 1200px; margin: 0 auto;">
		<div style="margin-top: 400px;">
			<div class="div_nai">
				<a href="index/index.jsp">首页</a>&nbsp; <span>-&gt;<a
					href="index/select.jsp">我要开办企业</a></span>&nbsp; <span>-&gt;<a
					href="index/themeService.jsp">主题式服务</a></span>&nbsp; <span>-&gt;<a
					href="index/intelligentGuide4Vue.jsp?themeId=<%=request.getParameter("themeId")%>&themeName=<%=request.getParameter("themeName")%>"
					id="theme_a"></a></span>&nbsp; <span>-&gt;所需材料</span>
			</div>
		</div>
		<!-- 左测开始 -->
		<div class="left">

			<div class="left_head">
				<div class="head_d"></div>
				<div class="head_img">
					<img alt="" src="./imgs/csx/u44.png">
				</div>
				<div class="head_title" id="head_title"></div>
			</div>

			<div class="left_nav">
				<div id="tab1" class="font_public left_nav_data" onclick="change(1);">
					<span>基本信息</span>
				</div>
				<div id="tab2" class="font_public left_nav_license_change" onclick="change(2);">
					<span>所需材料</span>
				</div>
				<div id="tab3" class="font_public left_nav_license_change" onclick="change(3);">
					<span>办理证照</span>
				</div>
				<div id="tab4" class="font_public left_nav_license_change" onclick="change(4);">
					<span>办理流程</span>
				</div>
			</div>

			<div id="download_div" class="left_download" style="display: none;">
				<img class="left_download_img" src="imgs/csx/u220.png">
				<div class="download" onclick="downloadBatch();">
					<span>批量下载</span>
				</div>
			</div>
			
			<!-- 基本信息 -->
			<div class="left_content_table" id="basicInfo">
				<table class="basicInfo_table">
					<tbody>
						<tr>
							<th class="basicInfo_table_th th_border">“一件事”名称</th>
							<td class="basicInfo_table_td"><%=request.getParameter("themeName")%></td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">是否收费（收费标准）</th>
							<td class="basicInfo_table_td">不收费</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">承诺时限</th>
							<td class="basicInfo_table_td">7个工作日</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">结果送达</th>
							<td class="basicInfo_table_td">
								送达方式：现场自取、快递送达。<br>
								选择现场自取的，完成决定后，工作人员在1个工作日内告知申请人领取；<br>
								选择快递送达的，完成决定后5日内送达。
							</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">监督投诉渠道</th>
							<td class="basicInfo_table_td">
								市长热线：12345；政务服务大厅投诉处理中心：0731-52817073；<br>
								市长信箱：http://www.xiangtan.gov.cn/wz/lineGover.html
							</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th th_border">办公地址</th>
							<td class="basicInfo_table_td">
								湘潭市岳塘区湖湘西路1号湘潭市政务服务大厅“一件事一次办”专窗
								<img title="点击进入百度地图" src="./imgs/addr.jpg" width="32" height="26" onclick="viewAddr('湘潭市岳塘区湖湘西路1号')" style="cursor: pointer;">
							</td>
						</tr>
						<tr>
							<th class="basicInfo_table_th">办公时间</th>
							<td class="basicInfo_table_td">
								10月1日--6月30日（9:00-12:00，13:00-17:00）<br>
								7月1日--9月30日（8:30-12:00，14:00-17:30）
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- 所需材料开始 -->
			<div class="left_content_table" id="data_table" style="display: none;">
				<table class="left_table left_table_data">
					<thead>
						<tr class="font_public thread_tr">
							<th width="5%" style="border-left: #e9eaf4 1px solid;">序号</th>
							<th width="30%">材料名称</th>
							<th width="8%">材料类型</th>
							<th width="6%">份数</th>
							<!-- <th width="8%">受理标准</th> -->
							<th width="15%">来源渠道</th>
							<th width="10%">材料范本</th>
							<th width="8%">填报须知</th>
							<th width="13%" style="border-right: #e9eaf4 1px solid;">所属事项</th>
						</tr>
					</thead>
					<tbody id="tbody_data">
					</tbody>
				</table>
			</div>
			<!-- 所需材料结束 -->

			<!-- 办理证照开始 -->
			<div class="left_content_table" id="license_table" style="display: none;">
				<table class="left_table left_table_data">
					<thead>
						<tr class="font_public thread_tr">
							<th width="45%" style="border-left: #e9eaf4 1px solid;">证照名称</th>
							<th width="20%">受理机关</th>
							<th width="10%">受理条件</th>
							<th width="10%" style="border-right: #e9eaf4 1px solid;">法律依据</th>
						</tr>
					</thead>
					<tbody id="tbody_license">
					</tbody>
				</table>
			</div>
			<!-- 办理证照结束 -->

			<!-- 分页开始 -->
			<div class="page" id="page" style="display: none;">
				<div class='first home home_page dis_btn'>首页</div>
				<div class='up home_page page_btn dis_btn'>上一页</div>
				<div class='next home_page page_btn dis_btn'>下一页</div>
				<div class='end home_page page_btn dis_btn'>尾页</div>
				<div class='page_total'>
					<span>第1页 共1页 共0条</span>
				</div>
			</div>
			<!-- 分页结束 -->
			
			<!-- 办理流程 -->
			<div id="flow" style="display: none;">
				<img class="flow_img" alt="暂无流程" src="./imgs/flowchart/<%=request.getParameter("themeId")%>.png">
			</div>

			<div class="ksbl_btn" onclick="manage();">开始办理</div>

		</div>
		<!-- 左测结束 -->


		<!-- 右测开始 -->
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
					class="t_content_two">当前为<label style="color: #3498F5;">第3步</label>，共3步
				</span><br /> <span class="t_content_three">左侧陈列的是您涉及的所需材料、办理证照，您可逐一查看。</span><br />
				<br /> <span class="t_content_one">如需帮助请咨询下方的机器人或在线客服。</span>
			</div>
			<div class="right_robot">
				<div class="robot_div_img">
					<img class="robot_img" alt="" src="./imgs/csx/jiqiren.png">
				</div>
				<div class="robot_div">
					<div class="robot_div_t">
						您好，我是智能机器人“小企”<br />有疑问就请点我咨询吧！
					</div>
					<div id="goRobot" class="robot_div_btn" onclick="advisory();">点击咨询</div>
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
		<!-- 右测结束 -->

	</div>

</body>
</html>