(function($) {
		showTitle();
		showBg();
		showSl();
		showFb();
	})(jQuery);
	
	function showTitle(){
		$.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			'type' : 'GET',
			'url' : 'proxy/csx/v1/entmaterial/'+JSON.stringify(emId),
			'dataType' : 'json',
			'success' : function(data, type, request) {
				if (typeof(data) != "undefined"){
					var html = data.title;
				    $("#titleDiv").append(html);  
				    $("#naiSpan").append("-&gt;"+html);
				}
			},
			'error' : function(xmlhttprequest, errorinfo) {
			}
		});
	}
	
	function showBg(){
		$.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			'type' : 'GET',
			'url' : 'proxy/csx/v1/entmaterialenclosu?cond={"emId":'+JSON.stringify(emId)+',"eType":"1"}',
			'dataType' : 'json',
			'success' : function(data, type, request) {
				var contents = data.contents;
				if (typeof(contents) != "undefined"){
					var html = '';
					for (var i=0;i<contents.length;i++){
			        	html += '<li><a href="enclosu/entmaterial/bgxz/';
			        	html += contents[i].eUrl;
			        	html += ' ">';
			        	html += contents[i].eTitle;
			        	html += '</a></li>';
				    }; 
				    $("#bgul").append(html);  
				}
			},
			'error' : function(xmlhttprequest, errorinfo) {
			}
		});
	}
	
	function showSl(){
		$.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			'type' : 'GET',
			'url' : 'proxy/csx/v1/entmaterialenclosu?cond={"emId":'+JSON.stringify(emId)+',"eType":"2"}',
			'dataType' : 'json',
			'success' : function(data, type, request) {
				var contents = data.contents;
				if (typeof(contents) != "undefined"){
					var html = '';
					for (var i=0;i<contents.length;i++){
			        	html += '<li><a href="enclosu/entmaterial/tbsl/';
			        	html += contents[i].eUrl;
			        	html += ' ">';
			        	html += contents[i].eTitle;
			        	html += '</a></li>';
				    }; 
				    $("#slul").append(html);  
				}
			},
			'error' : function(xmlhttprequest, errorinfo) {
			}
		});
	}
	function showFb(){
		$.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			'type' : 'GET',
			'url' : 'proxy/csx/v1/entmaterialenclosu?cond={"emId":'+JSON.stringify(emId)+',"eType":"3"}',
			'dataType' : 'json',
			'success' : function(data, type, request) {
				var contents = data.contents;
				if (typeof(contents) != "undefined"){
					var html = '';
					for (var i=0;i<contents.length;i++){
			        	html += '<li><a href="enclosu/entmaterial/sfwj/';
			        	html += contents[i].eUrl;
			        	html += ' ">';
			        	html += contents[i].eTitle;
			        	html += '</a></li>';
				    }; 
				    $("#fbul").append(html);  
				}
			},
			'error' : function(xmlhttprequest, errorinfo) {
			}
		});
	}