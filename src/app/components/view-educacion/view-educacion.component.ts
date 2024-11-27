import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonStateService } from '../../button-state.service';

import { ElemHeaderComponent } from '../elem-header/elem-header.component';
import { ElemButtonGridComponent } from '../elem-button-grid/elem-button-grid.component';
import { ElemCardGrid1Component } from '../elem-card-grid1/elem-card-grid1.component';

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
    ElemCardGrid1Component,
  ],
  templateUrl: './view-educacion.component.html',
  styleUrls: ['./view-educacion.component.css'],
})

export class ViewEducacionComponent {
  public buttonStateService = inject(ButtonStateService);

  title: string = 'Dashboard de Educación';
  subtitle: string = 'Datos Estratégicos / Dirección Central';

  // Colores del header
  headerBgColor: string = '#fdba74'; // Color de fondo del header
  headerTextColor: string = '#ffffff'; // Color del texto del header

  // Colores para app-elem-card-grid1
  cardGridBgColor: string = '#fdba74'; // Color de fondo del grid
  cardBgColor: string = '#ffffff'; // Color de fondo de las tarjetas
  cardTextColor1: string = '#431407'; // Primer color de texto en las tarjetas
  cardTextColor2: string = '#431407'; // Segundo color de texto en las tarjetas

  // Valores y etiquetas para app-elem-card-grid1
  cardValue1: string = '1.200';
  cardLabel1: string = 'Jardines';

  cardValue2: string = '80.000';
  cardLabel2: string = 'Matrícula Nacional';

  cardValue3: string = '10.000';
  cardLabel3: string = '# de niñas y niños pertenecientes a pueblos originarios';

  cardValue4: string = '5.297';
  cardLabel4: string = '# de niñas y niños con nacionalidad extranjera';

  cardValue5: string = '500';
  cardLabel5: string = 'Establecimientos con Reconocimiento Oficial';

  cardValue6: string = '400';
  cardLabel6: string = 'Establecimientos con Sellos Verdes';

  buttons: ButtonData[] = [
    { eb_icon: 'school', eb_title: 'NEE', eb_subtitle: 'Ejemplo', eb_disable: true , eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/educacion/nee'},
    { eb_icon: 'person', eb_title: 'ATET', eb_subtitle: 'Ejemplo', eb_disable: true , eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/educacion/atet'},
    { eb_icon: 'family_restroom', eb_title: 'Familias', eb_subtitle: 'Data disponible 2025', eb_disable: false , eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/'},
    { eb_icon: 'analytics', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/'},
    { eb_icon: 'analytics', eb_title: 'Indicador 2', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/'},
    { eb_icon: 'business', eb_title: 'Indicador 3', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/'},
    { eb_icon: 'insights', eb_title: 'Indicador 4', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/'},
    { eb_icon: 'bar_chart', eb_title: 'Indicador 5', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/'},
    { eb_icon: 'insert_chart', eb_title: 'Indicador 6', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/' }
  ];

  get activeButtonIndex(): number | null {
    return this.buttonStateService.activeButton();
  }

  selectButton(index: number): void {
    this.buttonStateService.setActiveButton(index);
  }
}

