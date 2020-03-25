import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';

import { map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  claseIn = {};
  private resourceUrl: string;
  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) {
    this.resourceUrl = appSettings.settings.hostApi;
  }

  list(): Observable<any> {
    return this.http.post(`${this.resourceUrl}`, '');
  }

  delete(paciente: any, controlador: string, accion: string): Observable<any> {
    debugger;
    this.claseIn = 
      {
        "Id": paciente
      };
    
    controlador = controlador + "/";
    accion = accion + "/";
    let response = this.http.post<any>(this.resourceUrl + controlador + accion, this.claseIn, httpOptions);
    return response;
  }

}