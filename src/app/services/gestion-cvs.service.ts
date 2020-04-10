import { Injectable } from '@angular/core';
import { AbstractHttpService } from '../AbstractHttpService';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Cv } from '../models/Cv.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GestionCvsService extends AbstractHttpService{

  private serverUrl=this.url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  params = new HttpParams();
  private cvsSubject:BehaviorSubject<Cv[]>;
  public cvsObservable:Observable<Cv[]>;
  private cvs:Cv[];

  private cvsPerCandidatSubject:BehaviorSubject<Cv[]>;
  public cvsPerCandidatObservable:Observable<Cv[]>;
  private cvsPerCandidat:Cv[];

  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) {
    super();
    //this.getAll();
  }

  addCv(cv: Cv, file: File):Observable<Cv>{
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append("cv",JSON.stringify(cv));
    // this.params.set("cv",JSON.stringify(cv));
    // this.params.set("file",file)
    return this.httpClient.post<Cv>(this.serverUrl+
      '/microservice-cv/cvs/add/'+cv.idCandidat,
      formData);
  }
  getAll(){
    this.httpClient.get<Cv[]>(this.serverUrl+'/microservice-cv/cvs/getAll',
    {headers: this.headers}).subscribe((data)=>{
      this.cvs=data;
      this.cvsSubject=new BehaviorSubject(this.cvs.slice());
      this.cvsObservable=this.cvsSubject.asObservable();
    },
    (error)=>{
      this.toastr.warning("Erreur de get all cv!!");
      console.log(error)
    });
  }
  getAllByCandidat(id){
    this.httpClient.get<Cv[]>(this.serverUrl+'/microservice-cv/cvs/getByCandidat/'+id,
    {headers: this.headers}).subscribe((data)=>{
      this.cvsPerCandidat=data;
      this.cvsPerCandidatSubject=new BehaviorSubject(this.cvsPerCandidat);
      this.cvsPerCandidatObservable=this.cvsPerCandidatSubject.asObservable();
    },
    (err)=>{

    });
  }
  emitNewCv(data:Cv){
    this.cvsPerCandidat.push(data);
    this.cvsPerCandidatSubject.next(this.cvsPerCandidat);
    //this.cvsPerCandidatObservable.subscribe(console.log)
    
  }
}
