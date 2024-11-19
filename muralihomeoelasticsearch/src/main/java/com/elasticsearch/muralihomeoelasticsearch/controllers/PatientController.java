package com.elasticsearch.muralihomeoelasticsearch.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.elasticsearch.muralihomeoelasticsearch.Model.Patient;
import com.elasticsearch.muralihomeoelasticsearch.Model.PatientMongo;
import com.elasticsearch.muralihomeoelasticsearch.Model.PatientName;
import com.elasticsearch.muralihomeoelasticsearch.Model.PatientShor;
import com.elasticsearch.muralihomeoelasticsearch.configs.ElasticSearchUtil;
import com.elasticsearch.muralihomeoelasticsearch.repo.PatientRepository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.FuzzyQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import jakarta.websocket.server.PathParam;


@RestController
@CrossOrigin(origins = "*")
public class PatientController {

	@Autowired
	PatientRepository patientRepository;
	
	ElasticSearchUtil elasticSearchUtil = new ElasticSearchUtil();
	
	@Autowired
	ElasticsearchClient elasticsearchClient;
	
	RestTemplate restTemplate = new RestTemplate();
	@GetMapping("MigrateLatest")
	public Patient migrateDataFromMongoToElasticSearch() {
		String urlString = "https://d1ghyukalpa50j.cloudfront.net/HomeoMedicine/patients/getAllPatients";
		String getPatientByIdURLString = "https://d1ghyukalpa50j.cloudfront.net/HomeoMedicine/patients/getPatient/";
		PatientShor[] list = restTemplate.getForEntity(urlString, PatientShor[].class).getBody();
	    List<Patient> patientsFullList =new ArrayList();
	    int i =0;
	    for(PatientShor item : list) {
		   patientsFullList.add(patientMongoToPatient(restTemplate.getForEntity(getPatientByIdURLString+list[i++].get_id(), PatientMongo.class).getBody()));
		   if(i==300) break;
	    }
	    saveDataToElasticSearch(patientsFullList);
	   // return restTemplate.getForEntity(, null)
		return patientsFullList.get(0);
	}
	
	public void saveDataToElasticSearch(List<Patient> list) {
		System.out.println("Entering into SaveData Method");
		patientRepository.saveAll(list);
		
	}
	
	
	public Patient patientMongoToPatient(PatientMongo patientMongo) {
		Patient patient = new Patient(patientMongo.getFirstname(), patientMongo.getLastname(), patientMongo.getGender(), patientMongo.getNumber(), patientMongo.getCity(), patientMongo.getComment(), patientMongo.getAge(), patientMongo.getJoinedDate(), patientMongo.getDescription());
		patient.setId(patientMongo.get_id());
		return patient;
	}
	
	@GetMapping("getAllData")
	public Iterable<Patient> getAllData(){
		return patientRepository.findAll();
	}
	
	
	//Code to Implement Fuzzy Search 
	@GetMapping("fuzzySearch/{partialName}")
	public List<PatientShor> getFuzzySeachedNames(@PathVariable String partialName) {
		try {
			
			System.out.println("Name is :"+partialName);
			Query fuzzyQuery = Query.of(q -> q
	                .fuzzy(f -> f
	                        .field("firstname")          // Field to perform fuzzy search on
	                        .value(partialName)          // Partial term you are searching for
	                        .fuzziness("2")           // Fuzziness level, AUTO is commonly used
	                )
	        );

	        // Step 2: Create the SearchRequest with fuzzy query and field inclusion
	        SearchRequest searchRequest = new SearchRequest.Builder()
	                .index("patients")          // The Elasticsearch index to search in
	                .query(fuzzyQuery)          // Apply fuzzy query
	                .build();
	        
            // Execute the search
            SearchResponse<PatientShor> searchResponse = elasticsearchClient.search(searchRequest, PatientShor.class);
            List<PatientShor> patientsList = new ArrayList();
            // Process results (for example, printing out the hits)
            searchResponse.hits().hits().forEach(hit -> {
                System.out.println(hit.source());
                patientsList.add(hit.source());
            });
           // searchResponse.hits().hits();
            System.out.println("Returning");
            return patientsList;
        } catch (IOException e) {
            e.printStackTrace();
        }
		return null;
		
	}
	
	@GetMapping("autoComplete/{partialName}")
	public List<PatientName> getAutoCompleted(@PathVariable String partialName){
		try {
			
			Query matchQuery = Query.of(q -> q
	                .match(f -> f
	                        .field("firstname")          // Field to perform fuzzy search on
	                        .query(partialName) 
	                        .analyzer("edge_ngram_analyzer")// Fuzziness level, AUTO is commonly used
	                )
	        );

	        // Step 2: Create the SearchRequest with fuzzy query and field inclusion
	        SearchRequest searchRequest = new SearchRequest.Builder()
	                .index("patients")          // The Elasticsearch index to search in
	                .query(matchQuery)          // Apply fuzzy query
	                .build();
	        
            // Execute the search
            SearchResponse<PatientName> searchResponse = elasticsearchClient.search(searchRequest, PatientName.class);
            List<PatientName> patientsList = new ArrayList();
            // Process results (for example, printing out the hits)
            searchResponse.hits().hits().forEach(hit -> {
                patientsList.add(hit.source());
            });
           // searchResponse.hits().hits();
           return patientsList;
        } catch (IOException e) {
            e.printStackTrace();
        }
		return null;

	}
}
