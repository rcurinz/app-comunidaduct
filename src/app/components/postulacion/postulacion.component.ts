import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styleUrls: ['./postulacion.component.scss']
})
export class PostulacionComponent implements OnInit {

  stateOptions =  [{label: 'Si', value: 'true'}, {label: 'No', value: 'false'}];

  constructor() { }

  ngOnInit(): void {
  }

}
