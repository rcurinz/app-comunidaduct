import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIS } from 'src/app/apis-config/apis';
import { tap } from 'rxjs';
import { TokenService } from '@services/token.service';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(email: string, password: string) {
    return this.http.post(`${APIS.projects}login`, { 'username': email,'password': password })
    .pipe(
      tap((res: any) => {
        this.tokenService.saveToken(res.access_token);
      }
    ));
  }

  logout() {
    this.tokenService.removeToken();
  }

  getProfile() {
    return this.http.get(`${APIS.projects}profile`,{
      context: checkToken()
    });
  }

  getAdmins(){
    return this.http.get(APIS['projects'] +'getadmins', { context: checkToken() });
  }

  registrarAdmin(data){
    return this.http.post(APIS['projects'] +'registeradmin',data,  {context: checkToken()});
  }

  getConfessions(){
    return this.http.get(APIS['projects'] +'getconfes', { context: checkToken() });
  }
}
