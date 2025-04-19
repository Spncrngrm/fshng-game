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

    let selectedRarity: keyof typeof rarityGroups;
    if (roll <= 3999) selectedRarity = 'Common';
    else if (roll <= 4999) selectedRarity = 'Uncommon';
    else if (roll <= 8999) selectedRarity = 'Rare';
    else if (roll <= 9999) selectedRarity = 'Epic';
    else selectedRarity = 'Legendary';

    const availableFish = rarityGroups[selectedRarity];

    // Always clear timers no matter what
    this.bubbleTimers.forEach(clearTimeout);
    this.bubbleTimers = [];

    if (availableFish.length > 0) {
      const fish = availableFish[Math.floor(Math.random() * availableFish.length)];
      const length = this.randomInRange(fish.lengthMin, fish.lengthMax);
      const weight = this.randomInRange(fish.weightMin, fish.weightMax);

      const caughtFish: Fish = {
        ...fish,
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
