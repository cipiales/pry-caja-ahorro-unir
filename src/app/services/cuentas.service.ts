import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { environment } from '../../../environments/environment';
import { ParametrosConfig } from '../shared/config/configuracion';
import { Cuenta } from '../shared/model/cuenta';

//import { environment } from '@environments/environment';
//import { User } from '@app/_models';

const cuerpoCuentas = ParametrosConfig.cuerpoCuentas;
const cuerpoCrearCuenta = ParametrosConfig.cuerpoCrearCuenta;

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

    obtenerCuentas(estado: string, cedulaIdentidad: string,codigoCuenta: string,codigoCajaAhorro: string) {

  let  estados: String[] = [];
   estados.push(estado);
   let  cedulaIdentidades: String[] = [];
   cedulaIdentidades.push(cedulaIdentidad);
    let  codigoCuentas: String[] = [];
   codigoCuentas.push(codigoCuenta);
      let  codigoCajaAhorros: String[] = [];
   codigoCajaAhorros.push(codigoCajaAhorro);

          cuerpoCuentas.metodoCuentas.cuerpo_http.queryParams.estado= estados;
         cuerpoCuentas.metodoCuentas.cuerpo_http.queryParams.codigoCuenta= codigoCuentas;
         cuerpoCuentas.metodoCuentas.cuerpo_http.queryParams.cedulaIdentidad= cedulaIdentidades;
          cuerpoCuentas.metodoCuentas.cuerpo_http.queryParams.codigoCajaAhorro= codigoCajaAhorros;

        return this.http.post<any>(`${environment.apiUrl}/ms-cajaahorro-administracion/cuenta`,cuerpoCuentas.metodoCuentas.cuerpo_http)
            .pipe(map(respuesta => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
               // localStorage.setItem('user', JSON.stringify(user));
                //this.userSubject.next(user);
                return respuesta;
            }));
    }




        crearCuenta(cuenta:Cuenta) {


cuerpoCrearCuenta.metodoCrearCuenta.cuerpo_http.body.codigoCajaAhorro =cuenta.codigoCajaAhorro;

cuerpoCrearCuenta.metodoCrearCuenta.cuerpo_http.body.estado =cuenta.estado;
cuerpoCrearCuenta.metodoCrearCuenta.cuerpo_http.body.fechaRegistro =cuenta.fechaRegistro;
cuerpoCrearCuenta.metodoCrearCuenta.cuerpo_http.body.usuarioRegistro =cuenta.usuarioRegistro;
cuerpoCrearCuenta.metodoCrearCuenta.cuerpo_http.body.socio.cedulaIdentidad = cuenta.socio.cedulaIdentidad;



        return this.http.post<any>(`${environment.apiUrl}/ms-cajaahorro-administracion/cuenta`,cuerpoCrearCuenta.metodoCrearCuenta.cuerpo_http)
            .pipe(map(respuesta => {
                return respuesta;
            }));
    }

}
