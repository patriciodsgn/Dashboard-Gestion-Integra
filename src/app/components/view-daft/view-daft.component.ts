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
  selector: 'app-view-daft',
  standalone: true,
  imports: [
    ElemHeaderComponent,
    ElemNote1Component,
    ElemBar1Component,
    ElemButtonGridComponent
  ],
  templateUrl: './view-daft.component.html',
  styleUrls: ['./view-daft.component.css']
})
export class ViewDaftComponent {
  htitle: string = 'DAFT';
  hsubtitle: string = 'Gestión de Datos Estratégicos / Casa Central';

  note: string = 'Estas tarjetas se irán habilitando progresivamente a medida que se implemente el Gobierno de Datos.';

  title: string = 'Dashboard de Datos';
  subtitle: string = 'Gestión de Datos Estratégicos / Casa Central';

  buttons: ButtonData[] = [
    { icon: 'assessment', title: 'Ejecución Presupuestaria', description: 'Presupuesto Total', active: true },
    { icon: 'attach_money', title: 'Rendición y Costos CMM', description: 'Ejemplo', active: true },
    { icon: 'people', title: 'Total Anticipos', description: 'Fondos Adelantados', active: true },
    { icon: 'report_problem', title: 'Presupuestos Negativos', description: 'Informes', active: true },
    { icon: 'account_balance', title: 'Presupuesto Comprometido', description: 'Fondos Reservados', active: false },
    { icon: 'bar_chart', title: 'Porcentaje de Ejecución', description: 'Progreso Financiero', active: false },
    { icon: 'money_off', title: 'Gastos por Fondo', description: 'Detalles Ejecución', active: false },
    { icon: 'pie_chart', title: 'Total Reasignado', description: 'Presupuesto Ajustado', active: false },
    { icon: 'attach_money', title: 'Gastos Ejecutados', description: 'Dinero Gastado', active: false },
    { icon: 'corporate_fare', title: 'Gastos por Centro de Costo', description: 'Desglose Ejecución', active: false },
    { icon: 'hourglass_empty', title: 'Saldo por Ejecutar', description: 'Presupuesto Restante', active: false }
  ];
}
