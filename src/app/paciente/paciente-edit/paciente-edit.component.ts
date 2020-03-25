import { Component, OnInit, Inject, KeyValueDiffers, KeyValueDiffer } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UpdatePacienteIn } from '../MethodParameters/Paciente/updatePacienteIn';
import { Paciente } from '../paciente';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-paciente-edit',
  templateUrl: './paciente-edit.component.html',
  styleUrls: ['./paciente-edit.component.scss']
})
export class PacienteEditComponent implements OnInit {
  paciente: Paciente;
  form: FormGroup;
  clone = {};
  private customerDiffer: KeyValueDiffer<string, any>;

  constructor(
    private servicio: PacienteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<PacienteEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: Paciente,
    private dialog: MatDialog,
    private differs: KeyValueDiffers,
  ) {
    this.paciente = data;
    this.form = this.formBuilder.group(
      {
        'id_Paciente': [null, Validators.compose([Validators.required])],
        'nombre': [null, Validators.compose([Validators.required, Validators.maxLength(60)])],
        'numeroSeguroSocial': [null, Validators.compose([Validators.required])],
        'medicoPreferido': [null, Validators.compose([Validators.required])]
      }
    );
  }

  ngOnInit() {
    this.clone = JSON.parse(JSON.stringify(this.paciente));
    this.customerDiffer = this.differs.find(this.paciente).create();

  }

  close() {
    this.dialogRef.close();
  }
  save() {
    if (this.form.valid == true) {
      let paciente = new UpdatePacienteIn();
      paciente.pacienteId = this.paciente.id_Paciente;
      paciente.Nombre = this.paciente.nombre;
      paciente.NumeroSeguro = this.paciente.numeroSeguroSocial;
      paciente.MedicoPreferido = this.paciente.medicoPreferido;
      this.servicio.update(paciente).subscribe(data => {
        this.dialogRef.close(this.form.value);
        // this.enviada = false;
        this.snackBar.open('¡Se actualizaron los datos con exito!', 'X', {
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
    } else {
      this.snackBar.open('Favor revise el formulario', 'X', {
        duration: 5000,
        panelClass: ['warning-snackbar']
      });
    }
  }
}
