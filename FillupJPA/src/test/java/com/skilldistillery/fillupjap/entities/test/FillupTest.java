package com.skilldistillery.fillupjap.entities.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.skilldistillery.fillupjpa.entities.Fillup;

class FillupTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Fillup fillup;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("fillup");
	}	


	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		fillup = em.find(Fillup.class, 1);
	}

	@Test
	void test_fillup_has_id() {
		assertEquals(fillup.getId(), 1);
	}
	
	@Test
	void test_fillup_has_date() {
		assertTrue(fillup.getDate() != null);
	}
	
	@Test
	void test_fillup_has_gallons() {
		assertEquals(fillup.getGallons().doubleValue(), 8.3);
	}
	
	@Test
	void test_fillup_has_price() {
		assertEquals(fillup.getPricePerGallon().doubleValue(), 2.26);
	}

}
