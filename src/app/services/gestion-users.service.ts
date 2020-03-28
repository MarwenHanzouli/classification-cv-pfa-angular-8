import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GestionUsersService {

  constructor(private httpClient: HttpClient) { }
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  updateUser(user){
    return this.httpClient.put('http://127.0.0.1:9004/microservice-users/users/update/'+user.id,
    user,{headers:this.headers});
  }

  updateCandidat(candidat){
    return this.httpClient.put('http://127.0.0.1:9004/microservice-users/candidats/update/'+candidat.id,
    candidat,{headers:this.headers});
  }
  updateManager(manager){
    return this.httpClient.put('http://127.0.0.1:9004/microservice-users/managers/update/'+manager.id,
    manager,{headers:this.headers});
  }
  updatePassword(newPasswordObject){
    return this.httpClient.put('http://127.0.0.1:9004/microservice-users/users/update-password/'+newPasswordObject.id,
    newPasswordObject,{headers:this.headers});
  }
  updatePhoto(photo,id){
    const formData: FormData = new FormData();
    formData.append('file', photo, photo.name);
    return this.httpClient.put('http://127.0.0.1:9004/microservice-users/users/addPhoto/'+id,
    formData);
  }
}
