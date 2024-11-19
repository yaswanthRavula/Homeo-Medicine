package com.elasticsearch.muralihomeoelasticsearch.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PatientName {

	public String firstname;

	public PatientName() {
		super();
	}
	
	public PatientName(String firstname) {
		super();
		this.firstname = firstname;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	
	
}
