import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import MapModule from 'highcharts/modules/map';
import * as mapDataCL from '@highcharts/map-collection/countries/cl/cl-all.geo.json';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChild, faBus, faBed, faPeopleRoof, faCalendar, faBaby, faGlobe, faUsers, 
         faGraduationCap, faPeopleArrows, faShieldAlt, faBuilding, faTree, 
         faChalkboardTeacher, faDesktop } from '@fortawesome/free-solid-svg-icons';
import HighchartsMore from 'highcharts/highcharts-more';
import { WsJarlisService } from 'src/app/services/ws-jarlis.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import tarjetasSuperioresData from '../../../assets/tarjetas-superiores.json';

MapModule(Highcharts);
HighchartsMore(Highcharts);

@Component({
  selector: 'app-custom-dashboard-inicial',
  templateUrl: './custom-dashboard-inicial.component.html',
  styleUrls: ['./custom-dashboard-inicial.component.css']
})
export class CustomDashboardInicialComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  // Propiedades Highcharts
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  
  // Suscripciones
  private dataSubscription: Subscription | undefined;
  private regionSubscription: Subscription | undefined;

  // Estado y datos
  isExpanded = false;
  jardinData: { region: string; jardin: string }[] = [];
  public processedData: any[] = [];
  public jardinesPorRegion: { [key: string]: number } = {};
  faCalendar = faCalendar;
  public fechaActual: string;
  public RegionSeleccionada: string = 'Región Metropolitana';

  // Opciones de gráficos
  chartOptionsBar: Highcharts.Options = {
    credits: { enabled: false },
    chart: {
      type: 'bar',
      borderColor: '#333',
      borderWidth: 0,
      backgroundColor: '#f9f9f9'
    },
    title: {
      text: 'Presupuesto Vigente vs Presupuesto Ejecutado',
      style: {
        fontSize: '12px',
        color: '#333'
      }
    },
    xAxis: {
      categories: ['Educación', 'Salud', 'Infraestructura'],
      labels: {
        style: {
          color: '#333',
          fontSize: '12px'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Cantidad',
        style: {
          color: '#333',
          fontSize: '12px'
        }
      }
    },
    series: [{
      type: 'bar',
      name: 'Presupuesto Vigente',
      data: [100, 200, 150],
      color: '#007bff'
    }, {
      type: 'bar',
      name: 'Presupuesto Ejecutado',
      data: [80, 150, 120],
      color: '#6c757d'
    }]
  };

  chartOptionsPie: Highcharts.Options = {
    chart: {
      type: 'pie',
      borderWidth: 0,
      backgroundColor: '#f9f9f9',
      height: 350,
      width: 400
    },
    credits: { enabled: false },
    title: {
      text: 'Gastos Ejecutados vs Saldo por Gastar',
      style: {
        fontSize: '11px',
        color: '#333'
      }
    },
    series: [{
      type: 'pie',
      data: [
        { name: 'Gastos Ejecutados', y: 70, color: '#007bff' },
        { name: 'Saldo por Gastar', y: 30, color: '#cce5ff' }
      ],
      borderColor: '#ffffff',
      borderWidth: 1
    }]
  };
  public tarjetasSuperiores = [
    { titulo: 'Salas Cuna y Jardines Infantiles', valor: 0, icon: faChild, iconClass: 'class-name-1' },
    { titulo: 'Jardines Infantiles', valor: 0, icon: faChild, iconClass: 'class-name-2' },
    { titulo: 'Sala Cuna', valor: 0, icon: faBed, iconClass: 'class-name-3' },
    { titulo: 'Modalidad No Convencional', valor: 0, icon: faBaby, iconClass: 'class-name-4' },
    { titulo: 'Establecimientos', valor: 0, icon: faPeopleRoof, iconClass: 'class-name-5' },
    { titulo: 'Jardín Sobre Ruedas', valor: 0, icon: faBus, iconClass: 'class-name-6' }
  ];
  public tarjetasInferiores = [
    { titulo: 'Alimentación y Salud: Situación Nutricional', icon: faChild, valor: 50, iconClass: 'class-name-7' },
    { titulo: 'Equidad e Inclusión: Pueblos Originarios', icon: faGlobe, valor: 20, iconClass: 'class-name-8' },
    { titulo: 'Equidad e Inclusión: Migrantes', icon: faUsers, valor: 15, iconClass: 'class-name-9' },
    { titulo: 'Equidad e Inclusión: NEE', icon: faGraduationCap, valor: 10, iconClass: 'class-name-10' },
    { titulo: 'Vínculo con la Familia: Encuestas Familias', icon: faPeopleArrows, valor: 25, iconClass: 'class-name-11' },
    { titulo: 'Seguridad: Accidentes', icon: faShieldAlt, valor: 5, iconClass: 'class-name-12' },
    { titulo: 'Infraestructura: Reconocimiento Oficial', icon: faBuilding, valor: 30, iconClass: 'class-name-13' },
    { titulo: 'Infraestructura: Sello Verde', icon: faTree, valor: 18, iconClass: 'class-name-14' },
    { titulo: 'Aprendizajes: Asesorias Técnicas con Enfoque Territorial (ATET)', icon: faChalkboardTeacher, valor: 12, iconClass: 'class-name-15' },
    { titulo: 'Educación: EPG', icon: faChalkboardTeacher, valor: 40, iconClass: 'class-name-16' },
    { titulo: 'Educación Presupuestaria', icon: faDesktop, valor: 28, iconClass: 'class-name-17' },
    { titulo: 'Rendición y Costos', icon: faDesktop, valor: 33, iconClass: 'class-name-18' }
  ];

  constructor(
    private library: FaIconLibrary,
    private wsJarlisService: WsJarlisService,
    private sharedDataService: SharedDataService,
    private router: Router
  ) {
    const today = new Date();
    this.fechaActual = `${today.getDate()} / ${today.getMonth() + 1} / ${today.getFullYear()}`;
    this.library.addIcons(
      faChild, faBus, faBed, faCalendar, faPeopleRoof, faBaby, faGlobe, 
      faUsers, faGraduationCap, faPeopleArrows, faShieldAlt, faBuilding, 
      faTree, faChalkboardTeacher, faDesktop
    );

    // Suscripciones a los datos compartidos
    this.dataSubscription = this.sharedDataService.processedData$.subscribe(data => {
      this.processedData = data;
      this.initializeMap();
    });

    this.regionSubscription = this.sharedDataService.jardinesPorRegion$.subscribe(data => {
      this.jardinesPorRegion = data;
    });
  }

  ngOnInit(): void {
    Highcharts.setOptions({
      accessibility: {
        enabled: false
      }
    });

    this.fetchAllData('');
    this.generateRegionTable();
    this.loadTarjetasSuperiores();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeMap();
      this.initializeCharts();
    }, 0);
  }

  ngOnDestroy() {
    // Limpieza de suscripciones
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if (this.regionSubscription) {
      this.regionSubscription.unsubscribe();
    }
  }

  loadTarjetasSuperiores() {
    this.tarjetasSuperiores = tarjetasSuperioresData.map(item => ({
      titulo: item.tipo,
      valor: item.cantidad,
      icon: this.getIconForTipo(item.tipo),
      iconClass: 'class-name-1'
    }));
  }

  getIconForTipo(tipo: string) {
    switch (tipo) {
      case 'Salas Cuna y Jardines Infantiles':
      case 'Jardines Infantiles':
        return faChild;
      case 'Sala Cuna':
        return faBed;
      case 'Modalidad No Convencional':
        return faBaby;
      case 'Establecimientos':
        return faPeopleRoof;
      case 'Jardín Sobre Ruedas':
        return faBus;
      default:
        return faChild;
    }
  }

  initializeCharts() {
    if (document.getElementById('chart-bar-container')) {
      Highcharts.chart('chart-bar-container', this.chartOptionsBar);
    }
    if (document.getElementById('chart-pie-container')) {
      Highcharts.chart('chart-pie-container', this.chartOptionsPie);
    }
  }
  initializeMap() {
    if (!this.mapContainer || !this.mapContainer.nativeElement) return;

    if (Highcharts.charts[0]) {
      Highcharts.charts[0].destroy();
    }

    const data = mapDataCL.features.map((feature: any) => {
      const regionName = this.sharedDataService.normalizeRegionName(feature.properties['name']);
      const regionCode = feature.properties['id'] || feature.id;
      const groupedItem = Object.values(this.groupByCodRegAndRegion()).find(item => 
        this.sharedDataService.normalizeRegionName(item.Region) === regionName);
      const regionCount = groupedItem ? groupedItem.count : 0;
      const codReg = groupedItem ? groupedItem.CodReg : 'N/A';
      return {
        'hc-key': feature.properties['hc-key'],
        'region-code': regionCode,
        value: regionCount,
        name: regionName,
        codReg: codReg
      };
    });

    this.chartOptions = {
      credits: { enabled: false },
      chart: {
          map: mapDataCL,
          renderTo: this.mapContainer.nativeElement,
          type: 'map'
      },
      title: {
          text: 'Chile'
      },
      mapNavigation: {
          enabled: true,
          enableMouseWheelZoom: true,
          buttonOptions: {
              verticalAlign: 'bottom'
          }
      },
      tooltip: {
          enabled: true,
          useHTML: true,
          headerFormat: '',
          pointFormat: `
          <div style="text-align: center; padding: 8px;">
              <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" style="margin-right: 5px;">
                      <rect x="3" y="1" width="6" height="6" fill="#FFD700"/>
                      <rect x="8" y="4" width="15" height="5" fill="#FF0000" transform="rotate(15, 8, 4)"/>
                      <rect x="6" y="9" width="5" height="11" fill="#0066CC"/>
                      <rect x="13" y="9" width="5" height="11" fill="#4CAF50"/>
                      <rect x="20" y="9" width="2" height="11" fill="#808080"/>
                      <rect x="20" y="16" width="2" height="4" fill="#FFD700"/>
                  </svg>
                  <div style="font-size: 14px; font-weight: bold;">{point.name}</div>
              </div>
              <div style="display: flex; align-items: center; justify-content: center;">
                  <div style="font-size: 12px;">Jardines: {point.value}</div>
              </div>
          </div>
      `
      },
      colorAxis: {
          min: 0,
          minColor: '#f2eefc',
          maxColor: '#004D40',
          stops: [
              [0, '#f2eefc'],
              [0.2, '#B2DFDB'],
              [0.4, '#4DB6AC'],
              [0.6, '#00897B'],
              [0.8, '#00796B'],
              [1, '#004D40']
          ]
      },
      series: [{
          type: 'map',
          name: 'Regiones de Chile',
          data: data,
          joinBy: ['hc-key', 'hc-key'],
          states: {
              hover: {
                  color: '#80CBC4',
                  brightness: 0.3
              }
          },
          point: {
              events: {
                  click: (event) => {
                      const nroReg = (event.point as any)['codReg'];
                      this.router.navigate([`/region/${parseInt(nroReg, 10)}`]);
                  },
                  mouseOver: function() {
                      if (this.graphic) {
                          this.graphic.element.style.cursor = 'pointer';
                      }
                  },
                  mouseOut: function() {
                      if (this.graphic) {
                          this.graphic.element.style.cursor = 'default';
                      }
                  }
              }
          },
          borderColor: '#BBBBBB',
          borderWidth: 0.5,
          nullColor: '#E0E0E0',
          dataLabels: {
              enabled: false,
              format: '{point.name}',
              style: {
                  fontSize: '10px',
                  color: '#333'
              }
          }
      }]
  };

    Highcharts.mapChart(this.chartOptions);
  }

  
  groupByCodRegAndRegion() {
    const groupedData = this.processedData.reduce((acc: { [key: string]: { CodReg: string; Region: string; count: number } }, item) => {
      const key = `${item.CodReg}-${item.Region}`;
      if (!acc[key]) {
        acc[key] = { CodReg: item.CodReg, Region: item.Region, count: 0 };
      }
      acc[key].count += 1;
      return acc;
    }, {});

    return groupedData;
  }

  calculateJardinesPorRegion() {
    for (const item of this.processedData) {
      if (!item.Region) {
        continue;
      }
      const region = this.sharedDataService.normalizeRegionName(item.Region);
      if (region) {
        this.jardinesPorRegion[region] = (this.jardinesPorRegion[region] || 0) + 1;
      }
    }
  }

  generateRegionTable() {
    const regionTable = mapDataCL.features.map((feature: any) => {
      return {
        id: feature.id,
        name: feature.properties['name']
      };
    });
    console.table(regionTable);
  }

  fetchAllData(initialPMASREG: string) {
    let currentPMASREG = initialPMASREG;
    const fetchData = () => {
      this.wsJarlisService.getData('', '', '', currentPMASREG).subscribe({
        next: (response) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response, 'application/xml');
          const pmasregNode = xmlDoc.getElementsByTagName('PMASREG')[0];
          const returnNode = xmlDoc.getElementsByTagName('return')[0];

          if (returnNode && returnNode.textContent) {
            this.sharedDataService.parseXmlResponse(response);
          }

          if (pmasregNode && pmasregNode.textContent && pmasregNode.textContent.trim() !== '') {
            currentPMASREG = pmasregNode.textContent.trim();
            fetchData(); // Llamada recursiva para obtener más datos
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos del servicio WSDL:', error);
        }
      });
    };

    fetchData();
  }

  toggleExpandInfoBox() {
    this.isExpanded = !this.isExpanded;
  }
  


  // Método para actualizar el mapa cuando cambia la región
  updateMap(regionId: number) {
    console.log('Actualizando región:', regionId);
    // Actualizar la región seleccionada en el servicio compartido
    const regionName = this.getRegionNameById(regionId);
    this.sharedDataService.updateRegionSeleccionada(regionName);
    
    // Recargar los datos si es necesario
    this.loadRegionData(regionId);
  }

  private loadRegionData(regionId: number) {
    // Obtener datos específicos de la región si es necesario
    this.wsJarlisService.getData('', '', '', regionId.toString()).subscribe({
        next: (data) => {
          try {
            const parsedData = Array.isArray(data) ? data : [data];
            this.sharedDataService.updateProcessedData(parsedData);
        } catch (error) {
            console.error('Error al procesar los datos:', error);
        }
        },
        error: (error) => {
            console.error('Error al cargar datos de la región:', error);
        }
    });
}

  private getRegionNameById(regionId: number): string {
    const regionNames: { [key: number]: string } = {
      1: 'Tarapacá',
      2: 'Antofagasta',
      3: 'Atacama',
      4: 'Coquimbo',
      5: 'Valparaíso',
      6: 'Región Metropolitana',
      601: 'RM - Nor Oriente',
      602: 'RM - Nor Poniente',
      603: 'RM - Sur Oriente',
      7: 'O\'Higgins',
      8: 'Maule',
      9: 'Biobío',
      10: 'Araucanía',
      11: 'Los Lagos',
      12: 'Aysén',
      13: 'Magallanes',
      14: 'Los Ríos',
      15: 'Arica y Parinacota',
      16: 'Ñuble'
    };
    
    return regionNames[regionId] || 'Región Desconocida';
  }
}

@NgModule({
  declarations: [CustomDashboardInicialComponent],
  imports: [CommonModule, FontAwesomeModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomDashboardInicialModule {}
