import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@services/auth.service';
import links  from 'src/raw-data/links.json'

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.scss']
})

export class RedesComponent implements OnInit {

  nombres = links['redes_sociales'];
  isDay = true;
  show_modal = false;
  message = '';
  link = '';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    try{
      this.status_modal();
      this.getMessage();
    } catch (error) {
      console.log(error);
    }
    


    //si la hora es mayor a 8am y menor a 8pm es dia
    const hora = new Date().getHours();
    if (hora < 8 || hora > 18) {
      this.isDay = false;
    } else {
      this.isDay = true;
    }
  }

  close_popup(){
    document.getElementById("modal-popup").style.display = "none";
  }

  status_modal() {
    const data = {
      id : 1,
    }
    this.authService.getOption(data).subscribe({
      next: (info) => {
        console.log(info);
        this.show_modal = info['value'];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getMessage(){
    const data = {
      value: this.message
    };
    this.authService.getMessage(data).subscribe({
      next: (info) => {
        this.message = info['valor'].value;
        this.link = info['valor'].link;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
