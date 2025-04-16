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
  isDescending: boolean = false;

  highlightIndex: number[] = [];
  invisibleIndexes: number[] = [];

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
    if (num > this.gameState.unlockedAquariums) return;
    this.selectedAquarium = num;
    this.aquariumFish = [...this.gameState.aquariums[num - 1]];
  }

  isAlgorithmUnlocked(algo: string): boolean {
    return this.gameState.unlockedAlgorithms.includes(algo);
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

  selectAlgorithm(algorithm: string) {
    if (!this.isAlgorithmUnlocked(algorithm)) return;
    this.selectedSortAlgorithm = algorithm;
  }

  selectParameter(parameter: string) {
    this.selectedSortParameter = parameter;
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getComparable = (fish: Fish): number | string => '';

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

  getTooltipExtra(fish: Fish): string | null {
    const key = this.selectedSortParameter?.replace(' (desc)', '');
    if (!key || key === 'name' || key === 'weight') return null;

    const value = this.getFishValue(fish, this.selectedSortParameter);
    const label = key === 'price' ? 'Total Price' :
                  key === 'pricePerKg' ? 'Price/kg' :
                  key.charAt(0).toUpperCase() + key.slice(1);

    return `${label}: ${value}`;
  }

  private async highlight(i: number): Promise<void> {
    await this.wait(100);
    this.highlightIndex = [i];
    await this.wait(1500);
    this.highlightIndex = [];
    await this.wait(100);
  }

  private async animateSwap(i: number, j: number): Promise<void> {
    this.invisibleIndexes = [i, j];
    this.highlightIndex = [i, j];
    await this.wait(1500);
    [this.aquariumFish[i], this.aquariumFish[j]] = [this.aquariumFish[j], this.aquariumFish[i]];
    await this.wait(1500);
    this.invisibleIndexes = [];
    this.highlightIndex = [];
    await this.wait(1500);
  }

  private async animateInsertion(from: number, to: number): Promise<void> {
    const fish = this.aquariumFish[from];
    this.invisibleIndexes = [from];
    this.highlightIndex = [from];
    await this.wait(1500);

    if (from > to) {
      for (let i = from; i > to; i--) {
        this.aquariumFish[i] = this.aquariumFish[i - 1];
      }
    } else {
      for (let i = from; i < to; i++) {
        this.aquariumFish[i] = this.aquariumFish[i + 1];
      }
    }

    this.highlightIndex = Array.from({ length: Math.abs(from - to) }, (_, i) => i + Math.min(from, to));
    await this.wait(1500);

    this.aquariumFish[to] = fish;
    this.invisibleIndexes = [];
    this.highlightIndex = [];
    await this.wait(1500);
  }

  private async bubbleSort() {
    for (let i = 0; i < this.aquariumFish.length - 1; i++) {
      for (let j = 0; j < this.aquariumFish.length - i - 1; j++) {
        await this.highlight(j);
        await this.wait(1500);
        const a = this.getComparable(this.aquariumFish[j]);
        const b = this.getComparable(this.aquariumFish[j + 1]);
        if ((this.isDescending && a < b) || (!this.isDescending && a > b)) {
          await this.animateSwap(j, j + 1);
        }
      }
    }
  }

  private async insertionSort() {
    for (let i = 1; i < this.aquariumFish.length; i++) {
      let j = i;
      const current = this.getComparable(this.aquariumFish[i]);
      while (
        j > 0 &&
        ((this.isDescending && this.getComparable(this.aquariumFish[j - 1]) < current) ||
          (!this.isDescending && this.getComparable(this.aquariumFish[j - 1]) > current))
      ) {
        j--;
      }
      if (j !== i) {
        await this.animateInsertion(i, j);
      }
    }
  }

  private async selectionSort() {
    for (let i = 0; i < this.aquariumFish.length - 1; i++) {
      let selectedIndex = i;
      for (let j = i + 1; j < this.aquariumFish.length; j++) {
        await this.highlight(j);
        await this.wait(1500);
        const a = this.getComparable(this.aquariumFish[j]);
        const b = this.getComparable(this.aquariumFish[selectedIndex]);
        if ((this.isDescending && a > b) || (!this.isDescending && a < b)) {
          selectedIndex = j;
        }
      }
      if (selectedIndex !== i) {
        await this.animateInsertion(selectedIndex, i);
      }
    }
  }

  private async champagneSort() {
    let start = 0;
    let end = this.aquariumFish.length - 1;
    let swapped = true;

    while (swapped) {
      swapped = false;

      for (let i = start; i < end; i++) {
        await this.highlight(i);
        await this.wait(1500);
        const a = this.getComparable(this.aquariumFish[i]);
        const b = this.getComparable(this.aquariumFish[i + 1]);
        if ((this.isDescending && a < b) || (!this.isDescending && a > b)) {
          await this.animateSwap(i, i + 1);
          swapped = true;
        }
      }
      end--;

      if (!swapped) break;
      swapped = false;

      for (let i = end; i > start; i--) {
        await this.highlight(i);
        await this.wait(1500);
        const a = this.getComparable(this.aquariumFish[i]);
        const b = this.getComparable(this.aquariumFish[i - 1]);
        if ((this.isDescending && a > b) || (!this.isDescending && a < b)) {
          await this.animateSwap(i, i - 1);
          swapped = true;
        }
      }
      start++;
    }
  }

  private async gnomeSort() {
    let i = 1;
    while (i < this.aquariumFish.length) {
      await this.highlight(i);
      await this.wait(1500);
      const a = this.getComparable(this.aquariumFish[i]);
      const b = this.getComparable(this.aquariumFish[i - 1]);

      if ((this.isDescending && a > b) || (!this.isDescending && a < b)) {
        await this.animateSwap(i, i - 1);
        i = Math.max(i - 1, 1);
      } else {
        i++;
      }
    }
  }

  async performSort() {
    if (!this.selectedSortAlgorithm || !this.selectedSortParameter || this.selectedAquarium === null) return;

    this.sorting = true;
    this.showSortMenu = false;
    this.aquariumFish = [...this.gameState.aquariums[this.selectedAquarium - 1]];

    const param = this.selectedSortParameter.replace(' (desc)', '');
    this.isDescending = this.selectedSortParameter.includes('(desc)');

    this.getComparable = (fish: Fish) => {
      if (param === 'price') return fish.weight * fish.pricePerKg;
      if (param === 'rarity') return ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'].indexOf(fish.rarity);
      if (param === 'color') return fish.color;
      return (fish as any)[param];
    };

    switch (this.selectedSortAlgorithm) {
      case 'Bubble Sort': await this.bubbleSort(); break;
      case 'Insertion Sort': await this.insertionSort(); break;
      case 'Selection Sort': await this.selectionSort(); break;
      case 'Champagne Sort': await this.champagneSort(); break;
      case 'Gnome Sort': await this.gnomeSort(); break;
    }

    this.gameState.aquariums[this.selectedAquarium - 1] = [...this.aquariumFish];
    this.sorting = false;
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
}
