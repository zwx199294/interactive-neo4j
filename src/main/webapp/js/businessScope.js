$(document).ready(function () {
	initMl();
	searchData();
	showNai();
	showBg();
	showSl();
	showFb();
});
function showNai() {
	$.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		'type': 'GET',
		'url': 'proxy/csx/v1/entmaterial/'+emId,
		'dataType': 'json',
		'success': function (data, type, request) {
			if (typeof(data) != "undefined") {
				var html = data.title;
				$("#titleDiv").append(html);
			}
		},
		'error': function (xmlhttprequest, errorinfo) {}
	});
}
//大类树属性
var setting4Dl = {
	data: {
		simpleData: {
			enable: true,
			idKey: "id",
			pIdKey: "pid"
		}
	},
	callback: {
		onClick: dlOnClick
	},
	view: {
		fontCss: {
			"font-size": "14px"
		},
		showTitle: false,
		autoCancelSelected: false
	}
};
//中小类树属性
var setting4Zxl = {
	data: {
		simpleData: {
			enable: true,
			idKey: "id",
			pIdKey: "pid"
		},
		key: {
			title: "title"
		}
	},
	callback: {
		onClick: zxlOnClick,
		onExpand: zxlExpand
	},
	check: {
		enable: true,
		chkStyle: "checkbox",
		chkboxType: {
			"Y": "",
			"N": ""
		} //取消父子节点关联
	},
	view: {
		fontCss: {
			'font-size': '14px'
		},
		nameIsHTML: true,
		autoCancelSelected: false
	}
};
/** 初始化门类  */
function initMl() {
	var mlResult = queryChildNodes(0, false);
	var dlResult = queryChildNodes(mlResult[0].id, false);
	for (var i = 0; i < mlResult.length; i++) {
		$("#xzml_star").append(
			"<option value='" + mlResult[i].id + "'>" + mlResult[i].name
			 + "</option>");
	}
	$.fn.zTree.init($("#dl_ul"), setting4Dl, dlResult);
}
/** 选择门类获取大类  */
function changeMl() {
	var id = $("#xzml_star").children("option:selected").val();
	var dlResult = queryChildNodes(id, false);
	$.fn.zTree.init($("#dl_ul"), setting4Dl, dlResult);
	$("#zxl_ul").empty();
}
/** 获取中小类  */
function dlOnClick(event, treeId, treeNode) {
	var zxlResult = queryChildNodes(treeNode.id, true);
	var treeObj = $.fn.zTree.init($("#zxl_ul"), setting4Zxl, zxlResult);
	var nodes = treeObj.getNodes();
	// 设置展开二级节点
	for (var i = 0; i < nodes.length; i++) {
		treeObj.expandNode(nodes[i], true, false, true);
	}
	// 添加提示
	addTip();
	// 选中已经添加的经营范围
	if($("#hzAndQt_ul").find("li").length>0){
		$("#hzAndQt_ul").find("li").each(function (){
			var id = $(this)[0].childNodes[0].id.split('_li')[0];
			var node = treeObj.getNodeByParam("id", id);
			if(node != null){
				treeObj.checkNode(node, true, true);
			}
		});
	}
}
/** 中小类展开事件  */
function zxlExpand(event, treeId, treeNode) {
	addTip();
}
/** 中小类点击事件  */
function zxlOnClick(event, treeId, treeNode) {
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	// 点击文字选中复选框
	treeObj.checkNode(treeNode, !treeNode.checked, true);
}
/** 3.3.4.3	查询经营范围子节点 */
function queryChildNodes(id, cascade) {
	var result;
	$.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		type: 'GET',
		url: 'proxy/csx/v1/businessscopes/' + id + '/children?cascade=' + cascade,
		dataType: 'json',
		async: false,
		success: function (data) {
			result = data;
		},
		error: function (xmlhttprequest, errorinfo) {}
	});
	return result;
}
/** 添加经营范围 */
function toAdd() {
	var treeObj = $.fn.zTree.getZTreeObj("zxl_ul");
	if (treeObj != null) {
		var nodes = treeObj.getCheckedNodes(true);
		for (var i = 0; i < nodes.length; i++) {
			if ($("#" + nodes[i].id + "_li").length == 0) {
				if (!addLi(nodes[i].id, nodes[i].name, nodes[i].relation, "0"))
					break;
			}
		}
	}
}
/** 添加前后置或者其他经营范围 li_atr=1： 前置 li_atr=2：后置 li_atr=3： 其他 */
function addLi(li_id, li_text, li_atr, type) {
	var tj = true;
	$("#hzAndQt_ul").find("input[type='checkbox']").each(function (i) {
		var v_id = $(this).attr("id");
		if (v_id.length - 3 > li_id.length && v_id.substring(0, li_id.length) == li_id) {
			alert("选择了子类\“" + $("#" + v_id).parent().text().replace(" ", "") + "\”后不能再选父类\“" + li_text + "\”");
			tj = false;
			return false;
		} else if (v_id.length - 3 < li_id.length && li_id.substring(0, v_id.length - 3) == v_id.substring(0, v_id.length - 3)) {
			alert("选择了父类\“" + $("#" + v_id).parent().text().replace(" ", "") + "\”后不能再选子类\“" + li_text + "\”");
			tj = false;
			return false;
		}
	});
	if (tj) {
		var id = "";
		var name = "";
		if (li_atr == "1") {
			id = "#ybjyfw_ul";
		} else {
			if (li_atr == "2" && type != "1")
				li_text = "<font color='red'>" + li_text + "</font>";
			id = "#hzAndQt_ul";
		}
		$(id).append("<li><input type='checkbox' id='" + li_id + "_li' name='jyfw' value='" + li_id + "@" + type + "' />"
			 + "<font onclick='checkById(\"" + li_id + "_li\")' style='cursor:pointer;'> " + li_text + "</font></li>");
		return true;
	}
}
function checkById(id) {
	var selected = $("#" + id);
	if (selected.prop("checked")) {
		selected.prop("checked", false);
	} else {
		selected.prop("checked", true);
	}
}
/** 删除经营范围  */
function toDel() {
	var treeObj = $.fn.zTree.getZTreeObj("zxl_ul");
	if (treeObj != null) {
		$("#hzAndQt_ul").find("input:checked").each(function (i){
			var node = treeObj.getNodeByParam("id", this.id.split("_li")[0]);
			if(node != null){
				treeObj.checkNode(node, false, true);
			}
		});
	}
	$("#hzAndQt_ul").find("input:checked").parent().remove();
}
/** 添加tip */
function addTip() {
	$("#zxl_ul").find("a").each(function (i) {
		if (this.title != "" && this.title != null && this.title != "undefined") {
			$(this).poshytip({
				className: 'tip-skyblue',
				bgImageFrameSize: 9,
				offsetX: 0,
				offsetY: 20,
				allowTipHover: true
			});
		} else {
			this.title = "";
		}
	});
}
/** 加载搜索框数据  */
function searchData() {
	var data = queryZxlBusiness();
	$("#search_input").autocomplete(data, {
		max: 50, //列表里的条目数
		minChars: 0, //自动完成激活之前填入的最小字符
		width: $("#search_input").width() + 1, //提示的宽度，溢出隐藏
		scrollHeight: 250, //提示的高度，溢出显示滚动条
		matchContains: true, //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
		highlight: false, //自动填充
		autoFill: false,
		formatItem: function (row, i, max) {
			return row.name;
		},
		formatMatch: function (row, i, max) {
			return row.name;
		},
		formatResult: function (row) {
			return row.name;
		}
	}).result(function (event, row, formatted) {
		queryByName();
	});
}
/** 3.3.4.1	获取中小类经营范围 */
function queryZxlBusiness() {
	var result;
	$.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		type: 'GET',
		url: 'proxy/csx/v1/businessscopes/zxls/names',
		dataType: 'json',
		async: false,
		success: function (data) {
			result = data;
		},
		error: function (xmlhttprequest, errorinfo) {}
	});
	return result;
}
/**3.3.4.2	根据经营范围名称搜索，获取门类、子类、中小类*/
function queryByName() {
	var name = $("#search_input").val();
	if (name != "") {
		$.ajax({
			headers: {
				'Accept': 'application/json;charset=UTF-8',
				'Content-Type': 'application/json;charset=UTF-8'
			},
			type: 'GET',
			url: 'proxy/csx/v1/businessscopes/name?name=' + encodeURI(name),
			dataType: 'json',
			success: function (data) {
				if (data.id && data.ml && data.mlzl) {
					$("#xzml_star").val(data.ml.id);
					showdl(data.mlzl, data.id);
					showzxl(data.zxl, data.id);
				} else {
					showzxl(data.zxl, "");
				}
			},
			error: function (xmlhttprequest, errorinfo) {}
		});
	}
}
/** 定位大类  */
function showdl(nodes, zxlId) {
	$("#dl_ul").empty();
	var treeObj = $.fn.zTree.init($("#dl_ul"), setting4Dl, nodes);
	var node = treeObj.getNodeByParam("id", zxlId.substring(0, 6));
	treeObj.selectNode(node, true);
}
/** 定位中小类 */
function showzxl(nodes, zxlId) {
	$("#zxl_ul").empty();
	var treeObj = $.fn.zTree.init($("#zxl_ul"), setting4Zxl, nodes);
	if (zxlId != "") {
		var node = treeObj.getNodeByParam("id", zxlId);
		treeObj.selectNode(node, true);
		treeObj.checkNode(node, true, true);
	}
	addTip();
	// 选中已经添加的经营范围
	if($("#hzAndQt_ul").find("li").length>0){
		$("#hzAndQt_ul").find("li").each(function (){
			var id = $(this)[0].childNodes[0].id.split('_li')[0];
			var node = treeObj.getNodeByParam("id", id);
			if(node != null){
				treeObj.checkNode(node, true, true);
			}
		});
	}
}
function createJyfw() {
	var data = $("#hzAndQt_ul").find("li");
	if (data.length > 0) {
		closeDiv();
		toContentDiv(data);
		createConvas(idArray);
		document.getElementById("table4SX").style.display = "none";
	} else {
		alert("请选择经营范围！");
	}
}
function tabSelect(e){
	var liObj0 = $("#li_0");
	var liObj1 = $("#li_1");
	if(e==0){
		//当流程图div点击显示时重新绘制流程图
		if($("#lay2").css("display")=="none"){
			var data = $("#hzAndQt_ul").find("li");
			if (data.length > 0) {
				createConvas(idArray);
			}
		}
		liObj0[0].className="select";
		liObj1[0].className="";
		document.getElementById("lay2").style.display = "block";
		document.getElementById("tableCon").style.display = "none";
	}else if(e==1){
		liObj1[0].className="select";
		liObj0[0].className="";
		document.getElementById("tableCon").style.display = "block";
		document.getElementById("lay2").style.display = "none";
	}
}
function showBg(){
	$.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		'type' : 'GET',
		'url' : 'proxy/csx/v1/entmaterialenclosu?cond='+JSON.stringify({"emId":emId,"eType":"1"}),
		'dataType' : 'json',
		'success' : function(data, type, request) {
			var contents = data.contents;
			if (typeof(contents) != "undefined"){
				var html = '';
				for (var i=0;i<contents.length;i++){
		        	html += '<li><a href="enclosu/entmaterial/bgxz/';
		        	html += contents[i].eUrl;
		        	html += ' ">';
		        	html += contents[i].eTitle;
		        	html += '</a></li>';
				}
				$("#bgul").append(html);
			}
		},
		'error' : function(xmlhttprequest, errorinfo) {
		}
	});
}

