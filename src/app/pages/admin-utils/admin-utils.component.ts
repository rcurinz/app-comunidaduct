import { Component,  ElementRef, ViewChild  } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

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
  url = null;
  imgUrl;
  sourceProducts ;
  targetProducts = [];
  visible: boolean = false;
  visible2: boolean = false;
  uploadedFiles: any[] = [];
  FileInput;
  new_category = '';
  statuses = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' }
  ];
  imgUrl_bin;
  CategorysChange = [];
  formData = new FormData();

  @ViewChild('fileUpload', { static: true }) fileUpload: FileUpload;

  constructor(private authService: AuthService, private messageService: MessageService, private elementRef: ElementRef) { }

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

  onUpload1(event) {
    const file = event.files[0];
  
    this.formData.append('image', file);
    // Creamos un nuevo elemento `<img>`
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // Convertimos la imagen a binario

    reader.onload = (e) => {
      const result = e.target.result;
  
      if (typeof result === 'string') {
        this.imgUrl = result;
      }
    };
  }

  test(event){
    console.log("send!!!!!");
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
    var data = {
      img: this.imgUrl_bin,
      category: this.targetProducts
    }
    this.formData.append('category', JSON.stringify(this.targetProducts));
    this.authService.AddSticker(this.formData).subscribe({
      next: (info) => {
        this.show("Imagen subida", "success", "Correcto");
        this.visible = false;
        this.imgUrl = null;
        this.formData = new FormData();
        this.getCategorys();
        this.clearData()
      },
      error: (err) => {
        console.log(err);
      }
    });
  
  }

  showDialog() {
    if (this.targetProducts.length > 0 && this.imgUrl != null){
      this.visible = true;
    } else {
      this.show("Debes seleccionar al menos una imagen y una categoria", "error", "Error");
    }
  }

  show(message: string, severity: string = 'success', summary: string = 'Correcto' ) {
    this.messageService.add({ severity: severity, summary: summary, detail: message });
  }

  checkImg(event){
    this.cancelBtn();
    /*const file = event.files.length;
    if (file == 0){
      this.imgUrl = null;
      this.cancelBtn();
    }*/
  }

  cancelBtn(){
    var temp = this.sourceProducts.concat(this.targetProducts);
    this.sourceProducts = temp;
    this.targetProducts = [];
  }


  clearData(){
    this.fileUpload.clear();
  }

  showdialog2(){
    this.visible2 = true;
  }

  validateCategory(){
    var cat = this.new_category;
    var temp = this.sourceProducts.concat(this.targetProducts);
    let encontrado = false;
    for (const objeto of temp) {
      if (objeto.name.toLowerCase() === cat) {
        encontrado = true;
        break;
      }
    }
    if (encontrado){
      this.show("La categoria ya existe", "error", "Error");
    } else {
      this.addCategory();
    }
  }

  updateCategory(category){
    this.authService.updateCategory(category).subscribe({
      next: (info) => {
        this.show("Categoria actualizada", "success", "Correcto");
        this.getCategorys();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  addCategory(){
    var cat = this.new_category;
    const data = {
      name: cat
    };
    this.authService.addCategory(data).subscribe({
      next: (info) => {
        this.show("Categoria añadida", "success", "Correcto");
        this.visible2 = false;
        this.new_category = '';
        this.getCategorys();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onRowEditInit(product) {
    //console.log(product);
  }

  onRowEditSave(product){
    this.updateCategory(product);
  }

  onRowEditCancel(product, ri){
    //console.log(product);
  }

  onRowEditDelete(product, ri){
    this.authService.deleteCategory(product.id).subscribe({
      next: (info) => {
        this.show("Categoria eliminada", "success", "Correcto");
        this.getCategorys();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
