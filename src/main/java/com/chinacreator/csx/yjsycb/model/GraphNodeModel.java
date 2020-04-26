package com.chinacreator.csx.yjsycb.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 图形节点模型
 * 
 * @author zwx
 *
 */
public class GraphNodeModel implements Serializable {

	private static final long serialVersionUID = 1L;

	private Map<String, String> categories;

	private Map<String, Object> data;

	public GraphNodeModel() {
		categories = new HashMap<String, String>();
		data = new HashMap<String, Object>();
		data.put("nodes", new ArrayList<Node>());
		data.put("edges", new ArrayList<Edge>());
	}

	public void addCategory(String name, String value) {
		categories.put(name, value);
	}

	@SuppressWarnings("unchecked")
	public void addNode(Node node) {
		((List<Node>) data.get("nodes")).add(node);
	}

	@SuppressWarnings("unchecked")
	public void addEdge(Edge edge) {
		((List<Edge>) data.get("edges")).add(edge);
	}

	/**
	 * 点
	 * 
	 * @author zwx
	 *
	 */
	public class Node {
		private String label;
		private String value;
		private String id;
		private String info;
		private List<String> categories;// 分类
		private Map<String, Object> otherInfo;// 其他信息 key字段名 value 字段值

		public Node() {
			categories = new ArrayList<String>();
		}

		public void addCategory(String name) {
			if (!this.categories.contains(name)) {
				this.categories.add(name);
			}
		}

		public Map<String, Object> getOtherInfo() {
			return otherInfo;
		}

		public void setOtherInfo(Map<String, Object> otherInfo) {
			this.otherInfo = otherInfo;
		}

		public List<String> getCategories() {
			return categories;
		}

		public void setCategories(List<String> categories) {
			this.categories = categories;
		}

		public String getInfo() {
			return info;
		}

		public void setInfo(String info) {
			this.info = info;
		}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}

		public String getLabel() {
			return label;
		}

		public void setLabel(String label) {
			this.label = label;
		}
	}

	/**
	 * 边
	 * 
	 * @author zwx
	 *
	 */
	public class Edge {
		private String id;
		private String label;
		private String from;
		private String to;

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getLabel() {
			return label;
		}

		public void setLabel(String label) {
			this.label = label;
		}

		public String getFrom() {
			return from;
		}

		public void setFrom(String from) {
			this.from = from;
		}

		public String getTo() {
			return to;
		}

		public void setTo(String to) {
			this.to = to;
		}
	}

	public Map<String, Object> getData() {
		return data;
	}

	public void setData(Map<String, Object> data) {
		this.data = data;
	}

	public Map<String, String> getCategories() {
		return categories;
	}

	public void setCategories(Map<String, String> categories) {
		this.categories = categories;
	}
}
