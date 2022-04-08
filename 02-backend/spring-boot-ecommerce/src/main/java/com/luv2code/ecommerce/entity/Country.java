package com.luv2code.ecommerce.entity;

import java.util.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "country")
@Getter
@Setter
public class Country {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "code")
	private String code;
	
	@Column(name = "name")
	private String name;
	
	// TODO: Set up One-To-Many with STATE
	@OneToMany(mappedBy = "country")
	@JsonIgnore
	private List<State> states;		
	
};
