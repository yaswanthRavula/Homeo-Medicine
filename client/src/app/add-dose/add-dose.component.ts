import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig,MatDialogRef} from '@angular/material/dialog';
import { Description } from '../services/description';
import { VIewPatientComponent } from '../view-patient/view-patient.component';

@Component({
  selector: 'app-add-dose',
  templateUrl: './add-dose.component.html',
  styleUrls: ['./add-dose.component.css']
})
export class AddDoseComponent implements OnInit {
  doseName_6;
  doseName_30;
  doseName_200;
  doseName_1m;
  doseName_10m;
  doseName_mot;
  doseName_6x;
  doseName_oth;
  date;


  constructor( private dialogRef:MatDialogRef<AddDoseComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }
  onAddDoseClicked(){
    this.doseName_6=(<HTMLInputElement>document.getElementById("doseName-6")).value.split(",")
    this.doseName_30=(<HTMLInputElement>document.getElementById("doseName-30")).value.split(",")
    this.doseName_200=(<HTMLInputElement>document.getElementById("doseName-200")).value.split(",")
    this.doseName_1m=(<HTMLInputElement>document.getElementById("doseName-1m")).value.split(",")
    this.doseName_10m=(<HTMLInputElement>document.getElementById("doseName-10m")).value.split(",")
    this.doseName_mot=(<HTMLInputElement>document.getElementById("doseName-mot")).value.split(",")
    this.doseName_6x=(<HTMLInputElement>document.getElementById("doseName-6x")).value.split(",")
    this.doseName_oth=(<HTMLInputElement>document.getElementById("doseName-oth")).value.split(",");
     this.date=new Date((<HTMLInputElement>document.getElementById("doseDate")).value);
     console.log("_-----------"+this.date)
     this.assignRawDataToDescriptionArray();
      document.getElementById("fields-container").style.display="none";
      document.getElementById("success-container").style.display="inline";
}

  onCloseClicked(){
    console.log("After on dialog close------------"+this.date);
    console.log(this.data)
    this.dialogRef.close(this.data);
  }



  onAddAnotherDoseClicked(){
    (<HTMLInputElement>document.getElementById("doseName-6")).value="";
    (<HTMLInputElement>document.getElementById("doseName-30")).value="";
    (<HTMLInputElement>document.getElementById("doseName-200")).value="";
    (<HTMLInputElement>document.getElementById("doseName-1m")).value="";
    (<HTMLInputElement>document.getElementById("doseName-10m")).value="";
    (<HTMLInputElement>document.getElementById("doseName-mot")).value="";
    (<HTMLInputElement>document.getElementById("doseName-6x")).value="";
    (<HTMLInputElement>document.getElementById("doseName-oth")).value="";
   document.getElementById("fields-container").style.display="inline";
    document.getElementById("success-container").style.display="none";
  }


  assignRawDataToDescriptionArray(){
    console.log(this.date)
    this.doseName_6.forEach((element) => { if(element!="")this.data.push(new Description(element,"6",this.date))});
    this.doseName_30.forEach(element => {if(element!="") this.data.push( new Description(element,"30",this.date))});
    this.doseName_200.forEach(element => {if(element!="") this.data.push(new Description(element,"200",this.date))});
    this.doseName_1m.forEach(element => {if(element!="") this.data.push( new Description(element,"1m",this.date))});
    this.doseName_10m.forEach(element => {if(element!="") this.data.push( new Description(element,"10m",this.date))});
    this.doseName_mot.forEach(element => {if(element!="") this.data.push( new Description(element,"mot",this.date))});
    this.doseName_6x.forEach(element => {if(element!="") this.data.push( new Description(element,"6x",this.date))});
    this.doseName_oth.forEach(element => {if(element!="") this.data.push( new Description(element,"oth",this.date))});
  }


}

