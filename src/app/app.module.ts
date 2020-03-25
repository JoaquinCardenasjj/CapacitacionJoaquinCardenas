import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppSettings } from './app.settings';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PacienteModule } from './paciente/paciente.module';
import { MaterialModule } from './material/material.module';
import { ConfirmacionComponent } from './shared/confirmacion/confirmacion.component';


@NgModule({
  exports: [

    
    PacienteModule,
    MaterialModule,
  
    
  ],
  declarations: [
    AppComponent,    
    ConfirmacionComponent
  ],
  imports: [
    
    AppRoutingModule,
    PacienteModule,
    MaterialModule,
    HttpClientModule,    
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
  ],
  entryComponents: [ConfirmacionComponent],
  providers: [AppSettings],
  bootstrap: [AppComponent]
})
export class AppModule { }
