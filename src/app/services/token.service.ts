import { Injectable } from '@angular/core';
import {getCookie, setCookie, removeCookie} from 'typescript-cookie'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    setCookie('token-admin', token, {expires: 365, path: '/'});  //Expira en 365 dias y se puede acceder desde cualquier ruta
  }

  getToken() {
    return getCookie('token-admin');
  }

  removeToken() {
    removeCookie('token-admin');
  }

  saveTokenConcurso(admins) {
    setCookie('token-concurso', admins, {expires: 365, path: '/'});  //Expira en 365 dias y se puede acceder desde cualquier ruta
  }

  getTokenConcurso() {
    return getCookie('token-concurso');
  }

  removeTokenConcurso() {
    removeCookie('token-concurso');
  }

}
