var vm = new Vue({
	el: '#app',
	data: {
		materials: [], // 材料列表
		licenses: [], // 办理结果列表
		questionAnswereds: [], // 您的情况及要求
		baseInfo: {}, // 基本信息
		fillinNotes: '', 
		fillinNoteDialog: false,
		fillinNoteZTZGDialog: false,
		fillinNoteZSZMDialog: false,
//		fillinNoteHBJYDialog: false,
		fillinNoteZTZGDatas: [],
		fillinNoteZSZMDatas: [], 
//		fillinNoteHBJYDatas: [],
		tabs: [{
			"id": 1,
			"name": "基本信息",
			"isSelected": true,
			"md": "jbxx"
		}, {
			"id": 2,
			"name": "所需材料",
			"isSelected": false,
			"md": "sxcl"
		}, {
			"id": 3,
			"name": "办理结果",
			"isSelected": false,
			"md": "bljg"
		}, {
			"id": 4,
			"name": "办理流程",
			"isSelected": false,
			"md": "bllc"
		}, {
			"id": 5,
			"name": "您的情况及要求",
			"isSelected": false,
			"md": "yq"
		}],
		ie: false
	},
	methods: {

		handleStr: function(id, str, name) {
			var imgUrl = '';
			var linkName = str.substring(str.indexOf(name)+2, str.length - 1);
			if(id === 'D3101104' || id === 'D3101111') {  //主体资格证明或者自然人身份证件复印件
				if (linkName === "营业执照复印件") {
					imgUrl = "./imgs/scjg/fillinnote/yyzz.jpg";
				} else if (linkName === "事业法人登记证书复印件") {
					imgUrl = "./imgs/scjg/fillinnote/syfrdjzs.jpg";
				} else if (linkName === "社团法人登记证复印件") {
					imgUrl = "./imgs/scjg/fillinnote/stfrdjz.jpg";
				} else if (linkName === "民办非企业单位证书复印件") {
					imgUrl = "./imgs/scjg/fillinnote/mbfqydwzs.png";
				} else if (linkName === "身份证件复印件") {
					imgUrl = "./imgs/scjg/fillinnote/sfzj.jpg";
				}
//				else if (linkName === "有关法律法规规定的资格证明") {
//					imgUrl = "./imgs/scjg/fillinnote/sfzj.jpg";
//				} 
			} 
//			else if(id === 'D3101126') {   //合并各方公司关于通过合并协议的决议或决定
//				if (linkName === "由代表三分之二以上表决权的股东签署的股东会决议") {
//					imgUrl = "./imgs/scjg/fillinnote/gqhjy.gif";
//				} else if (linkName === "由会议主持人及出席会议的董事签署的股东大会会议决议") {
//					imgUrl = "./imgs/scjg/fillinnote/gqhjy.gif";
//				} else if (linkName === "股东签署的书面决定") {
//					imgUrl = "./imgs/scjg/fillinnote/gqhjy.gif";
//				} else if (linkName === "国务院、地方人民政府或者其授权的本级人民政府国有资产监督管理机构的批准文件") {
//					imgUrl = "./imgs/scjg/fillinnote/gqhjy.gif";
//				}
//			}
			var obj = {
				notLinkName: str.substring(0, str.indexOf(name)+2),
				linkName: linkName + "。",
				imgUrl: imgUrl,
				id: id
			}
			console.log(obj)
			return obj;
		},

		// 查看填报说明
		lookMaterial: function(item) {
			var arr = new Array();
			if (item.id === 'D3101104' || item.id === 'D3101111') {  //主体资格证明或者自然人身份证件复印件
				var strArr = item.fillinNotes.split("<br>");
				for (var i = 0; i < strArr.length; i++) {
					var str = strArr[i];
					console.log(str.indexOf("提交"))
					if(str.indexOf("提交") > 0) {
						arr.push(this.handleStr(item.id, str, "提交"));
					}
				}
				this.fillinNoteZTZGDatas = arr;
				this.fillinNoteZTZGDialog = true;
			} else if(item.id === 'D3101106' || item.id === 'D3101113' || item.id === 'D3104111') {  //住所使用权合法证明
				var obj = {
						id: item.id,
						imgUrl: './imgs/scjg/fillinnote/zszm.jpg'
				}
				arr.push(obj);
				this.fillinNoteZSZMDatas = arr;
				this.fillinNoteZSZMDialog = true;
			} 
//			else if(item.id === 'D3101126') {   //合并各方公司关于通过合并协议的决议或决定
//				var strArr = item.fillinNotes.split("<br>");
//				for (var i = 0; i < strArr.length; i++) {
//					var str = strArr[i];
//					if(str.indexOf("提交") > 0) {
//						arr.push(this.handleStr(item.id, str, "提交"));
//					}
//				}
//				this.fillinNoteHBJYDatas = arr;
//				this.fillinNoteHBJYDialog = true;
//			}
			else {
				this.fillinNotes = item.fillinNotes;
				this.fillinNoteDialog = true;
			}
		},

		/**
		 * 查看证照信息
		 */
		lookLicense: function(approveId, type) {
			var _this = this;
			var url = "";
			if (type == 1) {
				// 事项受理条件
				url = "proxy/csx/v1/guideprocess/" + approveId +
					"/acceptancecondition";
			} else if (type == 2) {
				// 事项法律依据
				url = "proxy/csx/v1/guideprocess/" + approveId +
					"/settinggist";
			}
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'GET',
				url: url,
				dataType: 'Text',
				success: function(data) {
					if (data == "") {
						data = "暂无";
					}
					_this.msgBoxAlert(data, "查看详情");
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log(errorinfo);
					_this.msgBoxAlert("暂无", "查看详情");
				}
			});
		},
		/**
		 * 查询基本信息
		 */
		baseInfoQry: function() {
			_this = this;
			var themeId = $('#themeId').val();
			var guideprocessId = $("#guideprocessId").val();
			$
				.ajax({
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					type: 'GET',
					url: 'proxy/csx/v1/theme/themeService/' +
						themeId +
						'/basicInfo?guideprocessid=' +
						guideprocessId,
					dataType: 'json',
					success: function(data) {
						_this.baseInfo = data;
					},
					error: function(xmlhttprequest, errorinfo) {
						console.log('error');
					}
				});
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
			/* console.log(list); */
			return list;
		},
		/**
		 * 地址拼接
		 */
		getBasePath: function() {
			var location = (window.location + '').split('/');
			var basePath = location[0] + '//' + location[2] + '/' +
				location[3] + '/';
			return basePath;
		},
		/**
		 * 打开地图
		 */
		viewAddr: function() {
			window.open("http://api.map.baidu.com/geocoder?address=" +
				this.baseInfo.baiduAddress + "&output=html",
				"map");
		},
		
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
				
				// 锚点跳转
				$("html,body").animate({scrollTop:$("#"+item.md).offset().top},50);
//				window.location.hash = item.md;
			} else {
				if(item.id === 1) {
					$("html,body").animate({scrollTop:$("#"+item.md).offset().top},50);
				}
			}
		},
		/**
		 * 批量下载
		 */
		downloadBatch: function() {
			var guideprocessId = $('#guideprocessId').val();
			var url = 'proxy/csx/v1/guideprocess/' + guideprocessId +
				'/amdownload';
			$("#download_iframe").attr("src", url);
		},
		/**
		 * 返回上一页
		 */
		goback: function() {
			var guideprocessId = $("#guideprocessId").val();
			var themeId = $("#themeId").val();
			if(this.baseInfo.noneAsk === 1) {
				window.location.href = this.getBasePath() + "index/index.jsp";
			} else {
				window.location.href = this.getBasePath() +
				"jsp/intelligentGuide4Scjg.jsp?guideprocessId=" +
				guideprocessId + "&themeId=" + themeId;
			}
			
		},
		/**
		 * 开始办理
		 */
		manage: function() {
//			window.open(this.getBasePath() + "jsp/soent.jsp");
			window.open("http://zwfw.hnaic.gov.cn:8587/ottacp/dist/#/HandleInfo?gpId="+$("#guideprocessId").val());
		},
		/**
		 * 办理证照
		 */
		getLicense: function() {
			_this = this;
			var guideprocessId = $("#guideprocessId").val();
			$
				.ajax({
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					type: 'GET',
					url: 'proxy/csx/v1/guideprocess/' +
						guideprocessId + '/approvers',
					dataType: 'json',
					success: function(data) {
						_this.licenses = data;
					},
					error: function(xmlhttprequest, errorinfo) {
						console.log('error');
						// if (xmlhttprequest.responseJSON.errorCode === "error") {
						// window.location.href = _this
						// .getBasePath() +
						// "index/theme.jsp";
						// }
					}
				});
		},
		/**
		 * 您的情况及要求
		 */
		getQuestionAnswereds: function() {
			_this = this;
			var guideprocessId = $("#guideprocessId").val();
			$
				.ajax({
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					type: 'GET',
					url: 'proxy/csx/v1/guideprocess/' +
						guideprocessId + '/qaactual',
					dataType: 'json',
					success: function(data) {
						_this.questionAnswereds = data;
					},
					error: function(xmlhttprequest, errorinfo) {
						console.log('error');
						// if (xmlhttprequest.responseJSON.errorCode === "error") {
						// window.location.href = _this
						// .getBasePath() +
						// "index/theme.jsp";
						// }
					}
				});
		},
		/**
		 * 材料表格
		 */
		getMaterials: function() {
			_this = this;
			var guideprocessId = $("#guideprocessId").val();
			$
				.ajax({
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					type: 'GET',
					url: 'proxy/csx/v1/guideprocess/' +
						guideprocessId + '/approvematerial',
					data: {
						page: 1,
						rows: 1000
					},
					dataType: 'json',
					success: function(data) {
						// _this.materials = _this
						// .combineCell(data.contents);
						_this.materials = data.contents;
					},
					error: function(xmlhttprequest, errorinfo) {
						console.log('error');
						// if (xmlhttprequest.responseJSON.errorCode === "error") {
						// window.location.href = _this
						// .getBasePath() +
						// "index/theme.jsp";
						// }
					}
				});
		},
		/**
		 * 弹出框
		 */
		msgBoxAlert: function(content, title) {
			this.$alert(content, title, {
				confirmButtonText: '我知道了',
				dangerouslyUseHTMLString: true
			});
		},
		isIE: function() {
			if (window.navigator.userAgent.indexOf('Trident') != -1) {
				this.ie = true;
			} else {
				this.ie = false;
			}
		},
	},
	created: function() {
		this.getMaterials();
		this.getLicense();
		this.getQuestionAnswereds();
		this.baseInfoQry();
		this.isIE();
	}
})

