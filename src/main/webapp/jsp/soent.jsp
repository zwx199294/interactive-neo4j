<%@page import="com.chinacreator.c2.sysmgr.User"%>
<%@page import="com.chinacreator.asp.comp.sys.oauth2.common.CredentialStore"%>
<%@page import="com.chinacreator.asp.comp.sys.oauth2.common.Credential"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%
String path = request.getContextPath();  
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Credential credential = CredentialStore.getCurrCredential();
User user = credential.getUserInfo();
%> 
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<base href="<%=basePath%>">
<script src="assets/jquery.min.js"></script>
<link rel="stylesheet" href="css/soent.css">
</head>
<body style="background:url(./imgs/backgroud-img.png)  no-repeat top #F1F1F1;">
	<div style="width: 1000px;margin: 0 auto;">
		<div style="margin-top: 290px;">
			<div class="loadEffect">
			        <span></span>
			        <span></span>
			        <span></span>
			        <span></span>
			        <span></span>
			        <span></span>
			        <span></span>
			        <span></span>
			        <div class="text">正在为您加载，请稍等...</div>	
			</div>
					
		</div>
	</div>
<iframe id="myIframe" width="0" height="0"></iframe>
	<script type="text/javascript">
	(function($) {
		$.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			'type' : 'POST',
			'url' : 'sfproxy/sso/v1/userinfo?userId=<%=user.getId()%>',
			'dataType' : 'json',
			'success' : function(data, type, request) {
				 $("#myIframe").attr("src","http://gsxt.hnaic.gov.cn:8004/bsdt/passport/loginCommonHNZF?code="+data.code+"&loginType=1&loginFlag=hnxndt");
				setTimeout(function(){
					window.location.href='http://gsxt.hnaic.gov.cn:8004/bsdt/redirect/mcdj,zzsb';
				},1000); 
			},
			'error' : function(xmlhttprequest, errorinfo) {
			}
		});
	})(jQuery);
	</script>
</body>
</html>