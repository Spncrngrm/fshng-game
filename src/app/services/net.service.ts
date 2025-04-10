import { Injectable } from '@angular/core';
import { Fish } from '../models/fish.model';

@Injectable({
  providedIn: 'root'
})
export class NetService {
  private net: Fish[] = [];

  constructor() {
    const saved = localStorage.getItem('player_net');
    this.net = saved ? JSON.parse(saved) : [];
  }

  addFish(fish: Fish) {
    this.net.push(fish);
    this.save();
  }

  getNet(): Fish[] {
    return this.net;
  }

  removeFish(index: number) {
    if (index >= 0 && index < this.net.length) {
      this.net.splice(index, 1);
      this.save();
    }
  }

  clearNet() {
    this.net = [];
    this.save();
  }

  private save() {
    localStorage.setItem('player_net', JSON.stringify(this.net));
  }
}
