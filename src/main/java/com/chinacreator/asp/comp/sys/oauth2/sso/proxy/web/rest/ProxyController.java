package com.chinacreator.asp.comp.sys.oauth2.sso.proxy.web.rest;

import com.alibaba.fastjson.JSON;
import com.chinacreator.asp.comp.sys.oauth2.sso.proxy.APIConfigurations;
import com.chinacreator.asp.comp.sys.oauth2.sso.proxy.APIProxyInterceptor;
import com.chinacreator.asp.comp.sys.oauth2.sso.proxy.ProxyConstants;
import com.chinacreator.c2.config.ConfigManager;
import com.chinacreator.c2.context.OperationContextHolder;
import com.chinacreator.c2.context.WebOperationContext;
import com.chinacreator.c2.sysmgr.User;
import com.chinacreator.c2.web.exception.RestException;
import com.chinacreator.c2.web.util.RestUtils;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

/**
 * 简化用户前端调用服务网关的代理层
 * 
 * @author Vurt
 */
@Controller
@RequestMapping(ProxyConstants.PATH_PREFIX)
public class ProxyController {

	@Autowired(required = false)
	private APIConfigurations apiconfigurations;

	private static final Logger LOGGER = LoggerFactory.getLogger(ProxyController.class);

	private static final String APPNAME_PROPERTY_KEY_ = "c2.sso.proxy.apigateway.appname";
	private static final String APPNAME_PROPERTY_KEY = "c2_sso_proxy_apigateway_appname";

	private static String schema;
	private static String host;
	private static int port;
	private static String appName;
	private static String apikey;
	private static String authorization;

	private static boolean valid = true;

	private static Pattern pattern = null;

	private static HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();

	static {
		try {
			factory.setHttpClient(RestUtils.getHttpClient());

			pattern = Pattern.compile("^(.*" + ProxyConstants.PATH_PREFIX + ")(.*)$");

			// 为了兼容K8s环境变量配置,首先加载下划线风格属性Key
			schema = ConfigManager.getInstance().getConfig(ProxyConstants.SCHEMA_PROPERTY_KEY_);
			if (StringUtils.isEmpty(schema)) {
				schema = ConfigManager.getInstance().getConfig(ProxyConstants.SCHEMA_PROPERTY_KEY);
			}
			if (StringUtils.isEmpty(schema)) {
				schema = "http";
			}
			apikey = ConfigManager.getInstance().getConfig(ProxyConstants.API_KEY_PROPERTY_KEY_);
			if (StringUtils.isEmpty(apikey)) {
				apikey = ConfigManager.getInstance().getConfig(ProxyConstants.API_KEY_PROPERTY_KEY);
			}

			host = ConfigManager.getInstance().getConfig(ProxyConstants.HOST_PROPERTY_KEY_);
			if (StringUtils.isEmpty(host)) {
				host = ConfigManager.getInstance().getConfig(ProxyConstants.HOST_PROPERTY_KEY);
			}

			if (StringUtils.isEmpty(host)) {
				LOGGER.error("API网关的HOST配置为空，API代理将无法正常工作");
				valid = false;
			}
			authorization = ConfigManager.getInstance().getConfig(ProxyConstants.AUTH_API_KEY_PROPERTY_KEY_);

			appName = ConfigManager.getInstance().getConfig(APPNAME_PROPERTY_KEY);
			if (StringUtils.isEmpty(appName)) {
				appName = ConfigManager.getInstance().getConfig(APPNAME_PROPERTY_KEY_);
			}

		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error("初始化API网关参数报错,初始化失败.");
			valid = false;
		}
		try {
			String port = ConfigManager.getInstance().getConfig(ProxyConstants.PORT_PROPERTY_KEY_);
			if (StringUtils.isEmpty(port)) {
				port = ConfigManager.getInstance().getConfig(ProxyConstants.PORT_PROPERTY_KEY);
			}
			ProxyController.port = Integer.valueOf(port);
		} catch (NumberFormatException e) {
			ProxyController.port = 0;
		}
		if (valid) {
			LOGGER.info("API网关代理初始化完成,apikey:" + apikey + ",schema:" + schema + ",host:" + host + ",port:" + port);
		}

	}

