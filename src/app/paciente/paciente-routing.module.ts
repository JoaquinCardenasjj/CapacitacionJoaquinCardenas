import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './paciente.component';
import { PacienteDetalleComponent } from './paciente-detalle/paciente-detalle.component';
import { AuthGuardService } from './services/auth.guard.service';



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
    canActivate: [AuthGuardService]
  }, {
    path: 'paciente/:id', component: PacienteDetalleComponent,
    canDeactivate: [AuthGuardService],
    canActivate: [AuthGuardService]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
