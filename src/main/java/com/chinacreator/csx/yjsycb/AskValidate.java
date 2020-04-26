
package com.chinacreator.csx.yjsycb;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * 问题正则表达式
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.askValidate", table = "TA_CSX_ASK_VALIDATE", ds = "c2sys", cache = false)
public class AskValidate {
	/**
	*正则ID
	*/
	@Column(id = "id", type = ColumnType.uuid, datatype = "string64")
	private java.lang.String id;

	/**
	*主题ID
	*/
	@Column(id = "theme_id", datatype = "string64")
	private java.lang.String themeId;

	/**
	*问题ID
	*/
	@Column(id = "ask_id", datatype = "string64")
	private java.lang.String askId;

	/**
	*验证正则
	*/
	@Column(id = "validate_regex", datatype = "string512")
	private java.lang.String validateRegex;

	/**
	*正则验证失败消息
	*/
	@Column(id = "validate_err_mess", datatype = "string2000")
	private java.lang.String validateErrMess;

	/**
	*排序号
	*/
	@Column(id = "sn", datatype = "bigdouble")
	private java.lang.Double sn;

	/**
	* 设置正则ID
	*/
	public void setId(java.lang.String id) {
		this.id = id;
	}

	/**
	* 获取正则ID
	*/
	public java.lang.String getId() {
		return id;
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
	* 设置问题ID
	*/
	public void setAskId(java.lang.String askId) {
		this.askId = askId;
	}

	/**
	* 获取问题ID
	*/
	public java.lang.String getAskId() {
		return askId;
	}

	/**
	* 设置验证正则
	*/
	public void setValidateRegex(java.lang.String validateRegex) {
		this.validateRegex = validateRegex;
	}

	/**
	* 获取验证正则
	*/
	public java.lang.String getValidateRegex() {
		return validateRegex;
	}

	/**
	* 设置正则验证失败消息
	*/
	public void setValidateErrMess(java.lang.String validateErrMess) {
		this.validateErrMess = validateErrMess;
	}

	/**
	* 获取正则验证失败消息
	*/
	public java.lang.String getValidateErrMess() {
		return validateErrMess;
	}

	/**
	* 设置排序号
	*/
	public void setSn(java.lang.Double sn) {
		this.sn = sn;
	}

	/**
	* 获取排序号
	*/
	public java.lang.Double getSn() {
		return sn;
	}
}
