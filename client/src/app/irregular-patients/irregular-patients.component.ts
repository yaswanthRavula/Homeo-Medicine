import { Component, OnInit } from '@angular/core';
import { PatientDetails } from '../services/patient-details';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-irregular-patients',
  templateUrl: './irregular-patients.component.html',
  styleUrls: ['./irregular-patients.component.css']
})
export class IrregularPatientsComponent implements OnInit {
 sortedArray:PatientDetails[];
  selectAllFlag=true;
  patientIds=[];
  patientsArray=[];
  isLoading=true;
  constructor(private http:HttpService,private localStorage:LocalStorageService, private router:Router) { }

  ngOnInit(): void {
    this.getAllPatients();
  }



  onSelectAllClicked(){
    this.selectAllFlag=!this.selectAllFlag
    if(this.selectAllFlag == true){
      for(var i=0; i<this.sortedArray.length; i++)
        console.log("Entering.")
        this.onUnSelectedPatient(i)
    }else{
      for(var i=0; i<this.sortedArray.length; i++)
        this.onSelectedPatient(i)
    }
  }
  onSelectedPatient(i){
    document.getElementById("uncheckbox-"+i).style.visibility="visible";
    document.getElementById("checkbox-"+i).style.visibility="hidden";
  }
  onUnSelectedPatient(i){
    document.getElementById("uncheckbox-"+i).style.visibility="hidden";
    document.getElementById("checkbox-"+i).style.visibility="visible";
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
  filterArrayByDates(){
    let date= new Date();
    this.sortedArray=this.sortedArray.filter((ele)=>{

      return (new Date(ele.joinedDate).getFullYear()< date.getFullYear()
      &&
      (ele.description != null && ele.description != undefined)
      &&
      new Date(ele.description[ele.description.length-1].doseDate).getFullYear()< date.getFullYear()
      &&
      new Date(ele.description[ele.description.length-1].doseDate).getMonth()< date.getMonth())
    })
    console.log(this.sortedArray.length)
    this.isLoading=false;
  }

  showPatient(patient:PatientDetails){
    this.localStorage.storeInLocalStorage(patient);
    console.log("Data test im Search patient\n"+JSON.stringify(patient));
    localStorage.setItem("currentPatient",JSON.stringify(patient));
    this.router.navigate(['/patientlist/patient']);
}

deleteAll(){
  let listIds=[];
   this.sortedArray.filter((ele:any)=>{
    listIds.push(ele._id);
   })
   console.log(listIds)
   this.http.deletePatientsBasedbyIds(listIds).subscribe(res=>{
      if(res==true){
        alert("Items Deleted")
        this.getAllPatients();
      }
   });
}

}
