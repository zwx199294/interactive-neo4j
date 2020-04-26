/**
 * neo4j数据源管理
 */
$(document).ready(function() {
	$("#dbId").change(function() {
		var dbId = $("#dbId").val();
		selectNeo4jDB(dbId);
	});
});

var allDatasource = {};
var selectedDbId = null;
/**
 * 获取所有数据库信息
 * 
 * @returns
 */
function getAllNeo4jDB() {
	$.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json',
		},
		type : 'GET',
		url : server + "/graph/v1/neo4j/all",
		dataType : 'json',
		success : function(data, type, request) {
			$("#dbId").html("");
			$("#dbId").append($("<option disabled selected value></option>"));
			allDatasource = data;
			for ( var i in data) {
				var option = $("<option value = " + data[i].id + ">"
						+ data[i].name + "</option>")
				option.appendTo($("#dbId"));
			}
			if (selectedDbId != null) {
				$("#dbId").val(selectedDbId);
			}
		},
		error : function(xmlhttprequest, errorinfo) {
			console.log(xmlhttprequest.responseJSON.errorMessage);
			alert(xmlhttprequest.responseJSON.errorMessage);
		}
	});
}

function selectNeo4jDB(dbId) {
	for ( var i in allDatasource) {
		if (dbId == allDatasource[i].id) {
			selectedDbId = dbId;
			$("#dbName").val(allDatasource[i].name);
			$("#host").val(allDatasource[i].host);
			$("#port").val(allDatasource[i].port);
			$("#username").val(allDatasource[i].username);
			$("#password").val(allDatasource[i].password);
			$("#password").attr("disabled", true);
			validate();
		}
	}
}

/**
 * 新增按钮事件
 */
function saveNeo4jBtn() {
	var dbId = $("#dbId").val();
	if (dbId == null || dbId == "") {
		save();
	} else {
		update();
	}
}

function save() {
	if (validate()) {
		var dbInfo = {};
		dbInfo.name = $("#dbName").val().trim();
		dbInfo.host = $("#host").val().trim();
		dbInfo.port = $("#port").val().trim();
		dbInfo.username = $("#username").val().trim();
		dbInfo.password = $("#password").val().trim();
		$.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
			},
			type : 'POST',
			url : server + "/graph/v1/neo4j/info",
			data : JSON.stringify(dbInfo),
			dataType : 'json',
			success : function(data, type, request) {
				showSaveInfo("新增成功", "green");
				getAllNeo4jDB();
				selectedDbId = data.id;
			},
			error : function(xmlhttprequest, errorinfo) {
				console.log(xmlhttprequest.responseJSON.errorMessage);
				showSaveInfo(xmlhttprequest.responseJSON.errorMessage, "red");
			}
		});
	}
}

function update() {
	if (validate()) {
		var dbInfo = {};
		dbInfo.id = $("#dbId").val().trim();
		dbInfo.name = $("#dbName").val().trim();
		dbInfo.host = $("#host").val().trim();
		dbInfo.port = $("#port").val().trim();
		dbInfo.username = $("#username").val().trim();
		dbInfo.password = $("#password").val().trim();
		$.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
			},
			type : 'PUT',
			url : server + "/graph/v1/neo4j/info",
			data : JSON.stringify(dbInfo),
			dataType : 'json',
			success : function(data, type, request) {
				showSaveInfo("更新成功", "green");
				getAllNeo4jDB();
			},
			error : function(xmlhttprequest, errorinfo) {
				console.log(xmlhttprequest.responseJSON.errorMessage);
				showSaveInfo(xmlhttprequest.responseJSON.errorMessage, "red");
			}
		});
	}
}
/**
 * 重置按钮事件
 * 
 * @returns
 */
function resetDBBtn() {
	selectedDbId = null;
	$("#dbId").val(null);
	$("#dbName").val(null);
	$("#host").val(null);
	$("#port").val(null);
	$("#username").val(null);
	$("#password").val(null);
	$("#password").attr("disabled", false);
}

function deleteDBBtn() {
	var dbId = $("#dbId").val();
	if (dbId == null || dbId == "") {
		showSaveInfo("请选择一个数据库", "red");
		return;
	} else {
		$.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
			},
			type : 'DELETE',
			url : server + "/graph/v1/neo4j/info/" + dbId,
			dataType : 'json',
			success : function(data, type, request) {
				showSaveInfo("删除成功", "green");
				resetDBBtn();
				getAllNeo4jDB();
			},
			error : function(xmlhttprequest, errorinfo) {
				console.log(xmlhttprequest.responseJSON.errorMessage);
				showSaveInfo(xmlhttprequest.responseJSON.errorMessage, "red");
			}
		});
	}
}

function updatePassword() {
	var disabled = $("#password").attr("disabled");
	if (!disabled) {
		if ($("#password").val() == null || $("#password").val() == "") {
			selectNeo4jDB(selectedDbId);
		}
		$("#password").attr("disabled", true);
	} else {
		$("#password").attr("disabled", false);
		$("#password").val(null);
	}
}
/**
 * 显示保存信息
 * 
 * @param info
 * @param color
 * @returns
 */
function showSaveInfo(info, color) {
	$("#saveInfo").html(info);
	$("#saveInfo").attr("title", info)
	$("#saveInfo").css("color", color);
	setTimeout(function() {
		$("#saveInfo").html("");
		$("#saveInfo").attr("title", "")
	}, 3000);
}

function validate() {
	var dbName = $("#dbName").val().trim();
	var host = $("#host").val().trim();
	var port = $("#port").val().trim();
	var username = $("#username").val().trim();
	var password = $("#password").val().trim();
	var valid = true;
	if (dbName == null || dbName == "") {
		$("#dbId").css("border-color", "red");
		valid = false;
	} else {
		$("#dbId").css("border-color", "white");
	}
	if (host == null || host == "") {
		$("#host").css("border-color", "red");
		valid = false;
	} else {
		$("#host").css("border-color", "white");
	}
	if (port == null || port == "") {
		$("#port").css("border-color", "red");
		valid = false;
	} else {
		$("#port").css("border-color", "white");
	}
	if (username == null || username == "") {
		$("#username").css("border-color", "red");
		valid = false;
	} else {
		$("#username").css("border-color", "white");
	}
	if (password == null || password == "") {
		$("#password").css("border-color", "red");
		valid = false;
	} else {
		$("#password").css("border-color", "white");
	}
	return valid;
}