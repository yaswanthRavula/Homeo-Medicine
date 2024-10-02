import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientDetails } from './patient-details';
import { PatientShort } from './patient-short';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
APiUrl="https://d1ghyukalpa50j.cloudfront.net/HomeoMedicine/patients";
//for testing----> APiUrl="http://localhost:8080/HomeoMedicine/patients"

  constructor(private http:HttpClient ) { }

  postPatient(patient: PatientDetails){
    return this.http.post(this.APiUrl+"/",patient);
  }

  getInitialPatients():Observable<PatientDetails[]>{
    return this.http.get<PatientDetails[]>(this.APiUrl+"/initial");
  }
  getPatients(){
    return this.http.get(this.APiUrl+"/getAllPatients");
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

  getPatientById(patientId){
    return this.http.get(this.APiUrl+"/getPatient/"+patientId);
  }
  getPatientsByName(name){
    return this.http.get(this.APiUrl+"/fetchByName?name="+name)
  }
}
