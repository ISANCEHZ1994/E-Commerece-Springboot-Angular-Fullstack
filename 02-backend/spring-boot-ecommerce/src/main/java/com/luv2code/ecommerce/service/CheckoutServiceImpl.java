package com.luv2code.ecommerce.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.*;
import com.luv2code.ecommerce.entity.*;

// now with all the models created as well as repository

// CheckoutController => CheckoutService => Spring Data JPA Repository => DataBase

@Service
public class CheckoutServiceImpl implements CheckoutService {
	
	private CustomerRepository customerRepository;
	
	public CheckoutServiceImpl( CustomerRepository customerRepository ) {
		this.customerRepository = customerRepository;
	};

	@Override
	@Transactional
	public PurchaseResponse placeOrder(Purchase purchase) {
		
		// retrieve the order info from dto
		Order order = purchase.getOrder();
		
		// generate tracking number
		String orderTrackingNumber = generateOrderTrackingNumber();
		order.setOrderTrackingNumber(orderTrackingNumber);
		
		// populate order with orderItems
		
		// populate order with billingAddress and shippingAddress
		
		// populate customer with order
		
		// save to the database
		
		// return a response 
		return null;
	};

	private String generateOrderTrackingNumber() {
		// TODO Auto-generated method stub
		return null;
	};
	
	
	
};
