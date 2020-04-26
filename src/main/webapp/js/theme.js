var app = new Vue({
	el: '#app',
	data: {
		search: {
			name: ''
		},
		themeDatas: [],
		districtDatas: []
	},
	methods: {
		cityClick: function(name) {
			$("#bsqy").html(name);
			$("#area-select-content").hide();
		},
		closeClick: function() {
			$("#area-select-content").hide();
		},
		selectAreaClick: function() {
			$("#area-select-content").show();
		},
		searchClick: function() {
			this.getThemeDatas();
		},
		getDistrictDatas: function() {
			var _this = this;
			var url = "proxy/district/all";
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
						_this.districtDatas = data;
					}
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log(errorinfo);
				}
			});
		},
		getThemeDatas: function(searchMark, searchName) {
			var _this = this;
			var url = "";
			console.log(_this.search.name)
			if (_this.search.name != "") {
				url = "proxy/csx/v1/themegroup/themes?themename=" + encodeURI(_this.search.name);
			} else if (searchMark) {
				url = "proxy/csx/v1/themegroup/themes?" + searchMark + "=" + encodeURI(searchName);
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
							/*if (row.themeName.indexOf("（") != -1) {
								var themeNameTag = row.themeName.substring(row.themeName.indexOf("（"), row.themeName.length);
								row.themeNameTag = themeNameTag;
								var themeName = row.themeName.substring(0, row.themeName.indexOf("（"));
								row.themeName = themeName;
							}*/
							if (row.themeName.indexOf("食品生产许可证") != -1) {
								if (row.themeName.indexOf("（") != -1) {
									var themeNameTag = row.themeName.substring(row.themeName.indexOf("（"), row.themeName.length);
									row.themeNameTag = themeNameTag;
									var themeName = row.themeName.substring(0, row.themeName.indexOf("（"));
									row.themeName = themeName;
								}
							}
						}
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
		gotoAsk: function(themeName, themeId) {
			window.location.href = this.getBasePath() + 'index/intelligentGuide4Scjg.jsp?themeName=' + encodeURI(themeName) +
				'&themeId=' + themeId;
		},
		/**
		 * 地址拼接
		 */
		getBasePath: function() {
			var location = (window.location + '').split('/');
			var basePath = location[0] + '//' + location[2] + '/' + location[3] + '/';
			return basePath;
		},
		gotointerpret: function(themeName, themeId) {
			window.location.href = this.getBasePath() + 'index/interpret.jsp?themeName=' + encodeURI(themeName) +
			'&themeId=' + themeId;
		}
	},
	created: function() {
		var searchName = $("#searchName").val();
		var themeId = $("#themeId").val();
		var groupName = $("#groupName").val();
		if (searchName != '' && searchName != 'null') {
			this.search.name = searchName;
			this.getThemeDatas('themename', searchName);
		} else if (themeId != '' && themeId != 'null') {
			this.getThemeDatas('themeid', themeId);
		} else if (groupName != '' && groupName != 'null') {
			this.getThemeDatas('groupname', groupName);
		} else {
			this.getThemeDatas();
		}
		this.getDistrictDatas();
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
