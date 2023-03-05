import { Component } from '@angular/core';
import * as echarts from 'echarts';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

@Component({
  selector: 'app-count-admins',
  templateUrl: './count-admins.component.html',
  styleUrls: ['./count-admins.component.scss']
})
export class CountAdminsComponent {

  constructor(private manageApi: ManagerServiceService) { }

  ngOnInit(): void {
    this.getDataAdmins();
  }

  getGraph(info){
    var admins = info['admins'];
    var data = info['data'];
    var data_x = [];
    var data_y = [];
    for (let i = 0; i < data.length; i++) {
      data_x.push(data[i][0].replace('Semana','').replace('del',''));
      var t = [];
      for (let j = 0; j < admins.length; j++) {
        t.push(data[i][j+1].toFixed(2));
      }
      data_y.push(t);
    }
    //transponer data_y
    var data_y_t = [];
    for (let i = 0; i < admins.length; i++) {
      var t = [];
      for (let j = 0; j < data_y.length; j++) {
        t.push(data_y[j][i]);
      }
      data_y_t.push(t);
    }
    var set_data = [];
    for(var i = 0; i < data_y_t.length; i++){
      set_data.push({
        name: admins[i],
        data: data_y_t[i],
        type: 'line'
      });
    }
    var chartDom = document.getElementById('main');
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
      legend: {
        top:'10%',
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
