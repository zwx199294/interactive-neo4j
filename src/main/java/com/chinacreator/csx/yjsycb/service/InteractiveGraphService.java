package com.chinacreator.csx.yjsycb.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.chinacreator.c2.dao.Dao;
import com.chinacreator.c2.dao.DaoFactory;
import com.chinacreator.csx.yjsycb.GraphNeo4jInfo;
import com.chinacreator.csx.yjsycb.GraphNeo4jQueryHistory;
import com.chinacreator.csx.yjsycb.exception.YjsycbException;
import com.chinacreator.csx.yjsycb.model.GraphNodeModel;
import com.chinacreator.csx.yjsycb.model.GraphNodeModel.Edge;
import com.chinacreator.csx.yjsycb.model.GraphNodeModel.Node;
import com.chinacreator.csx.yjsycb.util.AESUtil;

/**
 * interactiveGraph 数据查询服务
 * 
 * @author zwx
 *
 */
@Service
public class InteractiveGraphService {

	private static final Logger LOGGER = LoggerFactory.getLogger(InteractiveGraphService.class);

	/**
	 * 查询neo4j数据，封装成前端图形节点模型
	 * 
	 * @param cql
	 * @param dbId
	 * @return
	 */
	public GraphNodeModel queryNode(String cql, String dbId) {
		LOGGER.info("查询neo4j数据，查询语句：" + cql);
		Dao<Object> neo4jDao = DaoFactory.create(Object.class);
		neo4jDao.setDataSource("csxneo4j");
		GraphNodeModel graph = new GraphNodeModel();
		try {
			List<Object> results = null;
			if (StringUtils.isBlank(dbId)) {
				results = neo4jDao.getSession().selectList("com.chinacreator.csx.yjsycb.Neo4jGraphMapper.executeQuery",
						cql);
			} else {
				results = dynamicQueryNeo4j(dbId, cql);
			}
			for (Object data : results) {
				@SuppressWarnings("rawtypes")
				HashMap map = (HashMap) data;
				JSONObject infoJo = new JSONObject();
				Map<String, String> nodeIdMap = new HashMap<String, String>();
				for (Object key : map.keySet()) {
					if (map.get(key) instanceof ArrayList) {
						JSONArray ja = JSONArray.parseArray(JSON.toJSONString(map.get(key)));
						for (Object obj : ja) {
							infoJo = JSON.parseObject(JSONObject.toJSONString(obj));
							if (infoJo.getString("_startId") == null || infoJo.getString("_endId") == null) {
								nodeIdMap.put(infoJo.getString("_id"), infoJo.getString("ID") == null
										? infoJo.getString("id") : infoJo.getString("ID"));
							}
						}
					} else {
						infoJo = JSON.parseObject(JSONObject.toJSONString(map.get(key)));
						if (infoJo.getString("_startId") == null || infoJo.getString("_endId") == null) {
							nodeIdMap.put(infoJo.getString("_id"),
									infoJo.getString("ID") == null ? infoJo.getString("id") : infoJo.getString("ID"));
						}
					}
				}

				for (Object key : map.keySet()) {
					Object info = map.get(key);
					if (map.get(key) instanceof ArrayList) {
						JSONArray ja = JSONArray.parseArray(JSON.toJSONString(map.get(key)));
						for (Object obj : ja) {
							infoJo = JSON.parseObject(JSONObject.toJSONString(obj));
							addToGraph(graph, infoJo, nodeIdMap);
						}
					} else {
						infoJo = JSON.parseObject(JSONObject.toJSONString(info));
						addToGraph(graph, infoJo, nodeIdMap);
					}
				}
			}
		} catch (Exception e) {
			throw new YjsycbException("查询异常-" + e.getMessage(), Status.INTERNAL_SERVER_ERROR);
		}
		return graph;
	}

