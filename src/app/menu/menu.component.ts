import { Component, OnInit } from '@angular/core';

import { faSignInAlt, faUserPlus, faSignOutAlt, faUserCircle, faBell, faNewspaper,
  faAddressCard , faMailBulk} from '@fortawesome/free-solid-svg-icons';
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
  constructor() { }

  ngOnInit() {
  }

}
