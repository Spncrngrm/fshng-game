import { Injectable } from '@angular/core';
import { Fish } from '../models/fish.model';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  gold: number = 0;

  net: Fish[] = [];
  netCapacity: number = 5;

  aquariums: Fish[][] = [[], [], [], []];

  unlockedFishCount: number = 5; // Starts with 5
  unlockedAquariums: number = 1; // Aquarium 1 is unlocked by default

  unlockedAlgorithms: string[] = ['Bubble Sort'];

  store = {
    fishUnlockLevel: 1,
    tankUnlockLevel: 1,
    sortUnlockLevel: 1,
    netSlotsUnlocked: 5
  };

  constructor() {
    this.loadState();
  }
  
  getNet(): Fish[] {
    return this.net;
  }

  isNetFull(): boolean {
    return this.net.length >= this.netCapacity;
  }

  addToNet(fish: Fish): void {
    if (!this.isNetFull()) {
      this.net.push(fish);
      this.saveState();
    }
  }

  removeFromNet(index: number): void {
    this.net.splice(index, 1);
    this.saveState();
  }

  unlockNextFish(): boolean {
    const nextPrice = this.store.fishUnlockLevel * 50;
    if (this.gold >= nextPrice) {
      this.gold -= nextPrice;
      this.store.fishUnlockLevel++;
      this.unlockedFishCount += 5;
      this.saveState();
      return true;
    }
    return false;
  }

  unlockNextAquarium(): boolean {
    const prices = [0, 500, 750, 1000];
    const next = this.store.tankUnlockLevel;
    if (next < prices.length && this.gold >= prices[next]) {
      this.gold -= prices[next];
      this.store.tankUnlockLevel++;
      this.unlockedAquariums = this.store.tankUnlockLevel;
      this.saveState();
      return true;
    }
    return false;
  }

  unlockNextSort(): boolean {
    const unlockables = [
      { name: 'Selection Sort', cost: 100 },
      { name: 'Insertion Sort', cost: 250 },
      { name: 'Champagne Sort', cost: 1000 },
      { name: 'Gnome Sort', cost: 1000 }
    ];

    const index = this.unlockedAlgorithms.length - 1;
    if (index < unlockables.length) {
      const next = unlockables[index];
      if (this.gold >= next.cost) {
        this.gold -= next.cost;
        this.unlockedAlgorithms.push(next.name);
        this.saveState();
        return true;
      }
    }
    return false;
  }

  unlockNextNetSlot(): boolean {
    const nextSlot = this.netCapacity + 1;
    const cost = 10 ** (nextSlot - 5); // 10, 100, 1000, 10000...
    if (this.gold >= cost) {
      this.gold -= cost;
      this.netCapacity++;
      this.saveState();
      return true;
    }
    return false;
  }

  saveState(): void {
    const state = {
      gold: this.gold,
      net: this.net,
      netCapacity: this.netCapacity,
      aquariums: this.aquariums,
      unlockedFishCount: this.unlockedFishCount,
      unlockedAquariums: this.unlockedAquariums,
      unlockedAlgorithms: this.unlockedAlgorithms,
      store: this.store
    };
    localStorage.setItem('gameState', JSON.stringify(state));
  }

  loadState(): void {
    const state = localStorage.getItem('gameState');
    if (state) {
      const parsed = JSON.parse(state);
      this.gold = parsed.gold || 0;
      this.net = parsed.net || [];
      this.netCapacity = parsed.netCapacity || 5;
      this.aquariums = parsed.aquariums || [[], [], [], []];
      this.unlockedFishCount = parsed.unlockedFishCount || 5;
      this.unlockedAquariums = parsed.unlockedAquariums || 1;
      this.unlockedAlgorithms = parsed.unlockedAlgorithms || ['Bubble Sort'];
      this.store = parsed.store || this.store;
    }
  }
}
