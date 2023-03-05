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

}
