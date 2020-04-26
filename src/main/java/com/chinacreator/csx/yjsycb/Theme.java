
package com.chinacreator.csx.yjsycb;

import com.chinacreator.c2.annotation.Column;
import com.chinacreator.c2.annotation.ColumnType;
import com.chinacreator.c2.annotation.Entity;

/**
 * 主题
 * @author 
 * @generated
 */
@Entity(id = "entity:com.chinacreator.csx.yjsycb.theme", table = "TA_CSX_THEME", ds = "c2sys", cache = false)
public class Theme {
	/**
	*主题ID
	*/
	@Column(id = "id", type = ColumnType.uuid, datatype = "string64")
	private java.lang.String id;

	/**
	*主题名称
	*/
	@Column(id = "theme_name", datatype = "string512")
	private java.lang.String themeName;

	/**
	*排序号
	*/
	@Column(id = "sn", datatype = "int")
	private java.lang.Integer sn;

	/**
	*主题分组
	*/
	@Column(id = "group_name", datatype = "string64")
	private java.lang.String groupName;

	/**
	*区域问题
	*/
	@Column(id = "district_problem", datatype = "string128")
	private java.lang.String districtProblem;

	/**
	*办理层级
	*/
	@Column(id = "layer", datatype = "int")
	private java.lang.Integer layer;

	/**
	*匹配的明白卡
	*/
	@Column(id = "match_name", datatype = "text")
	private java.lang.String matchName;

	/**
	*涉及部门
	*/
	@Column(id = "department", datatype = "tinyclob")
	private java.lang.String department;

	/**
	*是否收费
	*/
	@Column(id = "cost", datatype = "tinyclob")
	private java.lang.String cost;

	/**
	*承诺时限
	*/
	@Column(id = "deadline", datatype = "tinyclob")
	private java.lang.String deadline;

	/**
	*结果送达
	*/
	@Column(id = "send_result", datatype = "text")
	private java.lang.String sendResult;

	/**
	*监督投诉渠道
	*/
	@Column(id = "monitor", datatype = "text")
	private java.lang.String monitor;

	/**
	*办公地址时间
	*/
	@Column(id = "address_time", datatype = "text")
	private java.lang.String addressTime;

	/**
	*百度地址
	*/
	@Column(id = "baidu_address", datatype = "string256")
	private java.lang.String baiduAddress;

	/**
	*办公时间
	*/
	@Column(id = "working_hour", datatype = "string128")
	private java.lang.String workingHour;

	/**
	*明白卡匹配相似度
	*/
	@Column(id = "sim", datatype = "string10")
	private java.lang.String sim;

	/**
	*搜索关键字
	*/
	@Column(id = "keyword", datatype = "string1024")
	private java.lang.String keyword;

	/**
	*导言
	*/
	@Column(id = "introduction", datatype = "text")
	private java.lang.String introduction;

	/**
	*解释
	*/
	@Column(id = "consultation", datatype = "text")
	private java.lang.String consultation;

	/**
	*咨询方式
	*/
	@Column(id = "style", datatype = "text")
	private java.lang.String style;

	/**
	* 设置主题ID
	*/
	public void setId(java.lang.String id) {
		this.id = id;
	}

	/**
	* 获取主题ID
	*/
	public java.lang.String getId() {
		return id;
	}

	/**
	* 设置主题名称
	*/
	public void setThemeName(java.lang.String themeName) {
		this.themeName = themeName;
	}

	/**
	* 获取主题名称
	*/
	public java.lang.String getThemeName() {
		return themeName;
	}

	/**
	* 设置排序号
	*/
	public void setSn(java.lang.Integer sn) {
		this.sn = sn;
	}

	/**
	* 获取排序号
	*/
	public java.lang.Integer getSn() {
		return sn;
	}

	/**
	* 设置主题分组
	*/
	public void setGroupName(java.lang.String groupName) {
		this.groupName = groupName;
	}

	/**
	* 获取主题分组
	*/
	public java.lang.String getGroupName() {
		return groupName;
	}

