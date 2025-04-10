import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() viewChange = new EventEmitter<'home' | 'menu' | 'cards' | 'fishing' | 'net'>();

  goFishing() {
    this.viewChange.emit('fishing');
  }

  openNet() {
    this.viewChange.emit('net');
  }

  openAquariums() {
    this.viewChange.emit('cards'); // Placeholder, can be 'aquariums' if you create a new view
  }

  openStore() {
    // You can add a store view later
    this.viewChange.emit('menu'); // placeholder
  }

  saveAndQuit() {
    // In a real app, you'd save state to localStorage or file system, then close
    this.viewChange.emit('home'); // For now, just go back to home
  }
}
