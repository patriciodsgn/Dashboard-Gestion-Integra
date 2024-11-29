import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elem-button',
  templateUrl: './elem-button.component.html',
  styleUrls: ['./elem-button.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ElemButtonComponent {
  @Input() eb_icon: string = 'favorite';
  @Input() eb_title: string = 'Titulo Botón';
  @Input() eb_subtitle: string = 'Subtitulo';
  @Input() eb_disable: boolean = true;
  @Input() eb_bg_color: string = '#218F9C';
  @Input() eb_text_color: string = '#c7d197';
  @Input() eb_link: string = '/';
  @Output() buttonClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  navigateTo(): void {
    if (this.eb_disable) {
      console.log('Navegación deshabilitada. El botón no está activo.');
      return;
    }
    
    console.log('Botón clickeado');
    this.buttonClick.emit();
    
    if (this.eb_link && this.eb_link !== '/') {
      console.log('Navegando a:', this.eb_link);
      this.router.navigate([this.eb_link]);
    }
  }
}