import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './paciente/paciente.component';
import { AppComponent } from './app.component';
import { PacienteRoutingModule } from './paciente/paciente-routing.module';

export const SITE_ROUTES: Routes = [
  {
    path: 'home', component: AppComponent
  }
];

@NgModule({
  imports: [
    PacienteRoutingModule
    , RouterModule.forRoot(SITE_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
