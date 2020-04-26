var vm = new Vue({
	el: '#app',
	data: {
		tabs: [{
			"id": 1,
			"name": "解读这件事",
			"isSelected": true,
			"md": "jbxx",
			"selImg": "icon1-1.png",
			"unselImg": "icon1.png"
		}, {
			"id": 2,
			"name": "政务知识",
			"isSelected": false,
			"md": "jbxx",
			"selImg": "icon1-2.png",
			"unselImg": "icon2.png"
		}, {
			"id": 3,
			"name": "办事指南",
			"isSelected": false,
			"md": "jbxx",
			"selImg": "icon1-3.png",
			"unselImg": "icon3.png"
		}, {
			"id": 4,
			"name": "公示信息",
			"isSelected": false,
			"md": "jbxx",
			"selImg": "icon1-4.png",
			"unselImg": "icon4.png"
		}, {
			"id": 5,
			"name": "法律法规",
			"isSelected": false,
			"md": "jbxx",
			"selImg": "icon1-5.png",
			"unselImg": "icon5.png"
		}, {
			"id": 6,
			"name": "常见问题",
			"isSelected": false,
			"md": "jbxx",
			"selImg": "icon1-6.png",
			"unselImg": "icon6.png"
		}],
		ie: false
	},
	methods: {
		/**
		 * 地址拼接
		 */
		getBasePath: function() {
			var location = (window.location + '').split('/');
			var basePath = location[0] + '//' + location[2] + '/' + location[3] + '/';
			return basePath;
		},
		maoClick: function(md) {
			window.location.href = this.getBasePath() + "jsp/interpret.jsp?themeId=" 
				+ $('#themeId').val() + "&themeName=" + $("#themeName").val() + "#" + md;
		},
		/**
		 * 返回上一页
		 */
		goback: function() {
			var guideprocessId = $("#guideprocessId").val();
			var themeId = $("#themeId").val();
			var themeName = $("#themeName").val();
			window.location.href = this.getBasePath() + "jsp/intelligentGuide4Scjg.jsp?guideprocessId=" + guideprocessId +
				"&themeId=" + themeId + "&themeName=" + encodeURI(themeName);
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
			}
		},
		isIE: function() {
			if (window.navigator.userAgent.indexOf('Trident') != -1) {
				this.ie = true;
			} else {
				this.ie = false;
			}
		},
		gotoAsk: function() {
			window.location.href = this.getBasePath() + 'jsp/intelligentGuide4Scjg.jsp?themeName=' + encodeURI('开办企业') +
			'&themeId=A1001';
		}
	},
	created: function() {
		this.isIE();
	}
})


/*window.onscroll = function() {
	var _scrollTop = document.documentElement.scrollTop;
	if (_scrollTop != 0) {
		$(".hot-point").addClass("fixed");
	} else {
		$(".hot-point").removeClass("fixed");
	}
}*/

function getPath() {
	var location = (window.location + '').split('/');
	var basePath = location[0] + '//' + location[2] + '/' + location[3] + '/';
	return basePath;
}