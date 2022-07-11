import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPatientComponent } from './search-patient/search-patient.component';

const routes: Routes = [
  {path:'',component:SearchPatientComponent}
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
