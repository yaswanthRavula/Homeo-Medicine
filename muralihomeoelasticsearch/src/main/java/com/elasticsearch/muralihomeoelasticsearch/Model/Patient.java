package com.elasticsearch.muralihomeoelasticsearch.Model;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@JsonIgnoreProperties(ignoreUnknown = true)
@Document(indexName = "patients")
public class Patient {
	@Id
	private String id;
	 private String firstname, lastname, gender, number, city, comment;
	 private int age;
	 private Date joinedDate;
	 private List<Description> description;
	
	 
	 
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
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
	public void setJoinedDate(Date joinedDate) {
		this.joinedDate = joinedDate;
	}
	public List<Description> getDescription() {
		return description;
	}
	public void setDescription(List<Description> description) {
		this.description = description;
	}
	
	
	
	
	public Patient() {
		super();
	}
	public Patient(String id, String firstname, String lastname, String gender, String number, String city,
			String comment, int age, Date joinedDate, List<Description> description) {
		super();
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.gender = gender;
		this.number = number;
		this.city = city;
		this.comment = comment;
		this.age = age;
		this.joinedDate = joinedDate;
		this.description = description;
	}
	public Patient(String firstname, String lastname, String gender, String number, String city, String comment,
			int age, Date joinedDate, List<Description> description) {
		super();
		this.firstname = firstname;
		this.lastname = lastname;
		this.gender = gender;
		this.number = number;
		this.city = city;
		this.comment = comment;
		this.age = age;
		this.joinedDate = joinedDate;
		this.description = description;
	}
	 
	 
	 
}
