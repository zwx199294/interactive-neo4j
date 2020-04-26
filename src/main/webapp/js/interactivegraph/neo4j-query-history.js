/**
 * 查询历史管理
 */
var historyDiv = null;
var input = null;
var userId = "admin";
var history = [];
var isfocused = 0;
$(document).ready(function() {
	historyDiv = $(".search-history");
	historyDiv.hide();
	input = $(".queryInput");
	input.blur(function() {
		if (isfocused == 0) {
			historyDiv.hide();
		} else if (isfocused == 1) {
			input[0].focus();
		}
	});

	$("#graphArea").on("click", function() {
		historyDiv.hide();
	});

	getUserInfo();
});

function getUserInfo() {
	$.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		type : 'GET',
		url : '/csx/v1/getuserinfo',
		dataType : 'json',
		success : function(data, type, request) {
			userId = data.id;
		},
		error : function(xmlhttprequest, errorinfo) {
			userId = "admin";
		}
	});
}

/**
 * 获取前5历史记录
 * 
 * @returns
 */
function getHistoryTop5() {
	var cql = $(".queryInput").val();
	var cond = {
		"userId" : userId,
		"cql" : cql
	}
	$.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		type : 'GET',
		url : server + '/graph/v1/neo4j/history/top5?cond='
				+ encodeURIComponent(JSON.stringify(cond)),
		dataType : 'json',
		success : function(data, type, request) {
			history = data;
			if (data.length > 0) {
				addContentToDiv(data);
				historyDiv.show();
			} else {
				historyDiv.find('ul').children("li").remove();
				historyDiv.hide();
			}
		},
		error : function(xmlhttprequest, errorinfo) {
			historyDiv.hide();
		}
	});
}

/**
 * 将历史记录添加到div
 * 
 * @returns
 */
function addContentToDiv(data) {
	var historyContentUl = $('.content-ul');
	var historyDeleteUl = $('.delete-ul');
	historyContentUl.html('');
	historyDeleteUl.html('');
	for (var i = 0; i < data.length; i++) {
		var li = $("<li id='" + data[i].id + "' title='" + data[i].cql + "'>"
				+ data[i].cql + "</li>")
		var del = $("<li>删除</li>")
		li.appendTo(historyContentUl);
		del.appendTo(historyDeleteUl);
	}
	isfocused = 0;
}

// 提示框鼠标点击事件
$(document).on("click", '.content-ul li', function() {
	input.val(this.innerText);
	historyDiv.hide();
	return true;
});
// 删除所选历史记录
$(document).on("click", '.delete-ul li', function() {
	var deleteli = $(this);
	var index = deleteli.index();
	var contentli = historyDiv.find('.content-ul li').eq(index);
	var text = contentli.text();
	deleteHistory(contentli.attr("id"), deleteli, contentli);
});

$(document).on("mouseenter", '.search-history ul', function() {
	isfocused = 1;
});
$(document).on("mouseleave", '.search-history ul', function() {
	isfocused = 0;
});

$(document).on("mouseenter", '.search-history p', function() {
	isfocused = 1;
});
$(document).on("mouseleave", '.search-history ul', function() {
	isfocused = 0;
});

/**
 * 键盘上键
 * 
 * @returns
 */
function HistoryKeyUp() {
	historyDiv.show();
	if (history.length > 0) {
		var current = historyDiv.find('.content-ul li.hover');
		if (current.length > 0) {
			var nextLi = current.removeClass('hover').prev();
			if (nextLi.length > 0) {
				nextLi.addClass('hover');
				input.val(nextLi.text());
			}
		} else {
			var last = historyDiv.find('.content-ul li').last();
			last.addClass('hover');
			input.val(last.text());
		}
	}
}

/**
 * 键盘下键
 * 
 * @returns
 */
function HistoryKeyDown() {
	historyDiv.show();
	if (history.length > 0) {
		var current = historyDiv.find('.content-ul li.hover');
		if (current.length > 0) {
			var nextLi = current.removeClass('hover').next();
			if (nextLi.length > 0) {
				nextLi.addClass('hover');
				input.val(nextLi.text());
			}
		} else {
			var first = historyDiv.find('.content-ul li').first();
			first.addClass('hover');
			input.val(first.text());
		}
	}

}
/**
 * 新增历史记录
 * 
 * @param data
 * @returns
 */
function addHistory(data) {
	var cql = $(".queryInput").val();
	data.userId = userId;
	$.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		type : 'POST',
		url : server + '/graph/v1/neo4j/history',
		data : JSON.stringify(data),
		dataType : 'json',
		success : function(data, type, request) {
			getHistoryTop5();
		}
	});
}

/**
 * 删除历史记录
 * 
 * @param id
 * @returns
 */
function deleteHistory(id, deleteli, contentli) {
	$.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		type : 'DELETE',
		url : server + '/graph/v1/neo4j/history/' + id,
		dataType : 'json',
		success : function(data, type, request) {
			deleteli.remove();
			contentli.remove();
		}
	});
}
