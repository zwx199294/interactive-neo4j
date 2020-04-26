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
	String id = request.getParameter("id");
%>
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<base href="<%=basePath%>">
<link rel="stylesheet" href="css/tip-skyblue/tip-skyblue.css">
<link rel="stylesheet" href="css/zTreeStyle/zTreeStyle.css">
<link rel="stylesheet" href="css/jquery.autocomplete.css">
<script src="assets/jquery.min.js"></script>
<script src="js/jquery.poshytip.min.js"></script>
<script src="js/jquery.autocomplete.js"></script>
<script src="js/jquery.ztree.core.min.js"></script>
<script src="js/jquery.ztree.excheck.min.js"></script>
<script src="js/cytoscape.min.js"></script>
<script src="js/dagre.js"></script>
<script src="js/cytoscape-dagre.js"></script>
<script src="js/cytoscape-node-html-label.min.js"></script>
<link rel="stylesheet" href="css/businessScope.css">
</head>
<body
	style="background: url(./imgs/backgroud-img.png) no-repeat top #FFFFFF; margin: 0;">
	<div class="div_body">
		<div style="width: 1000px; margin: 0 auto;">
			<div style="margin-top: 400px;">
				<div class="div_nai">
					<a href="index/index.jsp">首页</a><span>-&gt;<a
						href="index/select.jsp">我要开办企业</a></span>
						<span>-&gt;<a href="index/entstart.jsp">自定义开办</a></span>
						<span>-&gt;企业开办参考流程</span>
				</div>
			</div>
			<div class="content">
			 	<div class="content_title">
			 		<div class="text" id="titleDiv"></div>
			 	</div>
			 	  <a class="djfb_but" style="width: 100px;" href="javascript:openDiv();">选择经营范围</a>
			</div>
			<div style="margin-top: 20px;">
				<div class="jyfwDiv">
					<div id="contentDiv" style="padding: 10px;"></div>
				</div>
				      <!-- <button class="open_but" onclick="openDiv()">选择经营范围</button> -->
			</div>
			<div class="content" style="margin-top: 20px;">
			 	<div class="content_title">
			 		<ul style="display: inline;">
			 			<li id="li_0" onclick="tabSelect(0)" class="select">企业开办参考流程</li>
			 			<li id="li_1" onclick="tabSelect(1)" class="" style="width: 100px;">文书规范</li>
			 		</ul>
			 	</div>
			 	<a class="djfb_but" href="jsp/soent.jsp" target="_blank">开始办理</a>
			</div>
			<div id="lay2" style="float:left">
				<div id="cy"></div>
				<div id="tabDiv">
					<table id="table4SX" border="0" cellpadding="0" cellspacing="0" class="content_table4SX">
				  	 <tbody>
				  	 <tr>
						<td class="td_l">事项名称</td>
						<td class="td_r"><span id="sxulA"></span></td>
				  	 </tr>
				  	 <tr>
						<td class="td_l">事项类型</td>
						<td class="td_r"><span id="sxulB"></span></td>
				  	 </tr>
				  	 <tr>
						<td class="td_l">实施机关</td>
						<td class="td_r"><span id="sxulC"></span></td>
				  	 </tr>
				  	 <tr>
						<td class="td_l">法定时限</td>
						<td class="td_r"><span id="sxulD"></span></td>
				  	 </tr>
				  	 <tr>
						<td class="td_l">承诺时限</td>
						<td class="td_r"><span id="sxulE"></span></td>
				  	 </tr>
				  	 <tr>
						<td class="td_l">设定依据</td>
						<td class="td_r"><span id="sxulF"></span></td>
				  	 </tr>
				  	 <tr>
						<td class="td_l">受理条件</td>
						<td class="td_r"><span id="sxulG"></span></td>
				  	 </tr>
				  	 <tr>
						<td class="td_l">行使层级</td>
						<td class="td_r"><span id="sxulH"></span></td>
				  	 </tr>
				  	 <tr>
						<td class="td_l">行使内容</td>
						<td class="td_r"><span id="sxulI"></span></td>
				  	 </tr>
				  	 <tr>
						<td class="td_l">权限划分</td>
						<td class="td_r"><span id="sxulJ"></span></td>
				  	 </tr>
				  	 <tr>
						<td class="td_l">办理地点</td>
						<td class="td_r"><span id="sxulK"></span></td>
				  	 </tr>
				  	 <tr>
						<td class="td_l">办理时间</td>
						<td class="td_r"><span id="sxulL"></span></td>
				  	 </tr>
				  	 <tr>
						<td class="td_l">咨询电话</td>
						<td class="td_r"><span id="sxulM"></span></td>
				  	 </tr>
				  	 <tr>
						<td class="td_l">监督电话</td>
						<td class="td_r"><span id="sxulN"></span></td>
				  	 </tr>
				  	 </tbody>
					</table>
				</div>
			</div>
			<div id="tableCon">
				<table border="0" cellpadding="0" cellspacing="0" class="content_table" style="min-height:150px;height:150px;">
				  <tbody>
				  <tr>
					<td class="td_l">表格下载</td>
					<td class="td_r"><ul id="bgul"></ul></td>
				  </tr>
				  <tr>
					<td class="td_l">填表示例</td>
					<td class="td_r"><ul id="slul"></ul></td>
				  </tr>
				  <tr>
					<td class="td_l">示范文本</td>
					<td class="td_r"><ul id="fbul"></ul></td>
				  </tr>
				  </tbody>
				</table>
			</div>
		</div>
	</div>
	<!-- 遮盖物 -->
	<div id="cover" class="cover"></div>
	<!-- 模态框 -->
	<div id="xzjyfw" class="proving">
		<!-- 模态框标题 -->
		<div class="prov_title">请您选择企业经营范围，我们将为您生成企业开办参考流程</div>
		<!-- 头部搜索栏 -->
		<div class="search_xzml">
			<div style="float: left;">
				<label class="search_info">请选择门类：</label>
				<select class="head_ml" id="xzml_star" onchange="changeMl()" style="height: 32px;width: 464px;">
				</select>
			</div>
			<div style="float: right;">
				<input class="head_ml" id="search_input" style="height: 28px;width: 195px;border-radius: 4px 0 0 4px;"
					type="text" placeholder="请输入" />
				<button class="search_but" onclick="queryByName('')">搜索</button>
			</div>
		</div>
		<!-- 中间选择内容栏 -->
		<div class="search_xx">
			<div class="search_one">
				<h2>请选择大类</h2>
				<div class="search_dl border">
					<ul id="dl_ul" class="ztree"></ul>
				</div>
			</div>
			<div class="search_two">
				<h2>请选择中、小类</h2>
				<div class="search_zxl border">
					<ul id="zxl_ul" class="ztree"></ul>
				</div>
			</div>
			<div class="search_three">
				<button class="add_but" onclick="toAdd()">+&nbsp;&nbsp;添加</button>
				<button class="delete_but" onclick="toDel()">&times;&nbsp;&nbsp;删除</button>
			</div>
			<div class="search_four">
				<h2 style="background: #7dc200; color: #FFFFFF;">经营范围（后置许可部分为红色）</h2>
				<div class="search_hzxk border1">
					<ul id="hzAndQt_ul"></ul>
				</div>
			</div>
		</div>
		<!-- 底部操作按钮 -->
		<div class="prov_close">
			<button onclick="createJyfw()" class="but_scjyfw">生成经营范围</button>
			&nbsp;&nbsp;&nbsp;
			<button onclick="closeDiv()" class="but_close">关闭</button>
		</div>
	</div>
</body>
<script type="text/javascript">
var emId="<%=id %>";
</script>
<script src="js/businessScope.js"></script>
</html>