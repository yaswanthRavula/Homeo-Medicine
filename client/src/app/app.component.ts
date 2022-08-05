import { Component, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SearchPatientComponent } from './search-patient/search-patient.component';
import { PatientDetails } from './services/patient-details';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private route:Router){

  }

  ngOnInit():void{
  }

  goToPatientsList(){
      this.route.navigate(['/patientlist']);

  }  
  goToAddPatient(){
    this.route.navigate(['/add']);
  }
  
}
