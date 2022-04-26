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
	
	 	
};


