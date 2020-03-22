import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        /*request = request.clone({
            setHeaders: { 
                Authorization: `Bearer marweeeeeeeeeeeeeeen`
            }
        });*/

        return next.handle(request);
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