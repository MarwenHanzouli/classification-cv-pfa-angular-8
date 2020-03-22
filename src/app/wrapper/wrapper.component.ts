import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  @Input() loading: boolean;
  constructor() { }

  ngOnInit() {
  }

}
