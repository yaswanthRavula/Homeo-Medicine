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
  doseName;
  dosePower;
  doseDate;

  constructor( private dialogRef:MatDialogRef<AddDoseComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }
  onAddDoseClicked(){
     this.data.doseName=(<HTMLInputElement>document.getElementById("doseName")).value;
     this.data.dosePower=(<HTMLInputElement>document.getElementById("dosePower")).value;
     this.data.doseDate=new Date((<HTMLInputElement>document.getElementById("doseDate")).value)
     console.log(this.data.doseDate)
      document.getElementById("fields-container").style.display="none";
      document.getElementById("success-container").style.display="inline";
}

  onCloseClicked(){
    console.log(this.data.doseDate)
    this.dialogRef.close(this.data);
  }



  onAddAnotherDoseClicked(){
    (<HTMLInputElement>document.getElementById("doseName")).value="";
    (<HTMLInputElement>document.getElementById("dosePower")).value="6X";
    document.getElementById("fields-container").style.display="inline";
    document.getElementById("success-container").style.display="none";
  }

}

