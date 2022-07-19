import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoseComponent } from './add-dose/add-dose.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ItemAddedDialogComponent } from './item-added-dialog/item-added-dialog.component';
import { SearchPatientComponent } from './search-patient/search-patient.component';
import { VIewPatientComponent } from './view-patient/view-patient.component';

const routes: Routes = [
   {path:'add', component: AddPatientComponent},
   {path:'patientlist',component: SearchPatientComponent},
   {path:'patientlist/patient',component:VIewPatientComponent},
   {path:'',pathMatch:"full",component:SearchPatientComponent}
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
