import { Component,OnInit } from '@angular/core';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-admins-dash',
  templateUrl: './admins-dash.component.html',
  styleUrls: ['./admins-dash.component.scss']
})
export class AdminsDashComponent {

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        console.log(users);
      }
    })
  }

}
