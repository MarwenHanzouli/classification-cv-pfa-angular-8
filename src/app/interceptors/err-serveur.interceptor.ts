import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrServeurInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
        return next.handle(request).pipe(catchError(err => {
            console.log(err);
            if (err.status === 0) {
                this.toastr.error("Connexion vers le serveur backend est échouée!","Erreur");
                //location.reload(true);
                const error = err.error.message || err.statusText;
                console.log(error);
                return throwError(error);
            }
            return throwError(err) ;
        }));
    }
}