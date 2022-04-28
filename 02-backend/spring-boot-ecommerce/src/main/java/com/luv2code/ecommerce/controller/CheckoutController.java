package com.luv2code.ecommerce.controller;

import org.springframework.web.bind.annotation.*;

import com.luv2code.ecommerce.dto.*;
import com.luv2code.ecommerce.service.CheckoutService;

// CheckoutController => CheckoutService => Spring Data JPA Repository

// @CrossOrigin("http://localhost:4200") <== replaced in application.properties with allowed.origins 

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
	
	private CheckoutService checkoutService;
	
	public CheckoutController( CheckoutService checkoutService ) {
		this.checkoutService = checkoutService;
	};
	
	@PostMapping("/purchase")
	public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
		
		PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
		
		return purchaseResponse;
	};
		
	// fails because we are sending checkout request with HTTP POST
	// by default CSRF is enabled and performs checks on POST using cookies
	// Since we are not using Cookies for session tracking, CSRF says request is unauthorized	
	// we can resolve this by disabling CSRF, this technique is commonly used for REST APIs
	 
	
};


