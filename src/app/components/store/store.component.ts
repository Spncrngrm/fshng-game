import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  @Output() viewChange = new EventEmitter<'menu'>();

  constructor(public gameState: GameStateService) {}

  get fishPrice(): number {
    return this.gameState.store.fishUnlockLevel * 50;
  }

  get aquariumPrice(): number {
    const prices = [0, 500, 750, 1000];
    return prices[this.gameState.store.tankUnlockLevel] ?? 99999;
  }

  get sortPrice(): number {
    const unlockables = [
      { name: 'Selection Sort', cost: 100 },
      { name: 'Insertion Sort', cost: 250 },
      { name: 'Champagne Sort', cost: 1000 },
      { name: 'Gnome Sort', cost: 1000 }
    ];
    const index = this.gameState.unlockedAlgorithms.length - 1;
    return unlockables[index]?.cost ?? 99999;
  }

  get netSlotPrice(): number {
    const nextSlot = this.gameState.netCapacity + 1;
    return 10 ** (nextSlot - 5);
  }

  canAffordFish(): boolean {
    return this.gameState.gold >= this.fishPrice;
  }

  canAffordAquarium(): boolean {
    return this.gameState.gold >= this.aquariumPrice;
  }

  canAffordSort(): boolean {
    return this.gameState.gold >= this.sortPrice;
  }

  canAffordNet(): boolean {
    return this.gameState.gold >= this.netSlotPrice;
  }

  unlockFish(): void {
    this.gameState.unlockNextFish();
  }

  unlockAquarium(): void {
    this.gameState.unlockNextAquarium();
  }

  unlockSort(): void {
    this.gameState.unlockNextSort();
  }

  unlockNetSlot(): void {
    this.gameState.unlockNextNetSlot();
  }
}
