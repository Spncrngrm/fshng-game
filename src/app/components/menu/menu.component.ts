import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() viewChange = new EventEmitter<'home' | 'menu' | 'fishing' | 'net' | 'aquariums' | 'store'>();

  goFishing() {
    this.viewChange.emit('fishing');
  }

  openNet() {
    this.viewChange.emit('net');
  }

  openAquariums() {
    this.viewChange.emit('aquariums');
  }

  openStore() {
    this.viewChange.emit('store');
  }

  saveAndQuit() {
    window.location.href = 'https://www.google.ca';
  }
}
