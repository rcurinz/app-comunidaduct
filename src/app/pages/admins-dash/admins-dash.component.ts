import { Component,OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { ManagerServiceService } from 'src/app/services/manager-service.service';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth.service';


@Component({
  selector: 'app-admins-dash',
  templateUrl: './admins-dash.component.html',
  styleUrls: ['./admins-dash.component.scss']
})
export class AdminsDashComponent {

  constructor(private usersService: UsersService, private manageApi: ManagerServiceService, private authService: AuthService) { }

  ngOnInit() {
   
    //this.getConfesiones();
    var date1 = new Date();
    date1.setHours(6,0,0,0);
    var date2 = new Date();
    date2.setDate(date2.getDate() + 1);
    date2.setHours(3,0,0,0);
    this.getConfesBettwenDates(date1, date2);
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

  getGraphcount(info){
    var data_sem = [0,0,0,0,0,0,0];
    console.log(info);
    var data = info['confesiones'];
    var today = new Date();
    var day = today.getDay();
    var daylist = ["Domingo","Lunes","Martes","Miercoles ","Jueves","Viernes","Sabado"];
    var daytoday = daylist[day];
    data_sem[day] = data.length;

    console.log(data_sem)
 
    var chartDom = document.getElementById('dash_2');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip:{
        trigger: 'axis'
      },
      title: {
        text: 'Cantidad de confesiones por dia de la semana',
        subtext: 'Analisis de confesiones',
        left: 'center'
      }, 
      xAxis: {
        type: 'category',
        name: 'Dia de la semana',
        axisLabel: { interval: 0, rotate: 70 },
        data: ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]
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
        name: 'Cantidad'
      },
      series: [
        {
          name: 'Confesiones',
          type: 'bar',
          data: data_sem
        }
      ]
    };

    option && myChart.setOption(option);
  }

  getGraphcountForAdmin(info){
    var data_sem = [0,0,0,0,0,0,0];
    console.log(info);
    var data = info['confesiones'];
    var names_admins = [];
    var admins = {};
    for (let i = 0; i < data.length; i++) {
      if(names_admins.indexOf(data[i].admin) == -1){
        names_admins.push(data[i].admin);
      }
      const element = data[i];
      var admin = element['admin'];
      if(admin in admins){
        admins[admin] += 1;
      }else{
        admins[admin] = 1;
      }
    }

    var data_admins = [];
    var key = Object.keys(admins);
    var values = Object.values(admins);
    for (let i = 0; i < key.length; i++) {
      data_admins.push({name:key[i], data:values[i]});
    }

    console.log(key,values)


 
    var chartDom = document.getElementById('dash_3');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip:{
        trigger: 'axis'
      },
      legend: {},
      title: {
        text: 'Cantidad de confesiones por admin en el dia de hoy',
        subtext: 'Analisis de confesiones',
        left: 'center'
      }, 
      xAxis: {
        type: 'category',
        name: 'Dia de la semana',
        axisLabel: { interval: 0, rotate: 70 },
        data: names_admins
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
        name: 'Cantidad'
      },
      series: [
        {
          data: values,
          type: 'bar'
        }
      ]
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

  getConfesiones(){
    this.authService.getConfessions().subscribe(
      (data)=>{
        console.log(data)
      }
    )
  }

  getConfesBettwenDates(date1, date2){
    this.authService.getConfesBettwenDates(date1, date2).subscribe(
      (data)=>{
        this.getGraphcount(data);
        this.getGraphcountForAdmin(data);
      }
    )
  }
  
}





