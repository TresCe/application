package com.CENSO.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.CENSO.model.statesModel;

@Repository
public interface StatesRepository extends CrudRepository<statesModel, Long>{
	
}