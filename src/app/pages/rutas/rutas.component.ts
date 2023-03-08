import { Component } from '@angular/core';
import * as L from 'leaflet';
import { Icon } from 'leaflet';
import ruta7b_v from 'src/raw-data/ruta-7B-vuelta.json';
import ruta7b_i from 'src/raw-data/ruta-7B-ida.json';
//https://www.gpsvisualizer.com/draw/
@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent {

  iconPath = 'assets/images-leaflet/';
  customIcon = new Icon({
    iconUrl: `${this.iconPath}marker-icon.png`,
    iconSize: [25, 41],
  });
  mapa: L.Map;
  geojsonLayer: L.GeoJSON;
  mapaLayersControl: any;
  isDay = false;


  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {

    this.mapa = L.map('mapa',{
    }).setView([-38.7359, -72.5903], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

    this.markCampus();
    // this.marksLinea10();  POsiblemente ya no existe esta linea

  }

  loadGeoJSON(rute, color) {
    this.geojsonLayer = L.geoJSON(rute, {
      style: {
        color: color,
        weight: 5
      }
    })//.addTo(this.mapa);
    //this.mapa.fitBounds(this.geojsonLayer.getBounds());
    return this.geojsonLayer;
  }

  createIcon(iconName: string, sizeX: number = 25, sizeY: number = 41) {
    return new Icon({
      iconUrl: `${this.iconPath}${iconName}`,
      iconSize: [sizeX, sizeY],
      iconAnchor: [sizeX / 2, sizeY],
    });
  }

  public ejecutarFuncion(event: any): void {
    const opcionSeleccionada = event.target.value;
    switch (opcionSeleccionada) {
      case 'C':
        this.clearMap();
        break;
      case '7':
        this.clearMap();
        this.marksLinea7();
        break;
      case '7A':
        break;
      case 'opcion3':
        // Ejecuta la función correspondiente para la opción 3
        break;
      default:
        // Opción por defecto
        break;
    }
  }


  markCampus(){
    const popupContent = '<h3>Campus San Francisco</h3><p>Esta es una descripción detallada de la marca.</p>';
    const marker = L.marker([-38.73692,-72.60205], {icon: this.createIcon("marker-icon.png") }).bindPopup(popupContent).addTo(this.mapa);
    const campus_norte = L.marker([-38.70392,-72.55015], { icon: this.createIcon("marker-icon.png"),  }).bindPopup("Campus Norte").addTo(this.mapa);
    const campus_mons_serg = L.marker([-38.73617,-72.60440], { icon: this.createIcon("marker-icon.png"),  }).bindPopup("Campus Monseñor Sergio Contreras Navia").addTo(this.mapa);
    const campus_dr_luis = L.marker([-38.70075,-72.54787], { icon: this.createIcon("marker-icon.png"),  }).bindPopup("Campus Doctor Luis Rivas del Canto").addTo(this.mapa);
    const campus_menchaca = L.marker([-38.73595,-72.60747], { icon: this.createIcon("marker-icon.png"),  }).bindPopup("Campus Monseñor Alejandro Menchaca Lira").addTo(this.mapa);

  }


  marksLinea10(){
    const terminal_10C = L.marker([-38.75960,-72.65256], {icon: this.createIcon("marker-icon.png") }).bindPopup("Terminal Linea 10C").addTo(this.mapa);
  }

  marksLinea7(remove=false){
        var t7b = "Terminal 7B"
        var terminal_7b = L.marker([-38.71365,-72.64506], { icon: this.createIcon("terminal.png", 25,25),  }).bindPopup(t7b).addTo(this.mapa);

        var rutaIda = L.layerGroup();
        var r2 = this.loadGeoJSON(ruta7b_i, 'blue').addTo(rutaIda);

        var rutaVUelta = L.layerGroup();
        var r3 = this.loadGeoJSON(ruta7b_v, 'red').addTo(rutaVUelta);

        var IdaVUelta = L.layerGroup();
        var r4 = this.loadGeoJSON(ruta7b_i, 'blue').addTo(IdaVUelta);
        var r5 = this.loadGeoJSON(ruta7b_v, 'red').addTo(IdaVUelta);

        var overlayMaps = {
          "7B Solo ida": rutaIda,
          "7B Solo vuelta": rutaVUelta,
          "7B ida y vuelta": IdaVUelta
        };

        this.mapaLayersControl = L.control.layers(null, overlayMaps,  { collapsed: false, autoZIndex: true }  ).addTo(this.mapa);
        //this.mapa.addLayer(cities);
        //colocar rutaIda como default
        this.mapa.addOverlay(rutaIda);
        this.mapa.addOverlay(rutaVUelta);
        this.mapa.addOverlay(IdaVUelta);

        rutaIda.addTo(this.mapa);

  }


  clearMap(){
    this.mapa.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON) {
        this.mapa.removeLayer(layer);
        this.mapa.removeControl(this.mapaLayersControl);
      }
    });
  }


}
