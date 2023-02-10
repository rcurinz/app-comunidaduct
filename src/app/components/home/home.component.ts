import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nombres = [
    {'nombre':"uct.confesiones", 'link':"https://www.instagram.com/uct.confesiones/", 'imagen':'logo_sin_fondo.png'},
    {'nombre':"encuestasymemesuct", 'link':"https://www.instagram.com/encuestasymemesuct/", 'imagen':'logo_sin_fondo.png'},
    {'nombre':"ayuda.uct", 'link':"https://www.instagram.com/ayuda.uct/", 'imagen':'ayuda.png'},
    {'nombre':"nappin.uct", 'link':"https://www.instagram.com/nappin.uct/", 'imagen':'napping_logo.png'},
    {'nombre':"UCT Lounge", 'link':"https://discord.gg/wQRavyyyQw", 'imagen':'logo_dc_full.png'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
