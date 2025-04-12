import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { FishingComponent } from './components/fishing/fishing.component';
import { NetComponent } from './components/net/net.component';
import { FishService } from './services/fish.service';
import { Fish } from './models/fish.model';
import { AquariumsComponent } from './components/aquariums/aquariums.component'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    MenuComponent,
    FishingComponent,
    NetComponent,
    AquariumsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  view: 'home' | 'menu' | 'fishing' | 'net' | 'aquariums' = 'home';

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

  setView(view: string) {
    if (['home', 'menu', 'fishing', 'net', 'aquariums'].includes(view)) {
      this.view = view as 'home' | 'menu' | 'fishing' | 'net' | 'aquariums';
    }
  }
}