	@RequestMapping("/**")
	public void proxy(HttpServletRequest request, HttpServletResponse response) throws IOException {
		if (!valid) {
			response.sendError(HttpStatus.SERVICE_UNAVAILABLE.value(), "API代理不可用，请联系管理员检查配置");
			return;
		}
		URI uri;
		try {
			uri = resolveRemoteUri(request);
		} catch (Exception e) {
			response.sendError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
			return;
		}
		InputStream resultBody = null;
		ClientHttpResponse remoteResponse = null;

		try {
			// 2.发送请求
			ClientHttpRequest newRequest = factory.createRequest(uri, HttpMethod.valueOf(request.getMethod()));
			// clone请求头
			handleRequestHeaders(request, newRequest.getHeaders());
			// 对接body
			InputStream requestBody = null;
			if ((requestBody = request.getInputStream()) != null)
				IOUtils.copy(requestBody, newRequest.getBody());

			if (apiconfigurations != null) {
				APIProxyInterceptor interceptor = null;
				if ((interceptor = apiconfigurations.getAPIInterceptor(request)) != null) {
					try {
						interceptor.doRequestInterceptor(newRequest);
					} catch (Exception e) {
						if (e instanceof RestException) {
							throw e;
						} else {
							LOGGER.error("自定义拦截器[" + interceptor.getClass().getName() + "]处理API请求时发生了错误", e);
							throw new RestException("自定义拦截器[" + interceptor.getClass().getName()
									+ "]处理API请求时发生了错误，错误消息：" + e.getMessage());
						}
					}
				}
			}
			remoteResponse = newRequest.execute();

			if (remoteResponse.getStatusCode() != null)
				response.setStatus(remoteResponse.getStatusCode().value());

			handleResponseHeaders(remoteResponse.getHeaders(), response);

			if ((resultBody = remoteResponse.getBody()) != null)
				IOUtils.copy(resultBody, response.getOutputStream());

		} catch (Exception e) {
			// 网关提供API请求的拓扑图前,这个还是保留一下吧,好跟踪
			if (e instanceof HttpClientErrorException) {
				LOGGER.error("请求【" + uri + "】发生异常,异常信息为:" + ((HttpClientErrorException) e).getResponseBodyAsString());
			} else if (e instanceof HttpServerErrorException) {
				LOGGER.error("请求【" + uri + "】发生异常,异常信息为:" + ((HttpServerErrorException) e).getResponseBodyAsString());
			} else {
				e.printStackTrace();
				throw new RestException("代理API请求时发生了未知错误，请联系管理员或稍后重试", e);
			}
		} finally {
			// 4.1以上版本的Httpclient是通过InputStream.close()来确认关闭连接
			if (resultBody != null) {
				try {
					resultBody.close();
				} catch (IOException e) {
				}
			}
		}

	}

	private URI resolveRemoteUri(HttpServletRequest request) throws Exception {
		// 1.截取远程请求uri
		String uriStr = getRemoteAPIUri(request);
		if (StringUtils.isEmpty(uriStr)) {
			LOGGER.error("请求:" + request.getRequestURI() + "截取远程地址失败.");
			throw new RuntimeException();
		}
		URI uri;
		try {
			if(StringUtils.isNotEmpty(appName)){
				uriStr = "/"+appName+uriStr;
			}
			String queryStr = request.getQueryString();
			if (StringUtils.isNotBlank(queryStr)) {
				queryStr = URLDecoder.decode(request.getQueryString(), "UTF-8");
			}
			uri = new URI(schema, null, host, port, uriStr, queryStr, null);
		} catch (URISyntaxException e) {
			e.printStackTrace();
			throw e;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			throw e;
		}
		return uri;
	}

	private String getRemoteAPIUri(HttpServletRequest request) {
		String path = request.getRequestURI();
		Matcher matcher = pattern.matcher(path);
		if (matcher.find()) {
			return matcher.group(2);
		}
		return null;
	}

	private static Set<String> EXCLUDED_REQUEST_HEADERS = new HashSet<String>();
	private static Set<String> EXCLUDED_RESPONSE_HEADERS = new HashSet<String>();

	static {
		EXCLUDED_REQUEST_HEADERS.add("cookie");
		EXCLUDED_REQUEST_HEADERS.add("authorization");
		// TODO 现场调用data.json时只要带了host,就是404,非常诡异，为了不影响进度,先去掉
		EXCLUDED_REQUEST_HEADERS.add("host");

		EXCLUDED_RESPONSE_HEADERS.add("transfer-encoding");
		EXCLUDED_RESPONSE_HEADERS.add("set-cookie");
	}

	/**
	 * 处理请求头，操作包括：复制原始请求头，移除不需要发送到后端的头，添加API-KEY相关头
	 * 
	 * @param request
	 *            原始请求
	 */
	private void handleRequestHeaders(HttpServletRequest request, HttpHeaders targetHeaders) {
		Enumeration<?> names = request.getHeaderNames();

		while (names.hasMoreElements()) {
			String name = (String) names.nextElement();
			if (!EXCLUDED_REQUEST_HEADERS.contains(name.toLowerCase())) {
				targetHeaders.add(name, request.getHeader(name));
			}
		}

		if (StringUtils.isNotEmpty(apikey)) {
			targetHeaders.set(ProxyConstants.API_KEY_HEADER, apikey);

			User user = (User) ((WebOperationContext) OperationContextHolder.getContext()).getUser();
			if (user != null && user.size() != 0) {
				Map<String, String> userMap = new HashMap<String, String>();
				userMap.put(ProxyConstants.OPERATOR_HEADER_USERNAME_KEY, user.getRealname());
				userMap.put(ProxyConstants.OPERATOR_HEADER_USERID_KEY, user.getId());
				String code = org.apache.commons.codec.binary.Base64.encodeBase64String(JSON.toJSONString(userMap)
						.getBytes(Charset.forName("UTF-8")));
				targetHeaders.set(ProxyConstants.OPERATOR_HEADER, code);
			}
		} else if (StringUtils.isNotEmpty(authorization)) {
			targetHeaders.set("Authorization", "Bearer " + authorization);
		}

	}

	/**
	 * 处理远程响应的头，排除掉一些不需要响应到前台的代理头
	 */
	private void handleResponseHeaders(HttpHeaders remoteHeaders, HttpServletResponse response) {
		Set<Entry<String, List<String>>> entries = remoteHeaders.entrySet();

		for (Entry<String, List<String>> entry : entries) {
			String name = entry.getKey();
			if (!EXCLUDED_RESPONSE_HEADERS.contains(name.toLowerCase())) {
				for (String value : entry.getValue()) {
					response.addHeader(name, value);
				}
			}
		}
	}
}
