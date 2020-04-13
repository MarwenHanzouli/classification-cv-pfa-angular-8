import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(private loaderService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/signup') === -1 && req.url.indexOf('/offres/add') === -1
    && req.url.indexOf('cvs/getByTag') === -1) {
      return next.handle(req); // do nothing
    }
    this.showLoader();
    console.log("chargement--------------------");
    return next.handle(req).pipe(delay(4000),tap((event: HttpEvent<any>) => { 
      if (event instanceof HttpResponse) {
        
        this.onEnd();
        console.log("déééééchargement--------------------");
      }
    },
      (err: any) => {
        this.onEnd();
        console.log("errorchargement--------------------");
    }));
  }
  private onEnd(): void {
    this.hideLoader();
  }
  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }
}