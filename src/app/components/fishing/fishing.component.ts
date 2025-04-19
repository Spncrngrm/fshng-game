import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FishService } from '../../services/fish.service';
import { GameStateService } from '../../services/game-state.service';
import { Fish } from '../../models/fish.model';

interface Bubble {
  x: number;
  y: number;
  size: number;
  clicked: boolean;
}

@Component({
  selector: 'app-fishing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fishing.component.html',
  styleUrls: ['./fishing.component.css']
})
export class FishingComponent {
  @Output() viewChange = new EventEmitter<'home' | 'menu' | 'cards' | 'fishing' | 'net'>();

  bubbles: Bubble[] = [];
  currentIndex = 0;
  message = '';
  allFish: Fish[] = [];
  caughtFishImage: string | null = null;
  fishingInProgress = false;
  private bubbleTimers: any[] = []; // NEW: To keep track of timeouts

  constructor(private fishService: FishService, public gameState: GameStateService) {
    this.fishService.getFish().subscribe((fish) => {
      this.allFish = fish;
    });
  }

  startFishing() {
    if (this.fishingInProgress || this.gameState.isNetFull()) {
      this.message = 'Your net is full! Sell some fish first.';
      return;
    }

    // Clear previous timers
    this.bubbleTimers.forEach(clearTimeout);
    this.bubbleTimers = [];

    this.fishingInProgress = true;
    this.bubbles = [];
    this.message = '';
    this.caughtFishImage = null;
    this.currentIndex = 0;

    const bubbleCount = 5;
    const initialSize = 60;
    const baseDelay = 800;
    const baseLifetime = 3000;

    for (let i = 0; i < bubbleCount; i++) {
      const size = initialSize - i * 10;
      const x = Math.random() * (window.innerWidth - size);
      const y = Math.random() * (window.innerHeight - size);

      const spawnTimeout = setTimeout(() => {
        if (!this.fishingInProgress) return;
        this.bubbles.push({ x, y, size, clicked: false });

        const lifetimeTimeout = setTimeout(() => {
          if (this.currentIndex <= i && this.fishingInProgress) {
            this.failCatch();
          }
        }, baseLifetime);
        this.bubbleTimers.push(lifetimeTimeout);

      }, i * baseDelay);

      this.bubbleTimers.push(spawnTimeout);
    }
  }

  clickBubble(index: number) {
    if (index === this.currentIndex && !this.bubbles[index].clicked) {
      this.bubbles[index].clicked = true;
      this.currentIndex++;
      if (this.currentIndex === 5) {
        this.catchFish();
      }
    } else {
      this.failCatch();
    }
  }

  catchFish() {
    const unlocked = this.gameState.unlockedFishCount;
    const pool = this.allFish.slice(0, unlocked);
  
    const rarityGroups: { [key in 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary']: Fish[] } = {
      Common: [],
      Uncommon: [],
      Rare: [],
      Epic: [],
      Legendary: []
    };
  
    for (const fish of pool) {
      rarityGroups[fish.rarity].push(fish);
    }
  
    const roll = Math.floor(Math.random() * 10001);
  
    let intendedRarity: keyof typeof rarityGroups;
    if (roll <= 3999) intendedRarity = 'Common';
    else if (roll <= 4999) intendedRarity = 'Uncommon';
    else if (roll <= 8999) intendedRarity = 'Rare';
    else if (roll <= 9999) intendedRarity = 'Epic';
    else intendedRarity = 'Legendary';
  
    const rarityPriority: (keyof typeof rarityGroups)[] = ['Legendary', 'Epic', 'Rare', 'Uncommon', 'Common'];
  
    let selectedFish: Fish | null = null;
    let rarityIndex = rarityPriority.indexOf(intendedRarity);
  
    while (rarityIndex >= 0) {
      const candidates = rarityGroups[rarityPriority[rarityIndex]];
      if (candidates.length > 0) {
        selectedFish = candidates[Math.floor(Math.random() * candidates.length)];
        break;
      }
      rarityIndex--; // Try the next lower rarity
    }
  
    this.bubbleTimers.forEach(clearTimeout);
    this.bubbleTimers = [];
  
    if (selectedFish) {
      const length = this.randomInRange(selectedFish.lengthMin, selectedFish.lengthMax);
      const weight = this.randomInRange(selectedFish.weightMin, selectedFish.weightMax);
  
      const caughtFish: Fish = {
        ...selectedFish,
        length,
        weight
      };
  
      this.message = `You caught a ${caughtFish.name}! (${weight.toFixed(1)} kg, ${length.toFixed(1)} cm)`;
      this.caughtFishImage = caughtFish.image ?? null;
      this.bubbles = [];
      this.fishingInProgress = false;
  
      this.gameState.addToNet(caughtFish);
    } else {
      this.message = 'Nothing caught!';
      this.caughtFishImage = null;
      this.bubbles = [];
      this.fishingInProgress = false;
    }
  }
  

  failCatch() {
    // Clear all timers immediately
    this.bubbleTimers.forEach(clearTimeout);
    this.bubbleTimers = [];

    this.message = 'The fish escaped!';
    this.caughtFishImage = null;
    this.bubbles = [];
    this.fishingInProgress = false;
  }

  goBackToMenu() {
    this.viewChange.emit('menu');
  }

  randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
