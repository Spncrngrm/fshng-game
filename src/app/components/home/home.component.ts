import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  animateSprites = false;
  spacePressed = false;
  bubbles: { left: number; delay: number }[] = [];

  ngOnInit() {
    setTimeout(() => {
      this.animateSprites = true;
    }, 500);

    this.generateBubbles();
  }

  generateBubbles() {
    for (let i = 0; i < 20; i++) {
      this.bubbles.push({
        left: Math.random() * 100,
        delay: Math.random() * 10, // Random delay between 0 and 10 seconds
      });
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
      this.spacePressed = true;
    }
  }
}
