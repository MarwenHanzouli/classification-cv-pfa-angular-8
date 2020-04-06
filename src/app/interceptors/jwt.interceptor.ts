import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from '../services/authentification.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  authService;
    constructor(private toastr: ToastrService,
                private inj:Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.authService=this.inj.get(AuthentificationService);
      if (request.url.indexOf('authenticate') !== -1) {
        console.log("pas de token à l'authentification");
        return next.handle(request); // do nothing
      }
      if (request.url.indexOf('signup') !== -1) {
        console.log("pas de token à l'inscription");
        return next.handle(request); // do nothing
      }
      if (request.url.endsWith('/reset')) {
        console.log("pas de token mot de passe oublier");
        return next.handle(request); // do nothing
      }
      let currentUser = this.authService.currentUserValue;
      if (currentUser && currentUser.token) {
        console.log("token---------------------");
          request = request.clone({
              setHeaders: { 
                  Authorization: `Bearer ${currentUser.token}`
              }
          });
      }
      return next.handle(request);
      // add authorization header with jwt token if available
      /*request = request.clone({
          setHeaders: { 
              Authorization: `Bearer marweeeeeeeeeeeeeeen`
          }
      });*/

      
      /*return next.handle(request).pipe(
          retry(2),
          catchError((error: HttpErrorResponse) => {
            if (error.status !== 401) {
              // 401 handled in auth.interceptor
              this.toastr.error(error.message);      
            }
            return throwError(error);
          })
        );*/
    }
}