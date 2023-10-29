import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { MessageService } from 'primeng/api';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-admin-utils',
  templateUrl: './admin-utils.component.html',
  styleUrls: ['./admin-utils.component.scss'],
  providers: [MessageService]
})
export class AdminUtilsComponent {

  show_modal = false;
  message = '';
  url = '';
  imgUrl;
  sourceProducts ;
  targetProducts = [];
  visible: boolean = false;

  constructor(private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCategorys();
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

  test(){
    console.log(this.targetProducts);
  }

  getCategorys(){
    this.authService.getCategorys().subscribe({
      next: (info) => {
        this.sourceProducts = info['category'];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  sendSticker(){
    console.log(this.targetProducts);
    console.log(this.imgUrl);
    if (this.targetProducts.length > 0 && this.imgUrl != ''){
      this.show(true);
    }
  }

  showDialog() {
    this.visible = true;
  }

show(isSuccess: boolean) {
  if(isSuccess){this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });}
  else{this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });}
  
}

}
