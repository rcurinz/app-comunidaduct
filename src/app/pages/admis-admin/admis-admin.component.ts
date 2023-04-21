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
  fecha:Date;

  paginas: any;
  roles: any;

  admin = {
    username: '',
    nombre: '',
    ingreso: '',
    fecha: '',
    tipo: '',
    rol: '',
    estado: '',
    rol_id: '',
    pagina : ''
  }


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
    //var div_role = document.getElementById("rol") as HTMLInputElement;
    this.authService.getAdminById(admin).subscribe({
      next: (info) => {
        console.log(info);
        this.admin.username = info['username'];
        this.admin.nombre = info['name'];
        this.admin.ingreso = new Date(info['ingreso']).toString();
        //this.admin.fecha =  new Date(info['ingreso']);
        this.admin.tipo = info['tipo'];
        this.admin.rol = info['rol_name'];
        this.admin.estado = info['estado'];
        this.admin.rol_id = info['id_rol'];
        this.admin.pagina = info['nombre_pagina'];
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
