package com.skilldistillery.filluprest.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.fillupjpa.entities.Fillup;

public interface FillupRepository extends JpaRepository<Fillup, Integer> {

	public Optional<Fillup> findById(Integer id);
	
	public List<Fillup> findByOdometerBetween(Integer min, Integer max);
	
	public List<Fillup> findByGallonsBetween(Integer min, Integer max);
	
	public List<Fillup> findByPricePerGallonBetween(Double min, Double max);
	
	public List<Fillup> findByDateBetween(Date min, Date max);
}
