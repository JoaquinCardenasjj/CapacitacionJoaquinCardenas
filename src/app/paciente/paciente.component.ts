import { Component, OnInit } from '@angular/core';
import { PacienteService } from './services/paciente.service';

import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Paciente } from './paciente';
import { GetPacientesOut } from './MethodParameters/Paciente/getPacientesOut';
import { Result } from './MethodParameters/result';
import { PacienteEditComponent } from './paciente-edit/paciente-edit.component';
import { PacienteCreateComponent } from './paciente-create/paciente-create.component';
import { PacienteListComponent } from './paciente-list/paciente-list.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {
  displayedColumns: string[];
  dataSource: Array<Paciente>;
  constructor(private servicio: PacienteService,
    private dialog: MatDialog, ) { }
  ngOnInit() {

    this.loadData();

    this.displayedColumns = [
      'id_Paciente',
      'nombre',
      'numeroSeguroSocial',
      'medicoPreferido',
      'acciones'
    ];

  }
  loadData(): void {

    var listaPacientes = this.servicio.list().subscribe(async (data: GetPacientesOut) => {

      if (data.result != Result.Error) {
        this.dataSource = data.pacientes;
      }
    },
      error => {
      }
    );;
  }
  edit(paciente: Paciente): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = paciente;
    dialogConfig.width = '70%';

    const dialogRef = this.dialog.open(PacienteEditComponent, dialogConfig)
      .afterClosed().subscribe(result => {
        this.loadData();
      });
  }
  create(): void {

    let paciente = new Paciente();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = paciente;
    dialogConfig.width = '70%';

    const dialogRef = this.dialog.open(PacienteCreateComponent, dialogConfig)
      .afterClosed().subscribe(result => {
        this.loadData();
      });
  }
  delete(paciente: Paciente): void {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = paciente;
    dialogConfig.width = '70%';

    const dialogRef = this.dialog.open(PacienteListComponent, dialogConfig)
      .afterClosed().subscribe(result => {
        this.loadData();
      });
  }


}
