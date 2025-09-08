import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ParametrosConfig } from '../shared/config/configuracion';
import { Socio } from '../shared/model/socio';

//import { environment } from '@environments/environment';
//import { User } from '@app/_models';

const cuerpoSocio = ParametrosConfig.cuerpoSocio;

@Injectable({ providedIn: 'root' })
export class SocioService {
    //private userSubject: BehaviorSubject<User | null>;
    //public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        //this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        //this.user = this.userSubject.asObservable();
    }

crearSocio(socio:Socio) {


  cuerpoSocio.metodoSocio.cuerpo_http.body.cedulaIdentidad = socio.cedulaIdentidad;
  cuerpoSocio.metodoSocio.cuerpo_http.body.direccion = socio.direccion;
  cuerpoSocio.metodoSocio.cuerpo_http.body.estado = socio.estado;
  cuerpoSocio.metodoSocio.cuerpo_http.body.primerApellido = socio.primerApellido;
  cuerpoSocio.metodoSocio.cuerpo_http.body.segundoApellido = socio.segundoApellido;
  cuerpoSocio.metodoSocio.cuerpo_http.body.primerNombre = socio.primerNombre;
  cuerpoSocio.metodoSocio.cuerpo_http.body.segundoNombre = socio.segundoNombre;
  cuerpoSocio.metodoSocio.cuerpo_http.body.sexo = socio.sexo;
  cuerpoSocio.metodoSocio.cuerpo_http.body.nombreCompleto = socio.nombreCompleto;
  cuerpoSocio.metodoSocio.cuerpo_http.body.telefonoConvencional = socio.telefonoConvencional;
  cuerpoSocio.metodoSocio.cuerpo_http.body.telefonoCelular = socio.telefonoCelular;
  cuerpoSocio.metodoSocio.cuerpo_http.body.codigoSocio = socio.codigoSocio;
  cuerpoSocio.metodoSocio.cuerpo_http.body.usuarioRegistro = socio.usuarioRegistro;
  cuerpoSocio.metodoSocio.cuerpo_http.body.fechaRegistro = socio.fechaRegistro;

        return this.http.post<any>(`${environment.apiUrl}/ms-cajaahorro-socio/socio`,cuerpoSocio.metodoSocio.cuerpo_http)
            .pipe(map(respuesta => {

                return respuesta;
            }));
    }

}
