import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from '@services/token.service'

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard  {

  constructor(private tokenService: TokenService, private router:Router) {}

  canActivate(){
    const token = this.tokenService.getToken();
    if(token){
      this.router.navigateByUrl('sis/admins-dash');
    }
    return true;
  }
  
}
