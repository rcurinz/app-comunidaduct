import { Component } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ManagerServiceService } from 'src/app/services/manager-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-minecraft',
  templateUrl: './minecraft.component.html',
  styleUrls: ['./minecraft.component.scss']
})
export class MinecraftComponent {

  reglas_chat = [
    "No insultes, denigres, ofendas y/o amenazas a otros usuarios",
    "Respeta a todos",
    "No hagas spam ni flood",
    "No abuses de mayúsculas.",
    "No promociones IPs externas de otros servidores, ni servidores de Discord o canales de Youtube/Twitch con información de otros servidores.",
    "No alientes a los usuarios a romper las reglas.",
    "No le faltes el respeto al staff.",
    "Respeta las decisiones y sanciones que haga el staff.",
    "Las reglas están sujetas al sentido común, el staff siempre tendrá la última palabra."
  ];

  reglas_juego = [
    "No te aproveches de bugs",
    "No uses hacks- modificaciones externas. (Utilizar Xray dentro del servidor es ilegal).",
    "No encubras a alguien que esté incumpliendo las reglas, si lo haces obtendrás su misma sanción.",
    "No te hagas pasar por miembro del staff.",
    "No mientas o intentes sobornar al staff para retirar una sanción o conseguir algún beneficio.",
    "En caso de presenciar algún bug, debes abrir un ticket a través del discord, para que un miembro del staff pueda atenderte (saca capturas de pantalla y ten claro todos los detalles).",
    "El tpakill no está permitido, recuerda que es bajo tu responsabilidad aceptar el tp y tener el pvp on. Se considerará tpakill después de 2 muertes seguidas aceptando el tp.",
    "Estafar a otros usuarios no está permitido.",
    "El grifeo no está permitido. Grifeo se considerará el modificar una zona ajena conscientemente y de forma molesta, lo cual implica su respectiva sanción.",
    "Hay granjas que no están permitidas ya que pueden dar lag, (la de oro, de hierro, las de aldeanos, las mecanismos de redstone como la de pesca afk) Anexo: No se permiten más de 10 aldeanos por shunk ya que se genera lag.",
    "Las reglas están sujetas al sentido común, el staff siempre tendrá la última palabra."
  ];

  faltas = {
    "Menos leve": "Abuso de mayúsculas, pedir cosas a los administradores. Después de 4 menos leves es leve",
    "Leve": "kickear a criterio de staff (insulto, denigraciones, faltas de respeto en el chat) Después de 3 faltas leves es gravísima",
    "Grave": "Ban de 2 semanas (Falta de respeto al staff, grifear, estafar, tpakill, Encontrar granjas que no son permitidas de tu propiedad, etc) Después de 2 faltas graves es gravísima. Independiente del tiempo se acumularan.",
    "Gravísima": "Ban permanente (Aprovecharse de bug, usar modificaciones ilegales)"
  };

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

}
