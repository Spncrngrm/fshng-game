import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { FishCardComponent } from './components/fish-card/fish-card.component';
import { FishService } from './services/fish.service';
import { Fish } from './models/fish.model';
import { FishingComponent } from './components/fishing/fishing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponent, MenuComponent, FishCardComponent, FishingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  view: 'home' | 'menu' | 'cards' | 'fishing' = 'home';
  fishList: Fish[] = [];

  constructor(private fishService: FishService) {}

  @HostListener('window:keydown.space', ['$event'])
  handleSpacePress(event: KeyboardEvent) {
    event.preventDefault();
    if (this.view === 'home') {
      this.view = 'menu';
    }
  }

  @HostListener('window:keydown.escape')
  handleEscapePress() {
    this.view = 'menu';
  }

  setView(newView: string) {
    if (['home', 'menu', 'cards', 'fishing'].includes(newView)) {
      this.view = newView as 'home' | 'menu' | 'cards' | 'fishing';
    } else {
      console.warn(`Invalid view: ${newView}`);
    }
  }
}
