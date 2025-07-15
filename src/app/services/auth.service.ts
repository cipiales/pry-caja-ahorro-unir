import { Injectable } from '@angular/core';
//import { Http } from "@angular/http";
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs';
const URL: string = 'http://localhost:8762/ms-cajaahorro-user/users';
import { catchError, map } from 'rxjs/operators';
import { ParametrosConfig } from '../shared/config/configuracion';

const cuerpoAutorizacion = ParametrosConfig.cuerpoAutorizacion;

@Injectable()
export class AuthService {



  constructor(
    private http: HttpClient
  ) { }
  /*
    signIn(user): Promise<Token> {
      return this.http.post(URL, user)
        .toPromise()
        .then(res => res.json())
        .catch( Error => {
          const msg = Error.json();
          return Promise.reject(msg);
        });
    }
  */

  signIn (usuario: string, clave: string) : Observable<any> {

    console.log("usuario:"+usuario);
    console.log("clave:"+clave);

   let  usuarios: String[] = [];
   usuarios.push(usuario);
   let  claves: String[] = [];
   claves.push(clave);

    cuerpoAutorizacion.metodoAutorizacion.cuerpo_http.queryParams.userNom= usuarios;
    cuerpoAutorizacion.metodoAutorizacion.cuerpo_http.queryParams.userPwd= claves;

    return this.http.post<any>(URL, cuerpoAutorizacion.metodoAutorizacion.cuerpo_http)
    .pipe(
        map(respuesta => {
            return respuesta;
        }),
        catchError(err => {
            return (err);
        })
    );

  }

    /*return this.http.get<any>(URL)
    .pipe(
        map(respuesta => {
            return respuesta;
        }),
        catchError(err => {
            return (err);
        })
    );*/


   /* return this.http.get(URL).
      pipe(res => {
        const usr: User[] = (URL as any).users;
        for (var i = 0; i < usr.length; i++) {
          if (usr[i].usuario == usuario && usr[i].clave == clave) {
            return usr[i];
          }
        }
        return undefined;
      })
      .catch(error => {
        return Promise.reject(error.json());
      })
  }*/




}
