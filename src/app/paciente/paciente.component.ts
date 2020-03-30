import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PacienteService } from './services/paciente.service';

import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Paciente } from './paciente';
import { GetPacientesOut } from './MethodParameters/Paciente/getPacientesOut';
import { Result } from './MethodParameters/result';
import { PacienteEditComponent } from './paciente-edit/paciente-edit.component';
import { PacienteCreateComponent } from './paciente-create/paciente-create.component';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import { MatSnackBar } from '@angular/material';


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
  conteoTotal: string;
  conteoTotalNuevos: string;
  // @Output() UploadSuccess = new EventEmitter<string>();
  constructor(private servicio: PacienteService,
    private pacienteListComponent: PacienteListComponent,
    private snackBar: MatSnackBar,
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
        // this.pacienteListComponent.loadData();
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
        // this.pacienteListComponent.loadData();
      });
  }
  descargar(): void {

    this.servicio.descargar().subscribe(data => {
      debugger;
      var jsonP = JSON.parse(JSON.stringify(data));

      const linkSource = 'data:application/pdf;base64,' + data.archivo;
      const downloadLink = document.createElement("a");
      const fileName = "example.pdf";

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();

      // this.enviada = false;
      this.snackBar.open('¡Se encontro el archivo con exito!', 'X', {
        duration: 5000,
        panelClass: ['success-snackbar']
      });
    }, error => {
      var mensaje = 'Se presento un problema con el servidor, por favor comuníquese con el administrador.';
      // this.disableSubmit = false;
      this.snackBar.open(mensaje, 'X', {
        duration: 10000,
        panelClass: ['error-snackbar']
      });
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
  ConteoTotalSuccess(conteoTotal: string) {

    this.conteoTotal = conteoTotal;
  }
  ConteoTotalNuevosSuccess(conteoTotalNuevos: string) {

    this.conteoTotalNuevos = conteoTotalNuevos;
  }


}
