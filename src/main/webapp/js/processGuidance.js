$(function () {
	getData(1);
	getLicense();
	$('#theme_a').html($('#themeName').val());
	$('#head_title').html($('#themeName').val());

	$("#page").on('click', 'div', function () {
		var disabled = $(this).attr("disabled"); // 禁止重复点击
		if (!disabled) {
			var val = $(this).attr("id");
			if (val) {
				getData(val);
			}
		}
	});
});

function getData(currentPage) {
	$("#tbody_data tr").remove();
	var guideprocessId = $('#guideprocessId').val();
	$.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		'type': 'GET',
		'url': 'proxy/csx/v1/guideprocess/' + guideprocessId + '/approvematerial',
		data: {
			'page': currentPage,
			'rows': 10
		},
		'dataType': 'json',
		'success': function (data) {
			console.log(data)
			if (typeof(data) != "undefined" && typeof(data.contents) != "undefined") {
				getPageBar(data.pageIndex, data.totalPage, data.total);
				setStyleData(currentPage, data.totalPage);
				var tbodyDataSelector = $('#tbody_data');

				$.each(data.contents, function (index, item) {
					var no = (data.pageIndex - 1) * 10 + index + 1;
					tableTbodyData(tbodyDataSelector, item, no);
				})
			}
		},
		'error': function (xmlhttprequest, errorinfo) {
			console.log('error');
			if (xmlhttprequest.responseJSON.errorCode === "error") {
				window.location.href = getBasePath() + "index/themeService.jsp";
			}
		}
	});
}

function tableTbodyData(tbodyDataSelector, item, no) {
	if (typeof(item.amType) == "undefined") {
		item.amType = '';
	}
	if (typeof(item.amCopies) == "undefined") {
		item.amCopies = '';
	} else {
		item.amCopies = item.amCopies + "份";
	}
	if (typeof(item.sourceChannel) == "undefined") {
		item.sourceChannel = '';
	}
	var dataStr = '<tr class="content_tr">' 
		 + '<td class="content_td">' + no + '</td>' 
		 + '<td class="content_td">' + item.amName + '</td>' 
		 + '<td class="content_td">' + item.amType + '</td>' 
		 + '<td class="content_td">' + item.amCopies + '</td>';

//	if (typeof(item.acceptCriteria) != "undefined") {
//		if (item.acceptCriteria != '') {
//			dataStr += '<td class="content_td"><a href=javascript'
//			 + ":lookData('" + item.acceptCriteria + "'"
//			 + ",'criteria');>查看详情</a></td>";
//		} else {
//			dataStr += '<td class="content_td"></td>';
//		}
//	} else {
//		dataStr += '<td class="content_td"></td>';
//	}

	dataStr += '<td class="content_td">' + item.sourceChannel + '</td>';
	
	if (item.blankTable != '' && item.sampleTable != '') {
		dataStr += '<td class="content_td"><a download=' + item.blankTable
				+ ' href=enclosu/entmaterial/blank_table/' + item.blankTable
				+ '>空白模板</a><br /> <a download=' + item.sampleTable
				+ ' href=enclosu/entmaterial/sample_table/' + item.sampleTable
				+ ' >示范文本</a></td>';
	} else if(item.blankTable != '' && item.sampleTable == '') {
		var blankTable = (item.blankTable).split('/');
		dataStr += '<td class="content_td"><a download=' + item.blankTable
				+ ' href=enclosu/entmaterial/blank_table/' + item.blankTable
				+ '>空白模板</a></td>';
	} else if(item.blankTable == '' && item.sampleTable != ''){
		var sampleTable = (item.sampleTable).split('/');
		dataStr += '<td class="content_td"><a download=' + item.sampleTable
				+ ' href=enclosu/entmaterial/sample_table/' + item.sampleTable
				+ '>示范文本</a></td>';
	} else{
		dataStr += '<td class="content_td"></td>';
	}

	/*if (typeof(item.blankTable) != "undefined" && typeof(item.sampleTable) != "undefined") {
		if (item.blankTable != '' && item.sampleTable != '') {
			dataStr += '<td class="content_td"><a download=' + item.blankTable
			 + ' href=enclosu/entmaterial/blank_table/'
			 + item.blankTable + '>空白模板</a><br /> <a download='
			 + item.sampleTable
			 + ' href=enclosu/entmaterial/sample_table/'
			 + item.sampleTable + ' >示范文本</a></td>';
		} else {
			dataStr += '<td class="content_td"></td>';
		}
	} else {
		if (typeof(item.blankTable) != "undefined") {
			if (item.blankTable != '') {
				var blankTable = (item.blankTable).split('/');
				dataStr += '<td class="content_td"><a download='
				 + item.blankTable
				 + ' href=enclosu/entmaterial/blank_table/'
				 + item.blankTable + '>空白模板</a></td>';
			} else {
				dataStr += '<td class="content_td"></td>';
			}
		} else if (typeof(item.sampleTable) != "undefined") {
			if (item.sampleTable != '') {
				var sampleTable = (item.sampleTable).split('/');
				dataStr += '<td class="content_td"><a download='
				 + item.sampleTable
				 + ' href=enclosu/entmaterial/sample_table/'
				 + item.sampleTable + '>示范文本</a></td>';
			} else {
				dataStr += '<td class="content_td"></td>';
			}
		} else {
			dataStr += '<td class="content_td"></td>';
		}
	}*/

	if (typeof(item.fillinNotes) != "undefined") {
		if (item.fillinNotes != '') {
			dataStr += '<td class="content_td"><a href=javascript'
			 + ":lookData('" + item.fillinNotes + "');>查看详情</a></td>";
		} else {
			dataStr += '<td class="content_td"></td>';
		}
	} else {
		dataStr += '<td class="content_td"></td>';
	}

	/*所属事项*/
	if(item.proc_name.length>0){
		dataStr += '<td class="content_td">'+item.proc_name.join(",")+'</td></tr>';
	}else{
		dataStr += '<td class="content_td"></td></tr>';
	}
	tbodyDataSelector.append(dataStr);
}

