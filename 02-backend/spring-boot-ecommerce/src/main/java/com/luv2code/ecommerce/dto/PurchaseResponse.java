package com.luv2code.ecommerce.dto;

import lombok.*;

@Data
public class PurchaseResponse {

//	@NonNull	
//	private String orderTrackingNumber;
	
	// Since we are using Lombok @Data - will generate constructor for final fields - BEFORE was not FINAL
	
	private final String orderTrackingNumber;
	
	
};
