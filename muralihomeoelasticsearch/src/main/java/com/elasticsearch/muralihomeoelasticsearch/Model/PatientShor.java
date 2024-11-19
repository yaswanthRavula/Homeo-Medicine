package com.elasticsearch.muralihomeoelasticsearch.Model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PatientShor {
	String _id;
	private String firstname, lastname, gender;
	 private int age;
	 private Date joinedDate;
	 
	 
	 
	public PatientShor() {
		super();
	}
	public PatientShor(String _id, String firstname, String lastname, String gender, int age, Date joinedDate) {
		super();
		this._id = _id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.gender = gender;
		this.age = age;
		this.joinedDate = joinedDate;
	}
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public Date getJoinedDate() {
		return joinedDate;
	}
	public void setJoinedDate(Date JoinedDate) {
		this.joinedDate = JoinedDate;
	}
	 
	 
}
