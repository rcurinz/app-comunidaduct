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

  getConfesBettwenDates(date1, date2){
    const data = {
      date1: date1,
      date2: date2
    }
    return this.http.post(APIS['projects'] +'getconfesbetweendates', data, { context: checkToken() });
  }

  saveAsistencia(asistencia, fecha){
    const data = {
      asistencia: asistencia,
      fecha: fecha
    }
    return this.http.post(APIS['projects'] +'admins/saveasistencia', data, { context: checkToken() });
  }

  getAdminById(id){
    return this.http.post(APIS['projects'] +'getadminbyid',{'id':id} , { context: checkToken() });
  }

  getPaginas(){
    return this.http.get(APIS['projects'] +'admins/getpaginas', { context: checkToken() });
  }

  getRoles(){
    return this.http.get(APIS['projects'] +'admins/getroles', { context: checkToken() });
  }

  getCountForDay(){
    return this.http.get(APIS['projects'] +'admins/getcountforday', { context: checkToken() });
  }

  /* APIS Concurso */

  getAdminsCode(id){
    return this.http.post(APIS['projects'] +'getadmincode', {'code':id});
  }

  //Registrar jugador 
  RegisterEnConcurso(codeHash){
    return this.http.post(APIS['projects'] +'registerconcurso', {codeHash:codeHash});
  }

  //Genera el id del jugador
  generatePlayerCode(){
    return this.http.get(APIS['projects'] +'generateplayercode');
  }

  //Registtra un sticker
  RegisterSticker(codeHash, codePlayer){
    return this.http.post(APIS['projects'] +'registersticker', {codeHash:codeHash, codePlayer:codePlayer});
  }

  getAllMyStickers(codePlayer){
    return this.http.post(APIS['projects'] +'getallmystickers', {codePlayer:codePlayer});
  }
  /* Fin apis concurso */
}
