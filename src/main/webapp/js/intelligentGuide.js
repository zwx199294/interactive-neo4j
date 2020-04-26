var html = ""; //拼接问题和答案的html
var askIdArrs = []; //存放所有问题ID
var pageIndex = 1; //当前页
var totalPage = 0; //总页数
var askAnswers = null; //所有问题和答案列表
var themeId = "";
var themeName = "";
var isNext = true;	//标志位：判断页面元素是否全部隐藏，如是则发起下一次请求
seajs.config({
	alias: {
		"jquery": "jquery-1.10.2.js"
	}
});

$(function () {
	themeId = $("#themeId").html();
	themeName = $("#themeName").html();
	getJsonData(pageIndex);
	$("#goRobot").on("click", function () {
		window.open("http://hdjl.hunan.gov.cn/hnRobot/", "_blank");
	});
});

/**
 * 获取数据
 */
function getJsonData(page) {
	$.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		type: 'GET',
		url: 'proxy/csx/v1/theme/'+ themeId +'/asks?page=' + page,
		dataType: 'json',
		async: false,
		success: function (data, type, request) {
			hideLoading();
			pageIndex = data.pageIndex; //当前页
			totalPage = data.totalPage; //总页数
			askAnswers = data.contents[1];
			var asks = data.contents[0].asks;
			getAsksData(asks, false, 0); //遍历问题
			if (pageIndex < totalPage) {
				$("#leftAks").html(introduction(data.contents[0].introduction) + html + "<div onclick='goStep(1)' class='aks_btn'>下一步</div>");
			} else {
				$("#leftAks").html(introduction(data.contents[0].introduction) + html + "<div onclick='goStep(2)' class='aks_btn'>完成</div>");
			}
		},
		error: function (xmlhttprequest, errorinfo) {}
	});
}

/**
 * 事项导言
 */
function introduction(data) {
	if (!(data === undefined) && data != "") {
		return "<div class='aks_desc'>" + data + "</div>";
	} else {
		return "";
	}
}

/**
 * 遍历获取问题
 */
function getAsksData(asks, isHide, sum) {
	if (asks.length > 0) {
		for (var i = 0; i < asks.length; i++) {
			console.log(asks[i]);
			var ask = asks[i];
			askIdArrs.push(ask.askId);
			var childIsShow = "";
			var isChild = null;
			if(isHide){
				isChild = true;
			}
			if(isJoinAskHide(ask, isHide)){		//是否需要隐藏/关联问题回答后需要隐藏
				isHide = true;
				childIsShow = isChildIsShow(ask);
			}else{
				isChild = false;
			}
			html = html + aksQuestionHtml(ask, isHide); //生成问题
			getAnswersData(ask, isHide, childIsShow, isChild);
			if(sum == 0){
				isHide = false;				
			}
		}
	}
}

/**
 * 判断关联问题是否需要隐藏
 * */
function isJoinAskHide(ask, isHide){
	if(!(ask.joinAsk === undefined)){
		var joinAnswerId = joinAskChecked.get(ask.askId);
		if(joinAnswerId != null){
			isHide = true;
			if(joinAnswerId != ""){ 	//没有匹配上不要放进问题答案map中
				askToAnsList.set(ask.askId, joinAskChecked.get(ask.askId));
			}
		}
	}
	return isHide;
}

/**
 * 找到关联节点的答案
 * */
function isChildIsShow(ask){
	var joinAnswerId = "";
	if(!(ask.joinAsk === undefined)){
		var re = joinAskChecked.get(ask.askId);
		if(re != null){
			joinAnswerId = re;
		}
	}
	return joinAnswerId;
}

/**
 * 遍历获取答案
 */
function getAnswersData(ask, isHide, childIsShow, isChild) {
	if (ask.answer.length > 0) {
		html = html + aksAnswerHtml(ask, isHide); //生成答案
		var childIsShowArr = childIsShow.split(",");
		for (var i = 0; i < ask.answer.length; i++) {
			var answer = ask.answer[i];
			if (!(answer.asks === undefined)) { //答案下面还有问题则继续遍历
				if(childIsShowArr.indexOf(answer.answerId) != -1){
					if(isChild){
						getAsksData(answer.asks, true, 1);
					}else{
						getAsksData(answer.asks, false, 1);
					}
				}else{
					getAsksData(answer.asks, true, 1);
				}
			}
		}
	}
}

