
package com.chinacreator.csx.yjsycb;

import java.io.Serializable;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * neo4j查询历史
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.graphNeo4jQueryHistory", table = "TA_CSX_GRAPH_NEO4J_QUERYHISTORY", ds = "c2sys")
public class GraphNeo4jQueryHistory implements Serializable {
	private static final long serialVersionUID = 3696428824543232L;
	/**
	*主键
	*/
	@Column(id = "id", type = ColumnType.uuid, datatype = "string64")
	private java.lang.String id;

	/**
	*用户id
	*/
	@Column(id = "user_id", datatype = "string64")
	private java.lang.String userId;

	/**
	*查询语句
	*/
	@Column(id = "cql", datatype = "text")
	private java.lang.String cql;

	/**
	*查询状态 0失败 1成功
	*/
	@Column(id = "status", datatype = "char1")
	private java.lang.String status;

	/**
	*查询错误信息
	*/
	@Column(id = "error_message", datatype = "text")
	private java.lang.String errorMessage;

	/**
	*查询时间
	*/
	@Column(id = "query_time", datatype = "timestamp")
	private java.sql.Timestamp queryTime;

	/**
	* 设置主键
	*/
	public void setId(java.lang.String id) {
		this.id = id;
	}

	/**
	* 获取主键
	*/
	public java.lang.String getId() {
		return id;
	}

	/**
	* 设置用户id
	*/
	public void setUserId(java.lang.String userId) {
		this.userId = userId;
	}

	/**
	* 获取用户id
	*/
	public java.lang.String getUserId() {
		return userId;
	}

	/**
	* 设置查询语句
	*/
	public void setCql(java.lang.String cql) {
		this.cql = cql;
	}

	/**
	* 获取查询语句
	*/
	public java.lang.String getCql() {
		return cql;
	}

	/**
	* 设置查询状态 0失败 1成功
	*/
	public void setStatus(java.lang.String status) {
		this.status = status;
	}

	/**
	* 获取查询状态 0失败 1成功
	*/
	public java.lang.String getStatus() {
		return status;
	}

	/**
	* 设置查询错误信息
	*/
	public void setErrorMessage(java.lang.String errorMessage) {
		this.errorMessage = errorMessage;
	}

	/**
	* 获取查询错误信息
	*/
	public java.lang.String getErrorMessage() {
		return errorMessage;
	}

	/**
	* 设置查询时间
	*/
	public void setQueryTime(java.sql.Timestamp queryTime) {
		this.queryTime = queryTime;
	}

	/**
	* 获取查询时间
	*/
	public java.sql.Timestamp getQueryTime() {
		return queryTime;
	}
}
