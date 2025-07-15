import { Account } from '../model/account.model';
import { Injectable } from '@angular/core';
// import { SessionStorageService } from 'ngx-webstorage';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';




@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: any;
  private authenticated = false;
  private authenticationState = new Subject<any>();

  constructor(  private http: HttpClient) {}

  fetch(): Observable<HttpResponse<Account>> {
    console.log('going to call ' + SERVER_API_URL + 'api/account' );
    return this.http.get<Account>(SERVER_API_URL + 'api/account', { observe: 'response' });
  }

  save(account: any): Observable<HttpResponse<any>> {
    return this.http.post(SERVER_API_URL + 'api/account', account, { observe: 'response' });
  }

  authenticate(identity) {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[]): boolean {
    if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }

    for (let i = 0; i < authorities.length; i++) {
      if (this.userIdentity.authorities.includes(authorities[i])) {
        return true;
      }
    }

    return false;
  }

  hasAuthority(authority: string) {

  }

  identity(force?: boolean)  {


  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isIdentityResolved(): boolean {
    return this.userIdentity !== undefined;
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

  getImageUrl(): string {
    return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
  }
}