	/**
	* 设置区域问题
	*/
	public void setDistrictProblem(java.lang.String districtProblem) {
		this.districtProblem = districtProblem;
	}

	/**
	* 获取区域问题
	*/
	public java.lang.String getDistrictProblem() {
		return districtProblem;
	}

	/**
	* 设置办理层级
	*/
	public void setLayer(java.lang.Integer layer) {
		this.layer = layer;
	}

	/**
	* 获取办理层级
	*/
	public java.lang.Integer getLayer() {
		return layer;
	}

	/**
	* 设置匹配的明白卡
	*/
	public void setMatchName(java.lang.String matchName) {
		this.matchName = matchName;
	}

	/**
	* 获取匹配的明白卡
	*/
	public java.lang.String getMatchName() {
		return matchName;
	}

	/**
	* 设置涉及部门
	*/
	public void setDepartment(java.lang.String department) {
		this.department = department;
	}

	/**
	* 获取涉及部门
	*/
	public java.lang.String getDepartment() {
		return department;
	}

	/**
	* 设置是否收费
	*/
	public void setCost(java.lang.String cost) {
		this.cost = cost;
	}

	/**
	* 获取是否收费
	*/
	public java.lang.String getCost() {
		return cost;
	}

	/**
	* 设置承诺时限
	*/
	public void setDeadline(java.lang.String deadline) {
		this.deadline = deadline;
	}

	/**
	* 获取承诺时限
	*/
	public java.lang.String getDeadline() {
		return deadline;
	}

	/**
	* 设置结果送达
	*/
	public void setSendResult(java.lang.String sendResult) {
		this.sendResult = sendResult;
	}

	/**
	* 获取结果送达
	*/
	public java.lang.String getSendResult() {
		return sendResult;
	}

	/**
	* 设置监督投诉渠道
	*/
	public void setMonitor(java.lang.String monitor) {
		this.monitor = monitor;
	}

	/**
	* 获取监督投诉渠道
	*/
	public java.lang.String getMonitor() {
		return monitor;
	}

	/**
	* 设置办公地址时间
	*/
	public void setAddressTime(java.lang.String addressTime) {
		this.addressTime = addressTime;
	}

	/**
	* 获取办公地址时间
	*/
	public java.lang.String getAddressTime() {
		return addressTime;
	}

	/**
	* 设置百度地址
	*/
	public void setBaiduAddress(java.lang.String baiduAddress) {
		this.baiduAddress = baiduAddress;
	}

	/**
	* 获取百度地址
	*/
	public java.lang.String getBaiduAddress() {
		return baiduAddress;
	}

	/**
	* 设置办公时间
	*/
	public void setWorkingHour(java.lang.String workingHour) {
		this.workingHour = workingHour;
	}

	/**
	* 获取办公时间
	*/
	public java.lang.String getWorkingHour() {
		return workingHour;
	}

	/**
	* 设置明白卡匹配相似度
	*/
	public void setSim(java.lang.String sim) {
		this.sim = sim;
	}

	/**
	* 获取明白卡匹配相似度
	*/
	public java.lang.String getSim() {
		return sim;
	}

	/**
	* 设置搜索关键字
	*/
	public void setKeyword(java.lang.String keyword) {
		this.keyword = keyword;
	}

	/**
	* 获取搜索关键字
	*/
	public java.lang.String getKeyword() {
		return keyword;
	}

	/**
	* 设置导言
	*/
	public void setIntroduction(java.lang.String introduction) {
		this.introduction = introduction;
	}

	/**
	* 获取导言
	*/
	public java.lang.String getIntroduction() {
		return introduction;
	}

	/**
	* 设置解释
	*/
	public void setConsultation(java.lang.String consultation) {
		this.consultation = consultation;
	}

	/**
	* 获取解释
	*/
	public java.lang.String getConsultation() {
		return consultation;
	}

	/**
	* 设置咨询方式
	*/
	public void setStyle(java.lang.String style) {
		this.style = style;
	}

	/**
	* 获取咨询方式
	*/
	public java.lang.String getStyle() {
		return style;
	}
}
