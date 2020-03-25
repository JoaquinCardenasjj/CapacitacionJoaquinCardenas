import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';

import { map } from 'rxjs/operators';
import { CreatePacienteOut } from '../MethodParameters/Paciente/createPacienteOut';
import { CreatePacienteIn } from '../MethodParameters/Paciente/createPacienteIn';
import { UpdatePacienteIn } from '../MethodParameters/Paciente/updatePacienteIn';
import { UpdatePacienteOut } from '../MethodParameters/Paciente/updatePacienteOut';
import { DeletePacienteOut } from '../MethodParameters/Paciente/deletePacienteOut';
import { DeletePacienteIn } from '../MethodParameters/Paciente/deletePacienteIn';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private resourceUrl: string;
  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) {
    this.resourceUrl = appSettings.settings.hostApi + "Paciente";
  }

  list(): Observable<any> {
    return this.http.post(`${this.resourceUrl}`, '');
  }
  create(paciente: CreatePacienteIn): Observable<CreatePacienteOut> {
    let response = this.http.post<CreatePacienteOut>(this.resourceUrl + '/crear', paciente, httpOptions);
    return response;
  }
  update(paciente: UpdatePacienteIn): Observable<UpdatePacienteOut> {
    let response = this.http.post<UpdatePacienteOut>(this.resourceUrl + '/editar', paciente, httpOptions);
    return response;
  }
  delete(paciente: DeletePacienteIn): Observable<DeletePacienteOut> {
    let response = this.http.post<DeletePacienteOut>(this.resourceUrl + '/eliminar', paciente, httpOptions);
    return response;
  }

}