function showSl(){
	$.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		'type' : 'GET',
		'url' : 'proxy/csx/v1/entmaterialenclosu?cond='+JSON.stringify({"emId":emId,"eType":"2"}),
		'dataType' : 'json',
		'success' : function(data, type, request) {
			var contents = data.contents;
			if (typeof(contents) != "undefined"){
				var html = '';
				for (var i=0;i<contents.length;i++){
		        	html += '<li><a href="enclosu/entmaterial/tbsl/';
		        	html += contents[i].eUrl;
		        	html += ' ">';
		        	html += contents[i].eTitle;
		        	html += '</a></li>';
			    }
			    $("#slul").append(html);  
			}
		},
		'error' : function(xmlhttprequest, errorinfo) {
		}
	});
}
function showFb(){
	$.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		'type' : 'GET',
		'url' : 'proxy/csx/v1/entmaterialenclosu?cond='+JSON.stringify({"emId":emId,"eType":"3"}),
		'dataType' : 'json',
		'success' : function(data, type, request) {
			var contents = data.contents;
			if (typeof(contents) != "undefined"){
				var html = '';
				for (var i=0;i<contents.length;i++){
		        	html += '<li><a href="enclosu/entmaterial/sfwj/';
		        	html += contents[i].eUrl;
		        	html += ' ">';
		        	html += contents[i].eTitle;
		        	html += '</a></li>';
			    }
			    $("#fbul").append(html);  
			}
		},
		'error' : function(xmlhttprequest, errorinfo) {
		}
	});
}
var idArray = '';

