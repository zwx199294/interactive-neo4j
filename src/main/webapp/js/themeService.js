$(function() {
	$("#goRobot").on("click", function() {
		window.open("http://hdjl.hunan.gov.cn/hnRobot/", "_blank");
	});
});

var app = new Vue({
	el: '#app',
	data: {
		themeGroup: [],		//主题列表
		mattersData: [],	//一件事列表
		searchInput: '',	//搜索框内容
		isSearched: false,	//是否点击搜索框
		activeName: ''
	},
	methods: {
		getThemeGroup: function(param) {
			_this = this;
			var url = "";
			if (_this.searchInput != "") {
				url = "proxy/csx/v1/themegroup?themename=" + encodeURI(_this.searchInput);
			} else {
				url = "proxy/csx/v1/themegroup";
			}
			$.ajax({
				headers: {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json'
				},
				type: 'GET',
				url: url,
				dataType: 'json',
				success: function(data, type, request) {
					if(data.length>0){
						_this.themeGroup = data;
						_this.activeName = data[0].groupName;
						_this.getMatters(data[0].groupName);
					}else{
						_this.msgBoxAlert("查询无结果","提示");
						if(param != 1){
							_this.searchClean();
							_this.getThemeGroup();
						}
					}
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log(errorinfo);
				}
			});
		},
		/**
		 * 选择主题分组
		 */
		selectTheme: function(theme) {
			if(!theme.iscurTab){
				for ( var i = 0; i < this.themeGroup.length; i++) {
					if(this.themeGroup[i].iscurTab){
						this.themeGroup[i].iscurTab = false;
					}
				}
				theme.iscurTab = true;
				this.getMatters(theme.groupName);
			}
		},
		/**
		 * 
		 */
		handleClick: function(tab, event) {
			console.log(tab, event);
			console.log(tab.label);
			this.getMatters(tab.label);
		},
		/**
		 * 获取主题下的服务
		 */
		getMatters: function(theme) {
			_this = this;
			var url = "";
			if (_this.searchInput != "" && this.isSearched) {
				url = "proxy/csx/v1/themegroup/themes?themename=" + encodeURI(_this.searchInput) 
					+ "&groupname=" + encodeURI(theme);
			} else {
				url = "proxy/csx/v1/themegroup/themes?groupname=" + encodeURI(theme);
			}
			$.ajax({
				headers: {
					'Accept' : 'application/json;charset=UTF-8',
					'Content-Type' : 'application/json;charset=UTF-8'
				},
				type: 'GET',
				url: url,
				dataType: 'json',
				success: function(data, type, request) {
					_this.mattersData = data;
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log(errorinfo);
				}
			});
		},
		/**
		 * 清空搜索框
		 */
		searchClean: function() {
			this.searchInput = '';
			this.isSearched = false;
		},
		/**
		 * 搜索主题
		 */
		searchThis: function() {
			if(this.searchInput != ""){
				this.isSearched = true;
			}
			this.getThemeGroup();
		},
		/**
		 * 跳转到问题页面
		 */
		goIntelligent: function(matter) {
			if (isIE()) {
				window.location.href="intelligentGuide4Scjg.jsp?themeId=" + matter.id + "&themeName=" + encodeURI(matter.themeName);
			} else {
				window.location.href="index/intelligentGuide4Scjg.jsp?themeId=" + matter.id + "&themeName=" + matter.themeName;
			}
		},
		/**
		 * 弹出框
		 */
		msgBoxAlert: function(content,title) {
			this.$alert(content, title, {
				confirmButtonText: '我知道了',
		        dangerouslyUseHTMLString: true
		    });
		}
	},
	created: function() {
		this.getThemeGroup(1);
	}
})

//判断是否为IE浏览器
function isIE() {
	if (window.navigator.userAgent.indexOf('Trident') != -1) {
		return true;
	} else {
		return false;
	}
}