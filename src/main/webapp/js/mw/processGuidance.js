var vm = new Vue({
	el: '#app',
	data: {
		tabs: [{
			"id": 1,
			"name": "基本信息",
			"isSelected": true
		}, {
			"id": 2,
			"name": "所需材料",
			"isSelected": false
		}, {
			"id": 3,
			"name": "办理流程",
			"isSelected": false
		}, {
			"id": 4,
			"name": "您的情况及要求",
			"isSelected": false
		}],
		current_page: 0,	//当前页
		rows: 0,			//一页显示条数
		pages: 0, 			//总页数
		total: 0,			//总条数
		changePage: '', 	//跳转页 
		baseInfo: {},		//基本信息
		materials: [],		//材料列表
		licenses: [],		//办理证照列表
		QuestionAnswered: [],//已回答问题列表
		ie: false
	},
	computed: {
		efont: function() {
			if (this.pages <= 7) {
				return false;
			} else {
				return this.current_page > 5;
			}
		},
	},
	methods: {
		/**
		 * 选择tab页
		 */
		selectTab: function(item) {
			if (!item.isSelected) {
				for (var i = 0; i < this.tabs.length; i++) {
					if (this.tabs[i].isSelected) {
						this.tabs[i].isSelected = false;
					}
				}
				item.isSelected = true;
			}
		},
		/**
		 * 查询基本信息
		 */
		baseInfoQry: function() {
			_this = this;
			var themeId = $('#themeId').val();
			var guideprocessId = $('#guideprocessId').val();
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'GET',
				url: 'proxy/csx/v1/theme/themeService/' + themeId + '/basicInfo?guideprocessid='+guideprocessId,
				dataType: 'json',
				success: function (data) {
					console.log(data);
					_this.baseInfo = data;
				},
				error: function (xmlhttprequest, errorinfo) {
					console.log('error');
				}
			});
		},
		/**
		 * 材料表格
		 */
		getMaterials: function() {
			_this = this;
			var guideprocessId = $('#guideprocessId').val();
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'GET',
				url: 'proxy/csx/v1/guideprocess/' + guideprocessId + '/approvematerial',
				data: {
					page: _this.current_page,
					rows: _this.rows
				},
				dataType: 'json',
				success: function(data) {
					_this.materials = _this.combineCell(data.contents);
					_this.pages = data.totalPage;
					_this.total = data.total;
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log('error');
					if (xmlhttprequest.responseJSON.errorCode === "error") {
						window.location.href = _this.getBasePath() + "index/themeService.jsp";
					}
				}
			});
		},
		/**
		 * 办理证照
		 */
		getLicense: function() {
			_this = this;
			var guideprocessId = $('#guideprocessId').val();
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'GET',
				url: 'proxy/csx/v1/guideprocess/' + guideprocessId + '/approvers',
				dataType: 'json',
				success: function (data) {
					_this.licenses = data;
				},
				error: function (xmlhttprequest, errorinfo) {
					console.log('error');
					if (xmlhttprequest.responseJSON.errorCode === "error") {
						window.location.href = _this.getBasePath() + "index/themeService.jsp";
					}
				}
			});
		},
		/**
		 * 查看证照信息
		 */
		lookLicense: function(approveId, type) {
			_this = this;
			var url = "";
			if (type == 1) {
				// 事项受理条件
				url = "proxy/csx/v1/guideprocess/" + approveId + "/acceptancecondition";
			} else if(type == 2) {
				// 事项法律依据
				url = "proxy/csx/v1/guideprocess/" + approveId + "/settinggist";
			}
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'GET',
				url: url,
				dataType: 'Text',
				success: function (data) {
					if(data == ""){
						data = "暂无";
					}
					_this.msgBoxAlert(data, "查看详情");
				},
				error: function (xmlhttprequest, errorinfo) {
					console.log(errorinfo);
					_this.msgBoxAlert("暂无", "查看详情");
				}
			});
		},
		/**
		 * 已回答的问题
		 */
		getQuestionAnswered: function() {
			_this = this;
			var guideprocessId = $('#guideprocessId').val();
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'GET',
				url: 'proxy/csx/v1/guideprocess/' + guideprocessId + '/qaactual',
				dataType: 'json',
				success: function (data) {
					_this.QuestionAnswered = data;
				},
				error: function (xmlhttprequest, errorinfo) {
					console.log('error');
					if (xmlhttprequest.responseJSON.errorCode === "error") {
						window.location.href = _this.getBasePath() + "index/themeService.jsp";
					}
				}
			});
		},
		/**
		 * 打开地图
		 */
		viewAddr: function() {
			window.open("http://api.map.baidu.com/geocoder?address=" + this.baseInfo.baiduAddress
				 + "&output=html", "map");
		},
		/**
		 * 地址拼接
		 */
		getBasePath: function() {
			var location = (window.location + '').split('/');
			var basePath = location[0] + '//' + location[2] + '/' + location[3] + '/';
			return basePath;
		},
		/**
		 * 批量下载
		 */
		downloadBatch: function() {
			var guideprocessId = $('#guideprocessId').val();
			var url = 'proxy/csx/v1/guideprocess/' + guideprocessId + '/amdownload';
			$("#download_iframe").attr("src", url);
		},
		/**
		 * 开始办理
		 */
		manage: function() {
			window.open(this.getBasePath() + "jsp/soent.jsp");
		},
		/**
		 * 合并单元格
		 */
		combineCell: function(list) {
			field = "proc_name"
			var k = 0;
			while (k < list.length) {
				// 增加字段-用于统计有多少重复值
				list[k][field + 'span'] = 1;
				// 增加字段-用于控制显示与隐藏
				list[k][field + 'dis'] = '';
				for (var i = k + 1; i <= list.length - 1; i++) {
					var begin = list[k][field];
					var end = list[i][field];
					// 判断第k条数据的field字段，与下一条是否重复
					if (begin === end && begin !== '') {
						// 如果重复，第k条数据的字段统计+1
						list[k][field + 'span']++;
						// 设置为显示
						list[k][field + 'dis'] = '';
						// 重复的记录，则设置为1，表示不跨行
						list[i][field + 'span'] = 1;
						// 并且该字段设置为隐藏
						list[i][field + 'dis'] = 'none';
					} else {
						break;
					}
				}
				// 跳转到第i条数据的索引
				k = i;
			}
			console.log(list);
			return list;
		},
	},
	created: function() {
		this.baseInfoQry();
		this.getMaterials();
		this.getLicense();
		this.getQuestionAnswered();
	}
})
