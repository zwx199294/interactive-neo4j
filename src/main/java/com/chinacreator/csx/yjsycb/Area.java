
package com.chinacreator.csx.yjsycb;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * 省市地区
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.area", table = "TA_DIC_AREA", ds = "c2sys", cache = false)
public class Area {
	/**
	*
	*/
	@Column(id = "area_id", type = ColumnType.uuid, datatype = "string64")
	private java.lang.String areaId;

	/**
	*
	*/
	@Column(id = "area_code", datatype = "string256")
	private java.lang.String areaCode;

	/**
	*
	*/
	@Column(id = "area_name", datatype = "string1024")
	private java.lang.String areaName;

	/**
	*
	*/
	@Column(id = "parent_code", datatype = "string128")
	private java.lang.String parentCode;

	/**
	*
	*/
	@Column(id = "state", datatype = "char1")
	private java.lang.String state;

	/**
	*
	*/
	@Column(id = "area_sn", datatype = "char1")
	private java.lang.String areaSn;

	/**
	*
	*/
	@Column(id = "order_num", datatype = "bigdecimal")
	private java.math.BigDecimal orderNum;

	/**
	*下发批量说明
	*/
	@Column(id = "dn_cd_batch", datatype = "string32")
	private java.lang.String dnCdBatch;

	/**
	*数据是否第一次下发
	*/
	@Column(id = "is_down", datatype = "string5")
	private java.lang.String isDown;

	/**
	*所属层级（最高为1）
	*/
	@Column(id = "layer", datatype = "int")
	private java.lang.Integer layer;

	/**
	* 设置
	*/
	public void setAreaId(java.lang.String areaId) {
		this.areaId = areaId;
	}

	/**
	* 获取
	*/
	public java.lang.String getAreaId() {
		return areaId;
	}

	/**
	* 设置
	*/
	public void setAreaCode(java.lang.String areaCode) {
		this.areaCode = areaCode;
	}

	/**
	* 获取
	*/
	public java.lang.String getAreaCode() {
		return areaCode;
	}

	/**
	* 设置
	*/
	public void setAreaName(java.lang.String areaName) {
		this.areaName = areaName;
	}

	/**
	* 获取
	*/
	public java.lang.String getAreaName() {
		return areaName;
	}

	/**
	* 设置
	*/
	public void setParentCode(java.lang.String parentCode) {
		this.parentCode = parentCode;
	}

	/**
	* 获取
	*/
	public java.lang.String getParentCode() {
		return parentCode;
	}

	/**
	* 设置
	*/
	public void setState(java.lang.String state) {
		this.state = state;
	}

	/**
	* 获取
	*/
	public java.lang.String getState() {
		return state;
	}

	/**
	* 设置
	*/
	public void setAreaSn(java.lang.String areaSn) {
		this.areaSn = areaSn;
	}

	/**
	* 获取
	*/
	public java.lang.String getAreaSn() {
		return areaSn;
	}

	/**
	* 设置
	*/
	public void setOrderNum(java.math.BigDecimal orderNum) {
		this.orderNum = orderNum;
	}

	/**
	* 获取
	*/
	public java.math.BigDecimal getOrderNum() {
		return orderNum;
	}

	/**
	* 设置下发批量说明
	*/
	public void setDnCdBatch(java.lang.String dnCdBatch) {
		this.dnCdBatch = dnCdBatch;
	}

	/**
	* 获取下发批量说明
	*/
	public java.lang.String getDnCdBatch() {
		return dnCdBatch;
	}

	/**
	* 设置数据是否第一次下发
	*/
	public void setIsDown(java.lang.String isDown) {
		this.isDown = isDown;
	}

	/**
	* 获取数据是否第一次下发
	*/
	public java.lang.String getIsDown() {
		return isDown;
	}

	/**
	* 设置所属层级（最高为1）
	*/
	public void setLayer(java.lang.Integer layer) {
		this.layer = layer;
	}

	/**
	* 获取所属层级（最高为1）
	*/
	public java.lang.Integer getLayer() {
		return layer;
	}
}
