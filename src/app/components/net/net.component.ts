import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../services/game-state.service';
import { Fish } from '../../models/fish.model';

@Component({
  selector: 'app-net',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './net.component.html',
  styleUrls: ['./net.component.css']
})
export class NetComponent {
  @Output() viewChange = new EventEmitter<'menu' | 'home' | 'cards' | 'fishing' | 'net'>();

  constructor(public gameState: GameStateService) {}

  sellFish(index: number) {
    const fish = this.gameState.net[index];
    const earned = fish.weight * fish.pricePerKg;
    this.gameState.gold += Number(earned.toFixed(2));
    this.gameState.removeFromNet(index);
  }

  goToMenu() {
    this.viewChange.emit('menu');
  }
}
