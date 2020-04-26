var vm = new Vue({
	el: '#app',
	data: {
		value: [],
        options: []
	},
	methods: {
		/**
		 * 得到地区信息
		 */
		getAreaData: function() {
			_this = this;
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'GET',
				url: 'proxy/district/all',
				data: {},
				dataType: 'json',
				success: function(data) {
					var temp = _this.prepareData(data);
					_this.options = _this.listToTree(temp,0);
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log('error');
				}
			});
		},
		/**
		 * 准备数据
		 */
		prepareData: function(list) {
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
		 * 
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
		 * 跳转到主题式服务页面
		 */
		gotoNext: function() {
			console.log(this.value);
			if(this.value.length == 0){
				dialog("请选择区域");
			}else{
				if (isIE()) {
					window.location.href = "intelligentGuide4New.jsp?areaCode="
						+ this.value[this.value.length - 1]
						+ "&themeId=" + $("#themeId").val() +"&themeName=" + $("#themeName").val();
				} else {
					window.location.href = "index/intelligentGuide4New.jsp?areaCode="
						+ this.value[this.value.length - 1]
						+ "&themeId=" + $("#themeId").val() +"&themeName=" + $("#themeName").val();
				}
			}
		}
	},
	created: function() {
		this.getAreaData();
	}
})

seajs.config({
	alias: {
		"jquery": "jquery-1.10.2.js"
	}
});

function dialog(data) {
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

//判断是否为IE浏览器
function isIE() {
	if (window.navigator.userAgent.indexOf('Trident') != -1) {
		return true;
	} else {
		return false;
	}
}