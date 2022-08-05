import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { HttpService } from '../services/http.service';
import { LocalStorageService } from '../services/local-storage.service';
import { PatientDetails } from '../services/patient-details';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.css']
})
export class SearchPatientComponent implements OnInit {
  noOfPatients:any=0;
  patientsArray:PatientDetails[];
  sortedArray:PatientDetails[];
  @Output() patient:PatientDetails;
  constructor( private http:HttpService, public dialog: MatDialog, private localStorage:LocalStorageService, private router:Router) { }

  ngOnInit(): void {
       this.getPatientsAndSort();
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

   deletePatient(patient){
    console.log(patient)
    let  dialogRef=this.dialog.open(DeleteDialogComponent,{width:"60%",height:"auto", data:patient});
    dialogRef.afterClosed().subscribe((wantToDelete)=>{
      if(wantToDelete){
        this.http.deletePatient(patient._id).subscribe((res)=>{
          if(res==true){
             this.getPatientsAndSort();
             console.log("Successfully Deleted")
          }
          else{
            
          }
        })
      }
    })
   }



   getPatientsAndSort(){
    this.http.getPatients().subscribe((data)=>{
      this.patientsArray=data;
      this.patientsArray=this.patientsArray.reverse()
      this.sortedArray=this.patientsArray;
      this.noOfPatients=this.sortedArray.length;
    })
}
}
