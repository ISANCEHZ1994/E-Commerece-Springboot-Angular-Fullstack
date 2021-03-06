package com.luv2code.ecommerce.entity;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "state")
@Data
public class State {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "name")
	private String name;
	
	// Many states belong to ONE COUNTRY
	@ManyToOne
	@JoinColumn(name = "country_id")
	private Country country;
	
	

};
