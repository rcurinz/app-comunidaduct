import { Component,OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { ManagerServiceService } from 'src/app/services/manager-service.service';
import { UsersService } from '@services/users.service';


@Component({
  selector: 'app-admins-dash',
  templateUrl: './admins-dash.component.html',
  styleUrls: ['./admins-dash.component.scss']
})
export class AdminsDashComponent {

  constructor(private usersService: UsersService, private manageApi: ManagerServiceService) { }

  ngOnInit() {
    this.usersService.user().subscribe({
      next: (users) => {
        console.log(users);
      }
    })
    this.getDataAdmins();
  }

  getGraph(info){

    var data = info['data'];
    console.log(data)
    var fechas = data.Fechas;
    var Admins = data.admins;
    var keys = Object.keys(Admins)
    console.log(keys)
    


    var data_x = [];
    var data_y = [];
    var set_data = [];

  
    
    
    var chartDom = document.getElementById('dash_1');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip:{
        trigger: 'axis'
      },
      title: {
        text: 'Rendimiento vs Tiempo',
        subtext: 'Analisis de ineficiencia',
        left: 'center'
      }, 
      xAxis: {
        type: 'category',
        name: 'Periodo',
        axisLabel: { interval: 0, rotate: 70 },
        data: data_x
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '1%',
        top: '20%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        name: 'Porcentaje'
      },
      series: set_data
    };

    option && myChart.setOption(option);
  }

    

  getDataAdmins(){
    this.manageApi.getDataAdmins().subscribe(
      (data)=>{
        this.getGraph(data);
      }
  )
  }
  
}





