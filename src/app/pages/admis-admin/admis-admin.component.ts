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
  rol_id: string;
  estado: string;

  paginas: any;
  roles: any;


  ngOnInit(): void {
    this.getDataAdmins();
    this.getPages();
    this.getRoles();
  }

  getDataAdmins(){
    this.authService.getAdmins().subscribe({
      next: (info) => {
        this.admins = info['administradores'];
        //console.log(this.admins);
      }
    });
  }

  showDialog() {
    this.displayModal = true;
  }

  registrrarAdmin(){
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
    var div_role = document.getElementById("rol") as HTMLInputElement;
    this.authService.getAdminById(admin).subscribe({
      next: (info) => {
        console.log(info);
        this.username = info['username'];
        this.nombre = info['name'];
        this.ingreso = info['ingreso'];
        this.tipo = info['tipo'];
        div_role.value = info['rol_name'];
        this.estado = info['estado'];
        this.rol_id = info['id_rol'];
      }
    });
  }

  getPages(){
    return this.authService.getPaginas().subscribe({
      next: (info) => {
        this.paginas = info['paginas'];
        //console.log(this.paginas);
      }
    });
  }

  getRoles(){
    return this.authService.getRoles().subscribe({
      next: (info) => {
        this.roles = info['roles'];
        console.log(this.roles);
      }
    });
  }

  updateAdmin(){
    var fecha = document.getElementById("fecha") as HTMLInputElement;
    var type_rol = document.getElementById("fecha") as HTMLInputElement;
    const data = {
      username: this.username,
      nombre: this.nombre,
      ingreso: this.ingreso,
      tipo: this.tipo,
      role: this.rol,
      estado: this.estado,
      type_role: type_rol.value
    }
    console.log(data);
    /*this.authService.updateAdmin(data).subscribe({
      next: (info) => {
        this.getDataAdmins();
      }
    });*/
  }

}
