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

      setTimeout(() => {
        if (!this.fishingInProgress) return;
        this.bubbles.push({ x, y, size, clicked: false });

        setTimeout(() => {
          if (this.currentIndex <= i && this.fishingInProgress) {
            this.failCatch();
          }
        }, baseLifetime);
      }, i * baseDelay);
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
    const roll = Math.floor(Math.random() * 10001);

    const rarityTable = [
      { index: 0, min: 0, max: 3999 },
      { index: 1, min: 4000, max: 4999 },
      { index: 2, min: 5000, max: 8999 },
      { index: 3, min: 9000, max: 9999 },
      { index: 4, min: 10000, max: 10000 }
    ];

    const matched = rarityTable.find(r => roll >= r.min && roll <= r.max);
    if (matched && this.allFish[matched.index]) {
      const fish = this.allFish[matched.index];
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
