package com.chinacreator.csx.yjsycb.web.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.chinacreator.csx.yjsycb.GraphNeo4jInfo;
import com.chinacreator.csx.yjsycb.GraphNeo4jQueryHistory;
import com.chinacreator.csx.yjsycb.model.GraphNodeModel;
import com.chinacreator.csx.yjsycb.service.InteractiveGraphService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.SwaggerDefinition;
import io.swagger.annotations.Tag;

@Controller
@Path("graph/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Api
@SwaggerDefinition(tags = { @Tag(name = "InteractiveGraph", description = "图形数据查询接口") })
@ApiResponses(value = { @ApiResponse(code = 400, message = "错误的请求参数", response = Error.class),
		@ApiResponse(code = 404, message = "操作失败，不存在该区域信息", response = Error.class),
		@ApiResponse(code = 500, message = "数据库操作异常", response = Error.class) })
public class InteractiveGraphController {

	@Autowired
	private InteractiveGraphService interactiveGraphService;

	@GET
	@Path("/neo4j/query")
	@ApiOperation(value = "查询neo4j数据", tags = "InteractiveGraph", notes = "查询neo4j数据")
	@ApiResponses(value = { @ApiResponse(code = 204, message = "查询成功") })
	@ApiImplicitParams({ @ApiImplicitParam(name = "cql", value = "neo4j查询语句", required = true, dataType = "String") })
	public GraphNodeModel queryNode(@QueryParam(value = "cql") @ApiParam(value = "neo4j查询语句") java.lang.String cql,
			@QueryParam(value = "dbId") @ApiParam(value = "neo4j数据库id") java.lang.String dbId) {
		return interactiveGraphService.queryNode(cql, dbId);
	}

	@GET
	@Path("/neo4j/node/{id}/neighbours")
	@ApiOperation(value = "查询节点的邻居节点", tags = "InteractiveGraph", notes = "查询节点的邻居节点")
	@ApiResponses(value = { @ApiResponse(code = 204, message = "查询成功") })
	@ApiImplicitParams({ @ApiImplicitParam(name = "id", value = "节点id", required = true, dataType = "String") })
	public GraphNodeModel getNeighbours(@PathParam(value = "id") @ApiParam(value = "节点id") java.lang.String id,
			@QueryParam(value = "dbId") @ApiParam(value = "neo4j数据库id") java.lang.String dbId) {
		return interactiveGraphService.getNeighbours(id, dbId);
	}

	@POST
	@Path("/neo4j/info")
	@ApiOperation(value = "新增neo4j数据库信息", tags = "InteractiveGraph", notes = "新增neo4j数据库信息")
	@ApiResponses(value = { @ApiResponse(code = 204, message = "新增成功") })
	public GraphNeo4jInfo addDbInfo(GraphNeo4jInfo info) {
		return interactiveGraphService.addDbInfo(info);
	}

	@PUT
	@Path("/neo4j/info")
	@ApiOperation(value = "更新neo4j数据库信息", tags = "InteractiveGraph", notes = "更新neo4j数据库信息")
	@ApiResponses(value = { @ApiResponse(code = 204, message = "更新成功") })
	public GraphNeo4jInfo updateDbInfo(GraphNeo4jInfo info) {
		return interactiveGraphService.updateDbInfo(info);
	}

	@GET
	@Path("/neo4j/all")
	@ApiOperation(value = "获取所有neo4j数据库信息", tags = "InteractiveGraph", notes = "获取所有neo4j数据库信息")
	@ApiResponses(value = { @ApiResponse(code = 204, message = "查询成功") })
	public List<GraphNeo4jInfo> getAllNeo4jDbInfos() {
		return interactiveGraphService.getAllNeo4jDbInfos();
	}

	@DELETE
	@Path("/neo4j/info/{id}")
	@ApiOperation(value = "删除neo4j数据库信息", tags = "InteractiveGraph", notes = "删除neo4j数据库信息")
	@ApiResponses(value = { @ApiResponse(code = 204, message = "删除成功") })
	public void deleteDBInfoById(@PathParam(value = "id") @ApiParam(value = "数据库id") java.lang.String id) {
		interactiveGraphService.deleteNeo4jDbInfo(id);
	}

	@POST
	@Path("/neo4j/history")
	@ApiOperation(value = "新增neo4j查询历史", tags = "InteractiveGraph", notes = "新增neo4j查询历史")
	@ApiResponses(value = { @ApiResponse(code = 204, message = "新增成功") })
	public GraphNeo4jQueryHistory addNeo4History(GraphNeo4jQueryHistory history) {
		return interactiveGraphService.addNeo4History(history);
	}

	@GET
	@Path("/neo4j/history/top5")
	@ApiOperation(value = "获取最近5条cql查询历史", tags = "InteractiveGraph", notes = "获取最近5条cql查询历史")
	@ApiResponses(value = { @ApiResponse(code = 204, message = "获取成功") })
	public List<GraphNeo4jQueryHistory> getHistoryTop5(@Context HttpServletRequest r,
			@QueryParam(value = "cond") @ApiParam(value = "查询条件") GraphNeo4jQueryHistory cond) {
		return interactiveGraphService.getHistoryTop5(cond);
	}

	@DELETE
	@Path("/neo4j/history/{id}")
	@ApiOperation(value = "删除查询历史", tags = "InteractiveGraph", notes = "删除查询历史")
	@ApiResponses(value = { @ApiResponse(code = 204, message = "删除成功") })
	public int deleteNeo4History(@PathParam("id") @ApiParam(value = "历史记录id") String id) {
		return interactiveGraphService.deleteNeo4History(id);
	}

}
