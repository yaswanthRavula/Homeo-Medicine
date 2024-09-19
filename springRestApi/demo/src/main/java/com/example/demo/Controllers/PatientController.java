package com.example.demo.Controllers;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.PatientsRepository;
import com.example.demo.Model.Patient;
import com.example.demo.Model.PatientShor;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/HomeoMedicine/patients")
@CrossOrigin(origins = "*")
public class PatientController {
	@Autowired
	PatientsRepository patientsRepository;
	
	@Autowired
	MongoTemplate mongoTemplate;
	
	@GetMapping("/")
	public List<PatientShor> getAllpatients(@RequestParam(name="limit") int limit, @RequestParam(name="offset") int offset){
		Pageable pageable = PageRequest.of(offset, limit);
		//return patientsRepository.findBy(pageable);
		 Query query = new Query()
	                .limit(50)           // Set the limit
	                .skip(0)
	                .with(Sort.by(Sort.Direction.ASC, "joinedDate"));          // Set the offset
		 	
	        return mongoTemplate.find(query, PatientShor.class,"patients");
	}
	 
	@PostMapping("/")
	public boolean addNewPatient(Patient patient) {
		try {
			patientsRepository.save(patient);
			return true;
		}catch (Exception e) {
			// TODO: handle exception
			return false;
		}
	}
	
	
	
	@PutMapping("/{id}")
	public boolean updatePatient(@PathVariable(name = "id") BigInteger patientId, @RequestBody Patient patient) {
		try{
			Patient existedPatient = new Patient();
			 existedPatient = patientsRepository.findById(patientId).orElse(existedPatient);
			 existedPatient.setDescription(patient.getDescription());
			 patientsRepository.save(existedPatient);
			 return true;
		}catch(Exception e) {
			return false;
		}
	}
	
	
	
	@PostMapping("deleteIds")
	public boolean deleteByIds(@RequestBody List<BigInteger>ids )
	{
		try {
			patientsRepository.deleteAllById(ids);
			return true;
		}catch (Exception e) {
			// TODO: handle exception
			return false;
		}
	}
	
	
	
	@DeleteMapping("/{id}")
	public boolean deleteById(@PathVariable(name = "id") BigInteger id) {
       try {
    	   patientsRepository.deleteById(id);
    	   return true;
       }catch(Exception e){
    	   return false;
      
       }
	}
	
	
	
	
	@GetMapping("/irregular")
	public List<Patient> getIrregularPatients( ){
		try {
			return patientsRepository.findAll();
		}catch(Exception e) {
			return new ArrayList<Patient>();
		}
	}
	
	@GetMapping("/getPatient/{id}")
	public Patient getPatientById(@PathVariable(name="id")BigInteger id) {
		return patientsRepository.findById(id).orElse(null);
	}
	
	
	@GetMapping("/fetchByName")
	public List<PatientShor> fetchPatientsByName(@RequestParam(name = "name") String name){
		return patientsRepository.findByFirstnameContainingOrLastnameContaining(name, name);
	}
	
	@GetMapping("getAllPatients")
	public List<PatientShor> getAllpatientsNormal(){
		return patientsRepository.findAllPatients();
	}
}
