package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository< Order, Long > {

	//Page<Order> findByCustomerEmail( @Param("email") String email, Pageable pageable );
	
	// Behind the scenes, Spring will execute a query similar to this:
	// 			SELECT * FROM orders
	//			LEFT OUTER JOIN customer
	//			ON orders.customer_id = customer.id
	//			WHERE customer.email = :email <=== this will represent the 'email'/@Param("email") above!
	
	// same as above but added: OrderByDateCreatedDesc to the end of the method <= Note the Desc (Descending Order)
	Page<Order> findByCustomerEmailOrderByDateCreatedDesc( @Param("email") String email, Pageable pageable );
	
	//			SELECT * FROM orders
	//			LEFT OUTER JOIN customer
	//			ON orders.customer_id = customer.id
	//			WHERE customer.email = :email 
	//			ORDER BY orders.date_created DESC <== UPDATED
	
	
};
