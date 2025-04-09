import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() viewChange = new EventEmitter<string>();

  goFishing() {
    this.viewChange.emit('fishing');
  }
}
