import { Injectable } from '@angular/core';
import { AbstractHttpService } from '../AbstractHttpService';

@Injectable({
  providedIn: 'root'
})
export class GestionCandidaturesService extends AbstractHttpService{

  private serverUrl=this.url;
  constructor() {
    super();
   }
}
