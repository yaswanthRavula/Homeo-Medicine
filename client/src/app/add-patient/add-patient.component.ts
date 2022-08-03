import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LocalStorageService } from '../services/local-storage.service';
import { PatientDetails } from '../services/patient-details';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ItemAddedDialogComponent } from '../item-added-dialog/item-added-dialog.component';
import { config } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  firstName;
  secondName="";
  age;
  number;
  gender;
  comment="";

  constructor(private route:Router , private http:HttpService, private localStorageService:LocalStorageService, private dialog:MatDialog){

  }
  ngOnInit(): void {
  }

  //---------------------------when you clcik on submit (Add Patient) Button in form-----------------------------
  addPatient(){
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
    if(this.number==undefined || this.number<6000000000 || this.number>=10000000000){
      document.getElementById("number").style.border="1px solid red";
      flag=1;
    }
    if(flag==1)
     return;
     this.normalColors();
     this.gender=(<HTMLInputElement>document.getElementById("gender")).value;
     let patient:PatientDetails={firstname:this.firstName, lastname:this.secondName, age:this.age, gender:this.gender, phoneNumber:this.number,c:this.comment,joinedDate:new Date(),description:null }
    this.http.postPatient(patient).subscribe((data)=>{if(data){
                    this.showDialog(patient);
    }});
  }


  showDialog(patient:PatientDetails){
        var dialogRef=this.dialog.open(ItemAddedDialogComponent,{autoFocus:true, data:patient});
       dialogRef.afterClosed().subscribe(()=>{this.route.navigate(['/patientlist'])});
        

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

  checkNumber(){
    if(this.number==undefined || this.number<6000000000 || this.number>=10000000000)
      document.getElementById("number").style.boxShadow="0.5px 1px 1px 0px red";
      else 
      document.getElementById("number").style.boxShadow="0.5px 1px 1px 0px green";
        
      
  }



  normalColors(){
    document.getElementById("firstname").style.border="1px solid rgba(0, 0, 6, 0.151)";
    document.getElementById("secondname").style.border="1px solid rgba(0, 0, 6, 0.151)";
    document.getElementById("age").style.border="1px solid rgba(0, 0, 6, 0.151)";
    document.getElementById("number").style.border="1px solid rgba(0, 0, 6, 0.151)";
  }

}
