import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '@services/token.service';
import { AuthService } from "@services/auth.service"

@Component({
  selector: 'app-concurso',
  templateUrl: './concurso.component.html',
  styleUrls: ['./concurso.component.scss']
})
export class ConcursoComponent {

  id;
  myStickers;
  idPlayer="";
  codePlayerSecurity="";
  message = "Primero encuentra un sticker valido para comenzar a jugar";
  jugar = false;
  cantidadStickers = 0;
  hiddenCodePlayerSecurity;
  visible: boolean = false;

  constructor(private route: ActivatedRoute,private tokenService: TokenService, private authService: AuthService) { }

  ngOnInit(): void {
    //si existe el token
    if (this.existToken()){
      this.DatosPlayer();
    }
    //Obtengo el codigo o hash del sticker
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null){
      //Si se ingresa con un sticker
      this.accions(this.id);
    } else  {
      //Si se ingresa sin sticker
      if (this.existToken()) {
        this.jugar = true;
        this.getAllMyStickers();
      } else {
        this.jugar = false;
      }
    }
  }

  createToken(){
    var stickers = {code_player: '', codSecurity: '', "stickers":[]};
    this.tokenService.saveTokenConcurso(JSON.stringify(stickers));
  }

  addstickersInToken(stk){
    var tk = JSON.parse(this.tokenService.getTokenConcurso())
    var nstickers = tk.stickers;
    nstickers.push(stk);
    this.tokenService.saveTokenConcurso(JSON.stringify(tk));
  }

  getCodePlayer(){
    var tk = JSON.parse(this.tokenService.getTokenConcurso())
    return tk.code_player;
  }

  setCodePlayer(code){
    var tk = JSON.parse(this.tokenService.getTokenConcurso())
    tk.code_player = code;
    this.tokenService.saveTokenConcurso(JSON.stringify(tk));
  }

  getAdmins(){
    var tk = JSON.parse(this.tokenService.getTokenConcurso())
    return tk.admins;
  }

  setCodeSecurity(code){
    var tk = JSON.parse(this.tokenService.getTokenConcurso())
    tk.codSecurity = code;
    this.tokenService.saveTokenConcurso(JSON.stringify(tk));
  }

  getCodeSecurity(){
    var tk = JSON.parse(this.tokenService.getTokenConcurso())
    this.hiddenCodePlayerSecurity = '*'.repeat(tk.codSecurity.length);
    return tk.codSecurity;
  }

  existToken(){
    if(this.tokenService.getTokenConcurso()){
      return true;
    }else{
      return false;
    }
  }


  accions(codigo){
    if (this.existToken()) {
      var codePLayer = this.getCodePlayer();
      this.DatosPlayer();
      this.registerSticker(codigo, codePLayer);
    } else {
      this.registrar(codigo);
      this.DatosPlayer();
    }
    //this.getAllMyStickers();
  }


  generatePLayerCode(){
    this.authService.generatePlayerCode().subscribe({
      next: (info) => {
        console.log(info);
        this.setCodePlayer(info['code']);
      }
    })
  }

  registrar(code){
    //recibo el codigo del sticker
    this.authService.RegisterEnConcurso(code).subscribe({
      next: (info) => {
        var codUSer = info['playerCode'];
        var codSecurity = info['codSeguridad'];
        var codSticker = info['codSticker'];
        this.createToken();
        this.setCodePlayer(codUSer);
        this.setCodeSecurity(codSecurity);
        this.addstickersInToken(codSticker);
        this.DatosPlayer();
        this.getAllMyStickers();
      },
      error : (err) => {
        if (err.status === 403) { // Error 403 Forbidden
          const contenidoError = err.error; // Aquí debería estar el cuerpo JSON de la respuesta
          if (contenidoError.finalizado) {
            this.visible = true;
            this.message = "El concurso ha finalizado";
          }
        }
      }
    });
  }

  registerSticker(codeSticker, codePlayer){
    this.authService.RegisterSticker(codeSticker, codePlayer).subscribe({
      next: (info) => {
        var codSticker = info['codSticker'];
        this.addstickersInToken(codSticker);
        this.getAllMyStickers();
      },
      error : (err) => {
        this.getAllMyStickers();
      }
    });
  }

  getAllMyStickers(){
    var codePlayer = this.getCodePlayer();
    this.authService.getAllMyStickers(codePlayer).subscribe({
      next: (info) => {
        this.myStickers = info['stickers'];
        this.cantidadStickers = this.myStickers.length;
      },
      error : (err) => {
        if (err.status === 403) { // Error 403 Forbidden
          const contenidoError = err.error; // Aquí debería estar el cuerpo JSON de la respuesta
          if (contenidoError.finalizado) {
            this.visible = true;
            this.message = "El concurso ha finalizado";
          }
        }
      }
    });
  }


  DatosPlayer(){
    this.jugar = true;
    this.idPlayer = this.getCodePlayer()
    this.codePlayerSecurity = this.getCodeSecurity()
  }

  showCode() {
    setTimeout(() => {
      this.hiddenCodePlayerSecurity = '*'.repeat(this.codePlayerSecurity.length);
    }, 3000);
    this.hiddenCodePlayerSecurity = this.codePlayerSecurity;
  }


  showDialog() {
    this.visible = true;
  }
}
