var vm = new Vue({
	el: '#app',
	data: {
		themeName: '',
		introduction: '',	//事项导言
		askDatas: [],		//问题列表
		askToAnswer: [],	//问题和答案
		askValid: [],		//验证数组
		askDatasTemp: [],	//临时问题数组
		associatedAsk1: [],	//存放第一次出现关联问题的id
		associatedAsk2: [],	//存放第多次出现的关联问题
		loading: true,		//问题加载
		isShowAskList: true,//问题列表显示
		isShowTable: false,	//确认页显示
		value: [],
        options: [],
        fullscreenLoading: false,	//提交时加载
        dialogVisible: false,
        dialogInfo: '',
        checkboxData: [],	//存放多选下重复子问题数组
        drawer: false,
        messCon: ''			//智能问答输入框内容
	},
	computed: {
		fontNum: function() {
			if(this.messCon.length>=30){
				return 0;
			}else{
				return 30-this.messCon.length;
			}
		}
	},
	methods: {
		getThemeName: function(themeId){
			_this = this;
			$.ajax({
				headers: {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json'
				},
				type: 'GET',
				url: 'proxy/csx/v1/theme/' + themeId,
				dataType: 'json',
				success: function(data, type, request) {
					_this.themeName = data.themeName
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log(errorinfo);
				}
			});
		},
		getData: function(themeId) {
			_this = this;
			$.ajax({
				headers: {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json'
				},
				type: 'GET',
				url: 'proxy/csx/v1/theme/' + themeId + '/asks',
				//url: 'http://localhost:3000/newdata',
				dataType: 'json',
				success: function(data, type, request) {
					var temp = data.contents[0].asks;
					_this.introduction = data.contents[0].introduction;
					for ( var i = 0; i < temp.length; i++) {
						if(!(temp[i].joinAsk === undefined)){
							_this.prepareData(temp[i]);
						}else{
							_this.askDatas.push(temp[i]);
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
		 * 获取返回的数据
		 */
		getBackData: function(themeId,guideprocessid) {
			_this = this;
			$.ajax({
				headers: {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json'
				},
				type: 'GET',
				url: 'proxy/csx/v1/theme/' + themeId + '/asks?page=1&guideprocessid=' + guideprocessid,
				dataType: 'json',
				success: function(data, type, request) {
					_this.askDatas = data.contents[0].askDatas;
					_this.askToAnswer = data.contents[0].askToAnswer;
					_this.associatedAsk1 = data.contents[0].associatedAsk1;
					_this.associatedAsk2 = data.contents[0].associatedAsk2;
					_this.checkboxData = data.contents[0].checkboxData;
					_this.loading = false;
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log(errorinfo);
				}
			});
		},
		/**
		 * 取根节点的问题，显示第一次出现的关联问题，二次出现的关联问题放入associatedAsk2数组
		 */
		prepareData: function(ask) {
			var asks = this.findChildInit(ask);
			for ( var i = 0; i < asks.length; i++) {
				this.askDatas.push(asks[i]);
			}
		},
		/**
		 * 记录关联问题出现的位置,第一次出现显示，第二次出现不显示
		 */
		findChildInit: function(ask) {
			var joinAsk = ask.joinAsk;	//关联问题数组
			var answer = ask.answer;	//选项答案数组
			var isFirst = true;			//是否第一次显示，关联问题只显示第一次出现的
			var asksRe = [];			//返回的数组
			for ( var i = 0; i < joinAsk.length; i++) {
				if (this.associatedAsk1.indexOf(joinAsk[i]) != -1) {
					isFirst = false;
					break;
				}
			}
			if(isFirst || joinAsk.length == 1){
				this.associatedAsk1.push(ask.askId);	//将第一次出现的关联问题放入关联问题数组中
				asksRe.push(ask);	//返回的数据
			}
			if(!isFirst && joinAsk.length != 1) {
				this.associatedAsk2.push(ask);	//不是第一次出现
			}
			return asksRe;
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
				asksRe = this.findChildInit(ask);
			}
			return asksRe;
		},
		/**
		 * 单选按钮事件：子问题的显示和隐藏以及关联问题
		 */
		radioEvent: function(answer, ask) {
			var asks = answer.asks;		//子问题
			/*step1：判断问题是否是关联问题*/
			this.setAskToAnswer(ask);
			/*step2：判断问题是否是根节点的关联问题*/
			this.setJoinAsk(ask);
			/*step3：操作子问题*/
			this.operationChild(asks, ask);
			/*添加选项的解释说明*/
			if(ask.answerResponseDesc.indexOf(answer) == -1){
				ask.answerResponseDesc = [];
				var mark = answer.responseDesc.substring(0,4);
				if(mark == "退出标记"){
					this.dialogVisible = true;
					this.dialogInfo = answer.responseDesc.substring(10);
				}else{
					ask.answerResponseDesc.push(answer);
				}
			}
		},
		/**
		 * 添加关联问题放入问答数组
		 */
		setAskToAnswer: function(ask) {
			if(!(ask.joinAsk === undefined)){
				var isFind = false;
				for ( var i = 0; i < this.askToAnswer.length; i++) {
					if(this.askToAnswer[i].askId == ask.askId){
						this.askToAnswer[i].answerValue = ask.answerValue;	//找到相同的则更改答案
						isFind = true;
						break;
					}
				}
				if(!isFind){
					this.askToAnswer.push(ask);	//放入答案数组中
				}
			}
		},
		/**
		 * 删除存放所有问题的问答数组
		 */
		delAskToAnswer: function(asks) {
			if(!(asks === undefined)){
				for ( var i = 0; i < asks.length; i++) {
					var answer = asks[i].answer;
					for ( var j = 0; j < this.askToAnswer.length; j++) {
						if(this.askToAnswer[j].askId == asks[i].askId){
							this.askToAnswer.splice(j, 1);
							for ( var z = 0; z < answer.length; z++) {
								if(!(answer[z].asks === undefined)){	//如果存在子问题，则进行相同处理
									this.delAskToAnswer(answer[z].asks);
								}
							}
							break;
						}
					}
				}
			}
		},
		/**
		 * 删除其本身
		 */
		delAskToAnswerOwn: function(ask) {
			for ( var i = 0; i < this.askToAnswer.length; i++) {
				if(this.askToAnswer[i].askId == ask.askId){
					this.askToAnswer.splice(i, 1);
					break;
				}
			}
		},
		/**
		 * 父问题为关联问题
		 */
		setJoinAsk: function(ask) {
			for ( var i = 0; i < this.associatedAsk2.length; i++) {
				var joinAsk = this.associatedAsk2[i].joinAsk;	//关联问题
				var answer = this.associatedAsk2[i].answer;		//答案数组
				if(joinAsk.indexOf(ask.askId) != -1){
					if(ask.askType == 's'){	//单选
						for ( var j = 0; j < answer.length; j++) {
							var hasAnswer = ask.answerValue;	//已回答的答案
							var haveAnswer = answer[j].answerId;//不需要回答的答案
							var tempAsks = answer[j].asks;		//子问题
							/*取后面2位相等的答案*/
							if(hasAnswer.substring(hasAnswer.length-2) == haveAnswer.substring(haveAnswer.length-2)){
								this.associatedAsk2[i].answerValue = haveAnswer;
								this.setAskToAnswer(this.associatedAsk2[i])
								/*如果答案下还有子问题继续相同的判断*/
								if(!(tempAsks === undefined)){
									for ( var k = 0; k < tempAsks.length; k++) {
										if(!(tempAsks[k].joinAsk === undefined)){	//如果是关联问题进行关联问题处理
											this.findChildInit(tempAsks[k]);
										}else{	//不是关联问题，将问题添加到askDatas数组中
											this.setAskDatas(tempAsks[k]);
										}
									}
								}
							}else{
								this.delAskDatas(tempAsks);		//删除此问题下的所有子问题(askDatas)
								this.delAskToAnswer(tempAsks);	//删除此问题下的所有子问题(askToAnswer)
							}
						}
					}else if(ask.askType == 'f'){	//填空
						var inputValue = ask.inputValue;	//填空的值
						var isAll = false;
						for ( var j = 0; j < answer.length; j++) {
							var tempAsks = answer[j].asks;	//子问题
							if(this.process(answer[j].answerName, inputValue)){
								this.associatedAsk2[i].answerValue = answer[j].answerId;
								if(!(tempAsks === undefined)){
									for ( var k = 0; k < tempAsks.length; k++) {
										if(!(tempAsks[k].joinAsk === undefined)){
											this.findChildInit(tempAsks[k]);	//如果是关联问题进行关联问题处理
										}else{
											this.setAskDatas(tempAsks[k]);	//不是关联问题，将问题添加到askDatas数组中
										}
									}
								}
								isAll = true;
							}else{
								this.delAskDatas(tempAsks);		//删除此问题下的所有子问题(askDatas)
								this.delAskToAnswer(tempAsks);	//删除此问题下的所有子问题(askToAnswer)
							}
						}
						if(!isAll){	//没有配备到问题则删除已存在的
							for ( var j = 0; j < answer.length; j++) {
								var tempAsks = answer[j].asks;
								this.delAskDatas(tempAsks);		//删除此问题下的所有子问题
								this.delAskToAnswer(tempAsks);	//删除此问题下的所有子问题
							}
							this.delAskToAnswerOwn(this.associatedAsk2[i]);	//删除此问题本身
						} else {	//匹配到则添加
							if(this.associatedAsk2[i].answerValue != ""){
								this.setAskToAnswer(this.associatedAsk2[i]);
							}
						}
					}else if(ask.askType == 'm'){	//多选
						var hasAnswer = ask.answerValue;	//已回答的答案,多选时为数组
						if(hasAnswer.length != 0){
							for ( var k = 0; k < hasAnswer.length; k++) {
								for ( var j = 0; j < answer.length; j++) {
									var haveAnswer = answer[j].answerId;	//不需要回答的答案
									/*取后面2位相等的答案*/
									if(hasAnswer[k].substring(hasAnswer[k].length-2) == haveAnswer.substring(haveAnswer.length-2)){
										this.associatedAsk2[i].answerValue.push(haveAnswer);
									}
								}
							}
							this.setAskToAnswer(this.associatedAsk2[i]);
						}
					}
				}
			}
		},
		/**
		 * 关联问题子问题插入askDatas数组
		 */
		setAskDatas: function(ask) {
			var isFind = false;
			for ( var i = 0; i < this.askDatas.length; i++) {
				if(this.askDatas[i].askId == ask.askId){
					isFind = true;
					break;
				}
			}
			if(!isFind){
				if(ask.askType == 'm'){ 	//多选
					ask.answerValue = [];	//重置选项
				}else{	//单选或者填空
					ask.answerValue = "";	//重置
				}
				this.askDatas.push(ask);
			}
		},
		/**
		 * 删除askDatas数组中的数据
		 */
		delAskDatas: function(tempAsks) {
			if(!(tempAsks === undefined)){
				for ( var i = 0; i < tempAsks.length; i++) {
					var answer = tempAsks[i].answer;
					for ( var j = 0; j < this.askDatas.length; j++) {
						if(this.askDatas[j].askId == tempAsks[i].askId){
							this.askDatas.splice(j, 1);
							for ( var z = 0; z < answer.length; z++) {
								if(!(answer[z].asks === undefined)){	//如果存在子问题，则进行相同处理
									this.delAskDatas(answer[z].asks);
								}
							}
							break;
						}
					}
				}
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
				/*删除多选数组中的子问题*/
				for ( var i = 0; i < this.checkboxData.length; i++) {
					var values = this.checkboxData[i].value.split(".").length;
					if(values>currentValueLen){
						if(this.checkboxData[i].value.indexOf(currentValue) != -1){
							this.checkboxData.splice(i, 1);
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
				/*删除多选数组中的子问题*/
				for ( var i = 0; i < this.checkboxData.length; i++) {
					var values = this.checkboxData[i].value.split(".").length;
					if(values>relationIdsLen){
						if(this.checkboxData[i].value.indexOf(relationIds) != -1){
							this.checkboxData.splice(i, 1);
							i = 0;
						}
					}
				}
				/*添加当前选项的子问题*/
				for ( var i = asks.length-1; i >= 0; i--) {
					if (this.askDatas.indexOf(asks[i]) == -1) {
						if(!(asks[i].joinAsk === undefined)){
							var asksRen = this.findChild(asks[i]);
							if(asksRen.length>0){
								for ( var j = 0; j < asksRen.length; j++) {
									//this.addAskDatas(asksRen[j], relationIds, ask.num+'.'+(j+1));
									this.addAskDatas(asksRen[j], relationIds);
								}
							}
						}else{
							var askNum = this.getAskNum(ask,i);
							this.addAskDatas(asks[i], relationIds, askNum);
						}
					}
				}
			}
		},
		/**
		 * 判断该问题节点是否是多选下的问题节点并返回问题节点编号
		 */
		getAskNum: function(ask,sum) {
			var isBoxClid = false;	//是否为多选的子问题
			var askNum = "";
			for ( var i = 0; i < this.checkboxData.length; i++) {
				var boxId = this.checkboxData[i].askId;
				var valueArr = ask.value.split(",");
				if(valueArr.indexOf(boxId)){
					isBoxClid = true;
				}
			}
			if(!isBoxClid){
				askNum = ask.num+'.'+(sum+1);
			}
			return askNum;
		},
		/**
		 * 事件添加元素
		 */
		addAskDatas: function(ask, relationIds, num) {
			/*判断是否有重复问题，有则不进行添加*/
			var isRepeat = false;
			for ( var i = 0; i < this.askDatas.length; i++) {
				if(this.askDatas[i].askId == ask.askId){
					isRepeat = true;
				}
			}
			/*添加操作*/
			if(!isRepeat){
				for ( var j = 0; j < this.askDatas.length; j++) {
					if(this.askDatas[j].value.indexOf(relationIds) != -1){	//找到子问题需要挂载的位置
						if(ask.askType == 's'){			//将单选答案清空
							ask.answerValue = "";
						}else if(ask.askType == 'm'){	//将多选答案清空
							ask.answerValue = [];
						}else if(ask.askType == 'f'){
							ask.answerValue = "";
							ask.inputValue = "";
						}
						ask.num = "";					//添加子节点编号
						ask.answerResponseDesc = [];	//将选项的描述清空
						this.askDatas.splice(j+1, 0, ask);
						break;
					}
				}
			}
		},
		/**
		 * 多选题事件
		 */
		checkboxEvent: function(ask,answer,isChecked) {
			answer.isCheck = isChecked;
			var answers = ask.answer;
			this.setAskToAnswer(ask);
			if(isChecked){
				if(ask.answerResponseDesc.indexOf(answer) == -1){
					ask.answerResponseDesc.push(answer);
				}
				/*多选选项互斥,选中时判断将互斥选项禁用*/
				for ( var i = 0; i < answers.length; i++) {
					if(answers[i].exclusion == answer.exclusion){
						answers[i].disabled = false;
					}else{
						answers[i].disabled = true;
					}
				}
			}else{
				var index = ask.answerResponseDesc.indexOf(answer);
				if (index > -1) {
					ask.answerResponseDesc.splice(index, 1);
				}
				/*多选选项互斥，释放选中时判断是否全部选项都没有选中，如是则释放所有选项为非禁用状态*/
				var isRelieve = true;	//判断是否全部选项都没有选中
				for ( var i = 0; i < answers.length; i++) {
					if(answers[i].isCheck){
						isRelieve = false;
					}
				}
				if(isRelieve){
					for ( var i = 0; i < answers.length; i++) {
						answers[i].disabled = false;
					}
				}
			}
			/*多选下有子问题*/
			if(!(answer.asks === undefined)){
				this.operationChild4Checkbox(answer.asks, ask, isChecked);
			}
		},
		/**
		 * 多选有子问题
		 */
		operationChild4Checkbox: function(asks, ask, isChecked) {
			var relationIds = asks[0].value.substring(0,asks[0].value.indexOf(asks[0].askId)-1);//取父级节点
			var relationIdsLen = relationIds.split(".").length;	//父级节点的流程长度
			if(isChecked){	//选中时
				/*添加当前选项的子问题*/
				for ( var i = asks.length-1; i >= 0; i--) {
					var isRepeat = false;
					for ( var j = 0; j < this.checkboxData.length; j++) {
						if(this.checkboxData[j].askId == asks[i].askId){
							isRepeat = true;
							this.checkboxData[j].sum = this.checkboxData[j].sum + 1;
						}
					}
					if (!isRepeat) {
						this.addAskDatas(asks[i], relationIds, '');
						var obj = {
								askId: asks[i].askId,
								value: asks[i].value,
								sum: 1
						}
						this.checkboxData.push(obj);
					}
				}
			}else{	//取消选中
				for ( var i = asks.length-1; i >= 0; i--) {
					var isRepeat = false;
					for ( var j = 0; j < this.checkboxData.length; j++) {
						if(this.checkboxData[j].askId == asks[i].askId){
							isRepeat = true;
							if(this.checkboxData[j].sum == 1){
								for ( var z = 0; z < this.askDatas.length; z++) {
									var valueStr = this.askDatas[z].value;
									var valueArr = valueStr.split(".");
									var valuesLen = valueArr.length;
									if(valuesLen>relationIdsLen){
										if(valueStr.indexOf(asks[i].askId) != -1){
											this.askDatas.splice(z, 1);
											z = z-1;
										}
									}
								}
								this.checkboxData.splice(j, 1);
								break;
							}else if(this.checkboxData[j].sum > 1){
								this.checkboxData[j].sum = this.checkboxData[j].sum - 1;
							}
						}
					}
				}
			}
		},
		/**
		 * 填空题事件
		 */
		textEvent: function(ask, event) {
			/*step1：验证*/
			if(ask.inputValue == ""){
				return;
			}
			if(!this.regExpValid(ask)){
				return;
			}
			/*step2：将关联问题放入AskToAnswer数组*/
			this.setAskToAnswer(ask);
			/*step3：判断问题本身是否是关联问题*/
			this.setJoinAsk(ask);
			/*step4：子问题显示隐藏事件*/
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
		 * 完成
		 */
		doIt: function() {
			if(!this.validData()){
				this.msgBoxAlert("您还有已下问题没有回答");
				return;
			}
			this.doBefore();
			console.log(this.askToAnswer);
			this.isShowAskList = false;
			this.isShowTable = true;
			$("#rightNav").hide();
		},
		/**
		 * 点击下一步、完成按钮的事件
		 */
		doBefore: function() {
			this.askDatasTemp = [];
			for ( var i = 0; i < this.askDatas.length; i++) {
				var isFind = false;
				for ( var j = 0; j < this.askToAnswer.length; j++) {
					if(this.askToAnswer[j].askId == this.askDatas[i].askId){
						this.askToAnswer[j].answerValue = this.askDatas[i].answerValue;
						isFind = true;
						break;
					}
				}
				if(!isFind){
					this.askToAnswer.push(this.askDatas[i]);
				}
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
						answerNames = answerNames + answer[j].answerNameActual + "，"
					}
				}else if(ask.askType == 's'){
					if(answerValue == answer[j].answerId){
						answerNames = answer[j].answerNameActual;
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
					"question": ask.askActual,
					"answer": answerNames
				}
				this.askDatasTemp.push(obj);
			}
		},
		/**
		 * 上一步
		 */
		goback: function() {
			this.isShowAskList = true;
			this.isShowTable = false;
			$("#rightNav").show();
		},
		/**
		 * 确定提交
		 */
		confirm: function() {
			this.postData($("#themeId").val(),this.value[0],this.value[1]);
		},
		/**
		 * 答题完成发送请求
		 */
		postData: function(themeId,areaCodeUp,areaCode) {
			this.fullscreenLoading = true;
			var params = []; 	//准备发送数据:全部需要回答的问题
			var paramsact = [];	//页面显示的问题
			for ( var i = 0; i < this.askToAnswer.length; i++) {
				var arr = {};
				if(this.askToAnswer[i].askType == 'm'){
					arr = {
						"askId": this.askToAnswer[i].askId,
						"answerIds": this.askToAnswer[i].answerValue
					};
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
			/*返回上一步需要用的页面数据*/
			var pageElement = {
				"askDatas": this.askDatas,
				"askToAnswer": this.askToAnswer,
				"associatedAsk1": this.associatedAsk1,
				"associatedAsk2": this.associatedAsk2,
				"checkboxData": this.checkboxData
			}
			var guideprocessId = $("#guideprocessId").val();
			if(guideprocessId == "null"){
				guideprocessId = "";
			}
			_this = this;
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
					areaCode: areaCode,
					pageElement: pageElement,
					guideprocessId: guideprocessId
				}),
				success: function (data, type, request) {
					var result = data.guideprocessId;
					window.location.href = _this.getBasePath() + "jsp/guidance.jsp?guideprocessId=" + result 
						+ "&themeId=" + themeId + "&areaCode=" + areaCode + "&areaCodeUp=" + areaCodeUp;
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
				if(this.askDatas[i].askType != 'm'){	
					if(this.askDatas[i].answerValue == ""){
						this.askValid.push(this.askDatas[i].ask + "<br>");
					}
				}else{
					if(this.askDatas[i].answerValue.length == 0){
						this.askValid.push(this.askDatas[i].ask + "<br>");
					}
				}
			}
			if(this.askValid.length>0){
				return false;
			}else{
				return true;
			}
		},
		/**
		 * 得到地区信息
		 */
		getAreaData: function(areaCode, areaCodeUp) {
			_this = this;
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'GET',
				url: 'proxy/district/all',
				dataType: 'json',
				success: function(data) {
					var temp = _this.prepareAreaData(data);
					_this.options = _this.listToTree(temp,0);
					if(areaCode){
						_this.value.push(areaCodeUp);
						_this.value.push(areaCode);
					}
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log('error');
				}
			});
		},
		/**
		 * 准备数据
		 */
		prepareAreaData: function(list) {
			var ret = [];
			for ( var i = 0; i < list.length; i++) {
				if(list[i].code.length == 6){
					list[i].pid = 0
				}
				if(list[i].code.length == 9){
					list[i].pid = list[i].code.substring(0,6);
				}
				list[i].value = list[i].district;
				list[i].label = list[i].name;
				ret.push(list[i]);
			}
			return ret;
		},
		/**
		 * 组装成树
		 */
		listToTree: function(list, pid) {
			var ret = []; //一个存放结果的临时数组
			for (var i in list) {
				if (list[i].pid == pid) { //如果当前项的父id等于要查找的父id，进行递归
					if(this.listToTree(list, list[i].code).length != 0){
						list[i].children = this.listToTree(list, list[i].code);
					}
					ret.push(list[i]); //把当前项保存到临时数组中
				}
			}
			return ret; //递归结束后返回结果
		},
		/**
		 * 弹出框
		 */
		msgBoxAlert: function(title) {
			var content = "";
			for ( var i = 0; i < this.askValid.length; i++) {
				content = content + this.askValid[i];
			}
			this.$alert(content, title, {
				confirmButtonText: '我知道了',
		        dangerouslyUseHTMLString: true
		    });
		},
		/**
		 * 地址拼接
		 */
		getBasePath: function() {
			var location = (window.location + '').split('/');
			var basePath = location[0] + '//' + location[2] + '/' + location[3] + '/';
			return basePath;
		},
		goThemes: function() {
			window.location.href=this.getBasePath()+'index/index.jsp';
		},
		refresh: function() {
			location.reload();
		},
		/**
		 * 发送问题
		 */
		sendAsk: function() {
			_this = this;
			if(_this.messCon!=''&&_this.messCon.length>0){
				var content = _this.messCon;
				_this.messCon = '';
				$("#messages").append(mineAsk(content));
				gobottom();
				$.ajax({
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					type: 'GET',
					url: 'proxy/definitions/search?content=' + encodeURI(content),
					dataType: 'json',
					success: function(data) {
						var html = serviceAnswer(data.profile);
						$("#messages").append(html);
						gobottom();
					},
					error: function(xmlhttprequest, errorinfo) {
						console.log('error');
					}
				});
			}
		},
		/**
		 * 监听enter键
		 */
		listen: function(event) {
		    if (event.keyCode === 13) {
		    	event.preventDefault(); // 阻止浏览器默认换行操作
		        this.sendAsk(); // 发送文本
		        return false;
		    }
		},
		/**
		 * 获取常见问题
		 */
		getQa: function(themeId) {
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'GET',
				url: 'proxy/themeqa/'+ themeId +'/theme',
				dataType: 'json',
				success: function(data) {
					if(data){
						qaArr = data;
						var str = "";
						for ( var i = 0; i < data.length; i++) {
							str = str + '<a id="'+data[i].id+'" class="a_text-z" href="javascript:qa(&quot;'+data[i].id+'&quot;)">' + data[i].ask + '</a>' + "<br>";
						}
						var html = serviceQa(str);
						$("#messages").html(html);
					}
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log('error');
				}
			});
		}
	},
	created: function() {
		var themeId = $("#themeId").val();
		var guideprocessId = $("#guideprocessId").val();
		var areaCode = $("#areaCode").val();
		var areaCodeUp = $("#areaCodeUp").val();
		if(guideprocessId != "" && guideprocessId != "null"){
			this.getBackData(themeId,guideprocessId);
		}else{
			this.getData(themeId);
		}
		/*if(areaCode != "" && areaCode != "null"){
			this.getAreaData(areaCode, areaCodeUp);
		}else{
			this.getAreaData();
		}*/
		this.getQa(themeId);
		this.getThemeName(themeId);
	},
	filters: {
		askType: function (value) {
			if(value=='s'){
				return '单选';
			}else if(value=='m'){
				return '多选';
			}else if(value=='f'){
				return '填空';
			}
		}
	}
})

/**智能问答**/
var qaArr;

$(function(){
	//设置标杆
	$(window).scroll(function(){
		//滚动245px，右侧导航固定定位
		if ($(window).scrollTop()>245) {
			$('.rightNav').css({'position':'fixed','top':10})
		}else{
			if($('.askArea').css('float')!='none'){
				$('.rightNav').css({'position':'','top':''});
			}
		};
	});
});

function qa(id) {
	$("#messages").append(mineAsk($("#"+id).html()));
	gobottom();
	for ( var i = 0; i < qaArr.length; i++) {
		if(qaArr[i].id == id){
			var html = serviceAnswer(qaArr[i].answer);
			$("#messages").append(html);
			gobottom();
			break;
		}
	}
}

function judge(a) {
	if (a.id == "yesDiv") {
		$(a).parent("div").html("谢谢您的评价！");
	} else if (a.id == "noDiv") {
		$(a).parent("div").html('很抱歉没能为您解决该问题');
	}
}

function ss(id) {
	showNav();
	$("#messages").append(mineAsk($("#"+id).html()));
	gobottom();
	getExplain(id);
}

/**
 * 获取名词解释
 * @param id
 */
function getExplain(id) {
	$.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		type: 'GET',
		url: 'proxy/definitions/' + id,
		dataType: 'json',
		async: 'false',
		success: function(data) {
			if(data){
				var html = serviceAnswer(data.profile);
				$("#messages").append(html);
				gobottom();
			}
		},
		error: function(xmlhttprequest, errorinfo) {
			console.log('error');
		}
	});
}

/**
 * 判断消息框中的滚动条是否滚动，并且定位在最后面
 */
function gobottom() {
	var ele = document.getElementById("m2message");
	//判断元素是否出现了滚动条
	if(ele.scrollHeight > ele.clientHeight) {
		//设置滚动条到最底部
		ele.scrollTop = ele.scrollHeight;
	}
}

/**
 * 显示右侧边栏
 */
function showNav() {
	$('.askArea').css({
		float: "",
		margin: "",
		width : "",
		transition : ""
	});
	if ($(window).scrollTop()>245) {
		$('.rightNav').css({
			right : "",
			transition : "right .5s"
		});
	}else{
		$('.rightNav').css({
			position: "",
			right : "",
			top: "",
			transition : "right .5s"
		});
	}
	$('.smart_qa').css({
		right : "-50px",
		transition : "right .5s"
	});
}

/**
 * 隐藏右侧边栏
 */
function hideNav() {
	$('.rightNav').css({
		position : "fixed",
		right : "-35%",
		transition : "right .5s"
	});
	$('.askArea').css({
		width : "70%",
		transition : "width .5s",
		float: "none",
		margin: "0 auto"
	});
	$('.smart_qa').css({
		right : "0px",
		transition : "right .5s"
	});
}

/**
 * 发送问的内容
 */
function mineAsk(data) {
	var html = '<li>'+ 
			   '<p class="time"></p>'+
			   '<div class="main self">'+
			   '<img class="avatar" width="30" height="30" src="./imgs/scjg/kefu.png">'+
			   '<div class="text">'+ data +'</div>'+
			   '</div>'+
			   '</li>';
	return html;
}

/**
 * 系统回答的内容
 */
function serviceAnswer(data) {
	var html = '<li>'+
			   '<p class="time"></p>'+
			   '<div class="main">'+
			   '<img class="avatar" width="30" height="30" src="./imgs/scjg/kefu.png">'+
			   '<div class="text">'+ data +'</div>'+
			   '<div class="g-man"><span>您对以上信息是否满意？</span>'+
			   '<div class="g-man1" onclick="judge(this)" id="yesDiv"><span></span>满意</div>'+
			   '<div class="g-man2" onclick="judge(this)" id="noDiv"><span></span>不满意</div>'+
			   '<div class="g-man3"><i class="el-icon-user"></i>转人工服务</div>'+
			   '</div>'+
			   '</div>'+
			   '</li>';
	return html;
}

/**
 * 常见问题的内容
 */
function serviceQa(data) {
	var html = '<li>'+
			   '<p class="time"></p>'+
			   '<div class="main">'+
			   '<img class="avatar" width="30" height="30" src="./imgs/scjg/kefu.png">'+
			   '<div class="text"><h2 class="ask_me">常见问题</h2>'+ data +'</div>'+
			   '</div>'+
			   '</li>';
	return html;
}