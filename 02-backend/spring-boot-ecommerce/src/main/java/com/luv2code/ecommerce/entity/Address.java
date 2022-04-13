package com.luv2code.ecommerce.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@Table( name = "address" )
@Getter
@Setter
public class Address {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id" )
	private Long id;
	
	@Column( name = "street" )
	private String street;
	
	@Column( name = "city" )
	private String city;
	
	@Column( name = "state" )
	private String state;
	
	@Column( name = "country" )
	private String country;
	
	@Column( name = "zip_code" )
	private String zipCode;
	
	// this takes care of the relationship between address and order..
	@OneToOne
	@PrimaryKeyJoinColumn
	private Order order;
		
};
