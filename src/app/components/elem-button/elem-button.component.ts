import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-elem-button',
  templateUrl: './elem-button.component.html',
  styleUrls: ['./elem-button.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ElemButtonComponent {
  @Input() icon: string = 'favorite';
  @Input() title: string = 'NEE';
  @Input() description: string = 'Ejemplo';
  @Input() active: boolean = true;
  @Input() link: string = '#';
}
