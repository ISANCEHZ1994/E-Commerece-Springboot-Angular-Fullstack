package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin("http://localhost:4200") => look at MyDataRestConfig for what we replaced this with..
@RepositoryRestResource
public interface ProductRepository extends JpaRepository< Product, Long > {
// <> inside => Product is the Entity and Long is the Primary Key
	
	// with this update - now we can see 
	Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
	
	Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
	
	// think of the work that this done above like (name):
	// SELECT * FROM Product p WHERE p.name LIKE CONCAT('%', :name, '%');
	
};
