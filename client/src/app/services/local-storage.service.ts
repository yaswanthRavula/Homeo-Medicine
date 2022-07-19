import { Injectable } from '@angular/core';
import { PatientDetails } from './patient-details';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  patient:PatientDetails;

  storeInLocalStorage(patient:PatientDetails){
      this.patient=patient;
  }

  getFromLocalStorage():PatientDetails{
      return this.patient;
  }
}
