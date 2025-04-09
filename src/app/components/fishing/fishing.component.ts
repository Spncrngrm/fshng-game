import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Bubble {
  x: number;
  y: number;
  size: number;
}

@Component({
  selector: 'app-fishing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fishing.component.html',
  styleUrls: ['./fishing.component.css']
})
export class FishingComponent {
  bubbles: Bubble[] = [];
  currentIndex = 0;
  message = '';

  startFishing() {
    this.bubbles = [];
    this.message = '';
    this.currentIndex = 0;
  
    const bubbleCount = 5;
    const initialSize = 60;
    const baseDelay = 1000; // delay before next bubble appears
    const baseLifetime = 3000; // was too short — now longer per your request
  
    for (let i = 0; i < bubbleCount; i++) {
      const size = initialSize - i * 10;
      const x = Math.random() * (window.innerWidth - size);
      const y = Math.random() * (window.innerHeight - size);
  
      // Create each bubble with delay
      setTimeout(() => {
        this.bubbles.push({ x, y, size });
  
        // Timeout for this specific bubble's disappearance
        setTimeout(() => {
          if (this.currentIndex <= i) {
            this.failCatch();
          }
        }, baseLifetime);
      }, i * baseDelay);
    }
  }
  

  clickBubble(index: number) {
    if (index === this.currentIndex) {
      this.currentIndex++;
      if (this.currentIndex === 5) {
        this.catchFish();
      }
    } else {
      this.failCatch();
    }
  }

  catchFish() {
    this.message = '🎣 You caught a fish!';
    this.bubbles = [];
    // TODO: Add random fish logic here
  }

  failCatch() {
    this.message = '❌ The fish escaped!';
    this.bubbles = [];
  }
}
