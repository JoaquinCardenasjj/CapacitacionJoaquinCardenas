import { Component, OnInit, KeyValueDiffer, Inject, KeyValueDiffers, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { DeletePacienteIn } from '../MethodParameters/Paciente/deletePacienteIn';
import { Paciente } from '../paciente';
import { PacienteService } from '../services/paciente.service';
import { PacienteCreateComponent } from '../paciente-create/paciente-create.component';
import { PacienteEditComponent } from '../paciente-edit/paciente-edit.component';
import { GetPacientesOut } from '../MethodParameters/Paciente/getPacientesOut';
import { Result } from '../MethodParameters/result';
import { ConfirmacionComponent } from 'src/app/shared/confirmacion/confirmacion.component';
import { Observable } from 'rxjs';
import { CreatePacienteIn } from '../MethodParameters/Paciente/createPacienteIn';
import { CreatePacienteOut } from '../MethodParameters/Paciente/createPacienteOut';

@Component({
  selector: 'app-paciente-listnew',
  templateUrl: './paciente-listnew.component.html',
  styleUrls: ['./paciente-listnew.component.scss']
})
export class PacienteListNewComponent implements OnInit {
  @Output() ConteoNuevosSuccess = new EventEmitter<string>();
  displayedColumns: string[];
  dataSource: Array<Paciente> = new Array<Paciente>();
  dataSourceTable: MatTableDataSource<Paciente>;
  constructor
  (private servicio: PacienteService,
    private dialog: MatDialog, ) { }
  ngOnInit() {


    this.displayedColumns = [
      'nombre',
      'numeroSeguroSocial',
      'medicoPreferido'
    ];
    // this.dataSource = new Array<Paciente>();
    this.servicio.dataSourcePaciente.subscribe(data => {

      var json = JSON.parse(JSON.stringify(data));
      if (json.MedicoPreferido != undefined) {
        let paci = new Paciente();
        paci.medicoPreferido = json.MedicoPreferido;
        paci.nombre = json.Nombre;
        paci.numeroSeguroSocial = json.NumeroSeguro;
        debugger;
        if (this.dataSource == undefined) {
          this.dataSource = new Array<Paciente>();
        }
        this.dataSource.push(paci);
        this.dataSourceTable = new MatTableDataSource<Paciente>(this.dataSource);
        this.ConteoNuevosSuccess.emit(this.dataSource.length.toString());
        // this.dataSource = this.dataSource;
      }

    })

  }
  loadData(): void {

    var listaPacientes = this.servicio.list().subscribe(async (data: GetPacientesOut) => {

      if (data.result != Result.Error) {
        // this.dataSource = data.pacientes;
      }
    },
      error => {
      }
    );;
  }
  CargarNuevoPaciente(paciente: CreatePacienteIn): Observable<Paciente> {

    let response = new Observable<Paciente>();
    let paci = new Paciente();
    paci.medicoPreferido = paciente.MedicoPreferido;
    paci.nombre = paciente.Nombre;
    paci.numeroSeguroSocial = paciente.NumeroSeguro;
    if (this.dataSource == undefined) {
      this.dataSource = new Array<Paciente>();
    }
    this.dataSource.push(paci);
    return response;
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

}
