import { Component, OnInit, KeyValueDiffer, Inject, KeyValueDiffers, Output, EventEmitter, Input } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { SharedService } from '../services/shared.service';



@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {
  // @Output() deleteId = new EventEmitter<string>();
  @Input() deleteId: string = "";
  @Input() accion: string = "";
  @Input() controlador: string = "";
  @Input() lblTitulo: string = "";
  @Input() lblAsunto: string = "";
  displayedColumns: string[];
  form: FormGroup;
  json: JSON;

  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ConfirmacionComponent>,
    private servicio: SharedService,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.json = JSON.parse(JSON.stringify(data));
  }
  ngOnInit() {
    
    var jsonP = JSON.parse(JSON.stringify(this.json));
    this.deleteId = jsonP.deleteId;
    this.accion = jsonP.accion;
    this.controlador = jsonP.controlador;
    this.lblTitulo = jsonP.lblTitulo;
    this.lblAsunto = jsonP.lblAsunto;


  }
  close() {
    this.dialogRef.close();
  }
  save() {

  
  
    this.servicio.delete( this.deleteId, this.controlador, this.accion).subscribe(data => {
      this.dialogRef.close(this.deleteId);
      // this.enviada = false;
      this.snackBar.open('¡Se elimino los datos con exito!', 'X', {
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


}
