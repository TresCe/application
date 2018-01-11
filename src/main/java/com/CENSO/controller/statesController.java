package com.CENSO.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CENSO.model.statesModel;
import com.CENSO.repository.StatesRepository;



@RestController
public class statesController {

	@Autowired
	private StatesRepository statesRepository;
	
	@RequestMapping("/allStates")
	public ResponseEntity<List<statesModel>> getAllStates(){
		List<statesModel> statesList = new ArrayList<statesModel>();
		for (statesModel statesModel : statesRepository.findAll()) {
			statesList.add(new statesModel(statesModel.getId(), statesModel.getName()));
		}
		return new ResponseEntity<List<statesModel>>(statesList, HttpStatus.OK);
	}
	
	public Boolean findByID(long id){
		if(statesRepository.exists(id)) {
			return true;
		} else {
			return false;
		}
	}
}