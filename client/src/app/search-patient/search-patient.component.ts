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
  autoCompletedArray=[];
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

    })

}
n=0;
getPatientsBySearch(){
  this.n=0;
  let searchedText=(<HTMLInputElement>document.getElementById("search")).value;
  this.http.autoComplete(searchedText).subscribe((res:any)=>{
    this.n=searchedText.length
   // this.sortedArray = res;
    //this.noOfPatients = res.length;
    this.autoCompletedArray=res;
  })
}

onSuggestionClicked(item){
  this.autoCompletedArray=[];
  this.n=0;
  this.http.fuzzySearchByName(item.firstname).subscribe((res:any)=>{
    this.sortedArray = res;
    this.noOfPatients = res.length;
    (<HTMLInputElement>document.getElementById("search")).value=""
  })
}
}
