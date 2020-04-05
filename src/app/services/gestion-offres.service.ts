import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Offre } from '../models/Offre.model';
import { AbstractHttpService } from '../AbstractHttpService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Organisme } from '../models/Organisme.model';
@Injectable({
  providedIn: 'root'
})
export class GestionOffresService extends AbstractHttpService{

  serverUrl=this.url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  offresSubject:BehaviorSubject<Offre[]>;

  public offres:Offre[];
  
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { 
    super();
    this.getAll(); 
  }
  getAll(){
    this.httpClient.get<Offre[]>(this.serverUrl+'/microservice-offers/offres/getAll',
    {headers: this.headers}).subscribe((data)=>{
      this.offres=data;
      this.offresSubject=new BehaviorSubject(this.offres.slice());
    },
    (error)=>{
      this.toastr.warning("Erreur de get all offres!!");
      console.log(error)
    });
  }

  getAllFromServer(){
    return this.httpClient.get<Offre[]>(this.serverUrl+'/microservice-offers/offres/getAll',
    {headers: this.headers});
  }

  deleteOffre(idOffre):Observable<any>{
    return this.httpClient.delete<any>(this.serverUrl+'/microservice-offers/offres/delete/'+idOffre,
    {headers: this.headers});
  }

  getOffreById(idOffre):Observable<Offre>{
    return this.httpClient.get<Offre>(this.serverUrl+'/microservice-offers/offres/getOffreById/'+idOffre,
    {headers: this.headers});
    // let o:Observable<Offre>;
    // this.offres.map((elem)=>{
    //   if(elem.id==id)
    //   {
    //     o=new Observable((observer)=>{
    //       observer.next(elem);
    //     });
    //   }
    // })
    // return o;
  }
  getAllOrganisme():Observable<Organisme[]>{
    return this.httpClient.get<Organisme[]>(this.serverUrl+'/microservice-offers/organismes/getAll',
    {headers: this.headers});
  }
  addOrganisme(organisme):Observable<Organisme>{
    return this.httpClient.post<Organisme>(this.serverUrl+'/microservice-offers/organismes/add',
    organisme,{headers: this.headers});
  }
}
