import { UpdateMode } from '@angular/compiler-cli/src/ngtsc/program_driver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoseComponent } from './add-dose/add-dose.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ItemAddedDialogComponent } from './item-added-dialog/item-added-dialog.component';
import { SearchPatientComponent } from './search-patient/search-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { VIewPatientComponent } from './view-patient/view-patient.component';
import { IrregularPatientsComponent } from './irregular-patients/irregular-patients.component';
import { PatientsNowComponent } from './patients-now/patients-now.component';

const routes: Routes = [
   {path:'add', component: AddPatientComponent},
   {path:'irregular-patients', component:IrregularPatientsComponent},
   {path:'patientlist',component: SearchPatientComponent},
   {path:'patientlist/patient',component:VIewPatientComponent},
   {path:'update-patient',component:UpdatePatientComponent},
   {path:'patients-today', component:PatientsNowComponent},
   {path:'',pathMatch:"full",redirectTo:'patientlist'}

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
