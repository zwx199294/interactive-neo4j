
package com.chinacreator.csx.yjsycb;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * 结果样本信息
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.approvers", table = "TA_CSX_APPROVERS", ds = "c2sys", cache = false)
public class Approvers {
	/**
	*结果样本ID
	*/
	@Column(id = "id", type = ColumnType.uuid, datatype = "string64")
	private java.lang.String id;

	/**
	*结果样本名称
	*/
	@Column(id = "rs_name", datatype = "string512")
	private java.lang.String rsName;

	/**
	*事项ID
	*/
	@Column(id = "approve_id", datatype = "string64")
	private java.lang.String approveId;

	/**
	* 设置结果样本ID
	*/
	public void setId(java.lang.String id) {
		this.id = id;
	}

	/**
	* 获取结果样本ID
	*/
	public java.lang.String getId() {
		return id;
	}

	/**
	* 设置结果样本名称
	*/
	public void setRsName(java.lang.String rsName) {
		this.rsName = rsName;
	}

	/**
	* 获取结果样本名称
	*/
	public java.lang.String getRsName() {
		return rsName;
	}

	/**
	* 设置事项ID
	*/
	public void setApproveId(java.lang.String approveId) {
		this.approveId = approveId;
	}

	/**
	* 获取事项ID
	*/
	public java.lang.String getApproveId() {
		return approveId;
	}
}
