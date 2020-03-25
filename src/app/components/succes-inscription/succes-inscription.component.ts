import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-succes-inscription',
  templateUrl: './succes-inscription.component.html',
  styleUrls: ['./succes-inscription.component.css']
})
export class SuccesInscriptionComponent implements OnInit {

  @Input() email:string;
  @Input() message:string[];
  constructor() { }

  ngOnInit() {
  }

}
