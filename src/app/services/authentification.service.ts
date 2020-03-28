import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User.model';
import { AbstractHttpService } from '../AbstractHttpService';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService extends AbstractHttpService{

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  serverUrl=this.url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
    super();
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user):Observable<any>{
    return this.httpClient.post(this.serverUrl+'/authenticate',user, 
    {headers: this.headers});
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  resetPassword(email):Observable<any>{
    return this.httpClient.post(this.serverUrl+'/microservice-users/users/reset',email, 
    {headers: this.headers});
  }
}
