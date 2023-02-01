import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Description } from '../services/description';
import { PatientDetails } from '../services/patient-details';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddDoseComponent } from '../add-dose/add-dose.component';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { SearchPatientComponent } from '../search-patient/search-patient.component';
import { HttpService } from '../services/http.service';
import { UpdateDoseComponent } from '../update-dose/update-dose.component';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class VIewPatientComponent implements OnInit {
  uniqueDatesSet=new Set<any>() ;
  patient;
  description: Description[];

  constructor( private http:HttpService,  private router:Router, private local:LocalStorageService, private pipe:DatePipe, private matDialog:MatDialog) { }

  ngOnInit(): void {
    this.patient=JSON.parse(localStorage.getItem("currentPatient"));
    console.log("1.Patient Details after view ----",this.patient)
    this.description=this.patient.description;
    if(this.description==null){
      this.description=[];
    }
    this.getUniqueDates();
            // console.log(this.uniqueDatesSet.size)*/
  }

  addDoseClicked(){
    let d:Description[]=[];
   let dialogConfig= this.matDialog.open(AddDoseComponent,{autoFocus:true,width:'80%', data:d});
   dialogConfig.afterClosed().subscribe((res)=>{
    d=res;
    if(d!=undefined && d.length>0){
      d.forEach((elem)=>{
        this.description.push(elem); 
      })
    
    this.patient.description=this.description;
    let p:PatientDetails=this.patient;
    this.http.updatePatient(this.patient._id,p).subscribe((res)=>{
         if(res==true){
          localStorage.setItem("currentPatient",JSON.stringify(p));
         }
    })}
    this.getUniqueDates();

   })

  }


  getUniqueDates(){
    if(this.description!=null)
    this.description.filter((desc)=>{
    this.uniqueDatesSet.add(this.pipe.transform(desc.doseDate,"mediumDate"));
  });
  }

  //------------this method is called when user clicks on edit patient icon
  updatePatient(patient:PatientDetails){
    localStorage.setItem("currentPatient",JSON.stringify(patient));
    this.router.navigate(['/update-patient'])
  }

  updateDose(dose){
    var dialogRef=this.matDialog.open(UpdateDoseComponent ,{autoFocus:true,width:'80%', data:dose})
    dialogRef.afterClosed();
  }
}
