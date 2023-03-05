import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { RequestStatus } from '@models/request-status.model';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent {

  email: string = '';
  password: string = '';
  passwordConfirm: string = '';
  passwordMatch: boolean = false;
  status: RequestStatus = 'init';

  constructor(
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.status = 'loading';
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        if(res.statusCode == 200){
          this.status = 'success';
          this.router.navigateByUrl('sis/admins-dash');
        }else{
          console.log(res);
          this.status = 'error';
        }
      },
      error: (res) => {
        this.status = 'error';
      }
    });
  }

}
