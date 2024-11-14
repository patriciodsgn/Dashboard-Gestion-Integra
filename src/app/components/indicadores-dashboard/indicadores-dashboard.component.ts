import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import VariablePie from 'highcharts/modules/variable-pie';
import BellCurve from 'highcharts/modules/histogram-bellcurve';
import PatternFill from 'highcharts/modules/pattern-fill';
import PictorialModule from 'highcharts/modules/pictorial';
import ItemSeries from 'highcharts/modules/item-series';

// Inicializar módulos de Highcharts
if (typeof Highcharts === 'object') {
    HighchartsMore(Highcharts);
    Highcharts3D(Highcharts);
    HighchartsSolidGauge(Highcharts);
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    HighchartsAccessibility(Highcharts);
    ItemSeries(Highcharts);
    VariablePie(Highcharts);
    BellCurve(Highcharts);
    PatternFill(Highcharts);
    PictorialModule(Highcharts);
}

@Component({
    selector: 'app-indicadores-dashboard',
    templateUrl: './indicadores-dashboard.component.html'
})
export class IndicadoresDashboardComponent implements OnInit {
exportPDF() {
throw new Error('Method not implemented.');
}
    // Variables para controlar la visibilidad de cada panel
    showPortadaIndicadores: boolean = false;
    showNutritionDashboard: boolean = false;
    showIndigenousPeoplesDashboard: boolean = false;
    showMigrantsDashboard: boolean = false;
    showNeeDashboard: boolean = false;
    showFamilySurveyDashboard: boolean = false;
    showDashboardAccidentes: boolean = false;
    showDashboardReconocimiento: boolean = false;
    showDashboardSelloVerde: boolean = false;

    // Highcharts properties
    Highcharts: typeof Highcharts = Highcharts;
    chartConstructor = 'chart';
    updateFlag = false;

    // Dashboard data
    selectedYear: number = 2024;
    selectedRegion: string = 'Gran Santiago Nor Poniente';
    startDate: string = '2024-09-09';
    endDate: string = '2024-10-10';

    // Indicadores
    indicators = {
        establishments: 116,
        kindergartenAndNursery: 80,
        kindergarten: 28,
        nursery: 6,
        nonConventional: 80,
        wheelsKindergarten: 8
    };
    // Opciones seleccionadas en el menú desplegable
    selectedOptions: string[] = [];
    
    selectedSegments: string[] = []; // Segmentos seleccionados
    isDropdownOpen: boolean = false; // Estado del menú desplegable de segmentos
    
    // Filtros
    years: number[] = [2021, 2022, 2023, 2024];
    segments: string[] = [
        'PORTADA',
        'EQUIDAD E INCLUSIÓN',
        'VÍNCULO CON LA FAMILIA',
        'INFRAESTRUCTURA',
        'SEGURIDAD',
        'EDUCACIÓN'
    ];

    
    showFilterBar: boolean = true; // Control para mostrar/ocultar la barra de filtros

    dataSteward: string = 'XXXXXXXXXXXXXXXX';

    constructor() {}

    ngOnInit() {
        // Inicializar datos o cargar configuraciones iniciales
    }

    // Método para aplicar los filtros y actualizar los gráficos
    applyFilters() {
        console.log('Applying filters:', {
            year: this.selectedYear,
            region: this.selectedRegion,
            segments: this.selectedSegments,
            dateRange: [this.startDate, this.endDate]
        });
        this.updateCharts();
    }

    // Método para exportar a PDF
    exportToPDF() {
        console.log('Exporting to PDF...');
        // Aquí puedes agregar la lógica para exportar a PDF si se requiere
    }

    // Método para actualizar los gráficos
    private updateCharts() {
        this.updateFlag = true;
    }

    // Manejar cambio de año
    onYearChange(year: number) {
        this.selectedYear = year;
        this.applyFilters();
    }

    // Manejar cambio de región
    onRegionChange(region: string) {
        this.selectedRegion = region;
        this.applyFilters();
    }

    // Manejar cambio en el rango de fechas
    onDateRangeChange(startDate: string, endDate: string) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.applyFilters();
    }

    // Alternar selección de segmento
    toggleSegment(segment: string) {
        const index = this.selectedSegments.indexOf(segment);
        if (index === -1) {
            this.selectedSegments.push(segment);
        } else {
            this.selectedSegments.splice(index, 1);
        }
        this.applyFilters();
    }

    // Verificar si un segmento está seleccionado
    isSelected(segment: string): boolean {
        return this.selectedSegments.includes(segment);
    }

    // Método para alternar la visibilidad de la barra de filtros
    toggleFilterBar() {
        this.showFilterBar = !this.showFilterBar;
    }
    // Método para manejar el botón "FILTRAR"
  filtrar() {
    // Reinicia todas las variables a false
    this.resetPanels();

    // Activa los paneles según las opciones seleccionadas
    this.selectedOptions.forEach(option => {
      switch (option) {
        case 'PORTADA':
          this.showPortadaIndicadores = true;
          break;
        case 'EQUIDAD E INCLUSIÓN':
          this.showNutritionDashboard = true;
          break;
        case 'VÍNCULO CON LA FAMILIA':
          this.showFamilySurveyDashboard = true;
          break;
        case 'INFRAESTRUCTURA':
          this.showIndigenousPeoplesDashboard = true;
          break;
        case 'SEGURIDAD':
          this.showDashboardAccidentes = true;
          break;
        case 'EDUCACIÓN':
          this.showNeeDashboard = true;
          break;
        // Agrega otros casos según las opciones
        default:
          break;
      }
    });
  }

  // Método para reiniciar todos los paneles a false
  resetPanels() {
    this.showPortadaIndicadores = false;
    this.showNutritionDashboard = false;
    this.showIndigenousPeoplesDashboard = false;
    this.showMigrantsDashboard = false;
    this.showNeeDashboard = false;
    this.showFamilySurveyDashboard = false;
    this.showDashboardAccidentes = false;
    this.showDashboardReconocimiento = false;
    this.showDashboardSelloVerde = false;
  }
  // Método para alternar el estado del menú desplegable de segmentos
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  

  // Método para seleccionar el año
  selectYear(year: number) {
    this.selectedYear = year;
  }
}
