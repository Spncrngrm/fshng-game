import { Injectable } from '@angular/core';
import { Fish } from '../models/fish.model';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  public net: Fish[] = [];

  constructor() {
    const saved = localStorage.getItem('fshng-save');
    if (saved) {
      const parsed = JSON.parse(saved);
      this.net = parsed.net || [];
    }
  }

  getNet(): Fish[] {
    return this.net;
  }

  addToNet(fish: Fish) {
    this.net.push(fish);
    this.saveState();
  }

  removeFromNet(index: number) {
    this.net.splice(index, 1);
    this.saveState();
  }

  private saveState() {
    const state = { net: this.net };
    localStorage.setItem('fshng-save', JSON.stringify(state));
  }
}
