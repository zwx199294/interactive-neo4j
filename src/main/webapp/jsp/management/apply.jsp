<!-- 这是一件事管理界面，包括新增、编辑、删除， 关联事项，问题-->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<base href="<%=basePath%>">
<title>一件事管理</title>
<script src="assets/jquery.min.js"></script>
<script src="js/vue.js"></script>
<script src="js/element-ui/lib/index.js"></script>
<script src="jsp/management/applyContent.jsp"></script>
<link rel="stylesheet" href="js/element-ui/lib/theme-chalk/index.css">
<link rel="stylesheet" href="css/management/apply.css">
</head>
<body
	style="background: url(./imgs/backgroud-img.png) no-repeat top #FFFFFF;">
	<div id="main_div" style="width: 1200px; margin: 0 auto;">
		<div class="div_navigator">
			<a href="index/index.jsp">首页</a> <span>-&gt;一件事管理</span>
		</div>
		<div id="content">
			<apply></apply>
		</div>
	</div>
	 <script>
        var content=new Vue({
            el:'#content',
            components:{
                'apply':{
                    template:'#wbs',
                    data(){
                        return {
                            msg:'欢迎来到南京网博',
                            arr:['tom','jack','mike']
                        }
                    }
                }
                
            }
        });    
    </script>
</body>

</html>