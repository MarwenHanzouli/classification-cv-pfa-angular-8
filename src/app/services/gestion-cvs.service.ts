import { Injectable } from '@angular/core';
import { AbstractHttpService } from '../AbstractHttpService';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Cv } from '../models/Cv.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionCvsService extends AbstractHttpService{

  private serverUrl=this.url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  params = new HttpParams();

  constructor(private httpClient: HttpClient) {
    super();
  }

  addCv(cv: Cv, file: File):Observable<Cv>{
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append("cv",JSON.stringify(cv));
    // this.params.set("cv",JSON.stringify(cv));
    // this.params.set("file",file)
    return this.httpClient.post<Cv>(this.serverUrl+
      '/microservice-cv/cvs/add/'+cv.idCandidat,
      formData,{headers: this.headers});
  }
}
