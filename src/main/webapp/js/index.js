var vm = new Vue({
	el : '#app',
	data : {
		search : {
			name : ''
		},
		themeDatas : [],
		districtDatas : [],
		fullscreenLoading: false	//提交时加载
	},
	methods : {
		searchClick : function() {
			this.getThemeDatas();
		},
		gotoAsk : function(themeName, themeId) {
			window.location.href = getPath()+'jsp/intelligentGuide4Scjg.jsp?themeId=' + themeId;
		},
		scanClick : function() {
			window.open(getPath()+'index/graphic.jsp');
		},
		getThemeDatas: function() {
			var _this = this;
			var url = "";
			if (_this.search.name != "") {
				url = "proxy/csx/v1/themegroup/themes?themename=" + encodeURI(_this.search.name);
			} else {
				url = "proxy/csx/v1/themegroup/themes";
			}
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'GET',
				url: url,
				dataType: 'json',
				success: function(data, type, request) {
					if (data.length > 0) {
						_this.themeDatas = data;
						for (var i in _this.themeDatas) {
							var row = _this.themeDatas[i];
							_this.$set(row, 'themeNameTag', "");
							if (row.themeName.indexOf("食品生产许可证") != -1) {
								if (row.themeName.indexOf("（") != -1) {
									var themeNameTag = row.themeName.substring(row.themeName.indexOf("（"), row.themeName.length);
									row.themeNameTag = themeNameTag;
									var themeName = row.themeName.substring(0, row.themeName.indexOf("（"));
									row.themeName = themeName;
								}
							}
						}
					} else {
						_this.$alert("没有搜索结果", "提示", {
							confirmButtonText: '我知道了',
					        dangerouslyUseHTMLString: true
					    });
					}
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log(errorinfo);
				}
			});
		},
		/**
		 * 开始导办
		 */
		gotoAsk: function(themeName, themeId, noneAsk) {
			if(noneAsk == 1){
				this.fullscreenLoading = true;
				/*查询流程编号*/
				$.ajax({
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					type: 'GET',
					url: 'proxy/csx/v1/theme/'+ themeId +'/skipguideprocess',
					dataType: 'json',
					success: function(data, type, request) {
						if(data.guideprocessId){
							window.location.href = getPath() + 'jsp/guidance.jsp?themeId=' + themeId + '&guideprocessId=' + data.guideprocessId;
						}
					},
					error: function(xmlhttprequest, errorinfo) {
						console.log(errorinfo);
					}
				});
			}else{
				window.location.href = getPath() + 'jsp/intelligentGuide4Scjg.jsp?themeId=' + themeId;
			}
		},
		/**
		 * 解读页面
		 */
		gotointerpret: function(themeName, themeId) {
			window.open(getPath() + 'index/interpret.jsp?themeName=' + encodeURI(themeName) + '&themeId=' + themeId);
		}
	},
	created: function()	{
		this.getThemeDatas();
	}
})

function getPath() {
	var location = (window.location + '').split('/');
	var basePath = location[0] + '//' + location[2] + '/' + location[3] + '/';
	return basePath;
}

new QRCode(document.getElementById("qrcode"), {
	text : getPath() + "jsp/graphic.jsp",
	width : 98,
	height : 98
});

window.onscroll = function() {
	var _scrollTop = document.documentElement.scrollTop;
	if (_scrollTop != 0) {
		$("#nav-ul-li-top").show();
	} else {
		$("#nav-ul-li-top").hide();
	}
}

$(function(){
	 $("#nav-ul-li-top").mouseover(function () {
		 $("#goto-top").show();
    }).mouseout(function () {
    	 $("#goto-top").hide();
    });
	$("#nav-ul-li-qrcode").mouseover(function () {
	      $("#goto-qrcode").show();
	 }).mouseout(function () {
	      $("#goto-qrcode").hide();
	 });
})