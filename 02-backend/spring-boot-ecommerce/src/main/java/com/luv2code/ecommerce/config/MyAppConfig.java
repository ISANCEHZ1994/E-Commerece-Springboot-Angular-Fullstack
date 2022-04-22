package com.luv2code.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*; // CorsRegistry - WebMvcConfigurer

@Configuration
public class MyAppConfig implements WebMvcConfigurer {
	
	// @Value(<this comes from application.properties>)
	
	@Value("${allowed.origins}")
	private String[] theAllowedOrigins;
	
	@Value("${spring.data.rest.base-path}")
	private String basePath;
	
	@Override
	public void addCorsMappings( CorsRegistry cors ) {
		
		// set up cors mapping
		cors.addMapping(basePath + "/**").allowedOrigins(theAllowedOrigins);
		
	};
	
};
