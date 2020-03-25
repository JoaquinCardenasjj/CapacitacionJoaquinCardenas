import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppSettings {
    public settings = new Settings(
        'Prueba Nexos',   //theme name
        true,       //loadingSpinner
        true,       //fixedHeader
        true,       //sidenavIsOpened
        true,       //sidenavIsPinned  
        true,       //sidenavUserBlock 
        'vertical', //horizontal , vertical
        'default',  //default, compact, mini
        'p',   //indigo-light, teal-light, red-light, blue-dark, green-dark, pink-dark, umv
        false,       // true = rtl, false = ltr
        environment.url, // url de environment
        ''
    );
}

