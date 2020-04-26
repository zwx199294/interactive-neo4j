
package com.chinacreator.csx.yjsycb;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * 事项材料信息
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.approvematerial", table = "TA_CSX_APPROVEMATERIAL", ds = "c2sys", cache = false)
public class Approvematerial {
	/**
	*材料编号
	*/
	@Column(id = "id", type = ColumnType.uuid, datatype = "string64")
	private java.lang.String id;

	/**
	*材料名称
	*/
	@Column(id = "am_name", datatype = "string512")
	private java.lang.String amName;

	/**
	*材料类型(1:申请材料,2:证明材料,3:证照,9:其他)
	*/
	@Column(id = "am_type", datatype = "string64")
	private java.lang.String amType;

	/**
	*材料份数
	*/
	@Column(id = "am_copies", datatype = "int")
	private java.lang.Integer amCopies;

	/**
	*受理标准
	*/
	@Column(id = "accept_criteria", datatype = "string2000")
	private java.lang.String acceptCriteria;

	/**
	*来源渠道
	*/
	@Column(id = "source_channel", datatype = "string512")
	private java.lang.String sourceChannel;

	/**
	*填报须知
	*/
	@Column(id = "fillin_notes", datatype = "string2000")
	private java.lang.String fillinNotes;

	/**
	*空白表格路径
	*/
	@Column(id = "blank_table", datatype = "string512")
	private java.lang.String blankTable;

	/**
	*示例样表路径
	*/
	@Column(id = "sample_table", datatype = "string512")
	private java.lang.String sampleTable;

	/**
	* 设置材料编号
	*/
	public void setId(java.lang.String id) {
		this.id = id;
	}

	/**
	* 获取材料编号
	*/
	public java.lang.String getId() {
		return id;
	}

	/**
	* 设置材料名称
	*/
	public void setAmName(java.lang.String amName) {
		this.amName = amName;
	}

	/**
	* 获取材料名称
	*/
	public java.lang.String getAmName() {
		return amName;
	}

	/**
	* 设置材料类型(1:申请材料,2:证明材料,3:证照,9:其他)
	*/
	public void setAmType(java.lang.String amType) {
		this.amType = amType;
	}

	/**
	* 获取材料类型(1:申请材料,2:证明材料,3:证照,9:其他)
	*/
	public java.lang.String getAmType() {
		return amType;
	}

	/**
	* 设置材料份数
	*/
	public void setAmCopies(java.lang.Integer amCopies) {
		this.amCopies = amCopies;
	}

	/**
	* 获取材料份数
	*/
	public java.lang.Integer getAmCopies() {
		return amCopies;
	}

	/**
	* 设置受理标准
	*/
	public void setAcceptCriteria(java.lang.String acceptCriteria) {
		this.acceptCriteria = acceptCriteria;
	}

	/**
	* 获取受理标准
	*/
	public java.lang.String getAcceptCriteria() {
		return acceptCriteria;
	}

	/**
	* 设置来源渠道
	*/
	public void setSourceChannel(java.lang.String sourceChannel) {
		this.sourceChannel = sourceChannel;
	}

	/**
	* 获取来源渠道
	*/
	public java.lang.String getSourceChannel() {
		return sourceChannel;
	}

	/**
	* 设置填报须知
	*/
	public void setFillinNotes(java.lang.String fillinNotes) {
		this.fillinNotes = fillinNotes;
	}

	/**
	* 获取填报须知
	*/
	public java.lang.String getFillinNotes() {
		return fillinNotes;
	}

	/**
	* 设置空白表格路径
	*/
	public void setBlankTable(java.lang.String blankTable) {
		this.blankTable = blankTable;
	}

	/**
	* 获取空白表格路径
	*/
	public java.lang.String getBlankTable() {
		return blankTable;
	}

	/**
	* 设置示例样表路径
	*/
	public void setSampleTable(java.lang.String sampleTable) {
		this.sampleTable = sampleTable;
	}

	/**
	* 获取示例样表路径
	*/
	public java.lang.String getSampleTable() {
		return sampleTable;
	}
}
