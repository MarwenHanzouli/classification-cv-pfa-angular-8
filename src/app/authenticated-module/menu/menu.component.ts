import { Component, OnInit, ViewChild } from '@angular/core';

import { faSignInAlt, faUserPlus, faSignOutAlt, faUserCircle, faBell, faNewspaper,
  faAddressCard , faMailBulk, faCogs, faUsersCog, faSearch} from '@fortawesome/free-solid-svg-icons';
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
  faCogs=faCogs;
  faUsersCog=faUsersCog;
  faSearch=faSearch;

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
    
    console.log()
    if(this.router.url.indexOf('authenticated:actualites')!==-1)
    {
      this.changeStyle(0);
      this.changeHover(0);
      this.hoverLeaved(0);
    }
    else if(this.router.url.indexOf('authenticated:offres')!==-1)
    {
      this.changeStyle(4);
      this.changeHover(4);
      this.hoverLeaved(4);
    }
    else if(this.router.url.indexOf('authenticated:cvs')!==-1)
    {
      this.changeStyle(5);
      this.changeHover(5);
      this.hoverLeaved(5);
    }
    else if(this.router.url.indexOf('authenticated:mon-compte')!==-1)
    {
      this.changeStyle(3);
      this.changeHover(3);
      this.hoverLeaved(3);
    }
    else if(this.router.url.indexOf('authenticated:notifications')!==-1)
    {
      this.changeStyle(6);
      this.changeHover(6);
      this.hoverLeaved(6);
    }
    else if(this.router.url.indexOf('authenticated:mon-cv')!==-1)
    {
      this.changeStyle(1);
      this.changeHover(1);
      this.hoverLeaved(1);
    }
    else if(this.router.url.indexOf('authenticated:mes-postules')!==-1)
    {
      this.changeStyle(2);
      this.changeHover(2);
      this.hoverLeaved(2);
    }
    else if(this.router.url.indexOf('authenticated:gerer-users')!==-1)
    {
      this.changeStyle(7);
      this.changeHover(7);
      this.hoverLeaved(7);
    } 
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
