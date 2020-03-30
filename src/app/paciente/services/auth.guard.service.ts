import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { PacienteDetalleComponent } from '../paciente-detalle/paciente-detalle.component';


@Injectable()
export class AuthGuardService implements CanActivate, CanDeactivate<PacienteDetalleComponent> {

    canDeactivate() {
        console.log("Paso por seguridad desactivada")
        return true;

    }

    public isAuthenticated(): boolean {
        return false;
    }

    constructor(public router: Router) {

    }

    canActivate() {
        console.log("Paso por seguridad")
        return true;
    }


    public logout(): boolean {
        return false;
    }
}
