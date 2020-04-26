<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<% 
	String path = request.getContextPath();
    String json=request.getParameter("jsonTxt");
    String title = request.getParameter("title");
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

<script src="js/cytoscape.min.js"></script>
<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/dagre.js"></script>
<script src="js/cytoscape-dagre.js"></script>
<script src="js/cytoscape-node-html-label.min.js"></script>
<link rel="stylesheet" href="css/flow.css">
</head>
<body style="background:url(./imgs/backgroud-img.png)  no-repeat top #F1F1F1;margin: 0;">
	<div class="div_body">
	<div style="margin-top: 360px;float: left;background-color: #FFF;width: 100%;">
		<div class="div_nai">
			<a href="index/index.jsp">首页</a><span>-&gt;<a href="index/entstart.jsp">我要开办企业</a></span><span>-&gt;<a href="index/guide.jsp">我要开办</a></span><span>-&gt;开办流程</span>
		<div class="div_title">我要开办<%=title %></div>
		<a class="djfb_but" href="http://gsxt.hnaic.gov.cn:8003/netqydj/sqlc" target="_blank">开始办理</a>
		</div>
	</div>
	<div id="cy"></div>
	</div>
	<script type="text/javascript">
	var flowjson="<%=json %>";
	</script>
	<script src="js/flow.js"></script>
</body>
</html>