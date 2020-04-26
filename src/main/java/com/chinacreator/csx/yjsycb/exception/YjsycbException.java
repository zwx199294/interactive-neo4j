package com.chinacreator.csx.yjsycb.exception;

import javax.ws.rs.core.Response.Status;

import com.chinacreator.c2.web.exception.RestException;

/**
 * 
 * @author zwx
 *
 */
public class YjsycbException extends RestException {

	private static final long serialVersionUID = 2860625125533033213L;

	public YjsycbException(String message, Status status) {
		super(message, String.valueOf(status.getStatusCode()), status);
	}

	public YjsycbException(String message, Exception e) {
		super(message, e);
	}
}
