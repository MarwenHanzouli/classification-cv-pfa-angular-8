import { Component, OnInit } from '@angular/core';
import { faSignInAlt, faUserPlus, faSignOutAlt, faUserCircle, faBell} from '@fortawesome/free-solid-svg-icons';
import { User } from '../../models/User.model';
import { Subscription } from 'rxjs';
import { AuthentificationService } from '../../services/authentification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faSignOutAlt= faSignOutAlt;
  faUserCircle= faUserCircle;
  faBell= faBell;

  private connected:boolean=false;
  private currentUser: User;
  private currentUserSubscription: Subscription;

  constructor(private authService:AuthentificationService,
              private router: Router) { 
    this.currentUserSubscription=this.authService.currentUser.subscribe(
      (user)=>{
        if(user)
        {
          this.currentUser=user;
          this.connected=true;
        }
        else {
          this.connected=false;
        }
    });
  }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    //this.currentUserSubscription.unsubscribe();
  }
}
