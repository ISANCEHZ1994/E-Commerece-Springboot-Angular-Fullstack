package com.luv2code.ecommerce.config;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;

// making our API READ-ONLY

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		
		HttpMethod[] theUnsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };
		
		// disable HTTP methods for PRODUCT: PUT, POST, and DELETE
		config.getExposureConfiguration()
			.forDomainType(Product.class) 
			// -> Java Lambda Syntax for the arrow symbol ->
			.withItemExposure(( metdata, httpMethods ) -> httpMethods.disable( theUnsupportedActions ))		 // Single Item
			.withCollectionExposure(( metdata, httpMethods ) -> httpMethods.disable( theUnsupportedActions )); // Collection
		
		// disable HTTP methods for PRODUCTCATEGORY: PUT, POST, and DELETE
		config.getExposureConfiguration()
			.forDomainType(ProductCategory.class) 
			.withItemExposure(( metdata, httpMethods ) -> httpMethods.disable( theUnsupportedActions ))
			.withCollectionExposure(( metdata, httpMethods ) -> httpMethods.disable( theUnsupportedActions )); 
		
		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
	};
	
	
};
