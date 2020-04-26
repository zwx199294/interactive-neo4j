
package com.chinacreator.csx.yjsycb;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * 事项信息
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.approve", table = "TA_CSX_APPROVE", ds = "c2sys", cache = false)
public class Approve {
	/**
	*事项ID
	*/
	@Column(id = "id", type = ColumnType.uuid, datatype = "string64")
	private java.lang.String id;

	/**
	*事项名称
	*/
	@Column(id = "approve_name", datatype = "text")
	private java.lang.String approveName;

	/**
	*事项类型
	*/
	@Column(id = "type_code", datatype = "string64")
	private java.lang.String typeCode;

	/**
	*设定依据
	*/
	@Column(id = "setting_gist", datatype = "text")
	private java.lang.String settingGist;

	/**
	*受理条件
	*/
	@Column(id = "acceptance_condition", datatype = "text")
	private java.lang.String acceptanceCondition;

	/**
	*事项导言
	*/
	@Column(id = "introduction", datatype = "text")
	private java.lang.String introduction;

	/**
	*实施主体
	*/
	@Column(id = "org_name", datatype = "text")
	private java.lang.String orgName;

	/**
	*分页码
	*/
	@Column(id = "page", datatype = "int")
	private java.lang.Integer page;

	/**
	*承诺时限
	*/
	@Column(id = "approve_limit", datatype = "text")
	private java.lang.String approveLimit;

	/**
	*全局ID
	*/
	@Column(id = "globalid", datatype = "text")
	private java.lang.String globalid;

	/**
	*必要材料
	*/
	@Column(id = "necessary_materials", datatype = "text")
	private java.lang.String necessaryMaterials;

	/**
	*非必要材料
	*/
	@Column(id = "unnecessary_materials", datatype = "text")
	private java.lang.String unnecessaryMaterials;

	/**
	*结果材料
	*/
	@Column(id = "resulrts", datatype = "text")
	private java.lang.String resulrts;

	/**
	* 设置事项ID
	*/
	public void setId(java.lang.String id) {
		this.id = id;
	}

	/**
	* 获取事项ID
	*/
	public java.lang.String getId() {
		return id;
	}

	/**
	* 设置事项名称
	*/
	public void setApproveName(java.lang.String approveName) {
		this.approveName = approveName;
	}

	/**
	* 获取事项名称
	*/
	public java.lang.String getApproveName() {
		return approveName;
	}

	/**
	* 设置事项类型
	*/
	public void setTypeCode(java.lang.String typeCode) {
		this.typeCode = typeCode;
	}

	/**
	* 获取事项类型
	*/
	public java.lang.String getTypeCode() {
		return typeCode;
	}

	/**
	* 设置设定依据
	*/
	public void setSettingGist(java.lang.String settingGist) {
		this.settingGist = settingGist;
	}

	/**
	* 获取设定依据
	*/
	public java.lang.String getSettingGist() {
		return settingGist;
	}

	/**
	* 设置受理条件
	*/
	public void setAcceptanceCondition(java.lang.String acceptanceCondition) {
		this.acceptanceCondition = acceptanceCondition;
	}

	/**
	* 获取受理条件
	*/
	public java.lang.String getAcceptanceCondition() {
		return acceptanceCondition;
	}

	/**
	* 设置事项导言
	*/
	public void setIntroduction(java.lang.String introduction) {
		this.introduction = introduction;
	}

	/**
	* 获取事项导言
	*/
	public java.lang.String getIntroduction() {
		return introduction;
	}

	/**
	* 设置实施主体
	*/
	public void setOrgName(java.lang.String orgName) {
		this.orgName = orgName;
	}

	/**
	* 获取实施主体
	*/
	public java.lang.String getOrgName() {
		return orgName;
	}

	/**
	* 设置分页码
	*/
	public void setPage(java.lang.Integer page) {
		this.page = page;
	}

	/**
	* 获取分页码
	*/
	public java.lang.Integer getPage() {
		return page;
	}

	/**
	* 设置承诺时限
	*/
	public void setApproveLimit(java.lang.String approveLimit) {
		this.approveLimit = approveLimit;
	}

	/**
	* 获取承诺时限
	*/
	public java.lang.String getApproveLimit() {
		return approveLimit;
	}

	/**
	* 设置全局ID
	*/
	public void setGlobalid(java.lang.String globalid) {
		this.globalid = globalid;
	}

	/**
	* 获取全局ID
	*/
	public java.lang.String getGlobalid() {
		return globalid;
	}

	/**
	* 设置必要材料
	*/
	public void setNecessaryMaterials(java.lang.String necessaryMaterials) {
		this.necessaryMaterials = necessaryMaterials;
	}

	/**
	* 获取必要材料
	*/
	public java.lang.String getNecessaryMaterials() {
		return necessaryMaterials;
	}

	/**
	* 设置非必要材料
	*/
	public void setUnnecessaryMaterials(java.lang.String unnecessaryMaterials) {
		this.unnecessaryMaterials = unnecessaryMaterials;
	}

	/**
	* 获取非必要材料
	*/
	public java.lang.String getUnnecessaryMaterials() {
		return unnecessaryMaterials;
	}

	/**
	* 设置结果材料
	*/
	public void setResulrts(java.lang.String resulrts) {
		this.resulrts = resulrts;
	}

	/**
	* 获取结果材料
	*/
	public java.lang.String getResulrts() {
		return resulrts;
	}
}
