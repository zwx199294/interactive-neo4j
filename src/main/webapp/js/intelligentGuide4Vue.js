var app = new Vue({
	el: '#app',
	data: {
		askDatas: [],		//问题列表
		askToAnswer: [],	//问题和答案
		askValid: [],		//验证数组
		askDatasTemp: [],	//临时问题数组
		isShowTable: false,	//是否展示已回答问题列表
		isShowBut: true,	//是否显示按钮组
		pageIndex: 1,		//当前页
		totalPage: 1,		//总页数
		loading: true
	},
	methods: {
		getData: function(themeId, page) {
			_this = this;
			$.ajax({
				headers: {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json'
				},
				type: 'GET',
				url: 'proxy/csx/v1/theme/' + themeId + '/asks?page=' + page,
				//url : 'http://localhost:3000/page'+page,
				dataType: 'json',
				success: function(data, type, request) {
					var temp = data.contents[0].asks;
					_this.pageIndex = data.pageIndex; //当前页
					_this.totalPage = data.totalPage; //总页数
					if(page == 1){	//第一页不需要判断joinAsk
						_this.askDatas = temp;
					}else{
						_this.askDatas = [];
						for ( var i = 0; i < temp.length; i++) {
							if(!(temp[i].joinAsk === undefined)){
								_this.prepareData(temp[i]);
							}else{
								_this.askDatas.push(temp[i]);
							}
						}
						/*如果存在askDatas为空的情况则发起下一页请求*/
						if(_this.askDatas.length == 0){
							if(_this.pageIndex<_this.totalPage){
								_this.getData($("#themeId").html(), _this.pageIndex+1);
							}else{
								this.confirm();
							}
						}
					}
					_this.loading = false;
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log(errorinfo);
				}
			});
		},
		/**
		 * 判断如果父节点是joinAsk节点且已回答，则提取子节点到根节点上，若子节点已然，则提取孙子节点，以此类推
		 */
		prepareData: function(ask) {
			var asks = this.findChild(ask);
			for ( var i = 0; i < asks.length; i++) {
				_this.askDatas.push(asks[i]);
			}
		},
		/**
		 * 找到关联问题下的子问题
		 */
		findChild: function(ask) {
			var joinAsk = ask.joinAsk;
			var answer = ask.answer;
			var asksRe = [];	//返回的数组
			var ren = 0;		//标记是否是已回答问题
			for ( var i = 0; i < this.askToAnswer.length; i++) {
				if(joinAsk.indexOf(this.askToAnswer[i].askId) != -1){
					ren = 1;	//此问题已回答
					if(this.askToAnswer[i].askType == 's'){	//单选
						for ( var j = 0; j < answer.length; j++) {
							var hasAnswer = this.askToAnswer[i].answerValue;	//已回答的答案
							var haveAnswer = answer[j].answerId;	//不需要回答的答案
							/*取后面2位相等的答案*/
							if(hasAnswer.substring(hasAnswer.length-2) == haveAnswer.substring(haveAnswer.length-2)){
								ask.answerValue = haveAnswer;
								this.askToAnswer.push(ask);	//放入答案数组中
								/*如果答案下还有子问题继续相同的判断*/
								var tempAsks = answer[j].asks;
								if(!(tempAsks === undefined)){
									for ( var k = 0; k < tempAsks.length; k++) {
										if(!(tempAsks[k].joinAsk === undefined)){
											this.findChild(tempAsks[k]);
										}else{
											asksRe.push(tempAsks[k]);
										}
									}
								}
								break;
							}
						}
					}else if(this.askToAnswer[i].askType == 'f'){	//填空
						var inputValue = this.askToAnswer[i].inputValue;	//填空的值
						for ( var j = 0; j < answer.length; j++) {
							if(this.process(answer[j].answerName, inputValue)){
								ask.answerValue = answer[j].answerId;
								var tempAsks = answer[j].asks;
								if(!(tempAsks === undefined)){
									for ( var k = 0; k < tempAsks.length; k++) {
										if(!(tempAsks[k].joinAsk === undefined)){
											this.findChild(tempAsks[k]);
										}else{
											asksRe.push(tempAsks[k]);
										}
									}
								}
								break;
							}
						}
						if(ask.answerValue != ""){
							this.askToAnswer.push(ask);
						}
					}else if(this.askToAnswer[i].askType == 'm'){	//多选
						var hasAnswer = this.askToAnswer[i].answerValue;	//已回答的答案,多选时为数组
						if(hasAnswer.length != 0){
							for ( var k = 0; k < hasAnswer.length; k++) {
								for ( var j = 0; j < answer.length; j++) {
									var haveAnswer = answer[j].answerId;	//不需要回答的答案
									/*取后面2位相等的答案*/
									if(hasAnswer[k].substring(hasAnswer[k].length-2) == haveAnswer.substring(haveAnswer.length-2)){
										ask.answerValue.push(haveAnswer);
									}
								}
							}
							this.askToAnswer.push(ask);	//放入答案数组中
						}
					}
					break;
				}
			}
			if(ren == 0){
				asksRe.push(ask)
			}
			return asksRe;
		},
		/**
		 * 单选按钮事件：子问题的显示和隐藏以及关联问题
		 */
		radioEvent: function(answer, ask) {
			var asks = answer.asks;		//子问题
			this.operationChild(asks, ask);
			/*添加选项的解释说明*/
			if(ask.answerResponseDesc.indexOf(answer) == -1){
				ask.answerResponseDesc = [];
				ask.answerResponseDesc.push(answer);
			}
		},
		/**
		 * 操作子问题方法
		 */
		operationChild: function(asks, ask) {
			if(asks === undefined){//没有子问题时去掉页面上其他选项的子问题
				var currentValue = ask.value;	//问题的关系值
				var currentValueLen = currentValue.split(".").length;
				for ( var i = 0; i < this.askDatas.length; i++) {
					var values = this.askDatas[i].value.split(".");
					if(values.length>currentValueLen){
						if(this.askDatas[i].value.indexOf(currentValue) != -1){
							this.askDatas.splice(i, 1);
							i = 0;
						}
					}
				}
				for ( var i = 0; i < this.askToAnswer.length; i++) {
					var values = this.askToAnswer[i].value.split(".");
					if(values.length>currentValueLen){
						if(this.askToAnswer[i].value.indexOf(currentValue) != -1){
							this.askToAnswer.splice(i, 1);
							i = 0;
						}
					}
				}
			}else{//有子问题时显示当前选中选项的子问题，去除其他选项的子问题
				var relationIds = asks[0].value.substring(0,asks[0].value.indexOf(asks[0].askId)-1);//取父级节点
				var relationIdsLen = relationIds.split(".").length;	//父级节点的流程长度
				/*删除askDatas中其他选项的子问题*/
				for ( var i = 0; i < this.askDatas.length; i++) {
					var values = this.askDatas[i].value.split(".");
					if(values.length>relationIdsLen){
						if(this.askDatas[i].value.indexOf(relationIds) != -1){
							this.askDatas.splice(i, 1);
							i = i-1;
						}
					}
				}
				/*删除askToAnswer中其他选项的子问题*/
				for ( var i = 0; i < this.askToAnswer.length; i++) {
					var values = this.askToAnswer[i].value.split(".");
					if(values.length>relationIdsLen){
						if(this.askToAnswer[i].value.indexOf(relationIds) != -1){
							this.askToAnswer.splice(i, 1);
							i = i-1;
						}
					}
				}
				/*添加当前选项的子问题*/
				for ( var i = asks.length-1; i >= 0; i--) {
					if (this.askDatas.indexOf(asks[i]) == -1) {
						if(!(asks[i].joinAsk === undefined)){
							var asksRen = this.findChild(asks[i]);
							for ( var j = 0; j < asksRen.length; j++) {
								this.addAskDatas(asksRen[j], relationIds);
							}
						}else{
							this.addAskDatas(asks[i], relationIds);
						}
					}
				}
			}
		},
		/**
		 * 事件添加元素
		 */
		addAskDatas: function(ask, relationIds) {
			for ( var j = 0; j < this.askDatas.length; j++) {
				if(this.askDatas[j].value.indexOf(relationIds) != -1){	//找到子问题需要挂载的位置
					if(ask.askType == 's'){	//将单选答案清空
						ask.answerValue = "";
					}else if(ask.askType == 'm'){	//将多选答案清空
						ask.answerValue = [];
					}else if(ask.askType == 'f'){
						ask.answerValue = "";
						ask.inputValue = "";
					}
					ask.answerResponseDesc = [];	//将选项的描述清空
					this.askDatas.splice(j+1, 0, ask);
					break;
				}
			}
		},
		/**
		 * 多选题事件
		 */
		checkboxEvent: function(ask,answer,isChecked) {
			if(isChecked){
				if(ask.answerResponseDesc.indexOf(answer) == -1){
					ask.answerResponseDesc.push(answer);
				}
			}else{
				var index = ask.answerResponseDesc.indexOf(answer);
				if (index > -1) {
					ask.answerResponseDesc.splice(index, 1);
				}
			}
		},
		/**
		 * 填空题事件
		 */
		textEvent: function(ask, event) {
			if(ask.inputValue == ""){
				return;
			}
			if(!this.regExpValid(ask)){
				return;
			}
			var answers = ask.answer;	//填空题答案数组
			ask.answerValue = "";		//每次重新计算前将答案置空
			for ( var i = 0; i < answers.length; i++) {
				var asks = answers[i].asks;
				if(this.process(answers[i].answerName, ask.inputValue)){
					ask.answerValue = answers[i].answerId;
					/*如果有子问题则显示子问题,如果没有隐藏其他子问题*/
					this.operationChild(asks, ask);
					break;
				}
			}
		},
		/**
		 * 填空题正则验证
		 */
		regExpValid: function(ask) {
			var validate = ask.validate;	//正则验证数组
			var validateErrMess = ask.validateErrMess;	//正则验证失败消息数组
			var isRight = true;
			var val = ask.inputValue;
			if(typeof(validate) != "undefined" && validate != ""){
				for ( var i = 0; i < validate.length; i++) {
					var re = new RegExp(validate[i]);
					if(!re.test(val)){
						dialog("提示",validateErrMess[i]);
						ask.inputValue = "";	//清空文本框
						isRight = false;
						break;
					}
				}
			}
			return isRight;
		},
		/**
		 * 填空题计算答案
		 */
		process: function(key, numInt) {
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
		},
		/**
		 * 下一步
		 */
		nextStep: function(){
			if(!this.validData()){
				dialog("您还有已下问题没有回答",this.askValid);
				return;
			}
			this.doBefore();
			this.getData($("#themeId").html(), this.pageIndex+1);
		},
		/**
		 * 完成
		 */
		doIt: function() {
			if(!this.validData()){
				dialog("您还有已下问题没有回答",this.askValid);
				return;
			}
			this.doBefore();
			this.confirm();
		},
		/**
		 * 点击下一步、完成按钮的事件
		 */
		doBefore: function() {
			for ( var i = 0; i < this.askDatas.length; i++) {
				this.askToAnswer.push(this.askDatas[i]);
				/*将已回答的问题放入临时数组*/
				this.saveAskAnswer(this.askDatas[i]);
			}
		},
		/**
		 * 保存已回答的问题和答案
		 */
		saveAskAnswer: function(ask) {
			var obj = {};
			var answerValue = ask.answerValue;
			var answer = ask.answer;
			var answerNames = "";
			for ( var j = 0; j < answer.length; j++) {
				if(ask.askType == 'm' && answerValue.length != 0){
					if(answerValue.indexOf(answer[j].answerId) != -1){
						answerNames = answerNames + answer[j].answerName + ","
					}
				}else if(ask.askType == 's'){
					if(answerValue == answer[j].answerId){
						answerNames = answer[j].answerName;
					}
				}else if(ask.askType == 'f'){
					answerNames = ask.inputValue;
					break;
				}
			}
			if(ask.askType == 'm' && answerValue.length != 0){
				answerNames = answerNames.substring(0, answerNames.length - 1);
			}
			if(answerNames != ""){
				obj = {
					"question": ask.ask,
					"answer": answerNames
				}
				this.askDatasTemp.push(obj);
			}
		},
		/**
		 * 确定提交
		 */
		confirm: function() {
			this.postData($("#themeId").html(),$("#themeName").html());
		},
		/**
		 * 重新选择
		 */
		reselect: function() {
			window.location.reload();
		},
		/**
		 * 答题完成发送请求
		 */
		postData: function(themeId, themeName) {
			showLoading();
			var params = []; 	//准备发送数据:全部需要回答的问题
			var paramsact = [];	//页面显示的问题
			for ( var i = 0; i < this.askToAnswer.length; i++) {
				var arr = {};
				if(this.askToAnswer[i].askType == 'm'){
					/*多选没有答案的不需要进行数据组装*/
					if(this.askToAnswer[i].answerValue.length != 0){
						arr = {
							"askId": this.askToAnswer[i].askId,
							"answerIds": this.askToAnswer[i].answerValue
						};
					}else{
						continue;
					}
				}else{
					var itemArr = this.askToAnswer[i].answerValue.split(",");
					arr = {
						"askId": this.askToAnswer[i].askId,
						"answerIds": itemArr
					};
				}
				params.push(arr);
			}
			for ( var i = 0; i < this.askDatasTemp.length; i++) {
				var arr = {};
				arr = {
					"askId": this.askDatasTemp[i].question,
					"answerIds": this.askDatasTemp[i].answer
				}
				paramsact.push(arr);
			}
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'POST',
				url: 'proxy/csx/v1/theme/'+ themeId +'/guideprocess',
				dataType: 'json',
				data: JSON.stringify({
					params: params,
					paramsact: paramsact,
					areaCode: $("#areaCode").val()
				}),
				success: function (data, type, request) {
					var result = data.guideprocessId;
					if (isIE()) {
						window.location.href = "processGuidance4New.jsp?guideprocessId=" + result 
							+ "&themeId=" + themeId + "&themeName=" + themeName + "&areaCode=" + $("#areaCode").val();
					} else {
						window.location.href = "index/processGuidance4New.jsp?guideprocessId=" + result 
							+ "&themeId=" + themeId + "&themeName=" + themeName + "&areaCode=" + $("#areaCode").val();
					}
				},
				error: function (xmlhttprequest, errorinfo) {
					console.log(errorinfo);
				}
			});
		},
		/**
		 * 验证答题信息
		 */
		validData: function() {
			this.askValid = [];
			for ( var i = 0; i < this.askDatas.length; i++) {
				if(this.askDatas[i].askType != 'm'){	//多选不需要验证
					if(this.askDatas[i].answerValue == ""){
						this.askValid.push(this.askDatas[i].ask + "<br>");
					}
				}
			}
			if(this.askValid.length>0){
				return false;
			}else{
				return true;
			}
		}
	},
	created: function() {
		var themeId = $("#themeId").html();
		this.getData(themeId, this.pageIndex);
	}
})

/**
 * 弹出框
 */
seajs.config({
	alias: {
		"jquery": "jquery-1.10.2.js"
	}
});

function dialog(text,data) {
	seajs.use(['jquery', 'dialog'], function ($, dialog) {
		var d = dialog({
				title: text,
				content: data,
				okValue: '我知道了',
				ok: function () {}
			});
		d.showModal();
	});
}

//showLoading
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

//判断是否为IE浏览器
function isIE() {
	if (window.navigator.userAgent.indexOf('Trident') != -1) {
		return true;
	} else {
		return false;
	}
}