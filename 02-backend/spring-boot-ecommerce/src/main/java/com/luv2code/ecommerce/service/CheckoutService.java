package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dto.*;

public interface CheckoutService {

	PurchaseResponse placeOrder(Purchase purchase);
	
}
