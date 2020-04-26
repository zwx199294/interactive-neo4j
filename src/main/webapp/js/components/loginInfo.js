var targerUrl = "http://zwfw.hnaic.gov.cn:8587/ottacp/";
Vue.component('LoginInfo', {
	props: [],
	data: function() {
		return {
			logoutSign: '',
			userInfo: {
				realname: ''
			},
			logoutUrlS: '',	//受理平台登出url
	        logoutUrlD: ''	//办理平台登出url
		}
	},
	methods: {
		/*获取当前用户信息*/
		getUserInfo: function() {
			var that = this;
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'GET',
				url: 'csx/v1/getuserinfo',
				dataType: 'json',
				success: function(data, type, request) {
					that.userInfo.realname = data.realname;
					that.logoutSign = 1;
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log(errorinfo);
					that.logoutSign = 2;
				}
			});
		},
		/*登出*/
		logout: function() {
			this.$confirm('是否退出当前账号?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	this.openFullScreen();
	        	this.logoutingD();
	        }).catch(() => {});
		},
		/*登出调用接口,先登出自身系统*/
	    logoutingD: function() {
	    	var that = this;
	        const iframe2 = document.querySelector('#logoutUrlD');
	        this.logoutUrlD = this.logoutReq('ws/logout');
	        if (iframe2.attachEvent) {
	        	iframe2.attachEvent('onload', function() {
	        		console.log('iframe2已加载完毕');
	        		that.logoutingS();
	        	});
	        } else {
	        	iframe2.onload = function() {
	        		console.log('iframe2已加载完毕');
	        		that.logoutingS();
	        	}
	        }
	    },
	    /*再登出远程系统*/
	    logoutingS: function(){
	    	const iframe1 = document.querySelector('#logoutUrlS');
	    	this.logoutUrlS = this.logoutReq(targerUrl + 'ws/logout');
    		if (iframe1.attachEvent) {
    			iframe1.attachEvent('onload', function() {
    				// iframe加载完毕以后执行操作
    				console.log('iframe1已加载完毕');
    				window.location.href = getPath() + 'index/index.jsp';
                });
            } else {
            	iframe1.onload = function() {
            		// iframe加载完毕以后执行操作
                    console.log('iframe1已加载完毕');
                    window.location.href = getPath() + 'index/index.jsp';
                }
            }
	    },
	    logoutReq: function(url){
	    	var result = '';
	    	$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'GET',
				url: url,
				dataType: 'json',
				async: false,
				success: function(data, type, request) {
					result = data.result;
				},
				error: function(xmlhttprequest, errorinfo) {
					console.log(errorinfo);
				}
			});
	    	return result;
	    },
	    openFullScreen: function() {
	    	const loading = this.$loading({
	    		lock: true,
	    		text: '正在操作...',
	    		spinner: 'el-icon-loading',
	    		background: 'rgba(0, 0, 0, 0.7)'
	    	});
	    }
	},
	created: function(){
		this.getUserInfo();
	},
	template: '<div class="user_tab">'+
        		'<el-dropdown v-if="logoutSign==1">'+
        			'<i class="el-icon-setting" style="margin-right: 15px"></i>'+
        			'<el-dropdown-menu slot="dropdown">'+
        			'<el-dropdown-item>个人中心</el-dropdown-item>'+
        			'<el-dropdown-item @click.native="logout">退出</el-dropdown-item>'+
        			'</el-dropdown-menu>'+
        		'</el-dropdown>'+
        		'<span v-if="logoutSign==1">{{userInfo.realname}}</span>'+
        		/*'<div v-if="logoutSign==2" style="padding: 15px;">'+
        			'<el-button style="height: 30px;" size="small" type="primary">请登录</el-button>'+
        		'</div>'+*/
        		'<iframe id="logoutUrlS" style="display: none;" :src="logoutUrlS"></iframe>'+
        		'<iframe id="logoutUrlD" style="display: none;" :src="logoutUrlD"></iframe>'+
        	  '</div>'
});

function getPath() {
	var location = (window.location + '').split('/');
	var basePath = location[0] + '//' + location[2] + '/' + location[3] + '/';
	return basePath;
}