window.onscroll = function() {
	var _scrollTop = document.documentElement.scrollTop;
	if (_scrollTop != 0) {
		$(".mao").removeClass("anmao-nofixed");
		$(".mao").addClass("anmao");
		$(".tab-nav").addClass("fixed");
		setScrollMao(_scrollTop);   //滚动设置锚点位置
	} else {
		$(".mao").removeClass("anmao");
		$(".mao").addClass("anmao-nofixed");
		$(".tab-nav").removeClass("fixed");
	}
}

//滚动设置锚点位置
function setScrollMao(_scrollTop) {
	var jbxx_top = $('#jbxx').offset().top - 35;  //基本信息 绝对X坐标（距离顶部位置）
	var sxcl_top = $('#sxcl').offset().top - 35;  //所需材料
	var bljg_top =  $('#bljg').offset().top - 35;  //办理结果
	var bllc_top = $('#bllc').offset().top  - 35;  //办理流程
	var yq_top = $('#yq').offset().top - 35;  //您的情况及要求
	if((_scrollTop + $(window).height()) < $(document).height()) {  //页面当前滚动高度加上浏览器窗口高度小于页面总内容高度时
		if(_scrollTop >= jbxx_top && _scrollTop <= sxcl_top) {  //设置基本信息滚动锚点范围并高亮tab页签
			$('#tab-2').removeClass("active");
			$('#tab-3').removeClass("active");
			$('#tab-4').removeClass("active");
			$('#tab-5').removeClass("active");
			$('#tab-1').addClass("active");
		} else if(_scrollTop >= sxcl_top && _scrollTop <= bljg_top) {   //设置所需材料滚动锚点范围并高亮tab页签
			$('#tab-1').removeClass("active");
			$('#tab-3').removeClass("active");
			$('#tab-4').removeClass("active");
			$('#tab-5').removeClass("active");
			$('#tab-2').addClass("active");
		} else if(_scrollTop >= bljg_top && _scrollTop<= bllc_top) {  //设置办理结果滚动锚点范围并高亮tab页签
			$('#tab-1').removeClass("active");
			$('#tab-2').removeClass("active");
			$('#tab-4').removeClass("active");
			$('#tab-5').removeClass("active");
			$('#tab-3').addClass("active");
		} else if(_scrollTop >= bllc_top && _scrollTop <= yq_top) {  //设置办理流程滚动锚点范围并高亮tab页签
			$('#tab-1').removeClass("active");
			$('#tab-2').removeClass("active");
			$('#tab-3').removeClass("active");
			$('#tab-5').removeClass("active");
			$('#tab-4').addClass("active");
		} else if(_scrollTop >= yq_top) {  //设置您的情况及要求滚动锚点范围并高亮tab页签
			$('#tab-1').removeClass("active");
			$('#tab-2').removeClass("active");
			$('#tab-3').removeClass("active");
			$('#tab-4').removeClass("active");
			$('#tab-5').addClass("active");
		}
	} else if((_scrollTop + $(window).height()) === $(document).height()) {   //页面当前滚动高度加上浏览器窗口高度等于页面总内容高度时，//设置您的情况及要求滚动锚点范围并高亮tab页签
		$('#tab-1').removeClass("active");
		$('#tab-2').removeClass("active");
		$('#tab-3').removeClass("active");
		$('#tab-4').removeClass("active");
		$('#tab-5').addClass("active");
	}
}

function getPath() {
	var location = (window.location + '').split('/');
	var basePath = location[0] + '//' + location[2] + '/' + location[3] + '/';
	return basePath;
}
new QRCode(document.getElementById("qrcode"), {
	text: getPath() + "mw/processGuidance.jsp?guideprocessId=" +
		$("#guideprocessId").val() + "&themeId=" + $("#themeId").val(),
	width: 90,
	height: 90
});
