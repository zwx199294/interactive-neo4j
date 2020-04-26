
package com.chinacreator.csx.yjsycb;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * 部门
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.department", table = "TA_XT_DEPARTMENT", ds = "c2sys", cache = false)
public class Department {
	/**
	*
	*/
	@Column(id = "id", type = ColumnType.uuid, datatype = "int")
	private java.lang.Integer id;

	/**
	*机构名称
	*/
	@Column(id = "name", datatype = "text")
	private java.lang.String name;

	/**
	*机构显示名称
	*/
	@Column(id = "show_name", datatype = "text")
	private java.lang.String showName;

	/**
	*部门代码
	*/
	@Column(id = "dept_code", datatype = "int")
	private java.lang.Integer deptCode;

	/**
	*部门名称（简称）
	*/
	@Column(id = "short_name", datatype = "text")
	private java.lang.String shortName;

	/**
	*层级
	*/
	@Column(id = "tier", datatype = "tinyclob")
	private java.lang.String tier;

	/**
	*地区
	*/
	@Column(id = "area", datatype = "text")
	private java.lang.String area;

	/**
	*行政区码
	*/
	@Column(id = "district_code", datatype = "text")
	private java.lang.String districtCode;

	/**
	*统一社会信用代码
	*/
	@Column(id = "social_credit_code", datatype = "text")
	private java.lang.String socialCreditCode;

	/**
	*状态
	*/
	@Column(id = "status", datatype = "text")
	private java.lang.String status;

	/**
	*搜索代码
	*/
	@Column(id = "code", datatype = "tinyclob")
	private java.lang.String code;

	/**
	*可信度
	*/
	@Column(id = "credit_level", datatype = "long")
	private java.lang.Long creditLevel;

	/**
	* 设置
	*/
	public void setId(java.lang.Integer id) {
		this.id = id;
	}

	/**
	* 获取
	*/
	public java.lang.Integer getId() {
		return id;
	}

	/**
	* 设置机构名称
	*/
	public void setName(java.lang.String name) {
		this.name = name;
	}

	/**
	* 获取机构名称
	*/
	public java.lang.String getName() {
		return name;
	}

	/**
	* 设置机构显示名称
	*/
	public void setShowName(java.lang.String showName) {
		this.showName = showName;
	}

	/**
	* 获取机构显示名称
	*/
	public java.lang.String getShowName() {
		return showName;
	}

	/**
	* 设置部门代码
	*/
	public void setDeptCode(java.lang.Integer deptCode) {
		this.deptCode = deptCode;
	}

	/**
	* 获取部门代码
	*/
	public java.lang.Integer getDeptCode() {
		return deptCode;
	}

	/**
	* 设置部门名称（简称）
	*/
	public void setShortName(java.lang.String shortName) {
		this.shortName = shortName;
	}

	/**
	* 获取部门名称（简称）
	*/
	public java.lang.String getShortName() {
		return shortName;
	}

	/**
	* 设置层级
	*/
	public void setTier(java.lang.String tier) {
		this.tier = tier;
	}

	/**
	* 获取层级
	*/
	public java.lang.String getTier() {
		return tier;
	}

	/**
	* 设置地区
	*/
	public void setArea(java.lang.String area) {
		this.area = area;
	}

	/**
	* 获取地区
	*/
	public java.lang.String getArea() {
		return area;
	}

	/**
	* 设置行政区码
	*/
	public void setDistrictCode(java.lang.String districtCode) {
		this.districtCode = districtCode;
	}

	/**
	* 获取行政区码
	*/
	public java.lang.String getDistrictCode() {
		return districtCode;
	}

	/**
	* 设置统一社会信用代码
	*/
	public void setSocialCreditCode(java.lang.String socialCreditCode) {
		this.socialCreditCode = socialCreditCode;
	}

	/**
	* 获取统一社会信用代码
	*/
	public java.lang.String getSocialCreditCode() {
		return socialCreditCode;
	}

	/**
	* 设置状态
	*/
	public void setStatus(java.lang.String status) {
		this.status = status;
	}

	/**
	* 获取状态
	*/
	public java.lang.String getStatus() {
		return status;
	}

	/**
	* 设置搜索代码
	*/
	public void setCode(java.lang.String code) {
		this.code = code;
	}

	/**
	* 获取搜索代码
	*/
	public java.lang.String getCode() {
		return code;
	}

	/**
	* 设置可信度
	*/
	public void setCreditLevel(java.lang.Long creditLevel) {
		this.creditLevel = creditLevel;
	}

	/**
	* 获取可信度
	*/
	public java.lang.Long getCreditLevel() {
		return creditLevel;
	}
}
