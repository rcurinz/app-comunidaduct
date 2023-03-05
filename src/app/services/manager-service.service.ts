import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIS } from 'src/app/apis-config/apis';
import { map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class ManagerServiceService {

  connection: any;


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  getService():Observable<any>{
    return this.httpClient.get(APIS['projects'] +'getadmins');
  }

  //query to mysql
  getQuery() {

  }


  getTime():Observable<any>{
    return this.httpClient.get("https://worldtimeapi.org/api/timezone/America/Santiago");
  }


  getDataAdmins():Observable<any>{
    return this.httpClient.get(APIS['projects'] +'getDataAdmins');
  }

}
