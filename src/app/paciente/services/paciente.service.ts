import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';

import { map } from 'rxjs/operators';
import { CreatePacienteOut } from '../MethodParameters/Paciente/createPacienteOut';
import { CreatePacienteIn } from '../MethodParameters/Paciente/createPacienteIn';
import { UpdatePacienteIn } from '../MethodParameters/Paciente/updatePacienteIn';
import { UpdatePacienteOut } from '../MethodParameters/Paciente/updatePacienteOut';
import { DeletePacienteOut } from '../MethodParameters/Paciente/deletePacienteOut';
import { DeletePacienteIn } from '../MethodParameters/Paciente/deletePacienteIn';
import { PacienteListNewComponent } from '../paciente-listnew/paciente-listnew.component';
import { getPacienteIn } from '../MethodParameters/Paciente/getPacienteIn';
import { GetPacienteExportacionOut } from '../MethodParameters/Paciente/getPacienteExportacionOut';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private resourceUrl: string;
  public dataSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public dataSourcePaciente = new BehaviorSubject<CreatePacienteIn>(new CreatePacienteIn());
  constructor(
    private http: HttpClient,
    private appSettings: AppSettings,
    private pacienteListNewComponent: PacienteListNewComponent
  ) {
    this.resourceUrl = appSettings.settings.hostApi + "Paciente";
  }

  list(): Observable<any> {
    return this.http.post(`${this.resourceUrl}`, '');



  }
  create(paciente: CreatePacienteIn): Boolean {
    let respuesta = new Boolean;
    respuesta = true;
    let response = this.http.post<CreatePacienteOut>(this.resourceUrl + '/crear', paciente, httpOptions).toPromise()
      .then(
        res => { // Success

          this.dataSource.next(true);
          this.dataSourcePaciente.next(paciente);
        }
      );;
    return respuesta;
  }
  
  update(paciente: UpdatePacienteIn): Observable<UpdatePacienteOut> {
    let response = this.http.post<UpdatePacienteOut>(this.resourceUrl + '/editar', paciente, httpOptions);
    return response;
  }
  delete(paciente: DeletePacienteIn): Observable<DeletePacienteOut> {
    let response = this.http.post<DeletePacienteOut>(this.resourceUrl + '/eliminar', paciente, httpOptions);
    return response;
  }
  detalle(id: number): Observable<any> {
    let paciente = new getPacienteIn();
    paciente.Id = id;
    let response = this.http.post<any>(this.resourceUrl + '/detalle', paciente, httpOptions);
    return response;
  }
  descargar(): Observable<GetPacienteExportacionOut> {
    let response = this.http.post<GetPacienteExportacionOut>(this.resourceUrl + '/exportacion', httpOptions);
    return response;
  }

}