// 获取分页条
function getPageBar(currentPage, totalPage, total) {
	$("#page div").remove();
	var currentPage = parseInt(currentPage);
	var totalPage = parseInt(totalPage);
	var total = parseInt(total);
	var pageStr = '';
	if (currentPage === 1) {
		pageStr += "<div class='first home home_page'>首页</div><div class='up home_page page_btn'>上一页</div>";
	} else {
		pageStr += "<div class='first home home_page' id='1'>首页</div><div class='up home_page page_btn' id='"
		 + (currentPage - 1) + "'>上一页</div>";
	}

	var curPage = (currentPage + 1);
	if (curPage >= totalPage) {
		curPage = totalPage;
	}
	pageStr += "<div class='next home_page page_btn' id='" + curPage
	 + "'>下一页</div><div class='end home_page page_btn' id='" + totalPage
	 + "'>尾页</div>";

	pageStr += "<div class='page_total'><span>" + '第' + currentPage + '页 共'
	 + totalPage + '页 共' + total + '条' + "</span></div>";

	$("#page").append(pageStr);
}

// 设置分页按钮样式
function setStyleData(currentPage, totalPage) {
	var currentPage = parseInt(currentPage);
	var totalPage = parseInt(totalPage);
	if (currentPage === 1) { // 第一页
		if (currentPage === totalPage) { // 第一页等于总页数
			$(".first").addClass("dis_btn");
			$(".up").addClass("dis_btn");
			$(".next").addClass("dis_btn");
			$(".end").addClass("dis_btn");

			$(".first").attr("disabled", true);
			$(".up").attr("disabled", true);
			$(".next").attr("disabled", true);
			$(".end").attr("disabled", true);
		} else {
			$(".first").addClass("dis_btn");
			$(".up").addClass("dis_btn");
			$(".first").attr("disabled", true);
			$(".up").attr("disabled", true);

			$(".next").removeClass("dis_btn");
			$(".end").removeClass("dis_btn");
			$(".next").addClass("page_color");
			$(".end").addClass("page_color");
			$(".next").attr("disabled", false);
			$(".end").attr("disabled", false);
		}
	} else if (currentPage < totalPage) {
		$(".first").removeClass("dis_btn");
		$(".up").removeClass("dis_btn");
		$(".first").addClass("page_color");
		$(".up").addClass("page_color");
		$(".first").attr("disabled", false);
		$(".up").attr("disabled", false);

		$(".next").removeClass("dis_btn");
		$(".end").removeClass("dis_btn");
		$(".next").addClass("page_color");
		$(".end").addClass("page_color");
		$(".next").attr("disabled", false);
		$(".end").attr("disabled", false);
	} else { // 当前页等于总页数
		$(".next").removeClass("page_color");
		$(".end").removeClass("page_color");
		$(".next").addClass("dis_btn");
		$(".end").addClass("dis_btn");
		$(".next").attr("disabled", true);
		$(".end").attr("disabled", true);

		$(".first").removeClass("dis_btn");
		$(".up").removeClass("dis_btn");
		$(".first").addClass("page_color");
		$(".up").addClass("page_color");
		$(".first").attr("disabled", false);
		$(".up").attr("disabled", false);
	}
}

