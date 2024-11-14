import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsExporting from 'highcharts/modules/exporting';

// Inicializar módulos
Highcharts3D(Highcharts);
HighchartsExporting(Highcharts);

@Component({
  selector: 'app-nee-dashboard',
  templateUrl: './nee-dashboard-component.component.html',
  styleUrls: ['./nee-dashboard-component.component.css']
})
export class NeeDashboardComponent {
  Highcharts = Highcharts;

  // Opciones de Gráfico de Tipos de NEE (Pastel 3D)
  neeTypesChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    title: { text: '' },
    plotOptions: {
      pie: {
        innerSize: '60%',  // Convierte en gráfico donut
        depth: 45,
        dataLabels: {
          format: '{point.name} {point.percentage:.1f}%',
          style: { fontSize: '10px' }
        }
      }
    },
    series: [{
      type: 'pie',
      name: '% de NEE',
      data: [
        { name: 'Permanente', y: 56.8, color: '#1E90FF' },
        { name: 'Transitoria', y: 20.5, color: '#FFA500' },
        { name: 'Rezago', y: 22.7, color: '#FF6347' }
      ]
    }]
  };

  // Opciones de Gráfico de NEE Geográfica (Columnas Apiladas 3D)
  neeGeographicChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25
      }
    },
    title: { text: '' },
    xAxis: {
      categories: [
        'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 'O’Higgins', 
        'Maule', 'Ñuble', 'Biobío', 'La Araucanía', 'Los Ríos', 'Los Lagos'
      ],
      labels: {
        rotation: -45,
        style: { fontSize: '10px' }
      }
    },
    yAxis: {
      title: { text: 'Cantidad' }
    },
    plotOptions: {
      column: {
        depth: 25,
        stacking: 'normal'
      }
    },
    legend: {
      align: 'center',
      layout: 'horizontal',
      itemStyle: {
        fontSize: '10px'
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    series: [
      { name: 'NEE Permanente', type: 'column', data: [61, 153, 114, 77, 349, 383, 257, 203, 382, 231, 187, 163], color: '#1E90FF' },
      { name: 'NEE Transitoria', type: 'column', data: [48, 115, 66, 94, 215, 273, 180, 139, 371, 213, 148, 111], color: '#FFA500' },
      { name: 'NEE Rezago', type: 'column', data: [11, 62, 15, 38, 76, 96, 58, 47, 92, 72, 43, 29], color: '#FF6347' }
    ]
  };
}
