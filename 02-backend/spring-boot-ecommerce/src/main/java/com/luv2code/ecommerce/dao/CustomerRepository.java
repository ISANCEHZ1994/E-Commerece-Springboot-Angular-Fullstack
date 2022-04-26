package com.luv2code.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luv2code.ecommerce.entity.Customer;

// Customer used because a customer has a collection of orders
// when a purchase we grab the customer, assemble it accordingly and then save the customer using this repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{

	// we need to create our service package => CheckoutService - NOTE: it is created!
	
	// Spring Data REST and Spring Data JPA supports "query methods"
	// Spring will construct a query based on method naming conventions
	
	 Customer findByEmail(String theEmail);
	
	// theEmail variable - behind the scenes, Spring will execute a query similar to this:
	// 		SELECT * FROM Customer c
	// 		WHERE c.email = theEmail <== the variable we are looking for!
		
};
