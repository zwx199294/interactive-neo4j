$(function() {
	setThemeSelect();
	$("#update").on('click', function() {
		var disabled = $(this).attr("disabled"); // 禁止重复点击
		if (typeof (disabled) === "undefined") {
			update();
		}
	});

});

function setThemeSelect() {
	$.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		'type' : 'GET',
		'url' : 'proxy/csx/v1/theme',
		'dataType' : 'json',
		'success' : function(data) {
			if (typeof (data) != "undefined") {
				var themeSelector = $('#theme-select');
				$.each(data, function(index, item) {
					themeData(themeSelector, item);
				})
				$('#theme-select').searchableSelect();
			}
		},
		error : function(xmlhttprequest, errorinfo) {
		}
	});
}

function themeData(themeSelector, item) {
	var dataStr = '<option value ="' + item.id + '">' + item.themeName
			+ '</option>';
	themeSelector.append(dataStr);
}

function update() {
	var themeId = $('#theme-select').val();
	console.log(themeId)
	if (themeId === '') {
		updateAll();
	} else {
		updateByThemeId(themeId);
	}
}

var methodIndex;
var statusStr = '';
function updateAll() {
	$('#area').html('');
	statusStr = '正在更新...\n';
	$('#area').html(statusStr);
	$('#update').addClass("dis_btn");
	$('#update').attr("disabled", true);
	$.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		'type' : 'POST',
		'url' : 'proxy/csx/v1/theme/resetqa',
		'dataType' : 'json',
		'success' : function(data) {
		},
		'error' : function(xmlhttprequest, errorinfo) {
		}
	});
	methodIndex = setInterval(function() {
		status()
	}, 2000);
}

function status() {
	$.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		'type' : 'GET',
		'url' : 'proxy/csx/v1/theme/resetqastatus',
		'dataType' : 'json',
		'success' : function(data) {
			statusStr += data.mess + "\n";
			$('#area').html(statusStr);
			if (data.status === "1") {
				$('#update').removeClass("dis_btn");
				$('#update').attr("disabled", false);
				clearInterval(methodIndex);
			} else if (data.status === "-1") {
				$('#update').removeClass("dis_btn");
				$('#update').attr("disabled", false);
				clearInterval(methodIndex);
			}
		},
		error : function(xmlhttprequest, errorinfo) {
		}
	})
}

function updateByThemeId(themeId) {
	$('#update').removeClass("dis_btn");
	$('#update').attr("disabled", false);
	$('#area').html('');
	statusStr = '正在更新...\n';
	$('#area').html(statusStr);
	$.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		'type' : 'POST',
		'url' : 'proxy/csx/v1/theme/' + themeId + '/resetqa',
		'dataType' : 'json',
		'success' : function(data) {
			if (data.status === "1") {
				statusStr += "更新成功！";
				$('#area').html(statusStr);
			} else {
				statusStr += data.mess;
				$('#area').html(data.mess);
			}
		},
		error : function(xmlhttprequest, errorinfo) {
		}
	});
}