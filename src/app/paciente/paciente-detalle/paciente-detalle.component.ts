import { Component, OnInit, KeyValueDiffer, Inject, KeyValueDiffers } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreatePacienteIn } from '../MethodParameters/Paciente/createPacienteIn';
import { Paciente } from '../paciente';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-paciente-detalle',
  templateUrl: './paciente-detalle.component.html',
  styleUrls: ['./paciente-detalle.component.scss']
})
export class PacienteDetalleComponent implements OnInit {

  paciente: Paciente = new Paciente();
  form: FormGroup;
  clone = {};
  private customerDiffer: KeyValueDiffer<string, any>;

  constructor(
    private servicio: PacienteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private differs: KeyValueDiffers,
    private _route: ActivatedRoute,

  ) {


  }
  ngOnInit() {
    
    const id = this._route.snapshot.paramMap.get('id');

    this.servicio.detalle(Number(id)).subscribe(data => {
      this.paciente = data.paciente;
      
    }, error => {
      var mensaje = 'Se presento un problema con el servidor, por favor comuníquese con el administrador.';
      // this.disableSubmit = false;
      this.snackBar.open(mensaje, 'X', {
        duration: 10000,
        panelClass: ['error-snackbar']
      });
    });







  }
}
