import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../services/game-state.service';
import { Fish } from '../../models/fish.model';

@Component({
  selector: 'app-aquariums',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aquariums.component.html',
  styleUrls: ['./aquariums.component.css']
})
export class AquariumsComponent {
  @Output() viewChange = new EventEmitter<'menu' | 'net' | 'aquariums'>();

  showOverlay = false;
  showSortMenu = false;
  sorting = false;

  selectedAquarium: number | null = null;
  aquariumFish: Fish[] = [];

  selectedSortAlgorithm: string = '';
  selectedSortParameter: string = '';

  algorithms = ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Champagne Sort', 'Gnome Sort'];
  parameters = [
    'pricePerKg', 'pricePerKg (desc)',
    'price', 'price (desc)',
    'length', 'length (desc)',
    'weight', 'weight (desc)',
    'name', 'name (desc)',
    'rarity', 'rarity (desc)',
    'color', 'color (desc)'
  ];

  constructor(public gameState: GameStateService) {}

  get containerClass(): string {
    return this.selectedAquarium ? 'aquariums-container aquarium-open' : 'aquariums-container';
  }

  selectAquarium(num: number) {
    this.selectedAquarium = num;
    this.aquariumFish = [...this.gameState.aquariums[num - 1]];
  }

  goBack() {
    this.selectedAquarium = null;
    this.sorting = false;
    this.showOverlay = false;
    this.showSortMenu = false;
  }

  openOverlay() {
    this.showOverlay = true;
  }

  closeOverlay() {
    this.showOverlay = false;
  }

  openSort() {
    this.showSortMenu = true;
  }

  closeSort() {
    this.showSortMenu = false;
  }

  transferToAquarium(index: number) {
    const fish = this.gameState.net[index];
    if (fish && this.selectedAquarium !== null) {
      this.gameState.net.splice(index, 1);
      this.gameState.aquariums[this.selectedAquarium - 1].push(fish);
      this.gameState.saveState();
      this.aquariumFish = [...this.gameState.aquariums[this.selectedAquarium - 1]];
    }
  }

  transferToNet(index: number) {
    if (this.selectedAquarium !== null) {
      const fish = this.gameState.aquariums[this.selectedAquarium - 1][index];
      if (fish) {
        this.gameState.aquariums[this.selectedAquarium - 1].splice(index, 1);
        this.gameState.net.push(fish);
        this.gameState.saveState();
        this.aquariumFish = [...this.gameState.aquariums[this.selectedAquarium - 1]];
      }
    }
  }

  selectAlgorithm(algorithm: string) {
    this.selectedSortAlgorithm = algorithm;
  }

  selectParameter(parameter: string) {
    this.selectedSortParameter = parameter;
  }

  getFishValue(fish: Fish, key: string): string {
    const normalizedKey = key.replace(' (desc)', '');
  
    if (normalizedKey === 'price') {
      return `$${(fish.weight * fish.pricePerKg).toFixed(2)}`;
    }
  
    if (normalizedKey === 'rarity') {
      return fish.rarity;
    }
  
    if (normalizedKey === 'color') {
      return fish.color;
    }
  
    if (normalizedKey in fish) {
      const value = (fish as any)[normalizedKey];
      return typeof value === 'number' ? value.toFixed(1) : String(value);
    }
  
    return '';
  }
  

  async performSort() {
    if (!this.selectedSortAlgorithm || !this.selectedSortParameter || this.selectedAquarium === null) return;
  
    this.sorting = true;
    this.showSortMenu = false;
  
    this.aquariumFish = [...this.gameState.aquariums[this.selectedAquarium - 1]];
  
    const param = this.selectedSortParameter.replace(' (desc)', '');
    const descending = this.selectedSortParameter.includes('(desc)');
  
    // Helper function to get sortable value from fish
    const getValue = (fish: Fish): number | string => {
      if (param === 'price') return fish.weight * fish.pricePerKg;
      if (param === 'rarity') return ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'].indexOf(fish.rarity);
      if (param === 'color') return fish.color;
      return (fish as any)[param];  // Cast only for dynamic known keys
    };
  
    this.aquariumFish.sort((a, b) => {
      const aVal = getValue(a);
      const bVal = getValue(b);
  
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return descending ? bVal - aVal : aVal - bVal;
      }
  
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return descending ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      }
  
      return 0;
    });
  
    this.gameState.aquariums[this.selectedAquarium - 1] = [...this.aquariumFish];
    this.sorting = false;
  }
  
}