var aksImgHtml = "<div class='aks_img'><img src='./imgs/csx/u47.png'></div>";

/**
 * 拼接问题
 */
function aksQuestionHtml(ask, isHide) {
	if(!isHide){
		isNext = false;
	}
	var display = isHide ? "style='display:none;'" : ""; //是否隐藏
	return aksDesc(ask, display) + "<div " + display + " id='" + ask.askId + ask.uniId + 1 + "' class='aks_question'>"
	 + aksImgHtml + aksNameHtml(ask.ask) + aksExplainHtml(ask.definitions) + "</div>";
}

/**
 * 问题导言
 */
function aksDesc(ask, display) {
	if (ask.askDesc === undefined || ask.askDesc == "") {
		return "";
	} else {
		return "<div " + display + " id='" + ask.askId + ask.uniId + 3 + "' class='aks_desc'>" + ask.askDesc + "</div>";
	}
}

/**
 * 问题名
 */
function aksNameHtml(askName) {
	return "<div class='aks_name'><span class='aks_name_span'>" + askName +
	"</span></div>";
}

/**
 * 问题的名词解释
 */
function aksExplainHtml(definitions) {
	if (definitions === undefined || definitions == "") {
		return "";
	} else {
		return "<div class='aks_point'><img class='point_img' src='./imgs/csx/u80.png' />" +
		"<div class='aks_explain'>" + definitions + "</div></div>";
	}
}

/**
 * 找一个节点下需要隐藏的子节点(排除本身的)
 */
function findChildVal(answers, childValHide, currentRow) {
	for (var i = 0; i < answers.length; i++) {
		if (currentRow.answerId != answers[i].answerId) {
			var childAsks = answers[i].asks;
			if (!(childAsks === undefined)) {
				for (var j = 0; j < childAsks.length; j++) {
					childValHide = childValHide + childAsks[j].askId + childAsks[j].uniId + ",";
					if (childAsks[j].answer.length > 0) {
						childValHide = childValHide + findChildVal(childAsks[j].answer, "", currentRow);
					}
				}
			}
		}
	}
	return childValHide;
}

/**
 * 找到所有需要隐藏的子节点
 */
function findChildVal4Text(answers, childValHide) {
	for (var i = 0; i < answers.length; i++) {
		var childAsks = answers[i].asks;
		if (!(childAsks === undefined)) {
			for (var j = 0; j < childAsks.length; j++) {
				childValHide = childValHide + childAsks[j].askId + childAsks[j].uniId + ",";
				if (childAsks[j].answer.length > 0) {
					childValHide = childValHide + findChildVal4Text(childAsks[j].answer, "");
				}
			}
		}
	}
	return childValHide;
}

var fillsMap = new Map();	//存放填空题答案

/**
 * 拼接答案
 */
