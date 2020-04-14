import { Component, OnInit, Input, SimpleChanges, OnChanges, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit , OnChanges, OnDestroy{

  ngOnDestroy(): void {
    //console.log("modal destroyed!!!!");
  }

  @Input() titre:string;
  @Input() tableauClasses:boolean[];
  @Input() idModal:string;

  private classStyle;
  private id;
  constructor() {
  }

  ngOnInit() {
    //console.log("modal initialised!!!!");
  }
  ngOnChanges(changes: SimpleChanges) {
    //console.log(changes)
    let tableau=JSON.parse(JSON.stringify(changes['tableauClasses'].currentValue))['values'];
    tableau.map((elem,indice)=>{
      this.tableauClasses[indice]=elem;
    });
    this.classStyle={
      'modal-dialog-centered':this.tableauClasses[0],
      'modal-sm':this.tableauClasses[1],
      'modal-lg':this.tableauClasses[2],
      'modal-xl':this.tableauClasses[3],
      'modal-dialog-scrollable': this.tableauClasses[4] ? this.tableauClasses[4] : false
    }
    if(changes['idModal']){
      this.id=changes['idModal'].currentValue.toString();
    }
    
  }

}
