
package com.chinacreator.csx.yjsycb;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * 答案说明
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.answer", table = "TA_CSX_ANSWER", ds = "c2sys", cache = false)
public class Answer {
	/**
	*答案ID
	*/
	@Column(id = "id", type = ColumnType.uuid, datatype = "string64")
	private java.lang.String id;

	/**
	*答案
	*/
	@Column(id = "answer_name", datatype = "text")
	private java.lang.String answerName;

	/**
	*响应说明
	*/
	@Column(id = "response_desc", datatype = "text")
	private java.lang.String responseDesc;

	/**
	*名词解释
	*/
	@Column(id = "explain_desc", datatype = "text")
	private java.lang.String explainDesc;

	/**
	* 设置答案ID
	*/
	public void setId(java.lang.String id) {
		this.id = id;
	}

	/**
	* 获取答案ID
	*/
	public java.lang.String getId() {
		return id;
	}

	/**
	* 设置答案
	*/
	public void setAnswerName(java.lang.String answerName) {
		this.answerName = answerName;
	}

	/**
	* 获取答案
	*/
	public java.lang.String getAnswerName() {
		return answerName;
	}

	/**
	* 设置响应说明
	*/
	public void setResponseDesc(java.lang.String responseDesc) {
		this.responseDesc = responseDesc;
	}

	/**
	* 获取响应说明
	*/
	public java.lang.String getResponseDesc() {
		return responseDesc;
	}

	/**
	* 设置名词解释
	*/
	public void setExplainDesc(java.lang.String explainDesc) {
		this.explainDesc = explainDesc;
	}

	/**
	* 获取名词解释
	*/
	public java.lang.String getExplainDesc() {
		return explainDesc;
	}
}
