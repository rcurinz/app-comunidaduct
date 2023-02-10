import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.scss']
})
export class RedesComponent implements OnInit {

  nombres = [
    {
      'nombre':"uct.confesiones",
      'link':"https://www.instagram.com/uct.confesiones/",
      'imagen':'logo_sin_fondo.png',
      'clase':'fab fa-instagram'
    },
    {
      'nombre':"encuestasymemesuct",
      'link':"https://www.instagram.com/encuestasymemesuct/",
      'imagen':'logo_sin_fondo.png',
      'clase':'fab fa-instagram'
    },
    {
      'nombre':"ayuda.uct",
      'link':"https://www.instagram.com/ayuda.uct/",
      'imagen':'ayuda.png',
      'clase':'fab fa-instagram'
    },
    {
      'nombre':"nappin.uct",
      'link':"https://www.instagram.com/nappin.uct/",
      'imagen':'napping_logo.png',
      'clase':'fab fa-instagram'
    },
    {
      'nombre':"Discord UCT",
      'link':"https://discord.gg/wQRavyyyQw",
      'imagen':'logo_dc_full.png',
      'clase':'fab fa-discord'
    },
    {
      'nombre':"Envia tus confesiones aqui!",
      'link':"https://docs.google.com/forms/d/e/1FAIpQLSduzd_REpcwcLwSDBFLcIQ1BJmb06t0dctJmw7TxOte3Tf40A/viewform",
      'imagen':'logo_dc_full.png',
      'clase':'fa fa-play-circle'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
