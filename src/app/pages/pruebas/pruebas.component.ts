import { Component } from '@angular/core';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss']
})
export class PruebasComponent {

  images = [
    { src: '../assets/img/images_fondos/1.png', alt: 'Empanadas', size: '40px' },
    { src: '../assets/img/images_fondos/2.png', alt: 'Vaso de Terremoto', size: '60px' },
    { src: '../assets/img/images_fondos/3.png', alt: 'Huaso Chileno', size: '80px' },
    { src: '../assets/img/images_fondos/1.png', alt: 'Empanadas', size: '20px' },
    // Agrega más objetos para más imágenes con diferentes tamaños
  ];

  getLeftPosition(index: number): string {
    const leftPositions = ['10%', '30%', '50%', '70%', '90%'];
    return `calc(${leftPositions[index % leftPositions.length]} + 20vw)`;
  }

}
