package com.chinacreator.csx.DatabaseFactory;

import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSourceFactory;

import com.chinacreator.c2.dao.datasource.factory.DataSourceFactory;

public class Neo4jDbcpDataSourceFactory implements DataSourceFactory {
	public DataSource createDataSource(Properties properties) throws Exception {
		properties.remove("validationQuery");
		return BasicDataSourceFactory.createDataSource(properties);
	}
}