function aksAnswerHtml(ask, isHide) {
	var businessArea = new Map(); //面积范围
	var display = isHide ? "style='display:none;'" : ""; //是否隐藏
	var answerHtml = ""; //答案HTML
	var answerResponse = ""; //答案的响应说明
	var childValAnswers = ""; //答案,填空需要
	var answers = ask.answer; //答案数组
	var childValHide4Text = findChildVal4Text(answers, "");
	for (var i = 0; i < answers.length; i++) {
		var childValHide = findChildVal(answers, "", answers[i]); //需要隐藏的div
		var childValShow = ""; //需要显示的div
		var childAsks = answers[i].asks;
		var objJson = "";
		if (!(childAsks === undefined)) {
			objJson = JSON.stringify(childAsks);//对象转json字符串
			objJson = objJson.replace(/\"/g, "'");
			for (var j = 0; j < childAsks.length; j++) {
				childValShow = childValShow + childAsks[j].askId + childAsks[j].uniId + ",";
			}
			childValAnswers = childValAnswers + answers[i].answerName + "%";
		}
		if (ask.askType == 's') { //单选按钮
			answerHtml = answerHtml +
				'<label class="bui-radios-label bui-radios-anim">' +
				'<input type="radio" value="' + answers[i].answerId + '" id="' +
				answers[i].answerId + '" name="' + ask.askId + ask.uniId + '" onclick="getRadioId(&quot;' + childValShow +
				'&quot;,&quot;' + childValHide + '&quot;,&quot;' + ask.askId + ask.uniId + '&quot;,&quot;' + ask.joinAsk + '&quot;,&quot;' + objJson + '&quot;);"/>' +
				'<i class="bui-radios"></i>' + answers[i].answerName +
				'</label><br />';
		} else if (ask.askType == 'm') { //多选按钮
			answerHtml = answerHtml +
				'<label class="bui-checkbox-label  bui-checkbox-anim">' +
				'<input type="checkbox" value="' + answers[i].answerId + '" id="' +
				answers[i].answerId + '" name="' + ask.askId + ask.uniId + '" onclick="getCheckBoxId(&quot;' + childValShow +
				'&quot;,&quot;' + childValHide + '&quot;,&quot;' + ask.askId + ask.uniId + '&quot;)"/>' +
				'<i class="bui-checkbox"></i>' + answers[i].answerName +
				'</label><br />';
			if (!(answers[i].responseDesc === undefined)) {
				answerResponse = answerResponse +
					'<div style="display:none;" id="' + answers[i].answerId + 1 + '" class="aks_desc">' + ask.answer[i].responseDesc + '</div>';
			}
		} else if (ask.askType == 'f') { //填空
			answerHtml = '<input name="' + ask.askId + ask.uniId + '" id="' + ask.askId + '" class="bui-text" type="text"' +
				' placeholder="请输入" onblur="getId4Text(&quot;' + ask.askId +
				'&quot;,&quot;' + childValHide4Text + '&quot;,&quot;' + childValAnswers + '&quot;,&quot;' + ask.joinAsk + '&quot;);"  />';
			businessArea.set(answers[i].answerId, answers[i].answerName);
		}
	}
	fillsMap.set(ask.askId, businessArea);
	return '<div ' + display + ' id="' + ask.askId + ask.uniId + 2 + '" class="aks_answer">' + answerHtml +
	answerResponse + '</div>';
}

var joinAskChecked = new Map();	//存放选中的关联问题
var allData = new Map();

// 控制单选子问题的显示和隐藏
function getRadioId(showId, hideId, askDivId, joinAsk, childAsks) {
	if(!(joinAsk == 'undefined')){
		var joinAskArr = joinAsk.split(",");
		var checkedId = $('input:radio[name="'+askDivId+'"]:checked').val();
		joinAskChecked.set(askDivId.substr(0, 8), checkedId);						
		for ( var i = 0; i < joinAskArr.length; i++) {
			if(askDivId.substr(0, 8) != joinAskArr[i]){
				var answerIds = askAnswers[joinAskArr[i]];
				for ( var k = 0; k < answerIds.length; k++) {
					var answerId = answerIds[k].answerId;
					if(answerId.substring(answerId.length-2) == checkedId.substring(checkedId.length-2)){
						joinAskChecked.set(joinAskArr[i], answerId);
					}
				}
			}
		}
	}
	var arrShowId = showId.substring(0, showId.length - 1).split(",");
	var arrHideId = hideId.substring(0, hideId.length - 1).split(",");
	var asks = childAsks == "" ? "" : eval('(' + childAsks + ')');
	for (var i = 0; i < arrShowId.length; i++) {
		if(joinAskChecked.get(arrShowId[i].substr(0, 8)) == null){
			for (var int = 1; int < 4; int++) {
				var node = $("#" + arrShowId[i] + int);
				node.show();
			}
		}else{
			askToAnsList.set(arrShowId[i].substr(0, 8), joinAskChecked.get(arrShowId[i].substr(0, 8)));
			childAskShow(asks, arrShowId[i]);
		}
	}
	for (var i = 0; i < arrHideId.length; i++) {
		for (var int = 1; int < 4; int++) {
			var node = $("#" + arrHideId[i] + int);
			if (int == 2) {
				node.find("input").each(function () {
					$(this).removeAttr("checked"); //取消选中
				});
			}
			node.hide();
		}
	}
	// 显示/隐藏答案响应说明
	$("#" + askDivId + 2).find("input").each(function () {
		if ($(this).prop("checked")) {
			$("#" + $(this).prop("id") + 1).show();
		} else {
			$("#" + $(this).prop("id") + 1).hide();
		}
	});
}

function childAskShow(asks, showId){
	for ( var k = 0; k < asks.length; k++) {
		if(showId.substr(0, 8) == asks[k].askId){
			var childAnswers = asks[k].answer;
			for ( var z = 0; z < childAnswers.length; z++) {
				if(childAnswers[z].answerId == joinAskChecked.get(showId.substr(0, 8))){
					if(!(childAnswers[z].asks === undefined)){
						for ( var f = 0; f < childAnswers[z].asks.length; f++) {
							for (var int = 1; int < 4; int++) {
								var node = $("#" + childAnswers[z].asks[f].askId + childAnswers[z].asks[f].uniId + int);
								node.show();
							}
						}
					}
				}
			}
		}
	}
}

//多选事件
function getCheckBoxId(showId, hideId, askDivId) {
	$('input:checkbox[name="'+askDivId+'"]:checked').each(function(){
		console.log($(this).val());
	});
	// 显示/隐藏答案响应说明
	$("#" + askDivId + 2).find("input").each(function () {
		if ($(this).prop("checked")) {
			$("#" + $(this).prop("id") + 1).show();
		} else {
			$("#" + $(this).prop("id") + 1).hide();
		}
	});
}

// 填空题的事件
function getId4Text(id, hideId, answers, joinAsk) {
	var val = $.trim($("#" + id).val());
	if (val == "") {
		return false;
	}
	if (val != val.replace(/[^\d]/g, '')) {
		$("#" + id).val("");
		dialog2("面积只能输入数字");
		return false;
	} else {
		if (themeId=="A0006" && val < 50) {
			$("#" + id).val("");
			dialog2("我要开饭店只支持50平米以上，50平米以下请到主题式服务中选择我要开小餐馆");
			return false;
		}else if(themeId=="A0008" && val >= 50){
			$("#" + id).val("");
			dialog2("我要开小餐馆只支持50平米以下，50平米以上请到主题式服务中选择我要开饭店");
			return false;
		}
	}
	
	if(!(joinAsk == 'undefined')){
		var joinAskArr = joinAsk.split(",");
		for ( var i = 0; i < joinAskArr.length; i++) {
			console.log(joinAskArr[i]);
			if(id != joinAskArr[i]){
				var joinAnswers = askAnswers[joinAskArr[i]];
				var textAnswersId = "";
				for ( var k = 0; k < joinAnswers.length; k++) {
					console.log(joinAnswers[k].answerName);
					if(process(joinAnswers[k].answerName, parseInt(val))){
						textAnswersId = textAnswersId + joinAnswers[k].answerId + ",";
					}
				}
				joinAskChecked.set(joinAskArr[i], textAnswersId.substring(0, textAnswersId.length - 1));
			}
		}
	}
	
	var arrHideId = hideId.substring(0, hideId.length - 1).split(",");
	var arrAnswers = answers.substring(0, answers.length - 1).split("%");
	if (val != "") {
		for (var i = 0; i < arrAnswers.length; i++) {
			if (process(arrAnswers[i], parseInt(val))) {
				if(joinAskChecked.get(id) == null){
					for (var int = 1; int < 4; int++) {
						var node = $("#" + arrHideId[i] + int);
						node.show();
					}
				}else{
					if(joinAskChecked.get(id) != ""){
						askToAnsList.set(id, joinAskChecked.get(id));
					}
				}
			} else {
				for (var int = 1; int < 4; int++) {
					var node = $("#" + arrHideId[i] + int);
					if (int == 2) {
						node.find("input").each(function () {
							$(this).removeAttr("checked"); //取消选中
						});
					}
					node.hide();
				}
			}
		}
	} else {
		for (var i = 0; i < arrHideId.length; i++) {
			for (var int = 1; int < 4; int++) {
				var node = $("#" + arrHideId[i] + int);
				if (int == 2) {
					node.find("input").each(function () {
						$(this).removeAttr("checked"); //取消选中
					});
				}
				node.hide();
			}
		}
	}
}

var askToAnsList = new Map(); //问题和答案列表map
function goStep(mark) {
	showLoading();
	var allArrs = []; //存放所有问题数组
	var notherArrs = []; //已选择的问题数组
	var heavyArrs = []; //没有选择/填写的问题数组
	$("#leftAks").find("input").each(function () {
		var name = $(this).prop("name");
		var id = $(this).prop("id");
		if (!($(this).is(':hidden'))) {
			//把显示的所有问题放入数组
			if (allArrs.indexOf(name) == -1) {
				// 多选可以不选
				if ($(this).prop("type") != "checkbox") {
					allArrs.push(name);
				}
			}
			//把已选择的问题放入数组
			// 单选
			if ($(this).prop("checked")) {
				if (notherArrs.indexOf(name) == -1) {
					notherArrs.push(name);
					askToAnsList.set(name.substr(0, 8), id); //不存在，将问题和答案放入map中
				} else {
					askToAnsList.set(name.substr(0, 8), askToAnsList.get(name.substr(0, 8)) + "," + id); //存在，在问题后追加答案
				}
			}
			// 填空
			if ($(this).prop("type") == "text") {
				var value = $(this).prop("value");
				if (value != "") {
					if (value != value.replace(/[^\d]/g, '')) {
						$(this).val("");
						dialog2("经营场所面积只能输入数字");
						return false;
					}
					if (notherArrs.indexOf(name) == -1) {
						notherArrs.push(name);
						askToAnsList.set(name.substr(0, 8), operation(name.substr(0, 8), value)); //添加输入框的答案
					}
				}
			}
		}
	});
	//找到还没有选择的问题
	for (var i = 0; i < allArrs.length; i++) {
		if (notherArrs.indexOf(allArrs[i]) == -1) {
			heavyArrs.push(allArrs[i]);
		}
	}
	if (heavyArrs.length > 0) {
		hideLoading();
		var dialogContent = "";
		for (var a = 0; a < heavyArrs.length; a++) {
			dialogContent = dialogContent + $("#" + heavyArrs[a] + 1).find("[class='aks_name_span']").html() + "<br />";
		}
		dialog(dialogContent); //提示没有回答的问题
	} else {
		if (mark == 1) {
			if (pageIndex < totalPage) {
				html = "";
				isNext = true;
				getJsonData(pageIndex + 1);
				if(isNext){
					if (pageIndex < totalPage) {
						html = "";
						isNext = true;
						getJsonData(pageIndex + 1);
					}else{
						showLoading();
						doIt();
					}
				}
			}
		} else {
			doIt();
		}
	}
	console.log(askToAnsList);
}

function dialog(data) {
	seajs.use(['jquery', 'dialog'], function ($, dialog) {
		var d = dialog({
				title: '您还有已下问题没有回答',
				content: data,
				okValue: '我知道了',
				ok: function () {}
			});
		d.showModal();
	});
}

function dialog2(data) {
	seajs.use(['jquery', 'dialog'], function ($, dialog) {
		var d = dialog({
				title: '提示',
				content: data,
				okValue: '我知道了',
				ok: function () {}
			});
		d.showModal();
	});
}

//计算面积范围
function operation(askId, num) {
	var numInt = parseInt($.trim(num));
	var answerStr = ""; //返回的数据格式
	var objMap = fillsMap.get(askId);
	objMap.eachMap(function (key, value) {
		if (process(value, numInt)) {
			if (answerStr == "") {
				answerStr = answerStr + key;
			} else {
				answerStr = answerStr + "," + key;
			}
		}
	});
	return answerStr;
}

//计算过程
function process(key, numInt) {
	var isRight = false;
	var left = key.substring(0, 1); //截取第一位
	var right = key.substring(key.length - 1, key.length); //截取最后一位
	var middle = key.substring(1, key.length - 1); //截取中间
	var scopeArr = middle.split(",");
	if (left == "[" && right == "]") { //50<= x <=300
		if (scopeArr[0] != "" && scopeArr[1] != "") {
			if (numInt >= parseInt(scopeArr[0]) && numInt <= parseInt(scopeArr[1])) {
				isRight = true;
			}
		} else if (scopeArr[0] == "" && scopeArr[1] != "") {
			if (numInt > 0 && numInt <= parseInt(scopeArr[1])) {
				isRight = true;
			}
		} else if (scopeArr[0] != "" && scopeArr[1] == "") {
			if (numInt >= parseInt(scopeArr[0])) {
				isRight = true;
			}
		}
	} else if (left == "[" && right == ")") { //50<= x <300
		if (scopeArr[0] != "" && scopeArr[1] != "") {
			if (numInt >= parseInt(scopeArr[0]) && numInt < parseInt(scopeArr[1])) {
				isRight = true;
			}
		} else if (scopeArr[0] == "" && scopeArr[1] != "") {
			if (numInt > 0 && numInt < parseInt(scopeArr[1])) {
				isRight = true;
			}
		} else if (scopeArr[0] != "" && scopeArr[1] == "") {
			if (numInt >= parseInt(scopeArr[0])) {
				isRight = true;
			}
		}
	} else if (left == "(" && right == "]") { //50< x <=300
		if (scopeArr[0] != "" && scopeArr[1] != "") {
			if (numInt > parseInt(scopeArr[0]) && numInt <= parseInt(scopeArr[1])) {
				isRight = true;
			}
		} else if (scopeArr[0] == "" && scopeArr[1] != "") {
			if (numInt > 0 && numInt <= parseInt(scopeArr[1])) {
				isRight = true;
			}
		} else if (scopeArr[0] != "" && scopeArr[1] == "") {
			if (numInt > parseInt(scopeArr[0])) {
				isRight = true;
			}
		}
	} else if (left == "(" && right == ")") { //50< x <300

	}
	return isRight;
}

/**
 * 提交
 */
function doIt() {
	var params = []; //准备发送数据
	askToAnsList.eachMap(function (key, value) {
		var itemArr = value.split(",");
		var arr = {
			"askId": key,
			"answerIds": itemArr
		};
		params.push(arr);
	});
	$.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		type: 'POST',
		url: 'proxy/csx/v1/theme/'+ themeId +'/guideprocess',
		dataType: 'json',
		data: JSON.stringify({
			params: params
		}),
		success: function (data, type, request) {
			var result = data.guideprocessId;
			if (isIE()) {
				window.location.href = "processGuidance.jsp?guideprocessId=" + result + "&themeId=" + themeId + "&themeName=" + themeName;
			} else {
				window.location.href = "index/processGuidance.jsp?guideprocessId=" + result + "&themeId=" + themeId + "&themeName=" + themeName;
			}
		},
		error: function (xmlhttprequest, errorinfo) {}
	});
}

