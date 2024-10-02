import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Description } from '../services/description';
import { HttpService } from '../services/http.service';
import { PatientDetails } from '../services/patient-details';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  firstName;
  secondName="";
  age;
  number=0;
  gender;
  comment="";
  city;
  sugar;
  bp;
  thyroid;
  patient;

  constructor( private route:Router, private http:HttpService) { }

  ngOnInit(): void {
    this.patient=JSON.parse(localStorage.getItem("currentPatient"));
    this.firstName=this.patient.firstname;
    this.secondName=this.patient.lastname;
    this.age=this.patient.age;
    this.number=this.patient.phoneNumber;
    this.gender=this.patient.gender;
    this.city=this.patient.city;
    this.comment=this.patient.comment;
    
  }


  updatePatient(){
    this.normalColors();
    let flag=0;
    if(this.firstName==undefined || this.firstName.length<=2){
      document.getElementById("firstname").style.border="1px solid red";
      flag=1;
    }
    if(this.secondName==undefined || this.secondName.length<=2){
      document.getElementById("secondname").style.border="1px solid red";
      flag=1;
    }
    if(this.age==undefined || this.age.length<=0 ||this.age >=150){
      document.getElementById("age").style.border="1px solid red";
      flag=1;
    }
    if(this.city==undefined || this.city.length<=2){
      document.getElementById("city").style.border="1px solid red";
      flag=1;
    }
    if(flag==1)
     return;
     this.gender=(<HTMLInputElement>(document.getElementById("gender"))).value;
     this.normalColors();
     this.sugar=(<HTMLInputElement>document.getElementById("Sugar")).checked;
     this.bp=(<HTMLInputElement>document.getElementById("BP")).checked;
     this.thyroid=(<HTMLInputElement>document.getElementById("Thyroid")).checked;
     if(this.sugar==true)
         this.comment="Sugar,\n"+this.comment;
     if(this.bp==true)
         this.comment="BP,\n"+this.comment;
    if(this.thyroid==true)
          this.comment="Thyroid,\n"+this.comment;  
    alert("Since this is Production Data, You cannot Create/Update/Delete in test environment")
    return;      
     let updatedPatient:PatientDetails={firstname:this.firstName, lastname:this.secondName, age:this.age, gender:this.gender, phoneNumber:this.number,city:this.city,comment:this.comment,joinedDate:this.patient.joinedDate,description:this.patient.description }
    this.http.updatePatient(this.patient._id,updatedPatient).subscribe((data)=>{
              if(data){
                    this.showDialog(updatedPatient);
    }});
  }


  showDialog(patient:PatientDetails){
    alert("Patient Details Updated!");
    this.route.navigate(['/patientlist'])
    
       
  }

//--------------------------------------TO check Input field values of the add patient form-----------------------
checkFirstName(){
  if(this.firstName==undefined || this.firstName.length<=2)
    document.getElementById("firstname").style.boxShadow="0.5px 1px 1px 0px red";
  else  
  document.getElementById("firstname").style.boxShadow="0.5px 1px 1px 0px green";
  }

  checkSecondName(){
    if(this.secondName==undefined || this.secondName.length<=2)
      document.getElementById("secondname").style.boxShadow="0.5px 1px 5px 0px red";
      else
      document.getElementById("secondname").style.boxShadow="0.5px 1px 1px 0px green";
    
  }

  checkAge(){
    if(this.age==undefined || this.age.length<=0 ||this.age >=150)
      document.getElementById("age").style.boxShadow="0.5px 1px 1px 0px red";
     else
     document.getElementById("age").style.boxShadow="0.5px 1px 1px 0px green";
      
  }
  checkCity(){
    if(this.city==undefined || this.city.length<=2)
      document.getElementById("city").style.boxShadow="0.5px 1px 1px 0px red";
    else  
    document.getElementById("city").style.boxShadow="0.5px 1px 1px 0px green";
    }



  normalColors(){
    document.getElementById("firstname").style.border="1px solid rgba(0, 0, 6, 0.151)";
    document.getElementById("secondname").style.border="1px solid rgba(0, 0, 6, 0.151)";
    document.getElementById("age").style.border="1px solid rgba(0, 0, 6, 0.151)";
    document.getElementById("number").style.border="1px solid rgba(0, 0, 6, 0.151)";
    document.getElementById("city").style.border="1px solid rgba(0, 0, 6, 0.151)";
  }


}
