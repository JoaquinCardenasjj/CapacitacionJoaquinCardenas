import { Component, OnInit, KeyValueDiffer, Inject, KeyValueDiffers, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig, DEC } from '@angular/material';
import { DeletePacienteIn } from '../MethodParameters/Paciente/deletePacienteIn';
import { Paciente } from '../paciente';
import { PacienteService } from '../services/paciente.service';
import { PacienteCreateComponent } from '../paciente-create/paciente-create.component';
import { PacienteEditComponent } from '../paciente-edit/paciente-edit.component';
import { GetPacientesOut } from '../MethodParameters/Paciente/getPacientesOut';
import { Result } from '../MethodParameters/result';
import { ConfirmacionComponent } from 'src/app/shared/confirmacion/confirmacion.component';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})
export class PacienteListComponent implements OnInit {

  displayedColumns: string[];
  dataSource: Array<Paciente>;
  @Output() ConteoSuccess = new EventEmitter<string>();
  

  constructor(private servicio: PacienteService,
    private dialog: MatDialog,
    private router: Router
    ) { }
  ngOnInit() {
    // this.servicio.bSubject.next("load")

    this.servicio.dataSource.subscribe(data => {

      this.loadData();
    })


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
        
        this.ConteoSuccess.emit(this.dataSource.length.toString());
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
    dialogConfig.data = {
      deleteId: paciente.id_Paciente,
      accion: 'eliminar',
      controlador: 'paciente',
      lblTitulo: 'Eliminar paciente',
      lblAsunto: '¿Esta seguro que desea eliminar el paciente seleccionado?',
    };

    dialogConfig.width = '70%';

    const dialogRef = this.dialog.open(ConfirmacionComponent, dialogConfig)
      .afterClosed().subscribe(result => {
        this.loadData();
      });
  }
  detalle(paciente: Paciente): void {
    var posUltimaPosicion = location.pathname.lastIndexOf('/');
    var urlBack = location.pathname.substr(0, posUltimaPosicion + 1) + "paciente/" + paciente.id_Paciente;
    this.router.navigate([urlBack]);
    
  }

}
