import { Injectable } from '@angular/core';
import { Fish } from '../models/fish.model';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  public net: Fish[] = [];
  public gold = 0;
  public aquariums: Fish[][] = [[], [], [], []]; // Four aquariums with empty lists
  public netCapacity = 5;
  public aquariumCapacity = 20;

  constructor() {
    const saved = localStorage.getItem('fshng-save');
    if (saved) {
      const parsed = JSON.parse(saved);
      this.net = parsed.net || [];
      this.gold = parsed.gold || 0;
      this.aquariums = parsed.aquariums || [[], [], [], []];
    }
  }

  getNet(): Fish[] {
    return this.net;
  }

  addToNet(fish: Fish) {
    if (this.net.length < this.netCapacity) {
      this.net.push(fish);
      this.saveState();
    }
  }

  removeFromNet(index: number) {
    this.net.splice(index, 1);
    this.saveState();
  }

  isNetFull(): boolean {
    return this.net.length >= this.netCapacity;
  }

  getGold(): number {
    return this.gold;
  }

  sellFish(index: number) {
    const fish = this.net[index];
    const earned = fish.weight * fish.pricePerKg;
    this.gold += Number(earned.toFixed(2));
    this.removeFromNet(index);
  }

  addFishToAquarium(aquariumIndex: number, fish: Fish) {
    if (
      aquariumIndex >= 0 &&
      aquariumIndex < this.aquariums.length &&
      this.aquariums[aquariumIndex].length < this.aquariumCapacity
    ) {
      this.aquariums[aquariumIndex].push(fish);
      this.saveState();
    }
  }

  removeFishFromAquarium(aquariumIndex: number, fishIndex: number) {
    if (
      aquariumIndex >= 0 &&
      aquariumIndex < this.aquariums.length &&
      fishIndex >= 0 &&
      fishIndex < this.aquariums[aquariumIndex].length
    ) {
      this.aquariums[aquariumIndex].splice(fishIndex, 1);
      this.saveState();
    }
  }

  saveState() {
    const state = {
      net: this.net,
      gold: this.gold,
      aquariums: this.aquariums,
    };
    localStorage.setItem('fshng-save', JSON.stringify(state));
  }
}
