import { Component, OnInit, Input, ViewChildren, QueryList, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() titre:string;
  @Input() tableauClasses:boolean[];
  private classStyle;

  constructor() {
  }

  ngOnInit() {
    this.classStyle={
      'modal-dialog-centered':this.tableauClasses[0],
      'modal-sm':this.tableauClasses[1],
      'modal-lg':this.tableauClasses[2],
      'modal-xl':this.tableauClasses[3]
    }
  }

}
