import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RegionData } from '../models/region-data.model';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private regionSource = new BehaviorSubject<RegionData | null>(null);
  currentRegion = this.regionSource.asObservable();

  updateRegion(region: RegionData) {
    this.regionSource.next(region);
  }
}
