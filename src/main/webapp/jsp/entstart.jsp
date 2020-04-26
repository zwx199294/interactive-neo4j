<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%
String path = request.getContextPath();  
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";  
%> 
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<base href="<%=basePath%>">
<script src="assets/jquery.min.js"></script>
<link rel="stylesheet" href="css/entstart.css">
</head>
<body style="background:url(./imgs/backgroud-img.png)  no-repeat top #FFFFFF;margin: 0;">
	<div class="div_body">
	<div style="width: 1000px;margin: 0 auto;">
		<div style="margin-top: 400px;">
			<div style="margin-top: 290px;">
				<div class="div_nai">
					<a href="index/index.jsp">首页</a>
					<span>-&gt;<a href="index/select.jsp">我要开办企业</a></span>
					<span>-&gt;自定义开办</span> 
				</div>
			</div>
			<div class="div_inline">
				<div class="title">
					<div class="text">如果您要开办内资企业，请选择以下类型</div>
					<!-- <a class="but" href="index/guide.jsp">我要开办</a> -->
				</div>
				<div class="content">
					<ul id="nzul">
					</ul>
				</div>
			</div>
			<div style="width: 20px;display: inline-block;"></div>
			<div class="div_inline">
				<div class="title" style="background-color: #5db1c5">
					<div class="text">如果您要开办外资企业，请选择以下类型</div>
					<!-- <a class="but" href="index/guide.jsp">我要开办</a> -->
				</div>
				<div class="content">
					<ul id="wzul">
					</ul>
				</div>
			</div>
		</div>
		</div>
	</div>
	<div style="height: 150px;"></div>
	<script type="text/javascript">
	(function($) {
		showNz();
		showWz();
	})(jQuery);
	
	function showNz(){
		$.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			'type' : 'GET',
			'url' : 'proxy/csx/v1/entmaterial?cond={"entType":"1"}',
			'dataType' : 'json',
			'success' : function(data, type, request) {
				var contents = data.contents;
				if (typeof(contents) != "undefined"){
					var html = '';
					for (var i=0;i<contents.length;i++){
			        	html += '<li><a href="index/businessScope.jsp?id=';
			        	html += contents[i].id;
			        	html += ' ">';
			        	html += contents[i].title;
			        	html += '</a></li>';
				    }; 
				    $("#nzul").append(html);  
				}
			},
			'error' : function(xmlhttprequest, errorinfo) {
			}
		});
	}
	function showWz(){
		$.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			'type' : 'GET',
			'url' : 'proxy/csx/v1/entmaterial?cond={"entType":"2"}',
			'dataType' : 'json',
			'success' : function(data, type, request) {
				var contents = data.contents;
				if (typeof(contents) != "undefined"){
					var html = '';
					for (var i=0;i<contents.length;i++){
			        	html += '<li><a href="index/businessScope.jsp?id=';
			        	html += contents[i].id;
			        	html += ' ">';
			        	html += contents[i].title;
			        	html += '</a></li>';
				    }; 
				    $("#wzul").append(html);  
				}
			},
			'error' : function(xmlhttprequest, errorinfo) {
			}
		});
	}
	</script>
</body>
</html>