package com.chinacreator.csx.proxy.util;

public interface SfProxyConstants {

  String PATH_PREFIX = "/sfproxy";
  
  String REQUIREMENT_PREFIX="/_apirequirements";

  String SCHEMA_PROPERTY_KEY = "c2.sso.sfproxy.apigateway.schema";

  String HOST_PROPERTY_KEY = "c2.sso.sfproxy.apigateway.host";

  String PORT_PROPERTY_KEY = "c2.sso.sfproxy.apigateway.port";

  String API_KEY_PROPERTY_KEY = "c2.sso.sfproxy.apigateway.apikey";

  //兼容K8s,采用下划线形式属性名
  String SCHEMA_PROPERTY_KEY_ = "c2_sso_sfproxy_apigateway_schema";

  String HOST_PROPERTY_KEY_ = "c2_sso_sfproxy_apigateway_host";

  String PORT_PROPERTY_KEY_ = "c2_sso_sfproxy_apigateway_port";

  String API_KEY_PROPERTY_KEY_ = "c2_sso_sfproxy_apigateway_apikey";
  
  String AUTH_API_KEY_PROPERTY_KEY_ = "c2_sso_sfproxy_authorization_apikey";

  String FILE_PROXY_ROOTPATH_KEY_ = "c2_sso_filesfproxy_rootpath";

  String FILE_PROXY_PATHFORMAT_KEY_ = "c2_sso_filesfproxy_pathformat";

  String API_KEY_HEADER = "X-API-KEY";

  String OPERATOR_HEADER = "X-API-OPERATOR";

  String OPERATOR_HEADER_USERNAME_KEY = "un";

  String OPERATOR_HEADER_USERID_KEY = "uid";

  String OPERATOR_HEADER_ROLES_KEY = "rs";
}
