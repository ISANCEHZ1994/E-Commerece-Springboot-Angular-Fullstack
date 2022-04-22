package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.*;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.*;
// import org.springframework.web.bind.annotation.*;


@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer>{
	
	// to retrieve states for a given country code  
	// http://localhost:8080/api/states/search/findByCountryCode?code=IN
	List<State> findByCountryCode(@Param("code") String code);

};
