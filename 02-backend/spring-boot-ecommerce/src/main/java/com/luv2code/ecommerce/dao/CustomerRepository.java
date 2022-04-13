package com.luv2code.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luv2code.ecommerce.entity.Customer;

// Customer used because a customer has a collection of orders
// when a purchase we grab the customer, assemble it accordingly and then save the customer using this repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{

	// we need to create our service package => CheckoutService
	
	
};
