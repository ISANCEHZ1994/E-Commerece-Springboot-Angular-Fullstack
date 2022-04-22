package com.luv2code.ecommerce.config;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.beans.factory.annotation.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import com.luv2code.ecommerce.entity.*;

import java.util.*;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

// making our API READ-ONLY

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{
	
	@Value("${allowed.origins}") // will use the reference inside of application.properties
	private String[] theAllowedOrigins;
	
	private EntityManager entityManager;	
	
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	};
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		
		HttpMethod[] theUnsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH };
	
		// NOTE: the method below was made easier by creating the disableHttpMethods method - work organized
		
		// disable HTTP methods for PRODUCT: PUT, POST, and DELETE		
		//	config.getExposureConfiguration()
		//	.forDomainType(Product.class) // <= here we are using the product class!
		//			// -> Java Lambda Syntax for the arrow symbol ->
		//	.withItemExposure(( metdata, httpMethods ) -> httpMethods.disable( theUnsupportedActions ))		   // Single Item
		//	.withCollectionExposure(( metdata, httpMethods ) -> httpMethods.disable( theUnsupportedActions )); // Collection

		// now we have cleaner code for all models/entities
		disableHttpMethods( Product.class, 			config, theUnsupportedActions );
		disableHttpMethods( ProductCategory.class, 	config, theUnsupportedActions );
		disableHttpMethods( Country.class, 			config, theUnsupportedActions );
		disableHttpMethods( State.class, 			config, theUnsupportedActions );
		disableHttpMethods( Order.class, 			config, theUnsupportedActions );
		
		// call an internal helper method
		exposeIds(config);
		
		// configure cors mapping - now that were using this line of code 
		// the CrossOrigin inside all <dao>Repository.java is no longer needed
		// cors.addMapping("/api/**").allowedOrigins("http://localhost:4200");
		
		// the variable: theAllowedOrigins will represent allowed.origins => http://localhost:4200 inside of the application.properties
		cors.addMapping(config.getBasePath() + "/**").allowedOrigins(theAllowedOrigins);
		
		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
	};

	private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
		config.getExposureConfiguration()
			  .forDomainType(theClass) 
			  .withItemExposure(( metdata, httpMethods ) -> httpMethods.disable( theUnsupportedActions ))
			  .withCollectionExposure(( metdata, httpMethods ) -> httpMethods.disable( theUnsupportedActions ));
	};
	
	// created exposeIds() so that when we go to http://localhost:8080/api/product-category
	// inside the object we can now see the ID for each specific item in array
	
	private void exposeIds(RepositoryRestConfiguration config) {
		// expose entity ids
		
		// get a list of all entity classes from the entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		
		// create an array of the entity types
		List<Class> entityClasses = new ArrayList<>();
		
		// get the entity types for the entites 
		for( EntityType tempEntityType : entities ) {
			entityClasses.add( tempEntityType.getJavaType() );
		};
		
		// expose the entity ids for the array of the entity/domain types
		Class[] domainTypes = entityClasses.toArray( new Class[0] );
		config.exposeIdsFor(domainTypes);
		
	};
	
	
};
