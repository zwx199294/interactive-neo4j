
package com.chinacreator.csx.yjsycb;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * 问题实体
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.ask", table = "TA_CSX_ASK", ds = "c2sys", cache = false)
public class Ask {
	/**
	*问题ID
	*/
	@Column(id = "id", type = ColumnType.uuid, datatype = "string64")
	private java.lang.String id;

	/**
	*问题
	*/
	@Column(id = "ask_name", datatype = "string512")
	private java.lang.String askName;

	/**
	*问题导言
	*/
	@Column(id = "ask_introduction", datatype = "string2000")
	private java.lang.String askIntroduction;

	/**
	*问题类型(单选:s,多选:m,填空:f)
	*/
	@Column(id = "ask_type", datatype = "string5")
	private java.lang.String askType;

	/**
	*名词解释
	*/
	@Column(id = "definitions", datatype = "string2000")
	private java.lang.String definitions;

	/**
	* 设置问题ID
	*/
	public void setId(java.lang.String id) {
		this.id = id;
	}

	/**
	* 获取问题ID
	*/
	public java.lang.String getId() {
		return id;
	}

	/**
	* 设置问题
	*/
	public void setAskName(java.lang.String askName) {
		this.askName = askName;
	}

	/**
	* 获取问题
	*/
	public java.lang.String getAskName() {
		return askName;
	}

	/**
	* 设置问题导言
	*/
	public void setAskIntroduction(java.lang.String askIntroduction) {
		this.askIntroduction = askIntroduction;
	}

	/**
	* 获取问题导言
	*/
	public java.lang.String getAskIntroduction() {
		return askIntroduction;
	}

	/**
	* 设置问题类型(单选:s,多选:m,填空:f)
	*/
	public void setAskType(java.lang.String askType) {
		this.askType = askType;
	}

	/**
	* 获取问题类型(单选:s,多选:m,填空:f)
	*/
	public java.lang.String getAskType() {
		return askType;
	}

	/**
	* 设置名词解释
	*/
	public void setDefinitions(java.lang.String definitions) {
		this.definitions = definitions;
	}

	/**
	* 获取名词解释
	*/
	public java.lang.String getDefinitions() {
		return definitions;
	}
}