function getLicense() {
	var guideprocessId = $('#guideprocessId').val();
	$.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		'type': 'GET',
		'url': 'proxy/csx/v1/guideprocess/' + guideprocessId
		 + '/approvers',
		'dataType': 'json',
		'success': function (data) {
			if (typeof(data) != "undefined" && data.length > 0) {
				var tbodyLicenseSelector = $('#tbody_license');
				$.each(data, function (index, item) {
					tableTbodyLicense(tbodyLicenseSelector, item);
				})
			}
		},
		'error': function (xmlhttprequest, errorinfo) {
			console.log('error');
			if (xmlhttprequest.responseJSON.errorCode === "error") {
				window.location.href = getBasePath()
					 + "index/themeService.jsp";
			}
		}
	});
}

function tableTbodyLicense(tbodyLicenseSelector, item) {
	var rsName = "";
	var orgName = "";
	var isShowThis = false;
	if (typeof (item.rsName) != "undefined" && item.rsName != "") {
		rsName = item.rsName;
	}
	if (typeof (item.orgName) != "undefined" && item.orgName != "") {
		orgName = item.orgName;
	}
	if (typeof (item.approveId) != "undefined" && item.approveId != "") {
		isShowThis = true;
	}
	if(isShowThis){
		tbodyLicenseSelector.append('<tr class="content_tr">'
				+ '<td class="content_td">' + rsName + '</td>'
				+ '<td class="content_td">' + orgName + '</td>'
				+ '<td class="content_td"><a href=javascript' + ":lookLicense('"
				+ item.approveId + "'" + ",'condition');>查看详情</a></td>"
				+ '<td class="content_td"><a href=javascript' + ":lookLicense('"
				+ item.approveId + "');>查看详情</a></td>" + "</tr>");
	}
}

