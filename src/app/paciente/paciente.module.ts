
import { NgModule } from '@angular/core';
import { PacienteEditComponent } from './paciente-edit/paciente-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteCreateComponent } from './paciente-create/paciente-create.component';

import { PacienteComponent } from './paciente.component';
import { PacienteRoutingModule } from './paciente-routing.module';
import { MaterialModule } from '../material/material.module';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import { PacienteListNewComponent } from './paciente-listnew/paciente-listnew.component';
import { PacienteDetalleComponent } from './paciente-detalle/paciente-detalle.component';
import { AuthGuardService } from './services/auth.guard.service';


@NgModule({
  exports: [
    MaterialModule,

    PacienteEditComponent
  ],
  declarations: [
    PacienteComponent,
    PacienteEditComponent,
    PacienteCreateComponent,
    PacienteListComponent,
    PacienteListNewComponent,
    PacienteDetalleComponent
  ],
  imports: [

    PacienteRoutingModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ],
  entryComponents:
    [PacienteEditComponent,
      PacienteCreateComponent,
      PacienteDetalleComponent,
      PacienteListComponent,
      PacienteListNewComponent
    ],
  providers: [
    PacienteListNewComponent,
    PacienteListComponent,
    AuthGuardService
  ],
  bootstrap: []
})
export class PacienteModule { }
