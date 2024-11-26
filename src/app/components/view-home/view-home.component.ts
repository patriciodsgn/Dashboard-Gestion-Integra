import { Component } from '@angular/core';
import { ElemHeaderComponent } from '../elem-header/elem-header.component';
import { ElemCardGrid1Component } from '../elem-card-grid1/elem-card-grid1.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-home',
  standalone: true,
  imports: [
    ElemHeaderComponent,
    ElemCardGrid1Component
  ],
  templateUrl: './view-home.component.html',
  styleUrl: './view-home.component.css'
})
export class ViewHomeComponent {
  htitle: string = 'htitle';
  hsubtitle: string = 'hsubtitle';
  constructor(private router: Router) {}

  // Navegación programática
  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}





