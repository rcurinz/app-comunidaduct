import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-reunion-create',
  templateUrl: './reunion-create.component.html',
  styleUrls: ['./reunion-create.component.scss']
})
export class ReunionCreateComponent {

  fecha;
  admins;
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

}
