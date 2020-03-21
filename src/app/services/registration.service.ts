import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  register(user:User): Observable<any>{
    return this.httpClient.post('http://127.0.0.1:9004/microservice-users/users/signup',
     user, {headers: this.headers});
  }
}