// showLoading
function showLoading() {
	$(".overlay").css({
		'display': 'block',
		'opacity': '0.8'
	});
	$(".showbox").css({
		'display': 'block'
	});
	$(".showbox").stop(true).animate({
		'margin-top': '300px',
		'opacity': '1'
	}, 200);
}

function hideLoading() {
	$(".showbox").stop(true).animate({
		'margin-top': '250px',
		'opacity': '0'
	}, 400);
	$(".showbox").css({
		'display': 'none'
	});
	$(".overlay").css({
		'display': 'none',
		'opacity': '0'
	});
}

//判读是否为IE浏览器
function isIE() {
	if (window.navigator.userAgent.indexOf('Trident') != -1) {
		return true;
	} else {
		return false;
	}
}

// 判断IE版本
function IEVersion() {
	return parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", ""));
}

// 自定义Map对象
function Map() {
	this.keys = new Array();
	this.data = new Object();
	this.set = function (key, value) {
		if (this.data[key] == null) {
			if (this.keys.indexOf(key) == -1) {
				this.keys.push(key);
			}
		}
		this.data[key] = value;
	}
	this.get = function (key) {
		return this.data[key];
	}
	this.removeAll = function () {
		this.keys = new Array();
		this.data = new Object();
	}
	//each方法,遍历方法
	this.eachMap = function (callBack) {
		for (var attr in this.data) {
			callBack(attr, this.data[attr])
		}
	}
}