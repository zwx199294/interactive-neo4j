
package com.chinacreator.csx.yjsycb;

import java.io.Serializable;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * 流程指导表
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.guideprocess", table = "TA_CSX_GUIDEPROCESS", ds = "c2sys")
public class Guideprocess implements Serializable {
	private static final long serialVersionUID = 3360918655107072L;
	/**
	*序号ID
	*/
	@Column(id = "id", type = ColumnType.uuid, datatype = "string64")
	private java.lang.String id;

	/**
	*流程指导ID
	*/
	@Column(id = "guide_process_id", datatype = "string64")
	private java.lang.String guideProcessId;

	/**
	*页面元素
	*/
	@Column(id = "page_element", datatype = "text")
	private java.lang.String pageElement;

	/**
	*创建日期
	*/
	@Column(id = "create_date", datatype = "timestamp")
	private java.sql.Timestamp createDate;

	/**
	*主题ID
	*/
	@Column(id = "theme_id", datatype = "string64")
	private java.lang.String themeId;

	/**
	*页码
	*/
	@Column(id = "page", datatype = "int")
	private java.lang.Integer page;

	/**
	* 设置序号ID
	*/
	public void setId(java.lang.String id) {
		this.id = id;
	}

	/**
	* 获取序号ID
	*/
	public java.lang.String getId() {
		return id;
	}

	/**
	* 设置流程指导ID
	*/
	public void setGuideProcessId(java.lang.String guideProcessId) {
		this.guideProcessId = guideProcessId;
	}

	/**
	* 获取流程指导ID
	*/
	public java.lang.String getGuideProcessId() {
		return guideProcessId;
	}

	/**
	* 设置页面元素
	*/
	public void setPageElement(java.lang.String pageElement) {
		this.pageElement = pageElement;
	}

	/**
	* 获取页面元素
	*/
	public java.lang.String getPageElement() {
		return pageElement;
	}

	/**
	* 设置创建日期
	*/
	public void setCreateDate(java.sql.Timestamp createDate) {
		this.createDate = createDate;
	}

	/**
	* 获取创建日期
	*/
	public java.sql.Timestamp getCreateDate() {
		return createDate;
	}

	/**
	* 设置主题ID
	*/
	public void setThemeId(java.lang.String themeId) {
		this.themeId = themeId;
	}

	/**
	* 获取主题ID
	*/
	public java.lang.String getThemeId() {
		return themeId;
	}

	/**
	* 设置页码
	*/
	public void setPage(java.lang.Integer page) {
		this.page = page;
	}

	/**
	* 获取页码
	*/
	public java.lang.Integer getPage() {
		return page;
	}
}
