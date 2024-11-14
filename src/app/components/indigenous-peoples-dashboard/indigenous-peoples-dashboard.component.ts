import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';

// Inicializar módulos
Highcharts3D(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

@Component({
  selector: 'app-indigenous-peoples-dashboard',
  templateUrl: './indigenous-peoples-dashboard.component.html',
  styleUrls: ['./indigenous-peoples-dashboard.component.css']
})
export class IndigenousPeoplesDashboardComponent {
  Highcharts = Highcharts;

  // Opciones de gráfico para un donut en 3D
  nationalChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: '#f0f0f0', // Fondo más claro
      options3d: {
        enabled: true,
        alpha: 45, // Ángulo de inclinación
        beta: 0
      }
    },
    title: {
      text: '', // Título del gráfico
      style: {
        color: '#333333',
        fontSize: '16px'
      }
    },
    plotOptions: {
      pie: {
        innerSize: '50%', // Convierte el gráfico de pastel en donut
        depth: 45,        // Profundidad 3D
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name} {point.percentage:.1f}%', // Formato de leyenda como en la imagen
          distance: 15, // Distancia de la etiqueta del borde
          style: {
            color: '#333333',
            fontWeight: 'bold'
          }
        }
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    series: [{
      type: 'pie',
      name: '% de niños y niñas',
      data: [
        { name: 'Mapuche', y: 79.4, color: '#1E90FF' },
        { name: 'Aymará', y: 9.4, color: '#4B0082' },
        { name: 'Diaguita', y: 4.6, color: '#FF4500' },
        { name: 'Colla', y: 0.7, color: '#FF6347' }
        // Puedes agregar más datos si es necesario
      ]
    }]
  };

  // Opciones de gráfico para Frecuencia Geográfica en 3D con fondo claro
  geographicChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: '#f5f5f5', // Fondo claro
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25
      }
    },
    title: {
      text: 'Frecuencia Geográfica de Pueblos Originarios',
      style: {
        color: '#333333',
        fontSize: '18px'
      }
    },
    xAxis: {
      categories: [
        'Algarrobo', 'Alhué', 'Alto del Carmen', 'Alto Hospicio', 'Ancud', 'Andacollo', 
        'Antofagasta', 'Arauco', 'Arica', 'Aysén', 'Bulnes', 'Cabildo', 'Cabo de Hornos', 
        'Calama', 'Caldera', 'Calera de Tango', 'Cañete', 'Canela', 'Carahue', 'Cartagena', 
        'Casablanca', 'Catemu', 'Cerrillos', 'Cerro Navia', 'Chaitén', 'Chanco', 'Chañaral', 
        'Chépica', 'Chiguayante', 'Chillán Viejo', 'Chillán', 'Chimbarongo', 'Cholchol', 'Cisnes', 
        'Cobquecura', 'Cochamó', 'Codegua', 'Coelemu', 'Coihueco', 'Coinco', 'Colbún', 'Colina', 
        'Coltauco', 'Combarbalá', 'Concepción', 'Conchalí', 'Concon', 'Contulmo', 'Copiapó'
        // Añade más comunas aquí si es necesario
      ],
      labels: {
        rotation: -45, // Rotación de las etiquetas para mejor visualización
        style: {
          color: '#333333',
          fontSize: '10px'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Cantidad',
        style: {
          color: '#333333'
        }
      },
      labels: {
        style: {
          color: '#333333'
        }
      }
    },
    plotOptions: {
      column: {
        depth: 25,
        stacking: 'normal' // Apilado para mostrar todas las categorías en cada comuna
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
      {
        type: 'column',
        name: 'Atacameño',
        data: [4, 13, 46, 18, 10, 2, 60, 2, 184, 362, 1, 9, 4, 27, 7, 4, 7, 4, 7, 4, 7, 7, 64, 12, 3, 1, 13, 7, 29, 3, 1, 1, 0, 1, 1, 12, 2, 5, 3, 4, 15, 6, 4, 38, 29, 5, 6, 3, 7, 6],
        color: '#8a2be2' // Color para Atacameño
      },
      {
        type: 'column',
        name: 'Aymará',
        data: [5, 8, 24, 17, 3, 1, 18, 3, 52, 136, 2, 6, 4, 22, 5, 2, 5, 3, 6, 3, 6, 5, 46, 9, 2, 1, 10, 5, 20, 2, 1, 1, 0, 1, 1, 10, 1, 3, 2, 3, 12, 5, 3, 28, 24, 4, 5, 2, 5, 4],
        color: '#d2691e' // Color para Aymará
      },
      {
        type: 'column',
        name: 'Colla',
        data: [3, 7, 21, 12, 8, 1, 36, 1, 29, 83, 1, 3, 2, 14, 4, 2, 4, 2, 4, 2, 4, 4, 41, 8, 1, 0, 9, 4, 16, 2, 0, 1, 0, 1, 0, 9, 1, 2, 2, 2, 10, 4, 2, 23, 18, 3, 3, 1, 4, 3],
        color: '#ff6347' // Color para Colla
      },
      {
        type: 'column',
        name: 'Diaguita',
        data: [2, 6, 20, 10, 6, 1, 33, 1, 26, 79, 1, 2, 1, 12, 3, 2, 3, 2, 3, 2, 3, 3, 35, 7, 1, 0, 8, 3, 13, 1, 0, 1, 0, 1, 0, 7, 1, 1, 1, 2, 9, 3, 2, 20, 16, 2, 3, 1, 3, 3],
        color: '#ffa500' // Color para Diaguita
      },
      {
        type: 'column',
        name: 'Mapuche',
        data: [10, 23, 60, 29, 17, 3, 84, 4, 131, 361, 4, 12, 5, 45, 10, 4, 11, 6, 12, 6, 12, 10, 120, 22, 6, 2, 23, 11, 50, 6, 2, 3, 0, 3, 2, 23, 3, 8, 5, 7, 31, 13, 7, 83, 64, 12, 8, 4, 14, 13],
        color: '#1e90ff' // Color para Mapuche
      }
      // Añade más series para otros pueblos originarios aquí
    ]
  };
  
}
