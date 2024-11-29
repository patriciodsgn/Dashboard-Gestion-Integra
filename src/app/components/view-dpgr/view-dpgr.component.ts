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
  selector: 'app-view-dpgr',
  standalone: true,
  imports: [
    ElemHeaderComponent,
    ElemNote1Component,
    ElemBar1Component,
    ElemButtonGridComponent
  ],
  templateUrl: './view-dpgr.component.html',
  styleUrl: './view-dpgr.component.css'
})

export class ViewDpgrComponent {

  title: string = 'Dashboard DPGR';
  subtitle: string = 'Datos Estratégicos / Dirección Central';
  headerBgColor: string = '#67e8f9';
  headerTextColor: string = '#27272a';

  htitle: string = 'Dashboard de Datos';
  hsubtitle: string = 'Gestión de Datos Estratégicos / Casa Central';
  
  
  buttons: ButtonData[] = [
    { icon: 'favorite', title: 'Educación Primaria', description: 'Descripción detallada.', active: true },
    { icon: 'favorite', title: 'Educación Secundaria', description: 'Descripción detallada.', active: true },
    { icon: 'person', title: 'ATET', description: 'Ejemplo', active: false },
    { icon: 'person', title: 'ATET', description: "Ejemplo", active: false },
    { icon: 'person', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'business', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'school', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'attach_money', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'attach_money', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'attach_money', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'attach_money', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'attach_money', title: 'Indicador 1', description: "Ejemplo", active: false }
  ];
}
