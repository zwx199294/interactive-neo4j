(function($) {
		showEnts();
		$(".chosen-select").chosen({
			no_results_text: "没有找到结果！",//搜索无结果时显示的提示  
	        search_contains:true,   //关键字模糊搜索。设置为true，只要选项包含搜索词就会显示；设置为false，则要求从选项开头开始匹配
	        allow_single_deselect:true, //单选下拉框是否允许取消选择。如果允许，选中选项会有一个x号可以删除选项
	        disable_search: false, //禁用搜索。设置为true，则无法搜索选项。
	        disable_search_threshold: 0, //当选项少等于于指定个数时禁用搜索。
	        inherit_select_classes: true, //是否继承原下拉框的样式类，此处设为继承
	        width: '1000px', //设置chosen下拉框的宽度。即使原下拉框本身设置了宽度，也会被width覆盖。
	        max_shown_results: 1000, //下拉框最大显示选项数量
	        display_disabled_options: false,
	        single_backstroke_delete: false, //false表示按两次删除键才能删除选项，true表示按一次删除键即可删除
	        case_sensitive_search: false, //搜索大小写敏感。此处设为不敏感
	        group_search: false, //选项组是否可搜。此处搜索不可搜
	        include_group_label_in_selected: false //选中选项是否显示选项分组。false不显示，true显示。默认false。
		});
		$('.chosen-select').on('change', function(e, params) {
			$("#ent_list").empty();
			if (typeof(params) != "undefined" && typeof(params.selected) != "undefined"){
				showEntBySc(params.selected);
			}else{
				showEnts();
			}
		});
	})(jQuery);
	
	function showEnts(){
		$.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			'type' : 'GET',
			'url' : 'proxy/csx/v1/proecssflows?page=1&rows=9999',
			'dataType' : 'json',
			'success' : function(data, type, request) {
				var contents = data.contents;
				if (typeof(contents) != "undefined"){
					var html = ''; 
					var entSc = document.getElementById("entSc");
					for (var i=0;i<contents.length;i++){
						entSc.add(new Option(contents[i].name, contents[i].id));
			        	html += '<a class="div_inline" href="';
			        	html += 'index/flow.jsp?jsonTxt='+contents[i].url+'&title='+contents[i].name;
			        	html += '"><div class="title">';
						html += '<div class="text">';
						html += contents[i].name;
						html += '</div></div></a>';
						if((i+1)%5!=0){
							html += '<div style="width: 20px;display: inline-block;">';
						}
						html += '</div>'; 
				    }; 
				    $("#ent_list").append(html);  
				    $("#entSc").trigger("chosen:updated");
			        $("#entSc").chosen();
				}
			},
			'error' : function(xmlhttprequest, errorinfo) {
			}
		});
	}
	function showEntBySc(id){
		$.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			'type' : 'GET',
			'url' : 'proxy/csx/v1/proecssflows/'+id,
			'dataType' : 'json',
			'success' : function(data, type, request) {
				if (typeof(data) != "undefined"){
					var html = '';
			        	html += '<a class="div_inline" href="';
			        	html += 'index/flow.jsp?jsonTxt='+data.url;
			        	html += '"><div class="title">';
						html += '<div class="text">';
						html += data.name;
						html += '</div></div></a>';
						html += '</div>'; 
				    $("#ent_list").append(html);  
				}
			},
			'error' : function(xmlhttprequest, errorinfo) {
			}
		});
	}
	