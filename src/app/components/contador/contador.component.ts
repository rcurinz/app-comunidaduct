import { Component, OnInit } from '@angular/core';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.scss']
})
export class ContadorComponent implements OnInit {

  constructor(private manageApi: ManagerServiceService) { }

  ngOnInit(): void {
    this.manageApi.getQuery();
  }

  getService(){
    this.manageApi.getService().subscribe(
      (data)=>{
        console.log(data);
      }
  )};

}
