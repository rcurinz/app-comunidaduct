import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import links  from 'src/raw-data/links.json'

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.scss']
})

export class RedesComponent implements OnInit {

  nombres = links['redes_sociales'];
  isDay = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //si la hora es mayor a 8am y menor a 8pm es dia
    const hora = new Date().getHours();
    if (hora < 8 || hora > 20) {
      this.isDay = false;
    } else {
      this.isDay = true;
    }
  }
}
