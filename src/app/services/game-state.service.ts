import { Injectable } from '@angular/core';
import { Fish } from '../models/fish.model';

interface Tank {
  name: string;
  fish: Fish[];
}

interface StoreItem {
  id: string;
  name: string;
  purchased: boolean;
}

interface GameState {
  gold: number;
  net: Fish[];
  tanks: Tank[];
  storeItems: StoreItem[];
}

const STORAGE_KEY = 'fshng-game-state';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private state: GameState = {
    gold: 0,
    net: [],
    tanks: [
      { name: 'Tank 1', fish: [] }
    ],
    storeItems: [
      { id: 'extraTank', name: 'Extra Tank', purchased: false },
      { id: 'goldRod', name: 'Gold Rod', purchased: false }
    ]
  };

  constructor() {
    this.loadState();
  }

  getState(): GameState {
    return this.state;
  }

  addFishToNet(fish: Fish) {
    this.state.net.push(fish);
    this.saveState();
  }

  moveFishToTank(tankName: string, fish: Fish) {
    const tank = this.state.tanks.find(t => t.name === tankName);
    if (tank) {
      tank.fish.push(fish);
      this.state.net = this.state.net.filter(f => f !== fish);
      this.saveState();
    }
  }

  setGold(amount: number) {
    this.state.gold = amount;
    this.saveState();
  }

  buyItem(itemId: string) {
    const item = this.state.storeItems.find(i => i.id === itemId);
    if (item) {
      item.purchased = true;
      this.saveState();
    }
  }

  private saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  }

  private loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      this.state = JSON.parse(saved);
    }
  }

  resetGame() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }
}
