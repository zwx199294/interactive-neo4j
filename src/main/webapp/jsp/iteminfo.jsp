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
<script src="assets/jquery.min.js"></script>
<link rel="stylesheet" href="css/iteminfo.css">
</head>
<body
	style="background: url(./imgs/backgroud-img.png) no-repeat top #F1F1F1; margin: 0;">
	<div class="div_body">
		<div style="width: 1000px; margin: 0 auto;">
			<div style="margin-top: 290px;">
				<div style="margin-top: 290px;">
					<div class="div_nai">
						<a href="index/index.jsp">首页</a><span>-&gt;<a
							href="index/entstart.jsp">我要开办企业</a></span><span id="naiSpan"></span>
					</div>
				</div>
				<div class="content">
					<div class="content_title">
						<div class="text" id="titleDiv"></div>
						<a class="but" href="index/businessScope.jsp?id=<%=id%>">我要开办</a>
					</div>
					<table border="0" cellpadding="0" cellspacing="0"
						class="content_table" style="min-height: 150px; height: 150px;">
						<tbody>
							<tr>
								<td class="td_l">表格下载：</td>
								<td class="td_r"><ul id="bgul"></ul></td>
							</tr>
							<tr>
								<td class="td_l">填表示例：</td>
								<td class="td_r"><ul id="slul"></ul></td>
							</tr>
							<tr>
								<td class="td_l">示范文本：</td>
								<td class="td_r"><ul id="fbul"></ul></td>
							</tr>
						</tbody>
					</table>


				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		var emId="<%=id%>";
	</script>
	<script src="js/iteminfo.js"></script>
</body>
</html>