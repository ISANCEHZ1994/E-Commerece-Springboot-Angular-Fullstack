package com.luv2code.ecommerce.service;

import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.*;
import com.luv2code.ecommerce.entity.*;
import java.util.*;

// now with all the models created as well as repository

// CheckoutController => CheckoutService => Spring Data JPA Repository => DataBase

@Service
public class CheckoutServiceImpl implements CheckoutService {
	
	private CustomerRepository customerRepository;
	
	@Autowired
	public CheckoutServiceImpl( CustomerRepository cr ) {
		this.customerRepository = cr;
	};

	@Override
	@Transactional
	public PurchaseResponse placeOrder(Purchase purchase) {
		
		// retrieve the order info from dto
		Order order = purchase.getOrder();
		
		// generate tracking number
		String orderTrackingNumber = generateOrderTrackingNumber();
		order.setOrderTrackingNumber( orderTrackingNumber );
		
		// populate order with orderItems
		Set<OrderItem> orderItems = purchase.getOrderItems();
		orderItems.forEach(item -> order.add(item));
		
		// populate order with billingAddress and shippingAddress
		order.setBillingAddress(  purchase.getBillingAddress() );
		order.setShippingAddress( purchase.getShippingAddress() );
		
		// populate customer with order
		Customer customer = purchase.getCustomer();
		customer.add( order );
		
		// save to the database
		customerRepository.save( customer );
		
		// return a response 
		return new PurchaseResponse(orderTrackingNumber);
	};

	private String generateOrderTrackingNumber() {		
		// generate a random UUID number (UUID version-4)
		// UUID: Universally Unique IDentifier
		// 	- Standardized methods for generating unique IDs
				
		return UUID.randomUUID().toString();		
	};
	
	
	
};
