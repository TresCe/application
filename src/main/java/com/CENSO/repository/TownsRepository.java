package com.CENSO.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.CENSO.model.townsModel;

@Repository
public interface TownsRepository extends CrudRepository<townsModel, Long>{
	
	List<townsModel> findByState(int state);
	
	@Query("SELECT state, id, name, SUM(male)+SUM(female) from towns group by state")
	public List<Object> getDateOfStates();
}