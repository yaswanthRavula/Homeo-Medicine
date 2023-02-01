import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-dose',
  templateUrl: './update-dose.component.html',
  styleUrls: ['./update-dose.component.css']
})
export class UpdateDoseComponent implements OnInit {

  constructor( private dialogRef:MatDialogRef<UpdateDoseComponent>, @Inject(MAT_DIALOG_DATA) public data) { }
  doseName;
  dosePower;

  ngOnInit(): void {
    this.doseName=this.data.doseName;
    this.dosePower=this.data.dosePower;
  }
   updateDose(){}
   dismissDialog(){}
}
