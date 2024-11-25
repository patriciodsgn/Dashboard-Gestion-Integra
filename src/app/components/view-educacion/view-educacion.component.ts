import { Component } from '@angular/core';
import { ElemHeaderComponent } from '../elem-header/elem-header.component';
import { ElemNote1Component } from '../elem-note1/elem-note1.component';
import { ElemBar1Component } from '../elem-bar1/elem-bar1.component';
import { ElemButtonGridComponent } from '../elem-button-grid/elem-button-grid.component';

interface ButtonData {
  icon: string;
  title: string;
  description: string;
  active: boolean;
}

@Component({
  selector: 'app-view-educacion',
  standalone: true,
  imports: [
    ElemHeaderComponent,
    ElemNote1Component,
    ElemBar1Component,
    ElemButtonGridComponent
  ],
  templateUrl: './view-educacion.component.html',
  styleUrl: './view-educacion.component.css'
})

export class ViewEducacionComponent {
  htitle: string = 'Educación: Dashboard de Datos';
  hsubtitle: string = 'Gestión Estratégica de Datos / Casa Central';
  hbgcolor: string = '#4CAF50'; // Color verde (coherente con el diseño de ejemplo)
  htxtcolor: string = '#FFFFFF'; // Texto blanco para contraste

  note: string = 'Estas tarjetas se irán habilitando progresivamente a medida que se implemente el Gobierno de Datos.';

  title: string = 'Dashboard de Educación';
  subtitle: string = 'Datos Estratégicos / Dirección Central';

  buttons: ButtonData[] = [
    { icon: 'school', title: 'NEE', description: 'Ejemplo', active: true },
    { icon: 'person', title: 'ATET', description: 'Ejemplo', active: true },
    { icon: 'family_restroom', title: 'Familias', description: 'Data disponible 2025', active: false },
    { icon: 'analytics', title: 'Indicador 1', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'analytics', title: 'Indicador 2', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'business', title: 'Indicador 3', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'insights', title: 'Indicador 4', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'bar_chart', title: 'Indicador 5', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'insert_chart', title: 'Indicador 6', description: 'Gobierno de datos - En desarrollo', active: false }
  ];
}
