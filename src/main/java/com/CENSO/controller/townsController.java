package com.CENSO.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CENSO.model.townsModel;
import com.CENSO.repository.TownsRepository;

@RestController
public class townsController {
	
	@Autowired
	private TownsRepository townsRepository;
	
	@Autowired
	private statesController statesController;
	
	@RequestMapping("/findTownsInState")
	public ResponseEntity<List<townsModel>> findTownsInState(@RequestParam("id") int id){
		List<townsModel> townsList = new ArrayList<townsModel>();
		if(id == 0) {
			for (townsModel townsModel : townsRepository.findAll()) {
				townsList.add(new townsModel(townsModel.getState(), townsModel.getId(), townsModel.getName(), townsModel.getMale(), townsModel.getFemale()));
			}
			return new ResponseEntity<List<townsModel>>(townsList, HttpStatus.OK);
		} else {
			if(statesController.findByID(id)) {
				for (townsModel townsModel : townsRepository.findByState(id)) {
					townsList.add(new townsModel(townsModel.getState(), townsModel.getId(), townsModel.getName(), townsModel.getMale(), townsModel.getFemale()));
				}
				return new ResponseEntity<List<townsModel>>(townsList, HttpStatus.OK);
			} else {
				return new ResponseEntity<List<townsModel>>(HttpStatus.NO_CONTENT);
			}
		}
	}
	
	@RequestMapping("/getDateOfStates")
	public ResponseEntity<List<Object>> getDataOfSatetes(){
		List<Object> townsList = new ArrayList<Object>();
		for (Object object : townsRepository.getDateOfStates()) {
			townsList.add(object);
		}
		if (townsList.isEmpty()) {
			return new ResponseEntity<List<Object>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Object>>(townsList, HttpStatus.OK);
		}
	}
	
	@RequestMapping("/getDateOfTowns")
	public ResponseEntity<List<townsModel>> getDateOfTowns(@RequestParam("id") int id){
		List<townsModel> townsList = new ArrayList<townsModel>();
		townsList.add(townsRepository.findOne((long) id));
		if (townsList.isEmpty()) {
			return new ResponseEntity<List<townsModel>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<townsModel>>(townsList, HttpStatus.OK);
		}
	}
}