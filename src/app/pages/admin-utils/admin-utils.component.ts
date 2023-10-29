import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-admin-utils',
  templateUrl: './admin-utils.component.html',
  styleUrls: ['./admin-utils.component.scss']
})
export class AdminUtilsComponent {

  show_modal = false;
  message = '';
  url = '';
  imgUrl;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getMessage();
  }

  setStatusModal(){
    const data = {
      id : 1,
      value: this.show_modal
    };
    this.authService.setOption(data).subscribe({
      next: (info) => {
        console.log(info);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  setMessage(){
    const data = {
      value: this.message,
      link: this.url
    };
    this.authService.setMessage(data).subscribe({
      next: (info) => {
        console.log(info);
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
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onUpload(event) {
    const file = event.files[0];

    // Creamos un nuevo elemento `<img>`
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // Convertimos la imagen a binario

    reader.onload = (e) => {
      const result = e.target.result;
  
      if (typeof result === 'string') {
        // Si result es una cadena, es una URL de datos base64
        // Elimina el encabezado de la URL de datos
        this.imgUrl = result;
      }
    };
  }

}
