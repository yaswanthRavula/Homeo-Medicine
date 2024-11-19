package com.elasticsearch.muralihomeoelasticsearch.repo;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.elasticsearch.muralihomeoelasticsearch.Model.Patient;

public interface PatientRepository extends ElasticsearchRepository<Patient, String> {

}
