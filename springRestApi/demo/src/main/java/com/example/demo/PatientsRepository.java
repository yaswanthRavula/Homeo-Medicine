package com.example.demo;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.Model.Patient;
import com.example.demo.Model.PatientShor;

@Repository
public interface PatientsRepository extends MongoRepository<Patient, BigInteger> {

	public List<PatientShor> findBy(Pageable pageable);
	@Query("{}")
	public List<PatientShor> findAllPatients();
	@Query("{ '$or': [ { 'firstname': { '$regex': ?0, '$options': 'i' } }, { 'lastname': { '$regex': ?0, '$options': 'i' } } ] }")
	public List<PatientShor> findByFirstnameContainingOrLastnameContaining(String firstname, String lastname);
}
