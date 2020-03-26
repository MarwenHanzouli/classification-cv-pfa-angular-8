import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {


  private notifications=[];
  constructor(private notifService:NotificationService) { }

  ngOnInit() {
    this.notifService.notificationsSubject.subscribe((data)=>{
      this.notifications=data;
      console.log(data)
    },
    (error)=>{
      console.log(error)
    });
    
  }

}
