import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { HttpService } from '../services/http.service';
import { LocalStorageService } from '../services/local-storage.service';
import { PatientDetails } from '../services/patient-details';
import { PatientShort } from '../services/patient-short';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.css']
})
export class SearchPatientComponent implements OnInit {
  noOfPatients:any=0;
  patientsArray=[];
  sortedArray=[];
  @Output() patient:PatientDetails;
  constructor( private http:HttpService, public dialog: MatDialog, private localStorage:LocalStorageService, private router:Router) { }

  ngOnInit(): void {
       this.getPatients();
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




   showPatient(patient){
                  console.log(patient._id);
                   this.http.getPatientById(patient._id).subscribe((res:PatientDetails)=>{
                    let tempPatient = res;
                    this.localStorage.storeInLocalStorage(tempPatient);
                    console.log("Data test im Search patient\n"+JSON.stringify(tempPatient));
                    localStorage.setItem("currentPatient",JSON.stringify(tempPatient));
                    this.router.navigate(['/patientlist/patient']);
                  })
                 
   }

   deletePatient(patient){
    console.log(patient)
    alert("Since this is Production Data, You cannot Create/Update/Delete in test environment")
    return;
    let  dialogRef=this.dialog.open(DeleteDialogComponent,{width:"60%",height:"auto", data:patient});
    dialogRef.afterClosed().subscribe((wantToDelete)=>{
      if(wantToDelete){
        this.http.deletePatient(patient._id).subscribe((res)=>{
          if(res==true){
             this.getPatients();
             console.log("Successfully Deleted")
          }
          else{

          }
        })
      }
    })
   }



   getPatients(){
    this.http.getPatients().subscribe((data:any)=>{
      this.sortedArray=data;
      this.noOfPatients=this.sortedArray.length;
      console.log(this.sortedArray)

    })

}
getPatientsBySearch(){
  let searchedText=(<HTMLInputElement>document.getElementById("search")).value;
  this.http.getPatientsByName(searchedText).subscribe((res:any)=>{
    this.sortedArray = res;
    this.noOfPatients = res.length;
  })
}
}
