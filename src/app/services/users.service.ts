import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIS } from 'src/app/apis-config/apis';
import { tap } from 'rxjs';
import { TokenService } from '@services/token.service';
import { User } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getUsers() {
    return this.http.get<User[]>(`${APIS.projects}users`,{
      context: checkToken()
    });
  }
}
