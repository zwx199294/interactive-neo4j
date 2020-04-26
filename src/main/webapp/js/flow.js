function toTplHtml(data){
	
		var tpl = ['<p class="node_box" style="width:'+data['width']+'px; font-family:Microsoft JhengHei;font-size:15px ;text-align:center" >'];
			tpl.push(data.label.replace(/\n/g,"<br/>"));
			tpl.push('</p>');
		return tpl.join("");
	}
	function toTplHtml2(data){
		
		var tpl = ['<p class="node_box" style="width:'+data['width']+'px;font-family:Microsoft JhengHei;font-size:15px;text-align:center " >'];
			tpl.push(data.label.replace(/\n/g,"<br/>"));
			tpl.push('</p>');
		return tpl.join("");
	}
		function wrapText(text) {
			var t = [];
			var index = 0;
			var len = text.length;
			var rowlen = 6;//每行最多显示几个字
			for (index = 0; index < len; index++) {
				t.push(text.substr(index, rowlen));
				index = index + rowlen - 1;
			}
			if (len % rowlen != 0) {
				t.push(text.substr(index, len % rowlen));
			}

			return t.join("\n");
		}
		$(function() {
			
			$.getJSON('json/<%='+JSON.stringify(json)+ '%>.json?1', function(result) {
				var datas = result;
				var datanodes2 = datas.nodes;
				var datanodes=  [];
				var dataedges2 = datas.edges;
				var dataedges=  [];
				var a=100;
				var n=240;
				var cons='';
				var i=1;
				$.each(datanodes2,function(i,item){
					
					if(item.data.label=='印章刻制申请' || item.data.label=='税务发票申领' || item.data.label=='企业银行开户' || item.data.label=='人社参保登记'){
						item.data.parent='BXBL';
						item.data.height="50";
						item.data.width="140";
						var st = JSON.stringify(item); 
						st=st.substring(0,st.length-1)+', "position":{"x":'+a+',"y":130}}';
						item=JSON.parse(st); 
						datanodes.push(item);
						a=a+150;
					}else if(parseInt(item.data.id)>6 && parseInt(item.data.id)<datanodes2.length){
						item.data.parent='HZBL';
						var ustr2=item.data.label;
						var x=200;
						if(i%2!=0){
							x=450;
						}
						var ustr=ustr2.split('\n');
						item.data.height="80";
						item.data.width="230";
						var st = JSON.stringify(item); 
						st=st.substring(0,st.length-1)+', "position":{"x":'+x+',"y":'+n+'}}';
						if(i%2!=0){
							n=n+90;
						}
						item=JSON.parse(st); 
						datanodes.push(item);
						i=i+1;
		               
						
						
					}else{
						
						item.data.height="60";
						item.data.width="160";
						item.data.type='N';
						var st = JSON.stringify(item); 	
						
						if(item.data.id==datanodes2.length){
							
							
							if(i%2!=0){
								n=n+80;
							}
							
							st=st.substring(0,st.length-1)+', "position":{"x":325,"y":'+(n+40)+'}}';
						}else{
							st=st.substring(0,st.length-1)+', "position":{"x":325,"y":30}}';
						}
						
						
						
						item=JSON.parse(st);
						if(item.data.id!='6'){
							datanodes.push(item);
							n=n+20;
			            	   
			               }
	
						
					}
					cons=cons+JSON.stringify(item); 
					
				　　});
				setTimeout(function () {
					var str='{"data":{"id":"BXBL","label":"在办理营业执照的同时，您可以并行办理以下事项","type":"A"},"selectable":false}';
					var str2='{"data":{"id":"HZBL","label":"您所开办的企业，还可能涉及以下后置审批事项","type":"A"},"selectable":false}';
					datanodes.push(JSON.parse(str));
					datanodes.push(JSON.parse(str2));
					var check=0;
					$.each(dataedges2,function(i,item2){
						
						if(item2.data.source=='1' && check<1){
							check=check+1;
							item2.data.target='BXBL';
							dataedges.push(item2);
						}else {
							delete dataedges2[i];
						}
						
						
					});
					var str3='{"data":{"relationship":"","source":"BXBL","target":"HZBL"},"selectable":false}';
					var str4='{"data":{"relationship":"","source":"HZBL","target":"'+(datanodes.length-1)+'"},"selectable":false}';
					dataedges.push(JSON.parse(str3));
					dataedges.push(JSON.parse(str4));
					console.log(datanodes);
					console.log(dataedges);
					var cy = cytoscape({
						container : document.querySelector('#cy'),
						zoomingEnabled :true,//禁止缩放
						boxSelectionEnabled: false,
						userZoomingEnabled:false,
						userPanningEnabled:false,

						style: cytoscape.stylesheet()
					//普通节点样式
					.selector('node[type="E"]')
					  .style({
						//"label": "data(label)",
						'text-valign': 'center',
						'background-color': '#6495ED',
						'border-width':'1px',
						'border-style':'solid',
						'border-color':'#5ca8db',
						'shape':'rectangle',
						
						'width':"data(width)",
						'height': "data(height)"
						
						
					  })
						//父节点样式
					  .selector(':parent')
					  .style({
						  "label": "data(label)",
						 
							'font-family' : 'microsoft yahei',
							'font-size' : '12px',
						'text-valign': 'top',
						'text-halign': 'left',
						'text-margin-x':260,
						'background-color': '#E8E8E8',
						'border-width':'1px',
						'border-style':'solid',
						'border-color':'#E0E0E0',
						'color':'#8B8B83'
					  })
					 //开始和结束节点样式
					  .selector('node[type="N"]')
					  .style({
						//"label": "data(label)",
						
						'background-color': '#71C671',
						'border-width':'1px',
						'border-style':'solid',
						'text-wrap' : 'wrap',
						'text-max-width' : 20,
						'font-family' : 'microsoft yahei',
						'font-size' : '22px',
						'border-color':'#32CD32',
						'shape':'rectangle',
						'width':"data(width)",
						'height': "data(height)"
					  })
								.selector('edge').css({
									'label' : 'data(relationship)',
									"curve-style" : "bezier",
									"taxi-direction" : "downward",
									"taxi-turn" : 20,
									"taxi-turn-min-distance" : 5,
									//'curve-style': 'bezier',

									'line-color' : '#ccc',
									'color' : '#696a6b',
									'width' : 1
								}).selector('edge[relationship="法定代表人"]').css({

									"label" : "data(relationship)",
									'edge-text-rotation' : 'autorotate',
									'target-arrow-shape' : 'triangle',
									'target-arrow-color' : '#e52600',
									'line-color' : '#e52600',
									'color' : '#bb5a13',
									'width' : 2
								}).selector(':selected').css({
									'background-color' : '#e0849b',
									'line-color' : '#e0849b',
									'target-arrow-color' : '#e0849b',
									'source-arrow-color' : '#e0849b'
								}).selector('.faded').css({
									'opacity' : 0.25,
									'text-opacity' : 0
								}),

								elements: {
									nodes: datanodes,
									edges: dataedges
								},

								layout: {
									name: 'preset',//klay
									padding: 0,nodeSep: 18, minLen:0
								}
							});
							//选中事件
							cy.on('tap', 'node', function(e){
							  var node = e.target;
							 
							  //alert(node.data()['label']);
							  var neighborhood = node.neighborhood().add(node);

							  //cy.elements().addClass('faded');
							  //neighborhood.removeClass('faded');
							});
							cy.autolock(true);
							cy.on('tap', function(e){
							  if( e.cyTarget === cy ){
								   alert(e.cyTarget);
								cy.elements().removeClass('faded');
							  }
							});
					cy.nodeHtmlLabel([
					  				{
					  					query: 'node[type="E"]',
					  					valign: "center",
					  					halign: "center",
					  					valignBox: "center",
					  					halignBox: "center",
					  					tpl: function(data) {
					  						return toTplHtml(data);
					  					}
					  				},
					  				{
					  					query: 'node[type="N"]',
					  					valign: "center",
					  					halign: "center",
					  					valignBox: "center",
					  					halignBox: "center",
					  					tpl: function(data) {
					  						return toTplHtml2(data);
					  					}
					  				}
					  			]);
				 }, 100);
				
			});
			
		});