function change(val) {
	if (val == 1) {
		$('#tab1').addClass('left_nav_data');
		$('#tab1').removeClass('left_nav_license_change');
		$('#tab2').addClass('left_nav_license_change');
		$('#tab2').removeClass('left_nav_data');
		$('#tab3').addClass('left_nav_license_change');
		$('#tab3').removeClass('left_nav_data');
		$('#tab4').addClass('left_nav_license_change');
		$('#tab4').removeClass('left_nav_data');
		$('#basicInfo').show();
		$('#license_table').hide();
		$('#download_div').hide();
		$('#data_table').hide();
		$('#page').hide();
		$('#flow').hide();
	} else if (val == 2) {
		$('#tab2').addClass('left_nav_data');
		$('#tab2').removeClass('left_nav_license_change');
		$('#tab1').addClass('left_nav_license_change');
		$('#tab1').removeClass('left_nav_data');
		$('#tab3').addClass('left_nav_license_change');
		$('#tab3').removeClass('left_nav_data');
		$('#tab4').addClass('left_nav_license_change');
		$('#tab4').removeClass('left_nav_data');
		$('#download_div').show();
		$('#data_table').show();
		$('#page').show();
		$('#license_table').hide();
		$('#flow').hide();
		$('#basicInfo').hide();
	} else if (val == 3) {
		$('#tab3').addClass('left_nav_data');
		$('#tab3').removeClass('left_nav_license_change');
		$('#tab2').addClass('left_nav_license_change');
		$('#tab2').removeClass('left_nav_data');
		$('#tab4').addClass('left_nav_license_change');
		$('#tab4').removeClass('left_nav_data');
		$('#tab1').addClass('left_nav_license_change');
		$('#tab1').removeClass('left_nav_data');
		$('#license_table').show();
		$('#flow').hide();
		$('#download_div').hide();
		$('#data_table').hide();
		$('#page').hide();
		$('#basicInfo').hide();
	} else if (val == 4) {
		$('#tab4').addClass('left_nav_data');
		$('#tab4').removeClass('left_nav_license_change');
		$('#tab2').addClass('left_nav_license_change');
		$('#tab2').removeClass('left_nav_data');
		$('#tab3').addClass('left_nav_license_change');
		$('#tab3').removeClass('left_nav_data');
		$('#tab1').addClass('left_nav_license_change');
		$('#tab1').removeClass('left_nav_data');
		$('#flow').show();
		$('#license_table').hide();
		$('#download_div').hide();
		$('#data_table').hide();
		$('#page').hide();
		$('#basicInfo').hide();
	}
}

function downloadBatch() {
	var guideprocessId = $('#guideprocessId').val();
	var url = 'proxy/csx/v1/guideprocess/' + guideprocessId + '/amdownload';
	$("#download_iframe").attr("src", url);
}

seajs.config({
	alias: {
		"jquery": "jquery-1.10.2.js"
	}
});

function dialog(data) {
	seajs.use(['jquery', 'dialog'], function ($, dialog) {
		var d = dialog({
				title: '查看详情',
				content: data,
				okValue: '我知道了',
				ok: function () {}
				// cancelValue: '取消',
				// cancel: function () {}
			});
		d.showModal();
	});
}

function lookData(data, type) {
	dialog(data);
}

function manage() {
	window.open(getBasePath() + "jsp/soent.jsp");
}

function advisory() {
	window.open("http://hdjl.hunan.gov.cn/hnRobot/");
}

function getBasePath() {
	var location = (window.location + '').split('/');
	var basePath = location[0] + '//' + location[2] + '/' + location[3] + '/';
	return basePath;
}

function lookLicense(approveId, type) {
	if (typeof(approveId) != "undefined") {
		if (type === 'condition') {
			// 事项受理条件
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				'type': 'GET',
				'url': "proxy/csx/v1/guideprocess/" + approveId
				 + "/acceptancecondition",
				'dataType': 'Text',
				'success': function (data) {
					dialog(data);
				},
				'error': function (xmlhttprequest, errorinfo) {
					console.log('error');
				}
			});
		} else {
			// 事项法律依据
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				'type': 'GET',
				'url': "proxy/csx/v1/guideprocess/" + approveId
				 + "/settinggist",
				'dataType': 'Text',
				'success': function (data) {
					dialog(data);
				},
				'error': function (xmlhttprequest, errorinfo) {
					console.log('error');
				}
			});
		}
	} else {
		console.log('error');
	}
}

function viewAddr(address) {
	window.open("http://api.map.baidu.com/geocoder?address=" + address
		 + "&output=html", "map");
}