import { Component } from '@angular/core';
import * as L from 'leaflet';
import { Icon } from 'leaflet';
import ruta7b from 'src/raw-data/ruta-7B.json';
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
  isDay = false;
  constructor() { }

  ngOnInit(): void {
    this.initMap();
    this.loadGeoJSON();
  }

  initMap() {
    const popupContent = '<h3>Campus San Francisco</h3><p>Esta es una descripción detallada de la marca.</p>';
    var t7b = "Terminal 7B"
    this.mapa = L.map('mapa').setView([-38.7359, -72.5903], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);
    const marker = L.marker([-38.73692,-72.60205], {icon: this.createIcon("marker-icon.png") }).bindPopup(popupContent).addTo(this.mapa);
    const terminal_7b = L.marker([-38.71365,-72.64506], { icon: this.createIcon("terminal.png", 25,25),  }).bindPopup(t7b).addTo(this.mapa);
    const campus_norte = L.marker([-38.70392,-72.55015], { icon: this.createIcon("marker-icon.png"),  }).bindPopup("Campus Norte").addTo(this.mapa);
    const campus_mons_serg = L.marker([-38.73617,-72.60440], { icon: this.createIcon("marker-icon.png"),  }).bindPopup("Campus Monseñor Sergio Contreras Navia").addTo(this.mapa);
    const campus_dr_luis = L.marker([-38.70075,-72.54787], { icon: this.createIcon("marker-icon.png"),  }).bindPopup("Campus Doctor Luis Rivas del Canto").addTo(this.mapa);
    const campus_menchaca = L.marker([-38.73595,-72.60747], { icon: this.createIcon("marker-icon.png"),  }).bindPopup("Campus Monseñor Alejandro Menchaca Lira").addTo(this.mapa);
  }

  loadGeoJSON() {
    this.geojsonLayer = L.geoJSON(ruta7b, {
      style: {
        color: 'red',
        weight: 5
      }
    }).addTo(this.mapa);
    this.mapa.fitBounds(this.geojsonLayer.getBounds());
  }

  createIcon(iconName: string, sizeX: number = 25, sizeY: number = 41) {
    return new Icon({
      iconUrl: `${this.iconPath}${iconName}`,
      iconSize: [sizeX, sizeY],
      iconAnchor: [sizeX / 2, sizeY],
    });
  }

}
