import { Component } from '@angular/core';
import { ElemHeaderComponent } from '../elem-header/elem-header.component';
import { ElemNote1Component } from '../elem-note1/elem-note1.component';
import { ElemBar1Component } from '../elem-bar1/elem-bar1.component';
import { ElemButtonGridComponent } from '../elem-button-grid/elem-button-grid.component';

import { ElemDraw01Component } from '../elem-draw-01/elem-draw-01.component';
import { ElemDraw02Component } from '../elem-draw-02/elem-draw-02.component';
import { ElemDraw03Component } from '../elem-draw-03/elem-draw-03.component';
import { ElemDraw04Component } from '../elem-draw-04/elem-draw-04.component';
import { ElemDraw05Component } from '../elem-draw-05/elem-draw-05.component';

interface ButtonData {
  eb_icon : string;
  eb_title : string;
  eb_subtitle : string;
  eb_disable: boolean;
  eb_bg_color : string;
  eb_text_color : string;
  eb_link : string;
}

@Component({
  selector: 'app-view-educacion',
  standalone: true,
  imports: [
    ElemHeaderComponent,
    ElemNote1Component,
    ElemBar1Component,
    ElemButtonGridComponent,
    ElemDraw01Component,
    ElemDraw02Component,
    ElemDraw03Component,
    ElemDraw04Component,
    ElemDraw05Component
  ],
  templateUrl: './view-educacion.component.html',
  styleUrl: './view-educacion.component.css'
})

export class ViewEducacionComponent {

  title: string = 'Dashboard de Educación';
  subtitle: string = 'Datos Estratégicos / Dirección Central';

  buttons: ButtonData[] = [
    { eb_icon: 'school', eb_title: 'NEE', eb_subtitle: 'Ejemplo', eb_disable: true , eb_bg_color: '#2dd4bf', eb_text_color: '#042f2e', eb_link: '/login'},
    { eb_icon: 'person', eb_title: 'ATET', eb_subtitle: 'Ejemplo', eb_disable: true , eb_bg_color: '#2dd4bf', eb_text_color: '#042f2e', eb_link: '/'},
    { eb_icon: 'family_restroom', eb_title: 'Familias', eb_subtitle: 'Data disponible 2025', eb_disable: false , eb_bg_color: '#2dd4bf', eb_text_color: '#042f2e', eb_link: '/'},
    { eb_icon: 'analytics', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#2dd4bf', eb_text_color: '#042f2e', eb_link: '/'},
    { eb_icon: 'analytics', eb_title: 'Indicador 2', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#2dd4bf', eb_text_color: '#042f2e', eb_link: '/'},
    { eb_icon: 'business', eb_title: 'Indicador 3', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#2dd4bf', eb_text_color: '#042f2e', eb_link: '/'},
    { eb_icon: 'insights', eb_title: 'Indicador 4', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#2dd4bf', eb_text_color: '#042f2e', eb_link: '/'},
    { eb_icon: 'bar_chart', eb_title: 'Indicador 5', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false , eb_bg_color: '#2dd4bf', eb_text_color: '#042f2e', eb_link: '/'},
    { eb_icon: 'insert_chart', eb_title: 'Indicador 6', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false, eb_bg_color: '#2dd4bf', eb_text_color: '#042f2e', eb_link: '/' }
  ];
}
