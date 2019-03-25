package com.skilldistillery.fillup.controllers;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.skilldistillery.fillup.entities.Fillup;
import com.skilldistillery.fillup.services.FillupService;

@RestController
@RequestMapping("api")
public class FillupController {
	
	@Autowired
	FillupService fs;

//	@GetMapping("test")
//	public Boolean testController(HttpServletResponse response) {
//		response.setStatus(418);
//		return true;
//	}
	
	@GetMapping("fillups")
	public List<Fillup> findAll() {
		List<Fillup> fillups = null;
		fillups = fs.findAll();
		return fillups;
	}
	
	@GetMapping("fillups/{id}")
	public Fillup findFillupById(@PathVariable("id")Integer id, HttpServletResponse response) {
		Fillup fillup = null;
		fillup = fs.findById(id);
		if(fillup == null) {
			response.setStatus(400);
		}
		return fillup;
	}
	
	@GetMapping("fillups/price/{min}/{max}")
	public List<Fillup> findFillupsByPriceRange(@PathVariable("min") Double min,
						@PathVariable("max") Double max, HttpServletResponse response) {
		List<Fillup> fillups = null;
		fillups = fs.findByPriceRange(min, max);
		if(fillups == null || fillups.size() == 0) {
			response.setStatus(400);
		}
		return fillups;
	}
	
	@GetMapping("fillups/odometer/{min}/{max}")
	public List<Fillup> findFillupsByOdometerRange(@PathVariable("min") Integer min,
						@PathVariable("max") Integer max, HttpServletResponse response) {
		List<Fillup> fillups = null;
		fillups = fs.findByOdometerRange(min, max);
		if(fillups == null || fillups.size() == 0) {
			response.setStatus(400);
		}
		return fillups;
	}
	
	@GetMapping("fillups/date/{min}/{max}")
	public List<Fillup> findFillupsByDateRange(@PathVariable("min") Date min,
						@PathVariable("max") Date max, HttpServletResponse response) {		
		List<Fillup> fillups = null;
		fillups = fs.findByDateRange(min, max);
		if(fillups == null || fillups.size() == 0) {
			response.setStatus(400);
		}
		return fillups;
	}
	
	@DeleteMapping("fillups/{id}")
	public Boolean deleteById(@PathVariable("id") Integer id,
						HttpServletResponse response) {		
		Boolean result = null;
		result = fs.deleteFillup(id);
		response.setStatus(204);
		if(result == false) {
			response.setStatus(400);
		}
		return result;
	}
	
	@PostMapping("fillups")
	public Fillup addFillup(@RequestBody Fillup fillup, HttpServletResponse response) {
		Fillup newFillup = null;
		response.setStatus(201);
		newFillup = fs.addFillup(fillup);
		if(newFillup == null) {
			response.setStatus(400);
		}
		return newFillup;			
		}
	
	@PutMapping("fillups/{id}")
	public Fillup replaceFillup(@PathVariable("id") Integer id,
			 @RequestBody Fillup fillup,
			 HttpServletResponse response) {
		Fillup newFillup = null;
		newFillup = fs.updateFillup(id, fillup);
		if(newFillup == null ) {
			response.setStatus(400);
		}
		return newFillup;
	}
	}
	


