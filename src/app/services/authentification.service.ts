import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  login(user):Observable<any>{
    return this.httpClient.post('http://127.0.0.1:9004/authenticate',user, 
    {headers: this.headers}).pipe(map(response => {
      // login successful if there's a jwt token in the response
      if (response && response['token']) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response['user']);
      }

      return response;
  }));;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  resetPassword(email):Observable<any>{
    return this.httpClient.post('http://127.0.0.1:9004/microservice-users/users/reset',email, 
    {headers: this.headers});
  }
}
