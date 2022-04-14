package com.luv2code.ecommerce.dto;

import com.luv2code.ecommerce.entity.*;

// import com.luv2code.ecommerce.entity.Address;
// import com.luv2code.ecommerce.entity.Customer;
// import com.luv2code.ecommerce.entity.Order;
// import com.luv2code.ecommerce.entity.OrderItem;

import lombok.*;
import java.util.*;

@Data
public class Purchase {

	private Customer customer;
	private Address	 shippingAddress;
	private Address	 billingAddress;
	private Order 	 order;
	// just a 'collection' - using REST API/JSON will take it and set to JSON Array
	private Set< OrderItem > orderItems; 
		
};
