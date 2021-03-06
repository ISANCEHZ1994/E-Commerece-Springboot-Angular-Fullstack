package com.luv2code.ecommerce.entity;
import java.util.Set;

import javax.persistence.*;

// Not using @Data because it will give error for OneToMany/ManyToOne relationships
import lombok.*;

@Entity
@Table( name = "product_category" )
@Getter
@Setter
public class ProductCategory {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id" )
	private Long id;
	
	@Column( name = "category_name" )
	private String categoryName;
	
	@OneToMany( cascade = CascadeType.ALL, mappedBy = "category" )
	@Column( name = "products" )
	private Set< Product > products;
	
	
};
