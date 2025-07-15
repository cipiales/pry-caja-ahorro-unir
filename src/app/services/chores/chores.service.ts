import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChoreInterface } from './choreInterface';

@Injectable({
  providedIn: 'root'
})
export class ChoresService {
  private choresUrl = 'assets/data/choresData.json';
  constructor(private http: HttpClient) { }
  getChores(): Observable<ChoreInterface[]> {
    return this.http.get<ChoreInterface[]>(this.choresUrl);
  }
}
