import { Component, OnInit, KeyValueDiffer, Inject, KeyValueDiffers } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreatePacienteIn } from '../MethodParameters/Paciente/createPacienteIn';
import { Paciente } from '../paciente';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.scss']
})
export class PacienteCreateComponent implements OnInit {

  paciente: Paciente;
  form: FormGroup;
  clone = {};
  private customerDiffer: KeyValueDiffer<string, any>;

  constructor(
    private servicio: PacienteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<PacienteCreateComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: Paciente,
    private dialog: MatDialog,
    private differs: KeyValueDiffers,
  ) {
    this.paciente = data;
    this.form = this.formBuilder.group(
      {
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
      let paciente = new CreatePacienteIn();
      paciente.Nombre = this.paciente.nombre;
      paciente.NumeroSeguro = this.paciente.numeroSeguroSocial;
      paciente.MedicoPreferido = this.paciente.medicoPreferido;
      let v = this.servicio.create(paciente);
      
      if (v) {
        this.dialogRef.close(this.form.value);
        // this.enviada = false;
        this.snackBar.open('¡Se registraron los datos con exito!', 'X', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });

      } else {
        var mensaje = 'Se presento un problema con el servidor, por favor comuníquese con el administrador.';
        // this.disableSubmit = false;
        this.snackBar.open(mensaje, 'X', {
          duration: 10000,
          panelClass: ['error-snackbar']
        });
      }





    } else {
      this.snackBar.open('Favor revise el formulario', 'X', {
        duration: 5000,
        panelClass: ['warning-snackbar']
      });
    }






  }

}
