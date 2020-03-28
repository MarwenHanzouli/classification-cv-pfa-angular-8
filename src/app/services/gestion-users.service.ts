import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/User.model';
import { AbstractHttpService } from '../AbstractHttpService';

@Injectable({
  providedIn: 'root'
})
export class GestionUsersService extends AbstractHttpService{

  serverUrl=this.url;
  constructor(private httpClient: HttpClient) {
    super();
  }
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  updateUser(user){
    return this.httpClient.put(this.serverUrl+'/microservice-users/users/update/'+user.id,
    user,{headers:this.headers});
  }

  updateCandidat(candidat){
    return this.httpClient.put(this.serverUrl+'/microservice-users/candidats/update/'+candidat.id,
    candidat,{headers:this.headers});
  }
  updateManager(manager){
    return this.httpClient.put(this.serverUrl+'/microservice-users/managers/update/'+manager.id,
    manager,{headers:this.headers});
  }
  updatePassword(newPasswordObject,id){
    return this.httpClient.put(this.serverUrl+'/microservice-users/users/update-password/'+id,
    newPasswordObject,{headers:this.headers});
  }
  updatePhoto(photo,id){
    const formData: FormData = new FormData();
    formData.append('file', photo, photo.name);
    return this.httpClient.put(this.serverUrl+'/microservice-users/users/addPhoto/'+id,
    formData);
  }

  changeInfoUserWhenUpdateHisProfile(user:User)
  {
    let newCurrentUser={
      'user':user,
      'token':JSON.parse(localStorage.getItem('currentUser'))['token']
    }
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(newCurrentUser));
  }
}