	/**
	 * 查询neo4j数据，封装成前端图形节点模型
	 * 
	 * @param cql
	 * @param dbId
	 * @return
	 */
	public GraphNodeModel getNeighbours(String id, String dbId) {
		LOGGER.info("查询节点邻居，节点id：" + id);
		Dao<Object> neo4jDao = DaoFactory.create(Object.class);
		neo4jDao.setDataSource("csxneo4j");
		GraphNodeModel graph = new GraphNodeModel();
		try {
			String cql = "match p=(n)-[r*1..1]-(n2) where n.ID='" + id + "' or n.id='" + id + "' return p";
			List<Object> results = null;
			if (StringUtils.isBlank(dbId)) {
				results = neo4jDao.getSession().selectList("com.chinacreator.csx.yjsycb.Neo4jGraphMapper.executeQuery",
						cql);
			} else {
				results = dynamicQueryNeo4j(dbId, cql);
			}
			for (Object data : results) {
				@SuppressWarnings("rawtypes")
				HashMap map = (HashMap) data;
				JSONObject infoJo = new JSONObject();
				Map<String, String> nodeIdMap = new HashMap<String, String>();
				for (Object key : map.keySet()) {
					if (map.get(key) instanceof ArrayList) {
						JSONArray ja = JSONArray.parseArray(JSON.toJSONString(map.get(key)));
						for (Object obj : ja) {
							infoJo = JSON.parseObject(JSONObject.toJSONString(obj));
							if (infoJo.getString("_startId") == null || infoJo.getString("_endId") == null) {
								nodeIdMap.put(infoJo.getString("_id"), infoJo.getString("ID") == null
										? infoJo.getString("id") : infoJo.getString("ID"));
							}
						}
					} else {
						infoJo = JSON.parseObject(JSONObject.toJSONString(map.get(key)));
						if (infoJo.getString("_startId") == null || infoJo.getString("_endId") == null) {
							nodeIdMap.put(infoJo.getString("_id"),
									infoJo.getString("ID") == null ? infoJo.getString("id") : infoJo.getString("ID"));
						}
					}
				}

				for (Object key : map.keySet()) {
					Object info = map.get(key);
					if (map.get(key) instanceof ArrayList) {
						JSONArray ja = JSONArray.parseArray(JSON.toJSONString(map.get(key)));
						for (Object obj : ja) {
							infoJo = JSON.parseObject(JSONObject.toJSONString(obj));
							addToGraph(graph, infoJo, nodeIdMap);
						}
					} else {
						infoJo = JSON.parseObject(JSONObject.toJSONString(info));
						addToGraph(graph, infoJo, nodeIdMap);
					}
				}
			}
		} catch (Exception e) {
			throw new YjsycbException("查询异常-" + e.getMessage(), Status.INTERNAL_SERVER_ERROR);
		}
		return graph;
	}

	/**
	 * 新增neo4j数据库信息
	 * 
	 * @param info
	 * @return
	 */
	public GraphNeo4jInfo addDbInfo(GraphNeo4jInfo info) {
		if (info == null) {
			throw new YjsycbException("新增异常-数据库信息为空", Status.INTERNAL_SERVER_ERROR);
		}
		if (info.getHost() == null) {
			throw new YjsycbException("host为空", Status.INTERNAL_SERVER_ERROR);
		}
		if (info.getPort() == null) {
			throw new YjsycbException("port为空", Status.INTERNAL_SERVER_ERROR);
		}
		if (info.getUsername() == null) {
			throw new YjsycbException("用户名为空", Status.INTERNAL_SERVER_ERROR);
		}
		if (info.getPassword() == null) {
			throw new YjsycbException("密码为空", Status.INTERNAL_SERVER_ERROR);
		}
		try {
			GraphNeo4jInfo cond = new GraphNeo4jInfo();
			cond.setHost(info.getHost());
			cond.setPort(info.getPort());
			cond.setUsername(info.getUsername());
			cond.setPassword(AESUtil.encrypt(info.getPassword(), AESUtil.DEFAULT_KEY));
			cond = DaoFactory.create(GraphNeo4jInfo.class).selectOne(cond);

			GraphNeo4jInfo cond2 = new GraphNeo4jInfo();
			cond2.setName(info.getName());
			cond2 = DaoFactory.create(GraphNeo4jInfo.class).selectOne(cond2);
			if (cond2 != null) {
				throw new YjsycbException("名称重复", Status.INTERNAL_SERVER_ERROR);
			}
			if (cond != null) {
				return info;
			} else {
				info.setPassword(AESUtil.encrypt(info.getPassword(), AESUtil.DEFAULT_KEY));
				info.setCreateTime(new Timestamp(System.currentTimeMillis()));
				DaoFactory.create(GraphNeo4jInfo.class).insert(info);
			}
			LOGGER.info("新增数据库【" + info.getName() + "】成功");
		} catch (Exception e) {
			throw new YjsycbException("新增异常-" + e.getMessage(), Status.INTERNAL_SERVER_ERROR);
		}
		return info;
	}

