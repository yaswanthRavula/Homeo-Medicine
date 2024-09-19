package com.example.demo.Model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class Description {
	private String doseName;
	private String dosePower;
	private Date doseDate;
	public String getDoseName() {
		return doseName;
	}
	public void setDoseName(String doseName) {
		this.doseName = doseName;
	}
	public String getDosePower() {
		return dosePower;
	}
	public void setDosePower(String dosePower) {
		this.dosePower = dosePower;
	}
	public Date getDoseDate() {
		return doseDate;
	}
	public void setDoseDate(Date doseDate) {
		this.doseDate = doseDate;
	}
	
	
	
	
}
