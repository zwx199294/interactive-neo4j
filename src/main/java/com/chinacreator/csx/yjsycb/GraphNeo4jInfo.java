
package com.chinacreator.csx.yjsycb;

import java.io.Serializable;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * neo4j数据库信息
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.graphNeo4jInfo", table = "TA_CSX_GRAPH_NEO4J_INFO", ds = "c2sys")
public class GraphNeo4jInfo implements Serializable {
	private static final long serialVersionUID = 3687831942594560L;
	/**
	*主键
	*/
	@Column(id = "id", type = ColumnType.uuid, datatype = "string64")
	private java.lang.String id;

	/**
	*名称
	*/
	@Column(id = "name", datatype = "string256")
	private java.lang.String name;

	/**
	*主机地址
	*/
	@Column(id = "host", datatype = "string64")
	private java.lang.String host;

	/**
	*端口
	*/
	@Column(id = "port", datatype = "int")
	private java.lang.Integer port;

	/**
	*用户名
	*/
	@Column(id = "username", datatype = "string256")
	private java.lang.String username;

	/**
	*密码
	*/
	@Column(id = "password", datatype = "string256")
	private java.lang.String password;

	/**
	*创建时间
	*/
	@Column(id = "create_time", datatype = "timestamp")
	private java.sql.Timestamp createTime;

	/**
	*更新时间
	*/
	@Column(id = "update_time", datatype = "timestamp")
	private java.sql.Timestamp updateTime;

	/**
	*所属用户ID
	*/
	@Column(id = "user_id", datatype = "string64")
	private java.lang.String userId;

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
	* 设置名称
	*/
	public void setName(java.lang.String name) {
		this.name = name;
	}

	/**
	* 获取名称
	*/
	public java.lang.String getName() {
		return name;
	}

	/**
	* 设置主机地址
	*/
	public void setHost(java.lang.String host) {
		this.host = host;
	}

	/**
	* 获取主机地址
	*/
	public java.lang.String getHost() {
		return host;
	}

	/**
	* 设置端口
	*/
	public void setPort(java.lang.Integer port) {
		this.port = port;
	}

	/**
	* 获取端口
	*/
	public java.lang.Integer getPort() {
		return port;
	}

	/**
	* 设置用户名
	*/
	public void setUsername(java.lang.String username) {
		this.username = username;
	}

	/**
	* 获取用户名
	*/
	public java.lang.String getUsername() {
		return username;
	}

	/**
	* 设置密码
	*/
	public void setPassword(java.lang.String password) {
		this.password = password;
	}

	/**
	* 获取密码
	*/
	public java.lang.String getPassword() {
		return password;
	}

	/**
	* 设置创建时间
	*/
	public void setCreateTime(java.sql.Timestamp createTime) {
		this.createTime = createTime;
	}

	/**
	* 获取创建时间
	*/
	public java.sql.Timestamp getCreateTime() {
		return createTime;
	}

	/**
	* 设置更新时间
	*/
	public void setUpdateTime(java.sql.Timestamp updateTime) {
		this.updateTime = updateTime;
	}

	/**
	* 获取更新时间
	*/
	public java.sql.Timestamp getUpdateTime() {
		return updateTime;
	}

	/**
	* 设置所属用户ID
	*/
	public void setUserId(java.lang.String userId) {
		this.userId = userId;
	}

	/**
	* 获取所属用户ID
	*/
	public java.lang.String getUserId() {
		return userId;
	}
}
