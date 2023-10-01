import { Component, OnInit, Output } from '@angular/core';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { PatientDetails } from '../services/patient-details';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-patients-now',
  templateUrl: './patients-now.component.html',
  styleUrls: ['./patients-now.component.css']
})
export class PatientsNowComponent implements OnInit {
  noOfPatients:any=0;
  patientsArray:PatientDetails[];
  sortedArray:PatientDetails[];
  @Output() patient:PatientDetails;
  isLoading=true;


  constructor(private router:Router,  private localStorage:LocalStorageService, private dialog:MatDialog, private http: HttpService ) { }

  ngOnInit(): void {
    this.isLoading=true
    this.getAllPatients();
  }






/************************************************************************************************************** */





sortArray(){
  console.log("Clicked");
  let searchedText=(<HTMLInputElement>document.getElementById("search")).value;
       this.sortedArray=this.patientsArray.filter((patient)=>{
        if(patient.firstname.toLowerCase().includes(searchedText.toLowerCase()))
            return patient;
        else if(patient.lastname.toLowerCase().includes(searchedText.toLowerCase()))
             return patient;
        else
           return null;
       })
       console.log(this.sortedArray)
       this.noOfPatients=this.sortedArray.length;
}




/*********************************************************************************************************** */




 showPatient(patient:PatientDetails){
                this.localStorage.storeInLocalStorage(patient);
                console.log("Data test im Search patient\n"+JSON.stringify(patient));
                localStorage.setItem("currentPatient",JSON.stringify(patient));
                this.router.navigate(['/patientlist/patient']);
 }

async getAllPatients(){
  this.isLoading=true;
  this.http.getInitialPatients().subscribe((data)=>{
    this.patientsArray=data;
   this.sortedArray=this.patientsArray;
  })
  this.http.getPatients().subscribe((data)=>{
   this.sortedArray=this.sortedArray.concat(data);
    this.patientsArray=data;
    this.filterArrayByDates()
  })


}


async filterArrayByDates(){
  let date= new Date();
  this.sortedArray= await this.sortedArray.filter((ele)=>{

    return (new Date(ele.joinedDate).getFullYear()== date.getFullYear()
    &&
    (ele.description != null && ele.description != undefined)
    &&
    new Date(ele.description[ele.description.length-1].doseDate).getFullYear()== date.getFullYear()
    &&
    new Date(ele.description[ele.description.length-1].doseDate).getMonth()== date.getMonth()
    &&
    new Date(ele.description[ele.description.length-1].doseDate).getDate()== date.getDate())
  })
  console.log(this.sortedArray.length);
  this.noOfPatients=this.sortedArray.length;
  this.isLoading=false;
}
}
