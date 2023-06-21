import { Component } from '@angular/core';
import { AuthService } from "@services/auth.service"

@Component({
  selector: 'app-sorteos',
  templateUrl: './sorteos.component.html',
  styleUrls: ['./sorteos.component.scss']
})
export class SorteosComponent {

  jugadores;
  jugador;
  dtOptions;
  visible: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 10,
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
      },
      pagingType: 'full_numbers',
      dom: 'lfrtipB',
      buttons: [
        'print',
        'csv'
      ],
      responsive: true,
    }; 
    this.getJugadores();
  }

  getJugadores(){
    this.authService.getJugadores().subscribe((res:any) => {
      console.log(res);
      this.jugadores = res['jugadores'];
    });
  }

  showDialog(id) {
    this.getJugadorById(id);
    this.visible = true;
  }

  getJugadorById(id){
    this.authService.getJugadorById(id).subscribe((res:any) => {
      console.log(res);
      this.jugador = res['stickers'];
      console.log(this.jugador);
    });

  }

}
