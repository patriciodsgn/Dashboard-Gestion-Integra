import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonStateService } from '../../button-state.service';

import { ElemHeaderComponent } from '../elem-header/elem-header.component';
import { ElemButtonGridComponent } from '../elem-button-grid/elem-button-grid.component';

interface ButtonData {
  eb_icon: string;
  eb_title: string;
  eb_subtitle: string;
  eb_disable: boolean;
  eb_bg_color: string;
  eb_text_color: string;
  eb_link: string;
}

@Component({
  selector: 'app-view-educacion',
  standalone: true,
  imports: [
    RouterModule,
    ElemHeaderComponent,
    ElemButtonGridComponent,
  ],
  templateUrl: './view-educacion.component.html',
  styleUrls: ['./view-educacion.component.css'],
})

export class ViewEducacionComponent {

  public buttonStateService = inject(ButtonStateService);

  title: string = 'Dashboard de Educación';
  subtitle: string = 'Datos Estratégicos / Dirección Central';

  buttons: ButtonData[] = [
    { eb_icon: 'school', eb_title: 'NEE', eb_subtitle: 'Ejemplo', eb_disable: true , eb_bg_color: '#73e9da', eb_text_color: '#135554', eb_link: '/educacion/nee'},
    { eb_icon: 'person', eb_title: 'ATET', eb_subtitle: 'Ejemplo', eb_disable: true , eb_bg_color: '#73e9da', eb_text_color: '#135554', eb_link: '/educacion/atet'},
    { eb_icon: 'family_restroom', eb_title: 'Familias', eb_subtitle: 'Data disponible 2025', eb_disable: false , eb_bg_color: '#73e9da', eb_text_color: '#135554', eb_link: '/'},
    { eb_icon: 'analytics', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#73e9da', eb_text_color: '#135554', eb_link: '/'},
    { eb_icon: 'analytics', eb_title: 'Indicador 2', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#73e9da', eb_text_color: '#135554', eb_link: '/'},
    { eb_icon: 'business', eb_title: 'Indicador 3', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#73e9da', eb_text_color: '#135554', eb_link: '/'},
    { eb_icon: 'insights', eb_title: 'Indicador 4', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#73e9da', eb_text_color: '#135554', eb_link: '/'},
    { eb_icon: 'bar_chart', eb_title: 'Indicador 5', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#73e9da', eb_text_color: '#135554', eb_link: '/'},
    { eb_icon: 'insert_chart', eb_title: 'Indicador 6', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false, eb_bg_color: '#73e9da', eb_text_color: '#135554', eb_link: '/' }
  ];

  // Devuelve el índice del botón activo
  get activeButtonIndex(): number | null {
    return this.buttonStateService.activeButton();
  }

  // Cambia el botón activo
  selectButton(index: number): void {
    this.buttonStateService.setActiveButton(index);
  }
}
