import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { LocalStorageService } from '../services/local-storage.service';
import { PatientDetails } from '../services/patient-details';

@Component({
  selector: 'app-item-added-dialog',
  templateUrl: './item-added-dialog.component.html',
  styleUrls: ['./item-added-dialog.component.css']
})
export class ItemAddedDialogComponent implements OnInit {
 patient:PatientDetails;
  constructor(private localstorage:LocalStorageService, public dialogRef: MatDialogRef<ItemAddedDialogComponent> ) { }

  ngOnInit(): void {
    this.patient=this.localstorage.getFromLocalStorage();
  }

}
