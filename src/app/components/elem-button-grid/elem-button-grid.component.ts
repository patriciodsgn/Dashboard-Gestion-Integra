import { Component, Input } from '@angular/core';
import { ElemButtonComponent } from '../elem-button/elem-button.component';
import { CommonModule } from '@angular/common';

interface ButtonData {
  icon: string;
  title: string;
  description: string;
  active: boolean;
}

@Component({
  selector: 'app-elem-button-grid',
  standalone: true,
  imports: [ElemButtonComponent, CommonModule],
  templateUrl: './elem-button-grid.component.html',
  styleUrls: ['./elem-button-grid.component.css'] // Corregido 'styleUrls'
})

export class ElemButtonGridComponent {
  @Input() button_data: ButtonData[] = [];
}
