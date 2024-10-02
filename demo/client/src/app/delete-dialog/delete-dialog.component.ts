import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  isDeleted=false;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public patient) { }

  ngOnInit(): void {
  }
  onCancel(){
    this.dialogRef.close(this.isDeleted);
  }
  onDeleted(){
    this.dialogRef.close(this.isDeleted=true);
  }

}
