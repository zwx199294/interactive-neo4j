package com.chinacreator.csx.yjsycb.web.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.stereotype.Controller;

import com.chinacreator.asp.comp.sys.oauth2.common.Credential;
import com.chinacreator.asp.comp.sys.oauth2.common.CredentialStore;
import com.chinacreator.c2.sysmgr.User;

@Controller
@Path("csx/v1/getuserinfo")
public class GetUserInfoController {

	@GET
	@Path("")
	public User get() {
		Credential credential = CredentialStore.getCurrCredential();
		User user = null;
		if (credential == null) {
			user = new User();
			user.setId("admin");
			user.setRealname("admin");
			user.setName("admin");
		} else {
			user = credential.getUserInfo();
		}
		return user;
	}

}
