import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { environment } from '../../../environments/environment';
import { ParametrosConfig } from '../shared/config/configuracion';

//import { environment } from '@environments/environment';
//import { User } from '@app/_models';

const cuerpoCuentas = ParametrosConfig.cuerpoCuentas;

@Injectable({ providedIn: 'root' })
export class CuentasService {
    //private userSubject: BehaviorSubject<User | null>;
    //public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        //this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        //this.user = this.userSubject.asObservable();
    }

   /* public get userValue() {
        return this.userSubject.value;
    }*/

    obtenerCuentas(estado: string, cedulaIdentidad: string,codigoCuenta: string) {

  let  estados: String[] = [];
   estados.push(estado);
   let  cedulaIdentidades: String[] = [];
   cedulaIdentidades.push(cedulaIdentidad);
    let  codigoCuentas: String[] = [];
   codigoCuentas.push(codigoCuenta);

          cuerpoCuentas.metodoCuentas.cuerpo_http.queryParams.estado= estados;
         cuerpoCuentas.metodoCuentas.cuerpo_http.queryParams.codigoCuenta= codigoCuentas;
         cuerpoCuentas.metodoCuentas.cuerpo_http.queryParams.cedulaIdentidad= cedulaIdentidades;

        return this.http.post<any>(`${environment.apiUrl}/ms-cajaahorro-administracion/cuentas`,cuerpoCuentas.metodoCuentas.cuerpo_http)
            .pipe(map(respuesta => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
               // localStorage.setItem('user', JSON.stringify(user));
                //this.userSubject.next(user);
                return respuesta;
            }));
    }


}
