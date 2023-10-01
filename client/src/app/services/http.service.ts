import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientDetails } from './patient-details';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
APiUrl="https://homeo-medicine-ep67.vercel.app/HomeoMedicine/patients";
//for testing---->APiUrl="http://localhost:3000/HomeoMedicine/patients"

  constructor(private http:HttpClient ) { }

  postPatient(patient: PatientDetails){
    return this.http.post(this.APiUrl,patient);
  }

  getInitialPatients():Observable<PatientDetails[]>{
    return this.http.get<PatientDetails[]>(this.APiUrl+"/initial");
  }
  getPatients():Observable<PatientDetails[]>{
    return this.http.get<PatientDetails[]>(this.APiUrl);
  }
  updatePatient( patientId,patient:PatientDetails){
    console.log(patientId);
    return this.http.put(this.APiUrl+"/"+patientId,patient);

  }
  deletePatient(patientId){
    return this.http.delete(this.APiUrl+"/"+patientId);
  }
  getAllIrregularPatients(){
    return this.http.get(this.APiUrl+"/irregular");
  }

  deletePatientsBasedbyIds(idsList:any[]){
    return this.http.post(this.APiUrl+"/deleteIds", idsList);
  }
}
