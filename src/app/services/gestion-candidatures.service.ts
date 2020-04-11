import { Injectable } from '@angular/core';
import { AbstractHttpService } from '../AbstractHttpService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Candidature } from '../models/Candidature.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionCandidaturesService extends AbstractHttpService{

  private serverUrl=this.url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  

  constructor(private httpClient: HttpClient) {
    super();
  }

  addCandidature(candidature: Candidature):Observable<Candidature>{
    return this.httpClient.post<Candidature>(this.serverUrl+
      '/microservice-offers/candidatures/add/candidat/'
      +candidature.idCandidat+'/offre/'
      +candidature.idOffre
      +'/cv/'+candidature.idCv,
      candidature,{headers: this.headers});
  }
}
