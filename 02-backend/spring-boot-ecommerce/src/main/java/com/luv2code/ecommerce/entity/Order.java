package com.luv2code.ecommerce.entity;

import lombok.*;
import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.*;
import java.util.*;

@Entity
@Table( name = "orders" ) // to match what we have in the database - MySQL
@Getter
@Setter
public class Order {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id" )
	private Long id;
	
	@Column( name = "order_tracking_number" )
	private String orderTrackingNumber;
	
	@Column( name = "total_quantity" )
	private int totalQuantity;
	
	@Column( name = "total_price" )
	private BigDecimal totalPrice;
	
	@Column( name = "status" )
	private String status;
	
	@Column( name = "date_created" )
	@CreationTimestamp
	private Date dateCreated;
	
	@Column( name = "last_updated" )
	@UpdateTimestamp
	private Date lastUpdated;
	
	// An order has a collection of ORDERITEMS
	@OneToMany( cascade = CascadeType.ALL, mappedBy = "order" )
	private Set<OrderItem> orderItems = new HashSet<>();
	
	@ManyToOne
	@JoinColumn( name = "customer_id" )
	private Customer customer;
	
	// An order can have a shipping address AND a billing address
	@OneToOne( cascade = CascadeType.ALL )  // Address ID inside of Address.java
	@JoinColumn( name = "shipping_address_id", referencedColumnName = "id" )
	private Address shippingAddress;
	
	@OneToOne( cascade = CascadeType.ALL )  // Address ID inside of Address.java
	@JoinColumn( name = "billing_address_id", referencedColumnName = "id" )
	private Address billingAddress;
	
	// convenience method for adding order items to the given order	
	public void add( OrderItem item ) {
		
		if( item != null ) {
			if( orderItems == null ) {
				orderItems = new HashSet<>();
			}
			orderItems.add(item);
			item.setOrder(this); // lombok helps/reference is in OrderItem - Order order
		}		
	};
	
	
	
};