function toContentDiv(obj) {
	idArray = '';
	var html = "";
	obj.each(function (index, e) {
		var id = $(this)[0].childNodes[0].id.split('_li')[0];

		if (index == obj.length - 1) {
			html = html + $(this).text() + "。（依法须经批准的项目，经相关部门批准后方可开展经营活动）";
			idArray = idArray + id;
		} else {
			html = html + $(this).text() + "；";
			idArray = idArray + id + ','
		}
	});

	$("#contentDiv").html(html);
}
function openDiv() {
	document.getElementById("xzjyfw").style.display = "block";
	document.getElementById("cover").style.display = "block";
}
function closeDiv() {
	document.getElementById("xzjyfw").style.display = "none";
	document.getElementById("cover").style.display = "none";
}
//流程画板jsp
function toTplHtml(data) {
	
	var tpl = ['<p class="node_box" style="width:' + data['width'] + 'px; font-family:microsoft yahei;font-size:14px ;color:#4d91ef;text-align:center;" >'];
	tpl.push(data.label.replace(/\n/g, "<br/>"));
	tpl.push('</p>');
	return tpl.join("");
}
function toTplHtml2(data) {

	var tpl = ['<p class="node_box" style="width:' + data['width'] + 'px;font-family:Microsoft yahei;color:#4d91ef;font-size:14px;text-align:center " >'];
	tpl.push(data.label.replace(/\n/g, "<br/>"));
	tpl.push('</p>');
	return tpl.join("");
}
function toTplHtml3(data) {
	
	var tpl = ['<p class="node_box" style="width:' + data['width'] + 'px; font-family:microsoft yahei;font-size:14px ;color:#FFFFFF;text-align:center" >'];
	tpl.push(data.label.replace(/\n/g, "<br/>"));
	tpl.push('</p>');
	return tpl.join("");
}
function wrapText(text) {
	var t = [];
	var index = 0;
	var len = text.length;
	var rowlen = 6; //每行最多显示几个字
	for (index = 0; index < len; index++) {
		t.push(text.substr(index, rowlen));
		index = index + rowlen - 1;
	}
	if (len % rowlen != 0) {
		t.push(text.substr(index, len % rowlen));
	}

	return t.join("\n");
}
function createConvas(ids) {

	$.ajax({
		headers: {
			'Accept': 'application/json',

			'Content-Type': 'application/json;charset=utf-8'
		},
		'type': 'POST',
		'url': 'proxy/csx/v1/item/businessscopes',
		'datatype': 'json',
		'data': JSON.stringify({
			"ids": ids
		}),
		'success': function (data, type, request) {
			var datanodes = [];
			var dataedges = [];
			if (data.length==0) {

				var datanodesStr1 = '{"data":{"id":1,"label":"办理营业执照","type":"N","parent":"BXBL","height":"40","width":"140"},"position":{"x":110,"y":60}}';
				var datanodesStr2 = '{"data":{"id":2,"label":"印章刻制申请","type":"N","parent":"BXBL","height":"40","width":"140"},"position":{"x":300,"y":60}}';
				var datanodesStr3 = '{"data":{"id":3,"label":"税务发票申领","type":"N","parent":"BXBL","height":"40","width":"140"},"position":{"x":490,"y":60}}';
				var datanodesStr4 = '{"data":{"id":4,"label":"人社参保登记","type":"N","parent":"BXBL2","height":"40","width":"140"},"position":{"x":205,"y":160}}';
				var datanodesStr5 = '{"data":{"id":5,"label":"企业银行开户","type":"N","parent":"BXBL2","height":"40","width":"140"},"position":{"x":395,"y":160}}';
				var datanodesStr6 = '{"data":{"id":13,"label":"办理完成","type":"K","height":"40","width":"140"},"position":{"x":300,"y":280}}';
				var datanodesStr7 = '{"data":{"id":"BXBL","label":"","type":"A"},"selectable":false}';
				var datanodesStr8 = '{"data":{"id":"BXBL2","label":"","type":"A"},"selectable":false}';
				
				datanodes.push(JSON.parse(datanodesStr1));
				datanodes.push(JSON.parse(datanodesStr2));
				datanodes.push(JSON.parse(datanodesStr3));
				datanodes.push(JSON.parse(datanodesStr4));
				datanodes.push(JSON.parse(datanodesStr5));
				datanodes.push(JSON.parse(datanodesStr6));
				datanodes.push(JSON.parse(datanodesStr7));
				datanodes.push(JSON.parse(datanodesStr8));
				//console.log(datanodes);
				var dataedgesStr1 = '{"data":{"relationship":"","source":"BXBL","target":"BXBL2"},"selectable":false}';
				var dataedgesStr2 = '{"data":{"relationship":"","source":"BXBL2","target":"13"},"selectable":false}';
				dataedges.push(JSON.parse(dataedgesStr1));
				dataedges.push(JSON.parse(dataedgesStr2));
			} else if(data==undefined){

				var datanodesStr1 = '{"data":{"id":1,"label":"办理营业执照","type":"N","parent":"BXBL","height":"40","width":"140"},"position":{"x":110,"y":60}}';
				var datanodesStr2 = '{"data":{"id":2,"label":"印章刻制申请","type":"N","parent":"BXBL","height":"40","width":"140"},"position":{"x":300,"y":60}}';
				var datanodesStr3 = '{"data":{"id":3,"label":"税务发票申领","type":"N","parent":"BXBL","height":"40","width":"140"},"position":{"x":490,"y":60}}';
				var datanodesStr4 = '{"data":{"id":4,"label":"人社参保登记","type":"N","parent":"BXBL2","height":"40","width":"140"},"position":{"x":205,"y":160}}';
				var datanodesStr5 = '{"data":{"id":5,"label":"企业银行开户","type":"N","parent":"BXBL2","height":"40","width":"140"},"position":{"x":395,"y":160}}';
				var datanodesStr6 = '{"data":{"id":13,"label":"办理完成","type":"K","height":"40","width":"80"},"position":{"x":300,"y":280}}';
				var datanodesStr7 = '{"data":{"id":"BXBL","label":"","type":"A"},"selectable":false}';
				var datanodesStr8 = '{"data":{"id":"BXBL2","label":"","type":"A"},"selectable":false}';
				datanodes.push(JSON.parse(datanodesStr1));
				datanodes.push(JSON.parse(datanodesStr2));
				datanodes.push(JSON.parse(datanodesStr3));
				datanodes.push(JSON.parse(datanodesStr4));
				datanodes.push(JSON.parse(datanodesStr5));
				datanodes.push(JSON.parse(datanodesStr6));
				datanodes.push(JSON.parse(datanodesStr7));
				datanodes.push(JSON.parse(datanodesStr8));
				//console.log(datanodes);
				var dataedgesStr1 = '{"data":{"relationship":"","source":"BXBL","target":"BXBL2"},"selectable":false}';
				var dataedgesStr2 = '{"data":{"relationship":"","source":"BXBL2","target":"13"},"selectable":false}';
				dataedges.push(JSON.parse(dataedgesStr1));
				dataedges.push(JSON.parse(dataedgesStr2));
			}else{

				var datanodesStr1 = '{"data":{"id":1,"label":"办理营业执照","type":"N","parent":"BXBL","height":"50","width":"150"},"position":{"x":110,"y":60}}';
				var datanodesStr2 = '{"data":{"id":2,"label":"印章刻制申请","type":"N","parent":"BXBL","height":"50","width":"150"},"position":{"x":300,"y":60}}';
				var datanodesStr3 = '{"data":{"id":3,"label":"税务发票申领","type":"N","parent":"BXBL","height":"50","width":"150"},"position":{"x":490,"y":60}}';
				var datanodesStr4 = '{"data":{"id":4,"label":"人社参保登记","type":"N","parent":"BXBL2","height":"50","width":"150"},"position":{"x":205,"y":160}}';
				var datanodesStr5 = '{"data":{"id":5,"label":"企业银行开户","type":"N","parent":"BXBL2","height":"50","width":"150"},"position":{"x":395,"y":160}}';

				var datanodesStr7 = '{"data":{"id":"BXBL","label":"","type":"A"},"selectable":false}';
				var datanodesStr8 = '{"data":{"id":"BXBL2","label":"您所开办企业，还涉及到以下事项办理","type":"A"},"selectable":false}';
				var flag1 = 0;
				var flag2 = 0;
				var n = 205;
				var k = 395;
				var y = 300;
				var y2 = 300;
				var a = 1;
				var js = 0;
				
				$.each(data, function (i, item) {
					if (item.itemType == '1') {
						flag1 = 1;
					} else {
						flag2 = 1;
					}
					a = a + 1;
				});
				if (flag1 == 1 && flag2 == 0) {

					if (a % 2 == 0) {
						n = 300;
					} else {
						n = 205;
					}
				}
				if (flag1 == 0 && flag2 == 1) {
					if (a % 2 == 0) {
						k = 300;
					} else {
						k = 395;
					}
				}
				var hei=40;
				
				$.each(data, function (i, item) {

					var datanodesStr = '{"data":{"id":"' + item.approveId + '","label":"' + item.itemName + '"';
				
					if (item.itemType == '1') {
						var m= Math.ceil(item.itemName.length / 10);
						hei=hei+m*20;
					
						datanodesStr = datanodesStr + ',"type":"E","parent":"XZXK","height":"'+hei+'","width":"140"},"position":{"x":' + n + ',"y":' + y + '}}';
						if(flag2==1){
							y=y+m*20;
							y=y+90;
						}else{
							n = n +190;
							js = js + 1;
							if (n >490 ) {
								n = 300
									if (js >= 2) {
										y=y+m*20;
										y = y + 90;
										js = 0;
									}
							}
						}
						hei=40;

					} else {
						var m= Math.ceil(item.itemName.length / 10);
						hei=hei+m*20;
						datanodesStr = datanodesStr + ',"type":"E","parent":"BASX","height":"'+hei+'","width":"140"},"position":{"x":' + k + ',"y":' + y2 + '}}';
						
						if(flag1==1){
							y2=y2+m*20;
							y2=y2+90;
						}else{
							k = k-190;
							js = js + 1;
							if (k <110) {
								k = 300;
								if (js >= 2) {
									y2=y2+m*20;
									y2 = y2 + 90;
									js = 0;
								}

							}
						}
						
						
						hei=40;

					}
					datanodes.push(JSON.parse(datanodesStr));

				});
				var datanodesStr6 = '';
				if(flag1==1 && flag2==1){
					datanodesStr6 = '{"data":{"id":13,"label":"办理完成","type":"K","height":"50","width":"140"},"position":{"x":300,"y":' + (y + 50) + '}}';	
				}else{
				    datanodesStr6 = '{"data":{"id":13,"label":"办理完成","type":"K","height":"50","width":"140"},"position":{"x":300,"y":' + (y + 100) + '}}';
				}
				
				datanodes.push(JSON.parse(datanodesStr1));
				datanodes.push(JSON.parse(datanodesStr2));
				datanodes.push(JSON.parse(datanodesStr3));
				datanodes.push(JSON.parse(datanodesStr4));
				datanodes.push(JSON.parse(datanodesStr5));
				datanodes.push(JSON.parse(datanodesStr6));
				datanodes.push(JSON.parse(datanodesStr7));
				datanodes.push(JSON.parse(datanodesStr8));
				if (flag1 == 1 && flag2 == 1) {
					var str1 = '{"data":{"id":"XZXK","label":"行政许可事项","type":"A"},"selectable":false}';
					var str2 = '{"data":{"id":"BASX","label":"备案事项","type":"A"},"selectable":false}';
					datanodes.push(JSON.parse(str1));
					datanodes.push(JSON.parse(str2));
				} else if (flag1 == 0 && flag2 == 1) {
					var str2 = '{"data":{"id":"BASX","label":"备案事项","type":"A"},"selectable":false}';
					datanodes.push(JSON.parse(str2));
				} else if (flag1 == 1 && flag2 == 0) {
					var str1 = '{"data":{"id":"XZXK","label":"行政许可事项","type":"A"},"selectable":false}';
					datanodes.push(JSON.parse(str1));
				}
				//console.log(datanodes);
				if (flag1 == 1 && flag2 == 1) {
					var dataedgesStr = '{"data":{"relationship":"","source":"BXBL","target":"BXBL2"},"selectable":false}';
					var dataedgesStr1 = '{"data":{"relationship":"","source":"BXBL2","target":"XZXK"},"selectable":false}';
					var dataedgesStr2 = '{"data":{"relationship":"","source":"BXBL2","target":"BASX"},"selectable":false}';
					var dataedgesStr3 = '{"data":{"relationship":"","source":"XZXK","target":"13"},"selectable":false}';
					var dataedgesStr4 = '{"data":{"relationship":"","source":"BASX","target":"13"},"selectable":false}';
					dataedges.push(JSON.parse(dataedgesStr1));
					dataedges.push(JSON.parse(dataedgesStr2));
					dataedges.push(JSON.parse(dataedgesStr));
					dataedges.push(JSON.parse(dataedgesStr3));
					dataedges.push(JSON.parse(dataedgesStr4));

				} else if (flag1 == 0 && flag2 == 1) {
					var dataedgesStr1 = '{"data":{"relationship":"","source":"BXBL","target":"BXBL2"},"selectable":false}';
					var dataedgesStr2 = '{"data":{"relationship":"","source":"BXBL2","target":"BASX"},"selectable":false}';
					var dataedgesStr3 = '{"data":{"relationship":"","source":"BASX","target":"13"},"selectable":false}';
					dataedges.push(JSON.parse(dataedgesStr1));
					dataedges.push(JSON.parse(dataedgesStr2));
					dataedges.push(JSON.parse(dataedgesStr3));
				} else if (flag1 == 1 && flag2 == 0) {
					var dataedgesStr1 = '{"data":{"relationship":"","source":"BXBL","target":"BXBL2"},"selectable":false}';
					var dataedgesStr2 = '{"data":{"relationship":"","source":"BXBL2","target":"XZXK"},"selectable":false}';
					var dataedgesStr3 = '{"data":{"relationship":"","source":"XZXK","target":"13"},"selectable":false}';
					dataedges.push(JSON.parse(dataedgesStr1));
					dataedges.push(JSON.parse(dataedgesStr2));
					dataedges.push(JSON.parse(dataedgesStr3));
				}else{
					var dataedgesStr1 = '{"data":{"relationship":"","source":"BXBL","target":"BXBL2"},"selectable":false}';
					var dataedgesStr2 = '{"data":{"relationship":"","source":"BXBL2","target":"13"},"selectable":false}';
				
					dataedges.push(JSON.parse(dataedgesStr1));
					dataedges.push(JSON.parse(dataedgesStr2));
					
				}

			}

			setTimeout(function () {

				var cy = cytoscape({
						container: document.querySelector('#cy'),
						zoomingEnabled: false, //禁止缩放
						boxSelectionEnabled: false,
						userZoomingEnabled: false,
						userPanningEnabled: false,
						zoom: 1,
						style: cytoscape.stylesheet()
						//普通节点样式
						.selector('node[type="E"]')
						.style({
							//"label": "data(label)",
							'text-valign': 'center',
							
							'background-color': '#e9f3ff',
							'border-width': '0.5px',
							'border-style': 'solid',
							'border-color': '#e9f3ff',
							'shape': 'rectangle',
							'font-size': '12px',
							'width': "data(width)",
							'height': "data(height)"

						})
							.selector('node[type="K"]')
						.style({
							//"label": "data(label)",
							'text-valign': 'center',
							'background-color': '#4d91ef',
							'border-width': '0.5px',
							'border-style': 'solid',
							'border-color': '#b4d894',
							'shape': 'rectangle',
							'font-size': '14px',
							'font-color':'#303030',
							'width': "data(width)",
							'height': "data(height)"

						})
						//父节点样式
						.selector(':parent')
						.style({
							"label": "data(label)",

							'font-family': 'microsoft yahei',
							'font-size': '14px',
							'text-valign': 'top',
							'text-halign': 'left',
							'text-margin-x': 90,
							'background-color': '#FFFFFF',
							'border-width': '0.5px',
							'border-style': 'dotted',
							'border-color': '#b4d894',
							'color': '#FFFFFF',
							'marign-top': '9px'
						})
						.selector('node[id="BXBL2"]')
						.style({
							"label": "data(label)",

							'font-family': 'microsoft yahei',
							'font-size': '14px',
							'text-valign': 'top',
							'text-halign': 'left',
							'text-margin-x': 280,
							'text-margin-y': 100,
							'background-color': '#FFFFFF',
							'border-width': '0.5px',
							'border-style': 'dotted',
							'border-color': '#b4d894',
							'color': '#a2a79e',
							
						})
						//开始和结束节点样式
						.selector('node[type="N"]')
						.style({
							//"label": "data(label)",

							'background-color': '#e9f3ff',
							'border-width': '0.5px',
							'border-style': 'solid',
							'text-wrap': 'wrap',
							'text-max-width': 20,
							'font-family': 'microsoft yahei',
							'font-size': '14px',
							'border-color': '#e9f3ff',
							'shape': 'rectangle',
							'width': "data(width)",
							'height': "data(height)"
						})
						.selector('edge').css({
							'label': 'data(relationship)',
							"curve-style": "bezier",
							"taxi-direction": "downward",
							"taxi-turn": 20,
							"taxi-turn-min-distance": 5,
							//'curve-style': 'bezier',

							'line-color': '#ccc',
							'color': '#696a6b',
							'width': 0.5
						}).selector('edge[relationship="法定代表人"]').css({

							"label": "data(relationship)",
							'edge-text-rotation': 'autorotate',
							'target-arrow-shape': 'triangle',
							'target-arrow-color': '#e52600',
							'line-color': '#FFFFFF',
							'color': '#bb5a13',
							
							'width': 2
						}).selector(':selected').css({
							'background-color': '#dedbf6',
							'line-color': '#dedbf6',
							'target-arrow-color': '#dedbf6',
							'source-arrow-color': '#dedbf6',
							
						}).selector('.faded').css({
							'opacity': 0.25,
							'text-opacity': 0
						}),

						elements: {
							nodes: datanodes,
							edges: dataedges
						},

						layout: {
							name: 'preset', //klay
							padding: 0,
							nodeSep: 18,
							minLen: 0
						},

					});
				//选中事件
				cy.on('tap', 'node', function (e) {
					var node = e.target;
                    //console.log(e);
                    var id = node.data()['id'];
					//alert(node.data()['id']);
					var neighborhood = node.neighborhood().add(node);

					//cy.elements().addClass('faded');
					//neighborhood.removeClass('faded');
					if (typeof(id) != "undefined" && id != "undefined"){						
						createTableInfo(id);
					}else{						
						document.getElementById("table4SX").style.display = "none";
					}
				});
				cy.autolock(true);
				cy.on('tap', function (e) {
					if (e.cyTarget === cy) {
						alert(e.cyTarget);
						cy.elements().removeClass('faded');
					}
				});
				cy.nodeHtmlLabel([{
							query: 'node[type="E"]',
							valign: "center",
							halign: "center",
							valignBox: "center",
							halignBox: "center",
							tpl: function (data) {
								return toTplHtml(data);
							}
						}, {
							query: 'node[type="N"]',
							valign: "center",
							halign: "center",
							valignBox: "center",
							halignBox: "center",
							tpl: function (data) {
								return toTplHtml2(data);
							}
						}, {
							query: 'node[type="K"]',
							valign: "center",
							halign: "center",
							valignBox: "center",
							halignBox: "center",
							tpl: function (data) {
								return toTplHtml3(data);
							}
						}
					]);
			}, 100);
		}
	});
}
/** 获取事项信息  */
function getMattersInfo(url){
	var result;
	$.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		type: 'GET',
		url: url,
		dataType: 'json',
		async: false,
		success: function (data) {
			result = data;
		},
		error: function (xmlhttprequest, errorinfo) {}
	});
	return result;
}
/** 事项类型字典  */
var typeCodeDic = {"A":"行政权力事项","B":"公共服务事项","01":"行政许可","12":"审核转报","08":"行政奖励","09":"行政裁决","06":"行政检查","11":"公共服务","10":"其他行政权力","05":"行政给付","03":"行政强制","07":"行政确认","02":"行政处罚","04":"行政征收"};
/** 行使层级字典  */
var sourceDic = {"2":"省级","3":"市级","4":"县级"};
/** 填充事项table */
function createTableInfo(id){
	var mattersInfo1 = getMattersInfo("sfproxy/approveinterface/v1/approveinfo/"+id);
	var mattersInfo2 = getMattersInfo("sfproxy/approveinterface/v1/approveAdvancedByApplyId/"+id);
	if(mattersInfo1||mattersInfo2){
		$("#sxulA").html(mattersInfo1.approveName?mattersInfo1.approveName:"");
		$("#sxulB").html(mattersInfo1.typeCode?typeCodeDic[mattersInfo1.typeCode]:"");
		$("#sxulC").html(mattersInfo1.orgName?mattersInfo1.orgName:"");
		$("#sxulD").html(mattersInfo1.approveLimit?mattersInfo1.approveLimit+"个工作日":"");
		$("#sxulE").html(mattersInfo1.commitmentLimit?mattersInfo1.commitmentLimit+"个工作日":"");
		$("#sxulF").html(mattersInfo2.settingGist?mattersInfo2.settingGist:"");
		$("#sxulG").html(mattersInfo1.acceptanceCondition?mattersInfo1.acceptanceCondition:"");
		$("#sxulH").html(mattersInfo1.approveSource?sourceDic[mattersInfo1.approveSource]:"");
		$("#sxulI").html(mattersInfo1.approveContent?mattersInfo1.approveContent:"");
		$("#sxulJ").html(mattersInfo1.authorityDivision?mattersInfo1.authorityDivision:"");
		$("#sxulK").html(mattersInfo2.transactAddress?mattersInfo2.transactAddress:"");
		$("#sxulL").html(mattersInfo2.workTime?mattersInfo2.workTime:"");
		$("#sxulM").html(mattersInfo2.consultTel?mattersInfo2.consultTel:"");
		$("#sxulN").html(mattersInfo2.complaintTel?mattersInfo2.complaintTel:"");
		document.getElementById("table4SX").style.display = "block";
	}else{
		document.getElementById("table4SX").style.display = "none";
	}
}
