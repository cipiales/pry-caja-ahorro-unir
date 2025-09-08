import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models';
import { environment } from '../../../environments/environment';
import { ParametrosConfig } from '../shared/config/configuracion';
import { Cuenta } from '../shared/model/cuenta';



const cuerpoTransacciones = ParametrosConfig.cuerpoTransacciones;
const cuerpoDetalleTransacciones = ParametrosConfig.cuerpoDetalleTransacciones;


@Injectable({ providedIn: 'root' })
export class TransaccionesService {


    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }


   obtenerTransacciones(fechaTransaccion: string, numeroSemana: string, ciclo: string) {

    cuerpoTransacciones.metodoTransacciones.cuerpo_http.queryParams.fechaTransaccionCajaAhorro = [fechaTransaccion];
    cuerpoTransacciones.metodoTransacciones.cuerpo_http.queryParams.numeroTransaccionCajaAhorro = [numeroSemana];
    cuerpoTransacciones.metodoTransacciones.cuerpo_http.queryParams.codigoCiclo = [ciclo];

    return this.http.post<any>(
        `${environment.apiUrl}/ms-cajaahorro-transaccion/transaccion`,
        cuerpoTransacciones.metodoTransacciones.cuerpo_http
    ).pipe(
        map(respuesta => respuesta),
        catchError(err => {
            console.error('Error en obtenerTransacciones:', err);
            throw err;
        })
    );
}


   obtenerDetaleTransacciones( secuencialDetalleTransacionCajaAhorro: string, codigoCajaAhorro: string) {
    cuerpoDetalleTransacciones.metodoDetalleTransacciones.cuerpo_http.queryParams.secuencialTransaccionCajaAhorro = [secuencialDetalleTransacionCajaAhorro];
    cuerpoDetalleTransacciones.metodoDetalleTransacciones.cuerpo_http.queryParams.codigoCajaAhorro = [codigoCajaAhorro];


    return this.http.post<any>(
        `${environment.apiUrl}/ms-cajaahorro-transaccion/detalletransaccion`,
        cuerpoDetalleTransacciones.metodoDetalleTransacciones.cuerpo_http
    ).pipe(
        map(respuesta => respuesta),
        catchError(err => {
            console.error('Error en obtenerTransacciones:', err);
            throw err;
        })
    );
}




}
