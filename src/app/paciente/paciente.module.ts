
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
    PacienteListNewComponent
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
      PacienteListComponent,
      PacienteListNewComponent
    ],
  providers: [PacienteListNewComponent,PacienteListComponent],
  bootstrap: []
})
export class PacienteModule { }
