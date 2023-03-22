import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-control-asistencia',
  templateUrl: './control-asistencia.component.html',
  styleUrls: ['./control-asistencia.component.scss']
})
export class ControlAsistenciaComponent {

  fecha;
  admins;
  opciones = [false, false]
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getDataAdmins();
  }

  getDataAdmins(){
    this.authService.getAdmins().subscribe({
      next: (info) => {
        this.admins = info['administradores'];
        console.log(this.admins);
      }
    });
  }

  saveAsistnecia(){
    const radios = document.querySelectorAll('input[type="radio"]');
    const asistencia = [];
    radios.forEach((radio) => {
      if ((radio as HTMLInputElement).checked) {
        const adminId = radio.getAttribute('name').split('-')[1];
        const respuesta =(radio as HTMLInputElement).value;
        asistencia.push({ adminId, respuesta });
      }
    });
    this.authService.saveAsistencia(asistencia, this.fecha).subscribe({
      next: (info) => {
        console.log(info);
      }
    });
  }


  showOpcion(n){
    this.hiddeAll();
    if(n === 0){
      this.opciones[0] = true;
    }
  }

  hiddeAll(){
    for (let i = 0; i < this.opciones.length; i++) {
      this.opciones[i] = false;
    }
  }
}
