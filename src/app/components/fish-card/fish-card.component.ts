import { Component, Input } from '@angular/core';
import { Fish } from '../../models/fish.model';

@Component({
  selector: 'app-fish-card',
  templateUrl: './fish-card.component.html',
  styleUrls: ['./fish-card.component.css']
})
export class FishCardComponent {
  @Input() fish!: Fish;
}
