/**
 * 分页组件,全局组件必须写在 vue对象的前面
 */
/*Vue.component('pagination', {
	props: ['total','pages','current_page','rows'],
	data: function () {
		return {
			currentpage: this.current_page,
			changePage: '' 		//跳转页 
	  }
	},
	computed: {
		efont: function() {
			if (this.pages <= 7) {
				return false;
			} else {
				return this.currentpage > 5;
			}
		},
		indexs: function() {
			var left = 1,
			right = this.pages,
			ar = [];
			if (this.pages >= 7) {
				if (this.currentpage > 5 && this.currentpage < this.pages - 4) {
					left = Number(this.currentpage) - 3;
					right = Number(this.currentpage) + 3;
				} else {
					if (this.currentpage <= 5) {
						left = 1;
						right = 7;
					} else {
						right = this.pages;
						left = this.pages - 6;
					}
				}
			}
			while (left <= right) {
				ar.push(left);
				left++;
			}
			return ar;
		}
	},
	methods: {
		*//**
		 * 跳转页面
		 *//*
		jumpPage: function(id) {
			if(id <= this.pages && id != ""){
				this.currentpage = id;
				this.$emit('current-change', this.currentpage);
			}
		},
		*//**
		 * 上一页
		 *//*
		pageUp: function() {
			this.currentpage = this.currentpage - 1;
			this.$emit('current-change', this.currentpage);
		},
		*//**
		 * 下一页
		 *//*
		pageDown: function() {
			this.currentpage = this.currentpage + 1;
			this.$emit('current-change', this.currentpage);
		}
	},
	template: `<div class="page">
				<div class="pagelist"> 
				{{currentpage}}
					<span class="jump" v-show="currentpage>1" @click="pageUp">上一页</span>
					<span v-show="currentpage>6" class="jump" @click="jumpPage(1)">1</span>
					<span class="ellipsis" v-show="efont">...</span>
					<span class="jump" v-for="num in indexs"
						:class="{bgprimary:currentpage==num}" @click="jumpPage(num)">{{num}}</span>
					<span class="ellipsis" v-show="efont&&currentpage<pages-4">...</span>

					<span class="jump" v-show="currentpage<pages" @click="pageDown">下一页</span>
					<span v-show="currentpage<pages-1" class="jump" @click="jumpPage(pages)">{{pages}}</span>
					<span class="jumppoint">跳转到：</span>
					<span class="jumpinp"><input type="text" v-model="changePage"></span>
					<span class="jump gobtn" @click="jumpPage(changePage)">GO</span>
					<span style="margin-left: 10px;">共{{total}}条</span>
				</div>
			 </div>`
});*/

var vm = new Vue({
	el: '#app',
	data: {
		tabs: [{
			"id": 1,
			"name": "申请人信息",
			"isSelected": true
		}, {
			"id": 2,
			"name": "申请人提交的材料",
			"isSelected": false
		}, {
			"id": 3,
			"name": "材料分发清单",
			"isSelected": false
		}],
		materials: [],			//申请人提交材料列表
		materialsPage: {		//申请人提交材料分页
			current_page: 0,	//当前页
			rows: 0,			//一页显示条数
			pages: 0, 			//总页数
			total: 0,			//总条数
			loading: true
		},
		materialHandOut: [],	//分发材料列表
		materialHandOutPage: {	//分发材料分页
			current_page: 0,	//当前页
			rows: 0,			//一页显示条数
			pages: 0, 			//总页数
			total: 0,			//总条数
			loading: true
		},
		questionAnswered: []	//已回答问题列表
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
					_this.questionAnswered = data;
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
		 * 材料表格
		 */
		getMaterials: function(currentpage) {
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
					page: _this.materialsPage.current_page,
					rows: _this.materialsPage.rows
				},
				dataType: 'json',
				success: function(data) {
					_this.materials = _this.combineCell(data.contents);
					_this.materialsPage.pages = data.totalPage;
					_this.materialsPage.total = data.total;
					_this.materialsPage.loading = false;
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
		 * 获取工作人员材料列表
		 */
		getMaterialStaff: function() {
			_this = this;
			var guideprocessId = $('#guideprocessId').val();
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'GET',
				url: 'proxy/csx/v1/guideprocess/' + guideprocessId + '/approvematerialstaff',
				data: {
					page: _this.materialHandOutPage.current_page,
					rows: _this.materialHandOutPage.rows
				},
				dataType: 'json',
				success: function(data) {
					_this.materialHandOut = _this.combineCell(data.contents);
					_this.materialHandOutPage.pages = data.totalPage;
					_this.materialHandOutPage.total = data.total;
					_this.materialHandOutPage.loading = false;
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
			return list;
		},
		/**
		 * 前往申请人页面
		 */
		gotoApplicant: function() {
			var guideprocessId = $("#guideprocessId").val();
			var themeId = $("#themeId").val();
			var themeName = $("#themeName").val();
			var areaCode = $("#areaCode").val();
			var areaCodeUp = $("#areaCodeUp").val();
			window.location.href = this.getBasePath() + "index/processGuidance4New.jsp?guideprocessId=" + guideprocessId 
				+ "&themeId=" + themeId + "&themeName=" + encodeURI(themeName) + "&areaCode=" + areaCode + "&areaCodeUp=" + areaCodeUp;
		},
		/**
		 * 申请人材料列表跳转
		 */
		handleCurrentChange1: function(val) {
			if(val != this.materialsPage.current_page){
				this.materialsPage.current_page = val;
				this.getMaterials();
			}
		},
		/**
		 * 办理人材料列表跳转
		 */
		handleCurrentChange2: function(val) {
			if(val != this.materialHandOutPage.current_page){
				this.materialHandOutPage.current_page = val;
				this.getMaterialStaff();
			}
		},
		/**
		 * 地址拼接
		 */
		getBasePath: function() {
			var location = (window.location + '').split('/');
			var basePath = location[0] + '//' + location[2] + '/' + location[3] + '/';
			return basePath;
		}
	},
	created: function() {
		this.getQuestionAnswered();
		this.getMaterials();
		this.getMaterialStaff();
	}
})