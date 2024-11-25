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
  styleUrls: ['./view-dpgr.component.css']
})

export class ViewDpgrComponent {
  htitle: string = 'DPGR';
  hsubtitle: string = 'Gestión de Datos Estratégicos / Casa Central';

  note: string = 'Estas tarjetas se irán habilitando progresivamente a medida que se implemente el Gobierno de Datos.';

  title: string = 'Dashboard de Datos';
  subtitle: string = 'Gestión de Datos Estratégicos / Casa Central';

  buttons: ButtonData[] = [
    { icon: 'favorite', title: 'RO', description: 'Ejemplo', active: true },
    { icon: 'emoji_nature', title: 'Sello Verde', description: 'Ejemplo', active: true },
    { icon: 'people', title: 'Pueblos Originarios', description: 'Ejemplo', active: true },
    { icon: 'flag', title: 'Nacionalidad', description: 'Ejemplo', active: true },
    { icon: 'event_note', title: 'Asistencia', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'timeline', title: 'Permanencia', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'visibility_off', title: 'Inasistencia', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'domain', title: 'Establecimientos', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'attach_money', title: 'Indicador 1', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'analytics', title: 'Indicador 1', description: 'Gobierno de datos - En desarrollo', active: false }
  ];
}
