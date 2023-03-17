import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { faFolder, faSheetPlastic, faFilePdf, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ManagerServiceService } from '@services/manager-service.service';

@Component({
  selector: 'app-admis-admin',
  templateUrl: './admis-admin.component.html',
  styleUrls: ['./admis-admin.component.scss']
})
export class AdmisAdminComponent {

  constructor(private manageApi: ManagerServiceService, private authService: AuthService) { }

  faXmark = faXmark;
  admins: any;
  displayModal: boolean = false;
  username: string;
  nombre: string;
  password: string;
  ingreso: string;
  tipo: string;
  rol: string;


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

  showDialog() {
    this.displayModal = true;
  }

  registrrarAdmin(){
    console.log(this.username, this.nombre, this.password, this.ingreso, this.tipo);
    const data = {
      username: this.username,
      nombre: this.nombre,
      password: this.password,
      ingreso: this.ingreso,
      tipo: this.tipo,
      role: this.rol
    }
    this.authService.registrarAdmin(data).subscribe({
      next: (info) => {
        console.log(info);
        this.getDataAdmins();
      }
    });

  }

  show_modal(){
    const modal = document.getElementById("modal-edit-admin");
    if(modal.classList.contains("is-active")){
      modal.classList.remove("is-active");
    }else{
      modal.classList.add("is-active");
    }
  }

  getAdmin(admin){
    console.log("ID Admin",admin);
    this.authService.getAdminById(admin).subscribe({
      next: (info) => {
        console.log(info);
        this.username = info['username'];
        this.nombre = info['nombre'];
        this.ingreso = info['ingreso'];
        this.tipo = info['tipo'];
        this.rol = info['role'];
      }
    });
  }

}
