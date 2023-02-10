import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  names = ['Persona 1', 'Persona 2', 'Persona 3'];
  winner: any;

  constructor() { }

  ngOnInit(): void {
  }

  spin() {
  const ruleta = document.querySelector('.ruleta') as HTMLElement;
  const segments = document.querySelectorAll('.segment');
  const winnerIndex = Math.floor(Math.random() * segments.length);

  ruleta.style.transition = 'transform 5s cubic-bezier(0.57, 0.13, 0.18, 0.98)';
  ruleta.style.transform = `rotate(${360 * segments.length + (360 / segments.length) * winnerIndex}deg)`;

  setTimeout(() => {
    this.winner = this.names[winnerIndex];
    //this.fireworksService.fire();
  }, 5000);
  }

  reset() {
    this.winner = null;
  }


}
