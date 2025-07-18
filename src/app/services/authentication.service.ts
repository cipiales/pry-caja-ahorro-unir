﻿import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { environment } from '../../../environments/environment';
import { ParametrosConfig } from '../shared/config/configuracion';

//import { environment } from '@environments/environment';
//import { User } from '@app/_models';

const cuerpoAutorizacion = ParametrosConfig.cuerpoAutorizacion;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {

  let  usuarios: String[] = [];
   usuarios.push(username);
   let  claves: String[] = [];
   claves.push(password);

    cuerpoAutorizacion.metodoAutorizacion.cuerpo_http.queryParams.userNom= usuarios;
    cuerpoAutorizacion.metodoAutorizacion.cuerpo_http.queryParams.userPwd= claves;

        return this.http.post<any>(`${environment.apiUrl}/ms-cajaahorro-user/users`,cuerpoAutorizacion.metodoAutorizacion.cuerpo_http)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
}
