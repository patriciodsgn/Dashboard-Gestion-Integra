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
  selector: 'app-view-personas',
  standalone: true,
  imports: [
    ElemHeaderComponent,
    ElemNote1Component,
    ElemBar1Component,
    ElemButtonGridComponent
  ],
  templateUrl: './view-personas.component.html',
  styleUrls: ['./view-personas.component.css']
})
export class ViewPersonasComponent {

  htitle: string = 'Dirección de Personas';
  hsubtitle: string = 'Gestión de Datos Estratégicos / Casa Central';

  note: string = 'Estas tarjetas se irán habilitando progresivamente a medida que se implemente el Gobierno de Datos.';

  title: string = 'Dashboard de Datos';
  subtitle: string = 'Gestión de Datos Estratégicos / Casa Central';

  buttons: ButtonData[] = [
    { icon: 'sync_alt', title: 'Rotación, Permanencia, Ausentismo', description: 'Ejemplo', active: true },
    { icon: 'person_outline', title: 'Indicador', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'people_alt', title: 'Indicador', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'engineering', title: 'Planta Contratada', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'work_off', title: 'Vacancia de la planta', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'calendar_today', title: 'Días LM (Planta)', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'assessment', title: 'Cantidad LM (Planta)', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'account_balance_wallet', title: 'Días LM por trabajador de planta', description: 'Gobierno de datos - En desarrollo', active: false },
    { icon: 'medical_services', title: 'Días LM por Licencia (Planta)', description: 'Gobierno de datos - En desarrollo', active: false }
  ];
}
