import { Component, OnInit, ViewChild } from '@angular/core';

import { faSignInAlt, faUserPlus, faSignOutAlt, faUserCircle, faBell, faNewspaper,
  faAddressCard , faMailBulk} from '@fortawesome/free-solid-svg-icons';
import { Router, RouterOutlet, ActivationStart } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faSignOutAlt= faSignOutAlt;
  faUserCircle= faUserCircle;
  faBell= faBell;
  faNewspaper= faNewspaper;
  faAddressCard= faAddressCard;
  faMailBulk =faMailBulk;

  private tableau_clicked:boolean[];
  private tableau_hovered:boolean[];

  private URL:string;
  private role:string;
  constructor(private router: Router,
              ) { 
    
  }

  ngOnInit() {

    this.tableau_clicked=[false,false,false,false,false,false,false];
    this.tableau_hovered=[false,false,false,false,false,false,false];
    this.role=JSON.parse(localStorage.getItem('currentUser'))['user']['role'];
    switch (this.role)
    {
      case 'CANDIDAT':
        {
          this.URL='/authenticated/candidat';
          break;
        }
      case 'MANAGER':
        {
          this.URL="/authenticated/manager";
          break;
        }
      case 'ADMIN':
      {
        this.URL="/authenticated/admin";
        break;
      }
    }
    
    
    this.changeStyle(0);
    this.changeHover(0);
    this.hoverLeaved(0);
  }
  changeStyle(indice){
    this.tableau_clicked=this.tableau_clicked.map((element,index)=>{
      if(index===indice)
      {
        return true;
      }
      else
      {
        return false;
      }
    });
  }
  changeHover(indice){
    this.tableau_hovered=this.tableau_hovered.map((element,index)=>{
      if(index===indice)
      {
        return true;
      }
      else
      {
        return false;
      }
    });
  }
  hoverLeaved(indice){
    this.tableau_hovered=this.tableau_hovered.map((element,index)=>{
      if(index===indice)
      {
        return false;
      }
      else
      {
        return element;
      }
    });
  }

  naviguer(path) {
    this.router.navigate([{ outlets: {
      authenticated: [path]
    }}]);
  }
}