	/**
	 * 编辑neo4j数据库信息
	 * 
	 * @param info
	 * @return
	 */
	public GraphNeo4jInfo updateDbInfo(GraphNeo4jInfo info) {
		try {
			GraphNeo4jInfo old = DaoFactory.create(GraphNeo4jInfo.class).selectByID(info.getId());
			if (old.getPassword().equals(info.getPassword())) {
				info.setPassword(null);
			} else {
				info.setPassword(AESUtil.encrypt(info.getPassword(), AESUtil.DEFAULT_KEY));
			}
			info.setUpdateTime(new Timestamp(System.currentTimeMillis()));
			DaoFactory.create(GraphNeo4jInfo.class).update(info);
			LOGGER.info("更新数据库【" + info.getName() + "】成功");
		} catch (Exception e) {
			throw new YjsycbException("更新异常-" + e.getMessage(), Status.INTERNAL_SERVER_ERROR);
		}
		return info;
	}

	/**
	 * 获取所有neo4j数据库信息
	 * 
	 * @param info
	 * @return
	 */
	public List<GraphNeo4jInfo> getAllNeo4jDbInfos() {
		try {
			List<GraphNeo4jInfo> results = DaoFactory.create(GraphNeo4jInfo.class).selectAll();
			return results;
		} catch (Exception e) {
			throw new YjsycbException("查询异常-" + e.getMessage(), Status.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 删除数据库信息
	 * 
	 * @param id
	 */
	public void deleteNeo4jDbInfo(String id) {
		try {
			GraphNeo4jInfo old = DaoFactory.create(GraphNeo4jInfo.class).selectByID(id);
			if (old != null) {
				DaoFactory.create(GraphNeo4jInfo.class).delete(id);
				LOGGER.info("删除数据库【" + old.getName() + "】成功");
			}
		} catch (Exception e) {
			throw new YjsycbException("删除异常-" + e.getMessage(), Status.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 新增查询历史
	 * 
	 * @param history
	 * @return
	 */
	public GraphNeo4jQueryHistory addNeo4History(GraphNeo4jQueryHistory history) {
		try {
			GraphNeo4jQueryHistory cond = new GraphNeo4jQueryHistory();
			cond.setCql(history.getCql());
			cond.setUserId(history.getUserId());
			GraphNeo4jQueryHistory one = DaoFactory.create(GraphNeo4jQueryHistory.class).selectOne(cond);
			history.setQueryTime(new Timestamp(System.currentTimeMillis()));
			if (one != null) {
				history.setId(one.getId());
				DaoFactory.create(GraphNeo4jQueryHistory.class).update(history);
			} else {
				DaoFactory.create(GraphNeo4jQueryHistory.class).insert(history);
			}
			LOGGER.info("新增查询历史记录成功，查询语句【" + history.getCql() + "】");
			return history;
		} catch (Exception e) {
			throw new YjsycbException("新增查询历史记录异常-" + e.getMessage(), Status.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 删除查询历史
	 * 
	 * @param id
	 *            主键id
	 * @return
	 */
	public int deleteNeo4History(String id) {
		try {
			GraphNeo4jQueryHistory cond = new GraphNeo4jQueryHistory();
			cond.setId(id);
			int count = DaoFactory.create(GraphNeo4jQueryHistory.class).delete(cond);
			return count;
		} catch (Exception e) {
			throw new YjsycbException("删除历史记录异常-" + e.getMessage(), Status.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 获取最近5条查询历史
	 * 
	 * @param cond
	 * @return
	 */
	public List<GraphNeo4jQueryHistory> getHistoryTop5(GraphNeo4jQueryHistory cond) {
		try {
			LOGGER.info("获取最近5条查询历史：" + JSON.toJSONString(cond));
			List<GraphNeo4jQueryHistory> result = DaoFactory.create(GraphNeo4jQueryHistory.class).getSession()
					.selectList("com.chinacreator.csx.yjsycb.GraphNeo4jQueryHistoryMapper.selectTop5", cond);
			return result;
		} catch (Exception e) {
			throw new YjsycbException("获取最近5条查询历史记录异常-" + e.getMessage(), Status.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 查询neo4j数据库信息
	 * 
	 * @param id
	 * @return
	 */
	private GraphNeo4jInfo getAllNeo4jDbInfoById(String id) {
		try {
			GraphNeo4jInfo info = DaoFactory.create(GraphNeo4jInfo.class).selectByID(id);
			info.setPassword(AESUtil.decrypt(info.getPassword(), AESUtil.DEFAULT_KEY));
			return info;
		} catch (Exception e) {
			throw new YjsycbException("查询异常-" + e.getMessage(), Status.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * json数据添加至模型
	 * 
	 * @param graph
	 * @param infoJo
	 * @param nodeIdMap
	 */
	private void addToGraph(GraphNodeModel graph, JSONObject infoJo, Map<String, String> nodeIdMap) {
		if (infoJo.getString("_startId") != null || infoJo.getString("_endId") != null) {
			Edge edge = graph.new Edge();
			edge.setFrom(nodeIdMap.get(infoJo.getString("_startId")));
			edge.setTo(nodeIdMap.get(infoJo.getString("_endId")));
			edge.setId(infoJo.getString("_id"));
			edge.setLabel(infoJo.getString("_type"));
			graph.addEdge(edge);
		} else {
			Node node = graph.new Node();
			JSONArray _labels = infoJo.getJSONArray("_labels");
			if (_labels != null) {
				for (Object s : _labels) {
					graph.addCategory(s.toString(), s.toString());
					node.addCategory(s.toString());
				}
			}
			node.setId(infoJo.getString("ID") == null ? infoJo.getString("id") : infoJo.getString("ID"));
			// node.setValue(infoJo.getString("1"));
			node.setInfo(infoJo.getString("name") == null ? node.getId() : infoJo.getString("name"));
			node.setLabel(infoJo.getString("name") == null ? node.getId() : infoJo.getString("name"));
			graph.addNode(node);
		}
	}

	/**
	 * 动态查询neo4j数据
	 * 
	 * @param dbId
	 *            neo4j数据库id
	 * @param cql
	 * @return
	 */
	private List<Object> dynamicQueryNeo4j(String dbId, String cql) {
		List<Object> result = new ArrayList<Object>();
		GraphNeo4jInfo dbInfo = getAllNeo4jDbInfoById(dbId);
		Connection conn = getDynamicNeo4jConnction(dbInfo);
		try {
			Statement statement = conn.createStatement();
			ResultSet resultSet = statement.executeQuery(cql);
			int columnCount = resultSet.getMetaData().getColumnCount();
			while (resultSet.next()) {
				Map<String, Object> rowMap = new HashMap<String, Object>();
				for (int i = 0; i < columnCount; i++) {
					rowMap.put(resultSet.getMetaData().getColumnName(i + 1), resultSet.getObject(i + 1));
				}
				result.add(rowMap);
			}
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 获取动态neo4j连接
	 * 
	 * @return
	 */
	private Connection getDynamicNeo4jConnction(GraphNeo4jInfo dbInfo) {
		String url = "jdbc:neo4j:bolt://" + dbInfo.getHost() + ":" + dbInfo.getPort();
		Connection conn;
		try {
			Class.forName("org.neo4j.jdbc.Driver");
			conn = DriverManager.getConnection(url, dbInfo.getUsername(), dbInfo.getPassword());
			return conn;
		} catch (Exception e) {
			throw new YjsycbException("连接neo4j数据库异常" + e.getMessage(), Status.INTERNAL_SERVER_ERROR);
		}
	}
}
