package com.skilldistillery.fillupjpa.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Fillup {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;	
	
	@Column(name="time_stamp")
	private Date timeStamp;
	
	private Integer odometer;
	
	@Column(name="price_per_gallon")
	private Double pricePerGallon;
	
	private Double gallons;
	
	public Fillup() {
		super();
	}

	public Fillup(int id, Date timeStamp, Integer odometer, Double pricePerGallon, Double gallons) {
		super();
		this.id = id;
		this.timeStamp = timeStamp;
		this.odometer = odometer;
		this.pricePerGallon = pricePerGallon;
		this.gallons = gallons;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}

	public Integer getOdometer() {
		return odometer;
	}

	public void setOdometer(Integer odometer) {
		this.odometer = odometer;
	}

	public Double getPricePerGallon() {
		return pricePerGallon;
	}

	public void setPricePerGallon(Double pricePerGallon) {
		this.pricePerGallon = pricePerGallon;
	}

	public Double getGallons() {
		return gallons;
	}

	public void setGallons(Double gallons) {
		this.gallons = gallons;
	}
	
}
