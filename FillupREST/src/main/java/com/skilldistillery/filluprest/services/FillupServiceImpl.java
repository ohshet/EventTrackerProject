package com.skilldistillery.filluprest.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.fillupjpa.entities.Fillup;
import com.skilldistillery.filluprest.repositories.FillupRepository;

public class FillupServiceImpl implements FillupService {
	
	@Autowired
	FillupRepository repo;
	
	@Override
	public List<Fillup> findAll() {
		List<Fillup> fillups = null;
		fillups = repo.findAll();
		return fillups;
	}

	@Override
	public Fillup findById(Integer id) {
		Optional<Fillup> optional;
		Fillup fillup = null;
		optional = repo.findById(id);
		if(optional.isPresent()) {
			fillup = optional.get();
		}
		return fillup;
	}

	@Override
	public List<Fillup> findByPriceRange(Double min, Double max) {
		List<Fillup> fillups = null;
		fillups = repo.findByPricePerGallonBetween(min, max);
		return fillups;
	}

	@Override
	public List<Fillup> findByOdometerRange(Integer min, Integer max) {
		List<Fillup> fillups = null;
		fillups = repo.findByOdometerBetween(min, max);
		return fillups;
	}

	@Override
	public List<Fillup> findByDateRange(Date min, Date max) {
		List<Fillup> fillups = null;
		fillups = repo.findByDateBetween(min, max);
		return fillups;
	}

	@Override
	public Fillup addFillup(Fillup fillup) {
		repo.saveAndFlush(fillup);
		return fillup;
	}

	@Override
	public Fillup updateFillup(Integer id, Fillup fillup) {
		Fillup managed = null;
		managed = repo.findById(id).get();
		if(managed != null) {
			managed.setDate(fillup.getDate());
			managed.setOdometer(fillup.getOdometer());
			managed.setPricePerGallon(fillup.getPricePerGallon());
			managed.setGallons(fillup.getGallons());
			repo.flush();
		}
		return managed;
	}

	@Override
	public Boolean deleteFillup(Integer id) {
		Boolean result = false;
		Optional<Fillup> optional;
		Fillup managed = null;
		optional = repo.findById(id);
		if (optional.isPresent()) {
			managed = optional.get();
			repo.delete(managed);
			result = true;			
		}		
		return result;
	}

}
