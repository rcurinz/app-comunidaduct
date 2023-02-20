import { Component } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ManagerServiceService } from 'src/app/services/manager-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import REGLAS from '@raw-data/reglas.json';
import COMANDOS from '@raw-data/comandos.json';

@Component({
  selector: 'app-minecraft',
  templateUrl: './minecraft.component.html',
  styleUrls: ['./minecraft.component.scss']
})
export class MinecraftComponent {

  reglas_chat = REGLAS['reglas-chat'];

  reglas_juego = REGLAS["reglas-minecraft"];

  faltas = REGLAS["faltas"];

  info = [
    "Versión 1.19 java",
    "Usuarios: Premium y no Premium",
    "Vanilla",
    "Server no técnico",
    "Ip uctland.chilemine.cl",
    "Cuenta con Economía",
    "Plugins"
  ];

  servidor = "uctland.chilemine.cl";

  extras = [
    "Dentro de sus propiedades deben tener una cantidad considerable de animales(ejemplo menos de 30) para no generar lag."
  ]

  hours = 0;
  minutes = 0;
  seconds = 0;
  intervalId: any;
  message = '';
  infoServer;
  comandos = false;
  rules = true;
  comandos_list = COMANDOS;

  num=100;

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'DKUrE11FucmOLa47jQRUkEzgUXfGpZyxIFrKRUfjsyvsUTDC',
      'Content-Type': 'application/json'
    })
  };


  constructor(private manageApi: ManagerServiceService, private http: HttpClient) { }

  ngOnInit() {
    var body = document.body;
    body.style.backgroundImage = "url('https://wallpaperaccess.com/full/4650672.jpg')";
    body.style.backgroundSize = "cover";
    body.style.height = "102%";

    this.serverStatus();
    setInterval(() => {
      this.serverStatus();
    }, 5000);

    //this.getTime();
  }

  getTime(){
    this.intervalId = setInterval(() => {
      this.manageApi.getTime().subscribe(
        (data)=>{
        const currentDate = new Date(data['datetime']);
        const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0);
        if (currentDate >= targetDate) {
          this.message = '¡Son las 18:00!';
          this.info[4] = "IP "+ this.servidor;
          document.getElementById("text-cont").style.display = "none";
          document.getElementById("contador").style.display = "none";
          document.getElementById("ip").style.display = "block";
          clearInterval(this.intervalId);
        } else {
          const diff = targetDate.getTime() - currentDate.getTime();
          this.hours = Math.floor(diff / (1000 * 60 * 60));
          this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((diff % (1000 * 60)) / 1000);
        }
      }
      )
    }, 1000);
  }


  serverStatus(){
    this.http.get("https://api.mcsrvstat.us/2/uctland.chilemine.cl")
    .subscribe(response =>{
      this.infoServer = response;
      this.info[0] = "Servidor: "+this.infoServer.version +" ("+ this.infoServer.software +")"
    });
  }

  playerstate(name){
    this.http.get("https://minotar.net/helm/"+name+"/32")
    .subscribe(response =>{
      this.infoServer = response;
      this.info[0] = "Servidor: "+this.infoServer.version +" ("+ this.infoServer.software +")"
    });

  }

  change_view(estado){
    if(estado === "comandos"){
      this.comandos = true;
      this.rules = false;
    }else if(estado === "rules"){
      this.comandos = false;
      this.rules = true;
    }

  }

}
