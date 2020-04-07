import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  notificationsSubject = new Subject<any[]>();
  private notifications=[
    {
      "status":"N",
      "notification":"Bonjour tout le monde"
    },
    {
      "status":"Y",
      "notification":"Bonjour à tous"
    },
    {
      "status":"N",
      "notification":"Bonsoir tout le monde"
    }
  ];
  
  constructor() {
    this.notificationsSubject.next(this.notifications.slice());
   }
}
