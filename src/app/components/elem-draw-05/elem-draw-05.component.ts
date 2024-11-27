import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-elem-draw-05',
  standalone: true,
  templateUrl: './elem-draw-05.component.html',
  styleUrls: ['./elem-draw-05.component.css']
})
export class ElemDraw05Component implements AfterViewInit {

  ngAfterViewInit(): void {
    this.renderPieChart();
  }

  renderPieChart(): void {
    Highcharts.chart({
      chart: {
        renderTo: 'chart-container-05', // ID del contenedor donde se renderizará el gráfico
        type: 'pie'
      },
      title: {
        text: '% de niños y niñas con Necesidad Educativa Especial Transitoria'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          },
          showInLegend: true
        }
      },
      series: [
        {
          name: 'Porcentaje',
          colorByPoint: true,
          type: 'pie' as any, // Forzar el tipo "any" para evitar problemas de tipos
          data: [
            { name: 'Categoría 1', y: 50, color: '#4682B4' }, // Azul medio
            { name: 'Categoría 2', y: 30, color: '#87CEEB' }, // Azul claro
            { name: 'Categoría 3', y: 20, color: '#B0E0E6' }  // Azul pastel
          ]
        }
      ]
    });
  }
}
