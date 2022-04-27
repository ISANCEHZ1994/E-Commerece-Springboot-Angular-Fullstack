package com.luv2code.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.*;


@Configuration
// @EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {	
	
	@Override
	protected void configure( HttpSecurity http ) throws Exception {
		
		// protect endpoint /api/orders
		http.authorizeRequests()
			.antMatchers("/api/orders/**")
			.authenticated()
			.and()
			.oauth2ResourceServer()
			.jwt();
		
		// add CORS filter
		http.cors();		
		Okta.configureResourceServer401ResponseBody(http);
	};
		
	
};
