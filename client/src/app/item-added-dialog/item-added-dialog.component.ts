import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Route } from '@angular/router';
import { Router } from 'express';
import { LocalStorageService } from '../services/local-storage.service';
import { PatientDetails } from '../services/patient-details';

@Component({
  selector: 'app-item-added-dialog',
  templateUrl: './item-added-dialog.component.html',
  styleUrls: ['./item-added-dialog.component.css']
})
export class ItemAddedDialogComponent implements OnInit {
 patient:PatientDetails;
  constructor( private localstorage:LocalStorageService, public dialogRef: MatDialogRef<ItemAddedDialogComponent>, @Inject(MAT_DIALOG_DATA) public data ) { }
   patientName;
   age;
   gender;
  ngOnInit(): void {
    console.log(this.data)
     this.patientName=this.data.firstname;
     this.age=this.data.age;
     this.gender=this.data.gender;
  
  }

  onOkClicked(){
    this.dialogRef.close();

  }

}
