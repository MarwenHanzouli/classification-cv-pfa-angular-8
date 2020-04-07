import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';
import { AbstractHttpService } from '../AbstractHttpService';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends AbstractHttpService{

  serverUrl=this.url;
  constructor(private httpClient: HttpClient) {
    super();
  }
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  register(user:User): Observable<any>{
    return this.httpClient.post(this.serverUrl+'/microservice-users/users/signup',
     user, {headers: this.headers});
  }
}
