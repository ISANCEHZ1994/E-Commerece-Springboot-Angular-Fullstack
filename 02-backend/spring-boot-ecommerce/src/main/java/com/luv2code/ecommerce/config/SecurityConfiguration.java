package com.luv2code.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.*;


@Configuration
@EnableWebSecurity
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
		
		// force a non-empty response body for 401's to make the response more friendly
		Okta.configureResourceServer401ResponseBody( http );
		
		// using POSTMAN we can now see this response: 401 Unauthorized
		// when we go to frontend - orders - we cannot see a user's previous orders
		// frontend needs to be updated to pass the access token with the HTTP request - DONE!
		
		// Now that we have it working - we get another error when we placing order..
		
		// when placing an order: fails inside of CheckoutController.java because we are sending checkout request with HTTP POST
		// by default CSRF is enabled and performs checks on POST using cookies
		// Since we are not using Cookies for session tracking, CSRF says request is unauthorized	
		// we can resolve this by disabling CSRF, this technique is commonly used for REST APIs
		
		// disable CSRF since we are not using Cookies for session tracking
		http.csrf().disable(); // should fix our error!
		
	};
	
	
};

