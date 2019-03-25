package com.skilldistillery.fillup.services;

import java.sql.Date;
import java.util.List;
import com.skilldistillery.fillup.entities.Fillup;

public interface FillupService {

	public List<Fillup> findAll();

	public Fillup findById(Integer id);

	public List<Fillup> findByPriceRange(Double min, Double max);

	public List<Fillup> findByOdometerRange(Integer min, Integer max);

	public List<Fillup> findByDateRange(Date min, Date max);

	public Fillup addFillup(Fillup fillup);

	public Fillup updateFillup(Integer id, Fillup newFillup);

	public Boolean deleteFillup(Integer id);
}
