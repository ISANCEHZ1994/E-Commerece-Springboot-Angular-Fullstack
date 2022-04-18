package com.luv2code.ecommerce.dto;

import com.luv2code.ecommerce.entity.*;

import lombok.*;

import java.util.Set;

@Data
public class Purchase {

	private Customer customer;
	private Address	 shippingAddress;
	private Address	 billingAddress;
	private Order 	 order;
	// just a 'collection' - using REST API/JSON will take it and set to JSON Array
	private Set<OrderItem> orderItems; 
	
};
