import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './paciente.component';


export const PACIENTE_ROUTES: Routes = [
  {
    path: 'home', component: PacienteComponent
  }
];
const routes: Routes = [
  {
    path: 'paciente', component: PacienteComponent,
    children: [
      {
        path: '', children: PACIENTE_ROUTES
      },
    ],
  }, {
    path: 'paciente/:id', component: PacienteComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
