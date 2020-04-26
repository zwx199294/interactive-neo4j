
package com.chinacreator.csx.yjsycb;

import java.io.Serializable;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * 用户实际问答表
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.qarecodact", table = "TA_CSX_QARECORD_ACTUAL", ds = "c2sys")
public class Qarecodact implements Serializable {
	private static final long serialVersionUID = 3343766667575296L;
	/**
	*序号
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
	*答案ID
	*/
	@Column(id = "answer_id", datatype = "string256")
	private java.lang.String answerId;

	/**
	*流程指导ID
	*/
	@Column(id = "guideprocess_id", datatype = "string64")
	private java.lang.String guideprocessId;

	/**
	*问答时间
	*/
	@Column(id = "create_time", datatype = "timestamp")
	private java.sql.Timestamp createTime;

	/**
	* 设置序号
	*/
	public void setId(java.lang.String id) {
		this.id = id;
	}

	/**
	* 获取序号
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
	* 设置答案ID
	*/
	public void setAnswerId(java.lang.String answerId) {
		this.answerId = answerId;
	}

	/**
	* 获取答案ID
	*/
	public java.lang.String getAnswerId() {
		return answerId;
	}

	/**
	* 设置流程指导ID
	*/
	public void setGuideprocessId(java.lang.String guideprocessId) {
		this.guideprocessId = guideprocessId;
	}

	/**
	* 获取流程指导ID
	*/
	public java.lang.String getGuideprocessId() {
		return guideprocessId;
	}

	/**
	* 设置问答时间
	*/
	public void setCreateTime(java.sql.Timestamp createTime) {
		this.createTime = createTime;
	}

	/**
	* 获取问答时间
	*/
	public java.sql.Timestamp getCreateTime() {
		return createTime;
	}
}
