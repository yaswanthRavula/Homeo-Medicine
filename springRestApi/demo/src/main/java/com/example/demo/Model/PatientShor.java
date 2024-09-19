package com.example.demo.Model;

import java.math.BigInteger;
import java.util.Date;

public class PatientShor {
	BigInteger _id;
	private String firstname, lastname, gender;
	 private int age;
	 private Date joinedDate;
	 
	 
	public BigInteger get_id() {
		return _id;
	}
	public void set_id(BigInteger _id) {
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
