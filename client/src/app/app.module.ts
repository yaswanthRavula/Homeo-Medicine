import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPatientComponent } from './search-patient/search-patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ItemAddedDialogComponent } from './item-added-dialog/item-added-dialog.component';
import { VIewPatientComponent } from './view-patient/view-patient.component';
import { DatePipe } from '@angular/common';
import { AddDoseComponent } from './add-dose/add-dose.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    SearchPatientComponent,
    AddPatientComponent,
    ItemAddedDialogComponent,
    VIewPatientComponent,
    AddDoseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
    
  ],
  
  providers: [DatePipe,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents:[ItemAddedDialogComponent,AddDoseComponent]
})
export class AppModule { }
