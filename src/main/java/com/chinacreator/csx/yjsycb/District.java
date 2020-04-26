
package com.chinacreator.csx.yjsycb;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * 地区
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.district", table = "TA_XT_DISTRICT", ds = "c2sys", cache = false)
public class District {
	/**
	*
	*/
	@Column(id = "name", datatype = "string256")
	private java.lang.String name;

	/**
	*
	*/
	@Column(id = "district", datatype = "string256")
	private java.lang.String district;

	/**
	*
	*/
	@Column(id = "code", type = ColumnType.uuid, datatype = "string256")
	private java.lang.String code;

	/**
	* 设置
	*/
	public void setName(java.lang.String name) {
		this.name = name;
	}

	/**
	* 获取
	*/
	public java.lang.String getName() {
		return name;
	}

	/**
	* 设置
	*/
	public void setDistrict(java.lang.String district) {
		this.district = district;
	}

	/**
	* 获取
	*/
	public java.lang.String getDistrict() {
		return district;
	}

	/**
	* 设置
	*/
	public void setCode(java.lang.String code) {
		this.code = code;
	}

	/**
	* 获取
	*/
	public java.lang.String getCode() {
		return code;
	}
}
