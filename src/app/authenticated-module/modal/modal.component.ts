import { Component, OnInit, Input, ViewChildren, QueryList, HostListener, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit , OnChanges{

  @Input() titre:string;
  @Input() tableauClasses:boolean[];
  @Input() idModal:string;

  private classStyle;
  private id;
  constructor() {
  }

  ngOnInit() {
    
  }
  ngOnChanges(changes: SimpleChanges) {
    let tableau=JSON.parse(JSON.stringify(changes['tableauClasses'].currentValue))['values'];
    tableau.map((elem,indice)=>{
      this.tableauClasses[indice]=elem;
    });
    this.classStyle={
      'modal-dialog-centered':this.tableauClasses[0],
      'modal-sm':this.tableauClasses[1],
      'modal-lg':this.tableauClasses[2],
      'modal-xl':this.tableauClasses[3]
    }
    this.id=changes['idModal'].currentValue.toString();
    console.log(this.idModal)
  }

}
