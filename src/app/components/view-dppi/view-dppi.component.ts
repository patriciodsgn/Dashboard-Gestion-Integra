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
  selector: 'app-view-dppi',
  standalone: true,
  imports: [
    ElemHeaderComponent,
    ElemNote1Component,
    ElemBar1Component,
    ElemButtonGridComponent
  ],
  templateUrl: './view-dppi.component.html',
  styleUrls: ['./view-dppi.component.css']
})

export class ViewDppiComponent {
  htitle: string = 'DPPI';
  hsubtitle: string = 'Gestión de Datos Estratégicos / Casa Central';

  note: string = 'Estas tarjetas se irán habilitando progresivamente a medida que se implemente el Gobierno de Datos.';

  title: string = 'Dashboard de Datos';
  subtitle: string = 'Gobierno de Datos Estratégicos / Casa Central';

  buttons: ButtonData[] = [
    { icon: 'favorite', title: 'Accidentes', description: 'Datos disponibles', active: true },
    { icon: 'people', title: 'Situación Nutricional', description: 'Datos disponibles', active: true },
    { icon: 'analytics', title: 'Indicador 1', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'bar_chart', title: 'Indicador 2', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'insert_chart', title: 'Indicador 3', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'business', title: 'Indicador 4', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'assessment', title: 'Indicador 5', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'trending_up', title: 'Indicador 6', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'pie_chart', title: 'Indicador 7', description: 'Gobierno de datos - En desarrollo', active: false }
  ];
}
