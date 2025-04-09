import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fish } from '../models/fish.model';

@Injectable({
  providedIn: 'root'
})
export class FishService {
  private dataUrl = 'assets/data/fish_data.json';

  constructor(private http: HttpClient) {}

  getFish(): Observable<Fish[]> {
    return this.http.get<Fish[]>(this.dataUrl);
  }
}
