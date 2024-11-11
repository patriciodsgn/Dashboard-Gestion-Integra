import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { faChild, faBed, faBaby, faPeopleRoof, 
    faCloudSun, faMapMarkedAlt, faBus, 
    faChartLine, faSchool, faUsers, faShieldAlt, 
    faBuilding, faTree, faBabyCarriage, faCalendar, 
    faChalkboardTeacher, faDesktop, faGlobe, 
    faPeopleArrows, faGraduationCap, 
    faDollarSign,
    faChartPie,
    faCheckCircle,
    faRotate,
    faBox,
    faHeart,
    faCog,
    faBook,
    faCalendarDays

} from '@fortawesome/free-solid-svg-icons';
import Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
import AccessibilityModule from 'highcharts/modules/accessibility';
MapModule(Highcharts);
AccessibilityModule(Highcharts);
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import ExportingModule from 'highcharts/modules/exporting';
import FullScreenModule from 'highcharts/modules/full-screen';
import { JardinesPorRegionYComuna } from 'src/app/services/shared-data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { WS_ADM_SOLService } from 'src/app/services/WS_ADM_SOL.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface MapFeatureData {
  'hc-key': string;
  name: string;
  cantidadJardines: number;
  codigoComuna: string;
  value: number;
  color: string;
  properties: any;
}
interface ItemLista {
    tipo: 'comuna' | 'establecimiento';
    nombre: string;
    modalidad: string;
    codigo?: string;
    estado?: string;
    ubicacion?: string;
   
}
interface ItemColumna {
    texto: string;
    esComuna: boolean;
    prefijo?: string;
}
interface ComunaGroup {
    nombreComuna: string;
    establecimientos: Jardin[];
}
interface InfoAdicional {
    comuna: string;
    establecimientos: {
      tipo: string;
      nombre: string;
    }[];
  }
  interface TarjetaItem {
    titulo: string;
    icon: IconDefinition;
}

interface CustomPoint extends Highcharts.Point {
    name: string;
    value?: number;
    datos?: {
      calle: string;
      codCom: string;
      jardin: string;
      modalidad: string;
      ubicacion: string;
    };
    series: Highcharts.Series & {
      type: string;
    };
  }

  interface Jardin {
    codReg: string;
    region: string;
    codCom: string;
    comuna: string;
    jardin: string;
    nombreJardin: string;
    estado: string;
    codMod: string;
    modalidad: string;
    ubicacion: string;
    latitud: string;
    longitud: string;
    calle: string;
    rbd: string;
    fono_1: string;
    correo: string;
    director: string;
    cjor: string;
    jor: string;
    cniv: string;
    niv: string;
    gru: string;
    cap: string;
}
ExportingModule(Highcharts);
FullScreenModule(Highcharts);
@Component({
  selector: 'app-custom-dashboard',
  templateUrl: './custom-dashboard.component.html',
  styleUrls: ['./custom-dashboard.component.css']
})
export class CustomDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  private chart: Highcharts.Chart | undefined;
  private currentRegionId: number | null = null;
  private readonly destroy$ = new Subject<void>();
  JardinesporRegion: Jardin[] = [];
RegionSeleccionada: string = '';
  fechaActual: string = new Date().toLocaleDateString();
  chartOptions: any;
  
  private mapInitialized = false;
  private updatePending = false;
  private readonly debounceTime = 250; // ms
  private updateTimeout: any;
  informacionAdicional: InfoAdicional[] = [];
  //jardinesData: { [region: string]: { [comuna: string]: number } } = {};
  jardinesData: JardinesPorRegionYComuna = {};

  
  regionColors: { [key: string]: { [key: string]: string } } = {
    'Ñuble': {
        // 1. Chillán
        'Chillán': '#66B3CC',  // Azul turquesa medio
        
        // 2. Chillán Viejo
        'Chillán Viejo': '#B8E6B8',  // Verde muy claro
        
        // 3. San Ignacio
        'San Ignacio': '#E6B8B8',  // Rosa claro
        
        // 4. El Carmen
        'El Carmen': '#006666',  // Verde azulado oscuro
        
        // 5. Yungay
        'Yungay': '#99CCFF',  // Azul claro
        
        // 6. Pemuco
        'Pemuco': '#B3E6FF',  // Azul muy claro
        
        // 7. Bulnes
        'Bulnes': '#F5E6D3',  // Beige claro
        
        // 8. Quillón
        'Quillón': '#006699',  // Azul marino
        
        // 9. San Carlos
        'San Carlos': '#80D4E6',  // Azul celeste
        
        // 10. Ñiquén
        'Ñiquén': '#006E7F',  // Azul verdoso oscuro
        
        // 11. San Fabián
        'San Fabián': '#4D88FF',  // Azul medio
        
        // 12. Coihueco
        'Coihueco': '#D4D4F5',  // Lila claro
        
        // 13. San Nicolás
        'San Nicolás': '#0077BE',  // Azul medio
        
        // 14. Ranquil
        'Ranquil': '#00A3CC',  // Azul turquesa
        
        // 15. Portezuelo
        'Portezuelo': '#FFA500',  // Naranja/Amarillo
        
        // 16. Coelemu
        'Coelemu': '#98FB98',  // Verde claro
        
        // 17. Treguaco
        'Treguaco': '#90EE90',  // Verde claro
        
        // 18. Cobquecura
        'Cobquecura': '#006699',  // Azul oscuro
        
        // 19. Quirihue
        'Quirihue': '#B3E6FF',  // Azul muy claro
        
        // 20. Ninhue
        'Ninhue': '#663399',  // Púrpura
        
        // 21. Portezuela
        'Pinto': '#00CED1'  // Turquesa
    },
    'Arica y Parinacota': {
        // 1. Arica
        'Arica': '#E6E6FA',  // Lila/Lavanda
        
        // 2. Putre
        'Putre': '#FFF3D4',  // Amarillo muy claro/crema
        
        // 3. General Lagos
        'General Lagos': '#E8B89B',  // Coral/Melocotón
        
        // La zona inferior del mapa
        'Camarones': '#F5B7B1'  // Rosa salmón
    },
    'Magallanes': {
        // 1. Natales
        'Natales': '#6AACB8',  // Azul turquesa medio
        
        // 2. Punta Arenas
        'Punta Arenas': '#4A7B3F',  // Verde oliva oscuro
        
        // 3. Porvenir
        'Porvenir': '#90EE90',  // Verde claro
        
        // La sección amarilla que aparece en el mapa parece ser parte de Natales
        // pero con un color distintivo para alguna subregión o área especial
        'Torres del Paine': '#F4D03F'  // Amarillo - si necesitas incluir esta subdivisión
    },
    'Aysén': {
      // 1. Coyhaique
      'Coyhaique': '#A5C7D3',  // Azul grisáceo claro
      
      // 2. Lago Verde
      'Lago Verde': '#2D5A4A',  // Verde oscuro azulado
      
      // 3. Aysén
      'Aysén': '#90EE90',  // Verde claro
      
      // 4. Cisnes
      'Cisnes': '#4A7B3F',  // Verde oliva
      
      // 5. Guaitecas
      'Guaitecas': '#F4D03F',  // Amarillo
      
      // 6. Río Ibañez
      'Río Ibañez': '#FFE4D6',  // Rosa muy claro/beige
      
      // 7. Cochrane
      'Cochrane': '#68A568',  // Verde medio
      
      // 8. O'Higgins
      'O\'Higgins': '#1D4B2C'  // Verde oscuro
  },
    'Los Lagos': {
      // 1. Osorno
      'Osorno': '#B2D8E6',  // Azul claro
      
      // 2. San Pablo
      'San Pablo': '#2D5A27',  // Verde oscuro
      
      // 3. Puyehue
      'Puyehue': '#B8E6B8',  // Verde claro
      
      // 4. Purranque
      'Purranque': '#F4D03F',  // Amarillo
      
      // 5. Río Negro
      'Río Negro': '#F4D03F',  // Amarillo
      
      // 6. Puerto Montt
      'Puerto Montt': '#2D5A27',  // Verde oscuro
      
      // 7. Puerto Varas
      'Puerto Varas': '#1D4B2C',  // Verde oscuro intenso
      
      // 8. Cochamó
      'Cochamó': '#D6EAF8',  // Azul muy claro
      
      // 9. Calbuco
      'Calbuco': '#90EE90',  // Verde claro
      
      // 10. Maullín
      'Maullín': '#F4D03F',  // Amarillo
      
      // 11. Los Muermos
      'Los Muermos': '#5F9EA0',  // Verde azulado
      
      // 12. Fresia
      'Fresia': '#4A7B4A',  // Verde medio oscuro
      
      // 13. Llanquihue
      'Llanquihue': '#A8D5AA',  // Verde medio claro
      
      // 14. Frutillar
      'Frutillar': '#90EE90',  // Verde claro
      
      // 15. Castro
      'Castro': '#98FB98',  // Verde pastel
      
      // 16. Ancud
      'Ancud': '#B8E6B8',  // Verde claro
      
      // 17. Quemchi
      'Quemchi': '#2D5A27',  // Verde oscuro
      
      // 18. Dalcahue
      'Dalcahue': '#4A7B4A',  // Verde medio oscuro
      
      // 19. Curaco de Vélez
      'Curaco de Vélez': '#90EE90',  // Verde claro
      
      // 20. Quinchao
      'Quinchao': '#98FB98',  // Verde pastel
      
      // 21. Puqueldón
      'Puqueldón': '#90EE90',  // Verde claro
      
      // 22. Chonchi
      'Chonchi': '#B8E6B8',  // Verde claro
      
      // 23. Queilén
      'Queilén': '#98FB98',  // Verde pastel
      
      // 24. Quellón
      'Quellón': '#4A7B4A',  // Verde medio oscuro
      
      // 25. Hualaihué
      'Hualaihué': '#F4D03F',  // Amarillo
      
      // 26. Futaleufú
      'Futaleufú': '#2D5A27',  // Verde oscuro
      
      // 27. Palena
      'Palena': '#5F9EA0'  // Verde azulado
  },
    'Los Ríos': {
        // 1. Valdivia
        'Valdivia': '#9FD4A1',  // Verde claro
        
        // 2. Corral
        'Corral': '#2D5A27',  // Verde oscuro
        
        // 3. Lanco
        'Lanco': '#1D4B2C',  // Verde oscuro
        
        // 4. Los Lagos
        'Los Lagos': '#FFE4D6',  // Rosa muy claro/beige
        
        // 5. Máfil
        'Máfil': '#A8D5AA',  // Verde medio claro
        
        // 6. Mariquina
        'Mariquina': '#F4D03F',  // Amarillo
        
        // 7. Paillaco
        'Paillaco': '#5F9EA0',  // Verde azulado
        
        // 8. Panguipulli
        'Panguipulli': '#90EE90',  // Verde claro brillante
        
        // 9. La Unión
        'La Unión': '#98FB98',  // Verde pastel claro
        
        // 10. Futrono
        'Futrono': '#B8E6B8',  // Verde claro suave
        
        // 11. Lago Ranco
        'Lago Ranco': '#1D4B2C',  // Verde oscuro
        
        // 12. Río Bueno
        'Río Bueno': '#8FBC8F'  // Verde grisáceo medio
    },
    'Araucania': {
        // 1. Angol
        'Angol': '#90CE90',  // Verde claro
        
        // 2. Renaico
        'Renaico': '#FFE4D6',  // Rosa muy claro
        
        // 3. Collipulli
        'Collipulli': '#B8E6B8',  // Verde claro
        
        // 4. Lonquimay
        'Lonquimay': '#2E8B57',  // Verde oscuro
        
        // 5. Curacautín
        'Curacautín': '#98FB98',  // Verde pastel
        
        // 6. Ercilla
        'Ercilla': '#B8E6B8',  // Verde claro
        
        // 7. Victoria
        'Victoria': '#C1E6C1',  // Verde suave
        
        // 8. Traiguén
        'Traiguén': '#B8E6B8',  // Verde claro
        
        // 9. Lumaco
        'Lumaco': '#0B5345',  // Verde oscuro
        
        // 10. Purén
        'Purén': '#F7DC6F',  // Amarillo
        
        // 11. Los Sauces
        'Los Sauces': '#F7DC6F',  // Amarillo
        
        // 12. Temuco
        'Temuco': '#A3E4D7',  // Verde agua claro
        
        // 13. Lautaro
        'Lautaro': '#FFE4D6',  // Rosa muy claro
        
        // 14. Perquenco
        'Perquenco': '#90CE90',  // Verde claro
        
        // 15. Vilcún
        'Vilcún': '#5F9EA0',  // Verde azulado
        
        // 16. Cunco
        'Cunco': '#F7DC6F',  // Amarillo
        
        // 17. Melipeuco
        'Melipeuco': '#98FB98',  // Verde pastel
        
        // 18. Curarrehue
        'Curarrehue': '#FFE4D6',  // Rosa muy claro
        
        // 19. Pucón
        'Pucón': '#FFE4D6',  // Rosa muy claro
        
        // 20. Villarrica
        'Villarrica': '#AED6F1',  // Azul muy claro
        
        // 21. Freire
        'Freire': '#B8E6B8',  // Verde claro
        
        // 22. Pitrufquén
        'Pitrufquén': '#2E8B57',  // Verde oscuro
        
        // 23. Gorbea
        'Gorbea': '#F7DC6F',  // Amarillo
        
        // 24. Loncoche
        'Loncoche': '#B8E6B8',  // Verde claro
        
        // 25. Toltén
        'Toltén': '#98FB98',  // Verde pastel
        
        // 26. Teodoro Schmidt
        'Teodoro Schmidt': '#2E8B57',  // Verde oscuro
        
        // 27. Puerto Saavedra
        'Puerto Saavedra': '#90CE90',  // Verde claro
        
        // 28. Carahue
        'Carahue': '#B8E6B8',  // Verde claro
        
        // 29. Nueva Imperial
        'Nueva Imperial': '#C1E6C1',  // Verde suave
        
        // 30. Galvarino
        'Galvarino': '#F7DC6F',  // Amarillo
        
        // 31. Padre Las Casas
        'Padre Las Casas': '#2F4F4F',  // Verde muy oscuro
        
        // 32. Cholchol
        'Cholchol': '#AED6F1'  // Azul muy claro
    },
    'Biobio': {
      // 1. Los Ángeles
      'Los Ángeles': '#0088CC',  // Azul medio
      
      // 2. Cabrero
      'Cabrero': '#003366',  // Azul oscuro
      
      // 3. Tucapel
      'Tucapel': '#E6D5A7',  // Beige claro
      
      // 4. Antuco
      'Antuco': '#E6D5A7',  // Beige claro
      
      // 5. Quilleco
      'Quilleco': '#A8E6F4',  // Azul claro
      
      // 6. Santa Bárbara
      'Santa Bárbara': '#C4B7D7',  // Lila claro
      
      // 7. Quilaco
      'Quilaco': '#6699CC',  // Azul grisáceo
      
      // 8. Mulchén
      'Mulchén': '#99CCDD',  // Azul celeste claro
      
      // 9. Negrete
      'Negrete': '#006699',  // Azul petróleo
      
      // 10. Nacimiento
      'Nacimiento': '#CCE6CC',  // Verde muy claro
      
      // 11. Laja
      'Laja': '#B3D9E6',  // Azul muy claro
      
      // 12. San Rosendo
      'San Rosendo': '#80CCEE',  // Azul celeste
      
      // 13. Yumbel
      'Yumbel': '#0099CC',  // Azul medio brillante
      
      // 14. Concepción
      'Concepción': '#D5E6D5',  // Verde grisáceo claro
      
      // 15. Talcahuano
      'Talcahuano': '#CC9966',  // Marrón claro
      
      // 16. Penco
      'Penco': '#E6D5A7',  // Beige
      
      // 17. Tomé
      'Tomé': '#006699',  // Azul oscuro
      
      // 18. Florida
      'Florida': '#E6D5A7',  // Beige claro
      
      // 19. Hualqui
      'Hualqui': '#0088CC',  // Azul medio
      
      // 20. Santa Juana
      'Santa Juana': '#B3D9E6',  // Azul claro
      
      // 21. Lota
      'Lota': '#99CCDD',  // Azul celeste
      
      // 22. Coronel
      'Coronel': '#CCE6F2',  // Azul muy claro
      
      // 23. San Pedro de la Paz
      'San Pedro de la Paz': '#80CCEE',  // Azul celeste medio
      
      // 24. Chiguayante
      'Chiguayante': '#99CCDD',  // Azul celeste claro
      
      // 25. Lebu
      'Lebu': '#9966CC',  // Púrpura
      
      // 26. Arauco
      'Arauco': '#006699',  // Azul oscuro
      
      // 27. Curanilahue
      'Curanilahue': '#99CCDD',  // Azul celeste
      
      // 28. Los Álamos
      'Los Álamos': '#C4B7D7',  // Lila claro
      
      // 29. Cañete
      'Cañete': '#E6D5A7',  // Beige
      
      // 30. Contulmo
      'Contulmo': '#0066CC',  // Azul brillante
      
      // 31. Tirúa
      'Tirúa': '#99CCDD'  // Azul celeste
    },
    'Maule': {
     // 1. Curicó
     'Curicó': '#9FE5F0',
     // 2. Teno
     'Teno': '#BFF0D4',
     // 3. Romeral
     'Romeral': '#E0F7E7',
     // 4. Molina
     'Molina': '#AEE1F9',
     // 5. Sagrada Familia
     'Sagrada Familia': '#B8C8E7',
     // 6. Licantén
     'Licantén': '#FFFFFF',  // Color claro
     // 7. Vichuquén
     'Vichuquén': '#5CB3D0',
     // 8. Rauco
     'Rauco': '#71C5E7',
     // 9. Talca
     'Talca': '#8ED7F2',
     // 10. Pelarco
     'Pelarco': '#7CCBE8',
     // 11. Río Claro
     'Río Claro': '#69BDE1',
     // 12. San Clemente
     'San Clemente': '#A5DEF4',
     // 13. Maule
     'Maule': '#88D1ED',
     // 14. Empedrado
     'Empedrado': '#7EC9E6',
     // 15. Pencahue
     'Pencahue': '#6CBFE3',
     // 16. Constitución
     'Constitución': '#5BB2D0',
     // 17. Curepto
     'Curepto': '#4DA6C8',
     // 18. Linares
     'Linares': '#9DE4EF',
     // 19. Yerbas Buenas
     'Yerbas Buenas': '#8AD8EA',
     // 20. Colbún
     'Colbún': '#B1EBF6',
     // 21. Longaví
     'Longaví': '#93DBED',
     // 22. Parral
     'Parral': '#7BCCE7',
     // 23. Retiro
     'Retiro': '#B4C4E5',
     // 24. Villa Alegre
     'Villa Alegre': '#EBC5D5',
     // 25. San Javier
     'San Javier': '#8ED7F2',
     // 26. Cauquenes
     'Cauquenes': '#A7E0F5',
     // 27. Pelluhue
     'Pelluhue': '#E8D0D8',
     // 28. Chanco
     'Chanco': '#EECDD6'
    },
    'O’ higgins': {
    'Rancagua': '#7fc4d4',           // Comuna 1
    'Graneros': '#80b0a8',           // Comuna 2
    'Mostazal': '#7aa2b2',           // Comuna 3
    'Codegua': '#99c7d6',            // Comuna 4
    'Machalí': '#5e97a3',            // Comuna 5
    'Olivar': '#98b9d1',             // Comuna 6
    'Requínoa': '#6cbec1',           // Comuna 7
    'Rengo': '#7cabc1',              // Comuna 8
    'Malloa': '#91c7cf',             // Comuna 9
    'Quinta de Tilcoco': '#aacdc0',  // Comuna 10
    'San Vicente': '#86b0c2',        // Comuna 11
    'Pichidegua': '#75d2d8',         // Comuna 12
    'Peumo': '#99a3b6',              // Comuna 13
    'Doñihue': '#7aa8bd',            // Comuna 14
    'Las Cabras': '#88bccb',         // Comuna 15
    'San Fernando': '#648ea8',       // Comuna 16
    'Chimbarongo': '#7b8fb2',        // Comuna 17
    'Nancagua': '#61a0ad',           // Comuna 18
    'Chépica': '#78a7b0',            // Comuna 19
    'Santa Cruz': '#6eb8c2',         // Comuna 20
    'Palmilla': '#95b6b7',           // Comuna 21
    'Peralillo': '#68b4c2',          // Comuna 22
    'Pichilemu': '#7cbba6',          // Comuna 23
    'Navidad': '#b3a585',            // Comuna 24
    'Litueche': '#a69d78',           // Comuna 25
    'La Estrella': '#9f8f72',        // Comuna 26
    'Marchihue': '#9a846f',          // Comuna 27
    'Paredones': '#9e6c52'           // Comuna 28
    },
    'NorPoniente': {
    'Independencia': '#f4b6c2', // Color para la comuna 1
    'Conchalí': '#c1c8e4',      // Color para la comuna 2
    'Huechuraba': '#ffdecc',    // Color para la comuna 3
    'Recoleta': '#a1d3e2',      // Color para la comuna 4
    'Estación Central': '#d4a5a5', // Color para la comuna 5
    'Cerrillos': '#b5e7a0',     // Color para la comuna 6
    'Maipú': '#c39bd3',         // Color para la comuna 7
    'Quinta Normal': '#ffcccb', // Color para la comuna 8
    'Lo Prado': '#b2d8d8',      // Color para la comuna 9
    'Pudahuel': '#ffd3b6',      // Color para la comuna 10
    'Cerro Navia': '#98d7c2',   // Color para la comuna 11
    'Renca': '#f7cac9',         // Color para la comuna 12
    'Quilicura': '#d5a6bd',     // Color para la comuna 13
    'Santiago': '#ffe5b4'       // Color para la comuna 14
    },
    'Sur Oriente': {
    'Santiago': '#ffb6c1',            // Comuna 1
    'Providencia': '#c1c8e4',         // Comuna 2
    'Lo Barnechea': '#ffab91',        // Comuna 3
    'Las Condes': '#a1d3e2',          // Comuna 4
    'Ñuñoa': '#d4a5a5',               // Comuna 5
    'La Reina': '#b5e7a0',            // Comuna 6
    'Macul': '#c39bd3',               // Comuna 7
    'La Florida': '#ffcccb',          // Comuna 8
    'Peñalolén': '#b2d8d8',           // Comuna 9
    'San Joaquín': '#ffd3b6',         // Comuna 10
    'La Granja': '#98d7c2',           // Comuna 11
    'La Pintana': '#f7cac9',          // Comuna 12
    'San Ramón': '#d5a6bd',           // Comuna 13
    'San Miguel': '#ffe5b4',          // Comuna 14
    'La Cisterna': '#f8b6d1',         // Comuna 15
    'El Bosque': '#f9dda0',           // Comuna 16
    'Pedro Aguirre Cerda': '#d1c4e9', // Comuna 17
    'Lo Espejo': '#bbdefb',           // Comuna 18
    'Puente Alto': '#b39ddb',         // Comuna 19
    'Pirque': '#ffcc80',              // Comuna 20
    'San José de Maipo': '#ffab91'    // Comuna 21
    },
    'Rural Norponiente': {
    'Alhué': '#f8b6d1',              // Comuna 15
    'Buin': '#f9dda0',               // Comuna 16
    'Calera de Tango': '#d1c4e9',    // Comuna 17
    'Colina': '#bbdefb',             // Comuna 18
    'Curacaví': '#b39ddb',           // Comuna 19
    'El Monte': '#ffcc80',           // Comuna 20
    'Isla de Maipo': '#ffab91',      // Comuna 21
    'Lampa': '#c8e6c9',              // Comuna 22
    'María Pinto': '#e6ee9c',        // Comuna 23
    'Melipilla': '#fff59d',          // Comuna 24
    'Padre Hurtado': '#ffccbc',      // Comuna 25
    'Paine': '#dcedc8',              // Comuna 26
    'Peñaflor': '#f48fb1',           // Comuna 27
    'San Pedro': '#ce93d8',          // Comuna 28
    'Talagante': '#b0bec5',          // Comuna 29
    'Til Til': '#ffe082',            // Comuna 30
    'San Bernardo': '#c5e1a5'        // Comuna 31
    },
    'Tarapacá': {
      'Iquique': '#f4b6c2',
      'Alto Hospicio': '#c1c8e4',
      'Pozo Almonte': '#f7cac9',
      'Pica': '#ffdecc',
      'Camiña': '#a1d3e2',
      'Colchane': '#d4a5a5'
    },
    'Antofagasta': {
      'Antofagasta': '#E8D0C1',
      'María Elena': '#F2A594',
      'Mejillones': '#FFC4AD',
      'Sierra Gorda': '#E6DCEF',
      'Taltal': '#D5A4CC',
      'Tocopilla': '#7EBCB6',
      'Calama': '#E88B83',
      'San Pedro de Atacama': '#F2B998'
    },
    'Atacama': {
      'Copiapó': '#d1a3a4',
      'Caldera': '#a4c4b5',
      'Chañaral': '#f2b6b6',
      'Diego de Almagro': '#f4c7a1',
      'Vallenar': '#f3e2c6',
      'Huasco': '#e8d3b9',
      'Freirina': '#c6e2e8',
      'Tierra Amarilla': '#e1b0a2',
      'Alto del Carmen': '#f4a4b5'
    },
    'Coquimbo': {
      'La Serena': '#d9a789',
      'Coquimbo': '#b68578',
      'Andacollo': '#d1a7cb',
      'La Higuera': '#c8b39e',
      'Vicuña': '#d4a6a5',
      'Paihuano': '#e3b7af',
      'Monte Patria': '#d8b1a4',
      'Combarbalá': '#b98b85',
      'Ovalle': '#bf7265',
      'Punitaqui': '#d09c93',
      'Río Hurtado': '#a2b9b4',
      'Salamanca': '#e28f8f',
      'Illapel': '#cf7474',
      'Los Vilos': '#b9a99d',
      'Canela': '#e6b9a4'
    },
    'Valparaíso': {
      'Petorca': '#d2a976',
      'La Ligua': '#a3c9de',
      'Cabildo': '#6b8ab6',
      'Zapallar': '#d3a2a0',
      'Papudo': '#e0c392',
      'Los Andes': '#0f6c5f',
      'San Esteban': '#219ebc',
      'Rinconada': '#b2d9e6',
      'Calle Larga': '#d3e7ef',
      'Santa María': '#b1b6d1',
      'San Felipe': '#7fb4d9',
      'Putaendo': '#ccddee',
      'Panquehue': '#99c0d1',
      'Catemu': '#c2a3d9',
      'Llaillay': '#88aab8',
      'Quillota': '#96c7b3',
      'La Cruz': '#8a9eb5',
      'Nogales': '#a1a2c3',
      'Hijuelas': '#5a87a8',
      'Calera': '#2e4972',
      'Limache': '#486b92',
      'Olmué': '#769db4',
      'Villa Alemana': '#9fadc3',
      'Quilpué': '#80a3c1',
      'Concón': '#66b9d4',
      'Valparaíso': '#669fd9',
      'Viña del Mar': '#4d7ec7',
      'Puchuncaví': '#3060c7',
      'Quintero': '#1e5ea0',
      'Casablanca': '#1a4068',
      'San Antonio': '#4179aa',
      'Cartagena': '#b3d4e4',
      'El Quisco': '#7ea8c0',
      'El Tabo': '#a1c4d4',
      'Algarrobo': '#5d91b6',
      'Santo Domingo': '#a9d3a7' // Santo Domingo para Isla de Pascua visualmente cercana
    }
  };


  
  // Font Awesome icons
  faChild = faChild;
  faBed = faBed;
  faBaby = faBaby;
  faPeopleRoof = faPeopleRoof;
  faBus = faBus;
  faShieldAlt = faShieldAlt;
  faBuilding = faBuilding;
  faTree = faTree;
  faChalkboardTeacher = faChalkboardTeacher;
  faGlobe = faGlobe;
  faUsers = faUsers;
  faGraduationCap = faGraduationCap;
  faPeopleArrows = faPeopleArrows;
  faDesktop = faDesktop;
  faCalendar = faCalendar;
  faDollarSign=faDollarSign;
  faChartPie=faChartPie;
  faCheckCircle=faCheckCircle
  faRotate=faRotate;
  faBox=faBox;
  faHeart=faHeart;
  faCog=faCog;
  faBook=faBook;
  faCalendarDays=faCalendarDays;

  tarjetasSuperiores = [
    { icon: this.faChild, titulo: 'Salas Cuna y Jardines Infantiles', valor: 80 },
    { icon: this.faBed, titulo: 'Jardines Infantiles', valor: 28 },
    { icon: this.faBaby, titulo: 'Sala Cuna', valor: 6 },
    { icon: this.faPeopleRoof, titulo: 'Establecimientos', valor: 116 },
    { icon: this.faBus, titulo: 'Jardín Sobre Ruedas', valor: 16 },
    { icon: this.faBaby, titulo: 'Modalidad No Convencional', valor: 80 }
  ];

  tarjetasInferiores: TarjetaItem[] = [
    { titulo: 'Ejecución Presupuestaria', icon: faDollarSign },
    { titulo: 'Rendición y Costos CMM', icon: faChartPie },
    { titulo: 'Total Anticipos Fondos Adelantados', icon: faUsers },
    { titulo: 'Presupuestos Negativos Informes', icon: faCheckCircle },
    { titulo: 'Rotación Ejemplo', icon: faRotate },
    { titulo: 'Permanencia Ejemplo', icon: faBuilding },
    { titulo: 'Ausentismo Ejemplo', icon: faCalendarDays },
    { titulo: 'Indicador 1 Ejemplo', icon: faBox },
    { titulo: 'NEE Ejemplo', icon: faGraduationCap },
    { titulo: 'ATET Ejemplo', icon: faBook },
    { titulo: 'Indicador 1 Ejemplo', icon: faHeart },
    { titulo: 'Indicador 1 Ejemplo', icon: faCog }
];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedDataService: SharedDataService,
    
    private wsAdmSolService: WS_ADM_SOLService  // Agregar el nuevo servicio
  ) {}

  private isLoading = false;

  private clearState(): void {
    this.jardinesAcumulados = [];
    this.JardinesporRegion = [];
    this.mapInitialized = false;
    this.updatePending = false;
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
  }


  ngOnInit(): void {
      // Limpiamos el estado inicial
      this.clearState();
      this.jardinesAcumulados = [];
      this.JardinesporRegion = [];
      
      // Suscribirse a los cambios de navegación
      this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
          const regionId = Number(this.route.snapshot.paramMap.get('regionId'));
          if (!isNaN(regionId)) {
              this.loadRegionDataFromSidebar(regionId);
          }
      });
  
      // Carga inicial
      const initialRegionId = Number(this.route.snapshot.paramMap.get('regionId'));
      if (!isNaN(initialRegionId)) {
          this.loadRegionDataFromSidebar(initialRegionId);
      }
  }
  // Método seguro para obtener datos del mapa
private async fetchMapData(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error obteniendo datos del mapa:', error);
    return null;
  }
}

  private setupMapEventListeners(): void {
    if (!this.chart || !this.mapContainer?.nativeElement) return;

    const container = this.mapContainer.nativeElement;
    
    // Remover listeners existentes de manera segura
    const newContainer = container.cloneNode(true);
    container.parentNode?.replaceChild(newContainer, container);

    // Configurar nuevos listeners con manejo de errores
    newContainer.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      if (!this.chart) return;

      const mapView = (this.chart as any).mapView;
      if (!mapView) return;

      const zoomDelta = e.deltaY > 0 ? 0.8 : 1.2;
      requestAnimationFrame(() => {
        try {
          mapView.zoomBy(zoomDelta);
        } catch (error) {
          console.error('Error durante zoom:', error);
        }
      });
    }, { passive: false });
  }
  private createMapOptions(mapData: any, seriesData: any[]): Highcharts.Options {
    const jardinesPoints = this.processJardinesPoints();
    console.log('Puntos procesados:', jardinesPoints.length);
  
    return {
      chart: {
        map: mapData,
        backgroundColor: '#ffffff',
        height: '500px',
        style: {
          fontFamily: 'Arial, sans-serif'
        },
        animation: {
          duration: 1000
        },
        events: {
          load: function() {
            try {
              const chart = this as any;
              if (chart.mapView) {
                const bounds = chart.series[0].bounds;
                if (bounds) {
                  const centerX = (bounds.x1 + bounds.x2) / 2;
                  const centerY = (bounds.y1 + bounds.y2) / 2;
  
                  const padding = 0.1;
                  const containerAspectRatio = chart.chartWidth / chart.chartHeight;
                  const boundsWidth = bounds.x2 - bounds.x1;
                  const boundsHeight = bounds.y2 - bounds.y1;
                  const boundsAspectRatio = boundsWidth / boundsHeight;
  
                  let zoom;
                  if (containerAspectRatio > boundsAspectRatio) {
                    zoom = (chart.chartHeight / boundsHeight) * (1 - padding);
                  } else {
                    zoom = (chart.chartWidth / boundsWidth) * (1 - padding);
                  }
  
                  chart.mapView.setView(
                    [centerY, centerX],
                    zoom,
                    false
                  );
  
                  chart.mapView.minZoom = zoom * 0.5;
                  chart.mapView.maxZoom = zoom * 4;
                }
              }
            } catch (error) {
              console.error('Error en el evento load del mapa:', error);
            }
          }
        }
      },
      title: {
        text: 'Mapa de ' + this.RegionSeleccionada,
        style: {
          fontSize: '18px',
          fontWeight: 'bold'
        }
      },
      mapView: {
        projection: {
          name: 'WebMercator'
        }
      },
      mapNavigation: {
        enabled: true,
        enableButtons: true,
        enableDoubleClickZoom: false,
        enableMouseWheelZoom: true,
        enableTouchZoom: true,
        buttonOptions: {
          verticalAlign: 'middle',
          align: 'right',
          width: 30,
          height: 30,
          style: {
            fontSize: '15px',
            fontWeight: 'bold'
          }
        },
        buttons: {
          zoomIn: {
            text: '+',
            onclick: function(e: MouseEvent) {
              e.preventDefault();
              e.stopPropagation();
              const chart = (this as any).chart;
              if (chart.mapView) {
                chart.mapView.zoomBy(1.25);
              }
            }
          },
          zoomOut: {
            text: '-',
            onclick: function(e: MouseEvent) {
              e.preventDefault();
              e.stopPropagation();
              const chart = (this as any).chart;
              if (chart.mapView) {
                chart.mapView.zoomBy(0.8);
              }
            }
          }
        }
      },
      colorAxis: undefined,
      legend: {
        enabled: false
      },
      tooltip: this.getTooltipConfig(),
      plotOptions: {
        series: {
          animation: {
            duration: 500
          },
          states: {
            hover: {
              brightness: 0.1
            },
            inactive: {
              opacity: 1
            }
          }
        },
        map: {
          nullInteraction: true,
          allAreas: true,
          enableMouseTracking: true,
          states: {
            hover: {
              brightness: 0.1
            }
          }
        }
      },
      series: [
        {
          type: 'map',
          name: 'Comunas',
          states: {
            hover: {
              brightness: 0.1,
              borderColor: '#303030',
              borderWidth: 2
            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            style: {
              color: 'black',
              textOutline: '2px white',
              fontWeight: 'normal',
              fontSize: '11px'
            }
          },
          data: seriesData.map(item => ({
            ...item,
            color: this.regionColors[this.RegionSeleccionada]?.[item.name] || '#E6F3FF'
          })),
          joinBy: ['Comuna', 'hc-key']
        } as any,
        {
          type: 'mappoint',
          name: 'Jardines',
          data: jardinesPoints,
          tooltip: {
            headerFormat: '',
            pointFormat: `
              <div style="padding: 10px;">
                <h4 style="margin: 0 0 8px 0; color: #333;">{point.datos.nombreJardin}</h4>
                <p style="margin: 4px 0;"><strong>Dirección:</strong> {point.datos.calle}</p>
                <p style="margin: 4px 0;"><strong>Comuna:</strong> {point.datos.codCom}</p>
                <p style="margin: 4px 0;"><strong>Director:</strong> {point.datos.director}</p>
                <p style="margin: 4px 0;"><strong>Código Jardín:</strong> {point.datos.jardin}</p>
                <p style="margin: 4px 0;"><strong>Modalidad:</strong> {point.datos.modalidad}</p>
                <p style="margin: 4px 0;"><strong>Estado:</strong> {point.datos.estado}</p>
                <p style="margin: 4px 0;"><strong>Ubicación:</strong> {point.datos.ubicacion}</p>
              </div>
            `
          }
        }
      ],
      credits: {
        enabled: false
      }
    };
  }

  private processJardinesPoints(): any[] {
    console.log('Procesando jardines:', this.JardinesporRegion.length);
    
    return this.JardinesporRegion
      .filter(jardin => {
        const hasCoords = jardin.latitud && jardin.longitud;
        if (!hasCoords) {
          console.warn('Jardín sin coordenadas:', jardin.nombreJardin);
        }
        return hasCoords;
      })
      .map(jardin => {
        try {
          const lat = this.parseCoordinate(jardin.latitud);
          const lon = this.parseCoordinate(jardin.longitud);
  
          return {
            type: 'mappoint',
            name: jardin.nombreJardin || '',
            geometry: {
              type: 'Point',
              coordinates: [lon, lat]
            },
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 4,
              fillColor: '#FF1493',
              lineWidth: 1,
              lineColor: '#FFFFFF'
            },
            datos: {
              nombreJardin: jardin.nombreJardin || '',
              calle: jardin.calle || '',
              codCom: jardin.codCom || '',
              jardin: jardin.jardin || '',
              modalidad: jardin.modalidad || '',
              ubicacion: jardin.ubicacion || '',
              director: jardin.director || '',
              estado: jardin.estado || ''
            }
          };
        } catch (error) {
          console.error('Error procesando jardín:', jardin.nombreJardin, error);
          return null;
        }
      })
      .filter(point => point !== null);
  }
  // Método corregido para crear el mapa
private async createMap(mapData: any, seriesData: any[]): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      try {
        const container = document.getElementById('map-container');
        if (!container) {
          throw new Error('Contenedor del mapa no encontrado');
        }

        // Asegurar que el contenedor sea visible
        container.style.display = 'block';
        container.style.height = '500px';
        container.style.width = '100%';

        const options = this.createMapOptions(mapData, seriesData);
        
        // Crear el mapa de forma segura
        if (this.chart) {
          this.chart.destroy();
        }
        
        this.chart = Highcharts.mapChart('map-container', options);
        
        if (this.chart) {
          this.setupMapEventListeners();
          this.mapInitialized = true;
        }

        resolve();
      } catch (error) {
        console.error('Error creando mapa:', error);
        resolve();
      }
    });
  });
}

// Método seguro para manejar las series del chart
private updateExistingMap(seriesData: any[]): void {
  if (!this.chart || !this.chart.series) {
    console.warn('Chart o series no disponibles para actualización');
    return;
  }

  try {
    // Actualizar de forma segura
    this.chart.series.forEach((series, index) => {
      if (index === 0) { // Serie principal del mapa
        series.setData(seriesData, true, { duration: 500 });
      }
    });
  } catch (error) {
    console.error('Error actualizando series del mapa:', error);
  }
}

private async updateMapData(seriesData: any[]): Promise<void> {
  if (!this.chart || !this.chart.series) {
    console.warn('Chart o series no disponibles para actualización');
    return;
  }

  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      try {
        // Verificar que chart.series existe y es un array
        const series = this.chart?.series;
        if (Array.isArray(series)) {
          series.forEach((serie, index) => {
            if (index === 0 && serie && typeof serie.setData === 'function') {
              serie.setData(seriesData, true, { duration: 500 });
            }
          });
        }
        resolve();
      } catch (error) {
        console.error('Error actualizando datos del mapa:', error);
        resolve();
      }
    });
  });
}
  // Método actualizado para la carga de datos de región
private async loadRegionDataFromSidebar(regionId: number) {
  if (this.updatePending) {
    console.log('Actualización pendiente, esperando...');
    return;
  }

  this.updatePending = true;

  try {
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }

    await new Promise<void>((resolve) => {
      this.updateTimeout = setTimeout(async () => {
        try {
          console.log('Iniciando carga de región:', regionId);

          await this.loadData(regionId.toString());
          
          const mapDataUrl = this.getGeoJsonUrl(regionId);
          const mapData = await this.fetchMapData(mapDataUrl);
          const seriesData = this.processMapData(mapData);

          if (this.currentRegionId !== regionId) {
            this.currentRegionId = regionId;
            this.RegionSeleccionada = this.getRegionNameById(regionId);
            await this.createMap(mapData, seriesData);
          } else {
            await this.updateExistingMap(seriesData);
          }

          resolve();
        } catch (error) {
          console.error('Error en la carga de datos:', error);
          resolve();
        }
      }, this.debounceTime);
    });

  } catch (error) {
    console.error('Error en loadRegionDataFromSidebar:', error);
  } finally {
    this.updatePending = false;
  }
}



private jardinesAcumulados: Jardin[] = [];

loadData(region: string, offset: string = ''): void {
    // Limpiar acumulador solo en la primera llamada
    if (!offset) {
      this.jardinesAcumulados = [];
    }
  
    this.wsAdmSolService.getData(region, offset).subscribe({
      next: (fields) => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(fields, 'text/xml');
          
          const solmasElement = xmlDoc.getElementsByTagName('SOLMAS')[0];
          const solmas = solmasElement ? solmasElement.textContent?.trim() : '';
          
          const soloutElement = xmlDoc.getElementsByTagName('SOLOUT')[0];
          if (!soloutElement) {
            throw new Error('No se encontró el elemento SOLOUT');
          }
  
          const jsonContent = soloutElement.textContent;
          if (!jsonContent) {
            throw new Error('SOLOUT está vacío');
          }
  
          const jsonData = JSON.parse(jsonContent);
          const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
          
          console.log('Procesando lote de', dataArray.length, 'jardines');
          
          dataArray.forEach(item => {
            const primerJorNiv = item.Jor_Niv && item.Jor_Niv.length > 0 ? item.Jor_Niv[0] : null;
  
            this.jardinesAcumulados.push({
              codReg: item.CodReg || '',
              region: item.Region || '',
              codCom: item.CodCom || '',
              comuna: item.Comuna || '',
              jardin: item.Jardin || '',
              nombreJardin: item.Nombre_Jardin || '',
              estado: item.Estado || '',
              codMod: item.CodMod || '',
              modalidad: item.Modalidad || '',
              ubicacion: item.Ubicacion || '',
              latitud: item.Latitud || '',
              longitud: item.Longitud || '',
              calle: item.Calle || '',
              rbd: item.RBD || '',
              fono_1: item.Fono_1 || '',
              correo: item.Correo || '',
              director: item.Director || '',
              cjor: primerJorNiv ? primerJorNiv.Cjor || '' : '',
              jor: primerJorNiv ? primerJorNiv.Jor || '' : '',
              cniv: primerJorNiv ? primerJorNiv.Cniv || '' : '',
              niv: primerJorNiv ? primerJorNiv.Niv || '' : '',
              gru: primerJorNiv ? primerJorNiv.Gru || '' : '',
              cap: primerJorNiv ? primerJorNiv.Cap || '' : ''
            });
          });
  
          console.log(`Jardines acumulados hasta ahora: ${this.jardinesAcumulados.length}`);
          
          if (solmas && solmas !== '') {
            console.log(`Cargando más datos con offset: ${solmas}`);
            this.loadData(region, solmas);
          } else {
            console.log('Carga completa. Total de jardines:', this.jardinesAcumulados.length);
            this.JardinesporRegion = [...this.jardinesAcumulados];
            console.log('Tabla definitiva de jardines acumulados:', this.JardinesporRegion);
          }
  
        } catch (error) {
          console.error('Error procesando los datos:', error);
          if (this.jardinesAcumulados.length > 0) {
            this.JardinesporRegion = [...this.jardinesAcumulados];
            console.log('Tabla definitiva de jardines acumulados (con error):', this.JardinesporRegion);
          }
        }
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
        if (this.jardinesAcumulados.length > 0) {
          this.JardinesporRegion = [...this.jardinesAcumulados];
          console.log('Tabla definitiva de jardines acumulados (con error):', this.JardinesporRegion);
        }
      }
    });
  }




private async loadRegionData(regionId: number): Promise<void> {
    try {
      // Esperar a que los datos se carguen completamente
      await new Promise<void>((resolve) => {
        this.loadData(regionId.toString());
        
        const checkInterval = setInterval(() => {
          if (this.JardinesporRegion.length > 0) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
        
        // Timeout después de 10 segundos
        setTimeout(() => {
          clearInterval(checkInterval);
          resolve();
        }, 10000);
      });
  
      // Cargar y procesar los datos del mapa
      const mapDataUrl = this.getGeoJsonUrl(regionId);
      const response = await fetch(mapDataUrl);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      const mapData = await response.json();
      console.log('MapData cargado:', mapData);
      
      // Procesar datos y renderizar
      const seriesData = this.processMapData(mapData);
      await this.renderMap(mapData, seriesData);
  
    } catch (error) {
      console.error('Error al cargar los datos de la región:', error);
    }
  }

// Método corregido para procesar datos del mapa
private processMapData(mapData: any) {
  if (!mapData || !mapData.features) {
    console.warn('Datos del mapa no válidos');
    return [];
  }

  // Asegurarnos de obtener los colores correctos para la región actual
  const regionKey = this.RegionSeleccionada?.trim() || '';
  const comunaColors = this.regionColors[regionKey] || {};
  const jardinesRegion = this.jardinesData[regionKey] || {};

  console.log('Región seleccionada:', regionKey);
  console.log('Colores disponibles:', comunaColors);

  return mapData.features.map((f: any) => {
    try {
      const nombreComuna = f.properties?.['Comuna'] || '';
      const datosComuna = jardinesRegion[nombreComuna.toUpperCase()] || {};
      
      // Obtener el color específico para la comuna
      const comunaColor = comunaColors[nombreComuna];
      console.log(`Comuna: ${nombreComuna}, Color asignado: ${comunaColor}`);

      return {
        'hc-key': nombreComuna,
        name: nombreComuna,
        cantidadJardines: f.properties?.['CantidadJardines'] || 0,
        codigoComuna: f.properties?.['CodCom'] || '',
        value: f.properties?.['CantidadJardines'] || 0,
        color: comunaColor || '#E6F3FF', // Color por defecto si no hay color asignado
        properties: {
          ...f.properties
        }
      };
    } catch (error) {
      console.error('Error procesando feature del mapa:', error);
      return null;
    }
  }).filter((item: MapFeatureData | null): item is MapFeatureData => item !== null);
}

private getTooltipConfig(): Highcharts.TooltipOptions {
    return {
      enabled: true,
      useHTML: true,
      headerFormat: '',
      backgroundColor: 'transparent',
      borderWidth: 0,
      shadow: false,
      style: {
        padding: '0px'
      },
      pointFormat: `
        <div class="custom-tooltip" style="
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          min-width: 250px;
          border: 1px solid #e0e6ed;
          font-family: 'Arial', sans-serif;
        ">
          <div class="tooltip-header" style="
            background: #f8fafc;
            padding: 12px 15px;
            border-bottom: 1px solid #e0e6ed;
            border-radius: 8px 8px 0 0;
            display: flex;
            align-items: center;
            gap: 10px;
          ">
            <div class="icon" style="
              background: #eef2ff;
              padding: 8px;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Techo rojo con patrón de rayas -->
                <path d="M2 12 L12 2 L22 12" fill="#FF9B9B" stroke="none"/>
                <g fill="#FF8B8B" opacity="0.5">
                  <path d="M4 10 L5 9 L5.5 9.5 L4.5 10.5 Z"/>
                  <path d="M6 8 L7 7 L7.5 7.5 L6.5 8.5 Z"/>
                  <path d="M8 6 L9 5 L9.5 5.5 L8.5 6.5 Z"/>
                  <path d="M10 4 L11 3 L11.5 3.5 L10.5 4.5 Z"/>
                  <path d="M12 6 L13 5 L13.5 5.5 L12.5 6.5 Z"/>
                  <path d="M14 8 L15 7 L15.5 7.5 L14.5 8.5 Z"/>
                  <path d="M16 10 L17 9 L17.5 9.5 L16.5 10.5 Z"/>
                </g>
  
                <!-- Pared verde con patrón de rayas -->
                <rect x="4" y="12" width="16" height="10" fill="#96DEB3"/>
                <g fill="#86CEA3" opacity="0.5">
                  <path d="M6 14 L7 13 L7.5 13.5 L6.5 14.5 Z"/>
                  <path d="M8 16 L9 15 L9.5 15.5 L8.5 16.5 Z"/>
                  <path d="M10 18 L11 17 L11.5 17.5 L10.5 18.5 Z"/>
                  <path d="M12 20 L13 19 L13.5 19.5 L12.5 20.5 Z"/>
                  <path d="M14 18 L15 17 L15.5 17.5 L14.5 18.5 Z"/>
                  <path d="M16 16 L17 15 L17.5 15.5 L16.5 16.5 Z"/>
                </g>
  
                <!-- Ventana triangular azul -->
                <path d="M11 8 L12 6 L13 8 Z" fill="#6B8AF7"/>
  
                <!-- Arco morado con patrón de rayas -->
                <path d="M6 18 C6 14 18 14 18 18" fill="#D8BFFF" stroke="none"/>
                <g fill="#C4A7FF" opacity="0.5">
                  <path d="M8 16 L9 15.5 L9.5 16 L8.5 16.5 Z"/>
                  <path d="M10 15.5 L11 15 L11.5 15.5 L10.5 16 Z"/>
                  <path d="M12 15 L13 14.5 L13.5 15 L12.5 15.5 Z"/>
                  <path d="M14 15.5 L15 15 L15.5 15.5 L14.5 16 Z"/>
                  <path d="M16 16 L17 15.5 L17.5 16 L16.5 16.5 Z"/>
                </g>
              </svg>
            </div>
            <span style="
              font-weight: 600;
              color: #1e293b;
              font-size: 15px;
            ">{point.name}</span>
          </div>
          
          <div class="tooltip-body" style="padding: 15px;">
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            ">
              <span style="
                color: #64748b;
                font-size: 13px;
              ">Código Comuna</span>
              <span style="
                color: #1e293b;
                font-weight: 500;
                font-size: 13px;
              ">{point.codigoComuna}</span>
            </div>
            
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            ">
              <span style="
                color: #64748b;
                font-size: 13px;
              ">Total Jardines</span>
              <span style="
                background: #eef2ff;
                color: #4361ee;
                padding: 4px 8px;
                border-radius: 4px;
                font-weight: 600;
                font-size: 13px;
              ">{point.value}</span>
            </div>
          </div>
        </div>
      `,
      positioner: function(labelWidth, labelHeight, point) {
        const chart = this.chart;
        let x = point.plotX + chart.plotLeft;
        let y = point.plotY + chart.plotTop;
        
        if (x + labelWidth > chart.plotWidth) {
          x = point.plotX + chart.plotLeft - labelWidth;
        }
        if (y + labelHeight > chart.plotHeight) {
          y = point.plotY + chart.plotTop - labelHeight;
        }
        
        return {
          x: x,
          y: y
        };
      }
    };
  }
  private parseCoordinate(coord: string): number {
    try {
      if (!coord) return NaN;
      
      // Limpiar la cadena de coordenadas
      const cleanCoord = coord.replace(/['"°\s]/g, '').trim();
      
      // Convertir a número y verificar que es válido
      const num = parseFloat(cleanCoord);
      
      if (isNaN(num)) {
        console.warn('Coordenada inválida:', coord);
        return NaN;
      }
      
      // Redondear a 6 decimales para evitar problemas de precisión
      return Number(num.toFixed(6));
    } catch (error) {
      console.error('Error parseando coordenada:', coord, error);
      return NaN;
    }
  }

  private async renderMap(mapData: any, seriesData: any[]): Promise<void> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        try {
            const jardinesPoints = this.JardinesporRegion
            .filter(jardin => jardin.latitud && jardin.longitud) // Filtrar jardines sin coordenadas
            .map(jardin => {
              const lat = this.parseCoordinate(jardin.latitud);
              const lon = this.parseCoordinate(jardin.longitud);
          
              return {
                type: 'mappoint',
                name: '',
                geometry: {
                  type: 'Point',
                  coordinates: [lon, lat]
                },
                marker: {
                  enabled: true,
                  symbol: 'circle',
                  radius: 4,
                  fillColor: '#FF1493',
                  lineWidth: 1,
                  lineColor: '#FFFFFF'
                },
                datos: {
                  nombreJardin: jardin.nombreJardin || '',
                  calle: jardin.calle,
                  codCom: jardin.codCom,
                  jardin: jardin.jardin,
                  modalidad: jardin.modalidad,
                  ubicacion: jardin.ubicacion,
                  director: jardin.director,
                  estado: jardin.estado
                }
              };
            })
            .filter(point => {
              const coords = point.geometry.coordinates;
              return coords && 
                     Array.isArray(coords) && 
                     coords.length === 2 && 
                     !isNaN(coords[0]) && 
                     !isNaN(coords[1]) && 
                     coords[0] !== 0 && 
                     coords[1] !== 0;
            });
          
          console.log('Puntos procesados:', jardinesPoints.length);
                    
  
          console.log('Puntos a renderizar:', jardinesPoints.length);
  
          const mapOptions: Highcharts.Options = {
            chart: {
              map: mapData,
              backgroundColor: '#ffffff',
              height: '400px',
              style: {
                fontFamily: 'Arial, sans-serif'
              },
              animation: {
                duration: 1000
              },
              events: {
                load: function() {
                  try {
                    const chart = this as any;
                    if (chart.mapView) {
                      const bounds = chart.series[0].bounds;
                      if (bounds) {
                        const centerX = (bounds.x1 + bounds.x2) / 2;
                        const centerY = (bounds.y1 + bounds.y2) / 2;
  
                        const padding = 0.1;
                        const containerAspectRatio = chart.chartWidth / chart.chartHeight;
                        const boundsWidth = bounds.x2 - bounds.x1;
                        const boundsHeight = bounds.y2 - bounds.y1;
                        const boundsAspectRatio = boundsWidth / boundsHeight;
  
                        let zoom;
                        if (containerAspectRatio > boundsAspectRatio) {
                          zoom = (chart.chartHeight / boundsHeight) * (1 - padding);
                        } else {
                          zoom = (chart.chartWidth / boundsWidth) * (1 - padding);
                        }
  
                        chart.mapView.setView(
                          [centerY, centerX],
                          zoom,
                          false
                        );
  
                        chart.mapView.minZoom = zoom * 0.5;
                        chart.mapView.maxZoom = zoom * 4;
                      }
                    }
                  } catch (error) {
                    console.error('Error en el evento load:', error);
                  }
                }
              }
            },
            title: {
              text: 'Mapa de ' + this.RegionSeleccionada,
              style: {
                fontSize: '18px',
                fontWeight: 'bold'
              }
            },
            subtitle: {
              text: '',
              style: {
                fontSize: '12px',
                color: '#666666'
              }
            },
            mapView: {
              projection: {
                name: 'WebMercator'
              }
            },
            mapNavigation: {
              enabled: true,
              enableButtons: true,
              enableDoubleClickZoom: false,
              enableMouseWheelZoom: true,
              enableTouchZoom: true,
              buttonOptions: {
                verticalAlign: 'middle',
                align: 'right',
                width: 30,
                height: 30,
                style: {
                  fontSize: '15px',
                  fontWeight: 'bold'
                }
              },
              buttons: {
                zoomIn: {
                  text: '+',
                  onclick: function(e: MouseEvent) {
                    e.preventDefault();
                    e.stopPropagation();
                    const chart = (this as any).chart;
                    if (chart.mapView) {
                      chart.mapView.zoomBy(1.25);
                    }
                  }
                },
                zoomOut: {
                  text: '-',
                  onclick: function(e: MouseEvent) {
                    e.preventDefault();
                    e.stopPropagation();
                    const chart = (this as any).chart;
                    if (chart.mapView) {
                      chart.mapView.zoomBy(0.8);
                    }
                  }
                }
              }
            },
            colorAxis: [{
              min: 0,
              max: 100,
              minColor: '#E6F3FF',
              maxColor: '#1565C0',
              showInLegend: true
            }],
            legend: {
              enabled: true,
              align: 'right',
              verticalAlign: 'middle',
              layout: 'vertical',
              title: {
                text: 'Valores'
              }
            },
            tooltip: {
              useHTML: true,
              headerFormat: '',
              formatter: function(this: Highcharts.TooltipFormatterContextObject): string {
                const point = this.point as any;
                
                if (point.series.type === 'mappoint') {
                  return `
                    <div style="padding: 10px;">
                      <h4 style="margin: 0 0 8px 0; color: #333;">${point.datos.nombreJardin || ''}</h4>
                      <p style="margin: 4px 0;"><strong>Dirección:</strong> ${point.datos.calle || ''}</p>
                      <p style="margin: 4px 0;"><strong>Comuna:</strong> ${point.datos.codCom || ''}</p>
                      <p style="margin: 4px 0;"><strong>Director:</strong> ${point.datos.director || ''}</p>
                      <p style="margin: 4px 0;"><strong>Código Jardín:</strong> ${point.datos.jardin || ''}</p>
                      <p style="margin: 4px 0;"><strong>Modalidad:</strong> ${point.datos.modalidad || ''}</p>
                      <p style="margin: 4px 0;"><strong>Estado:</strong> ${point.datos.estado || ''}</p>
                      <p style="margin: 4px 0;"><strong>Ubicación:</strong> ${point.datos.ubicacion || ''}</p>
                    </div>
                  `;
                } else {
                  return `
                    <div style="padding: 10px;">
                      <h4 style="margin: 0 0 8px 0; color: #333;">${point.name || ''}</h4>
                      <p style="margin: 4px 0;"><strong>Total Jardines:</strong> ${point.value || 0}</p>
                    </div>
                  `;
                }
              }
            },
            plotOptions: {
              series: {
                animation: {
                  duration: 500
                },
                states: {
                  hover: {
                    brightness: 0.1
                  },
                  inactive: {
                    opacity: 1
                  }
                }
              },
              map: {
                nullInteraction: true,
                allAreas: true,
                enableMouseTracking: true,
                states: {
                  hover: {
                    color: '#a4edba'
                  }
                }
              }
            },
            series: [
                {
                  type: 'map',
                  name: 'Comunas',
                  states: {
                    hover: {
                      brightness: 0.1,
                      borderColor: '#303030',
                      borderWidth: 2
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  data: seriesData,
                  joinBy: ['Comuna', 'hc-key']
                } as any,
                {
                  type: 'mappoint',
                  name: 'Jardines',
                  data: jardinesPoints,
                  dataLabels: {
                    enabled: false  // Deshabilitar las etiquetas de datos
                  },
                  tooltip: {
                    headerFormat: ''
                  },
                  animation: {
                    duration: 1000
                  }
                }
              ],
            credits: {
              enabled: false
            }
          };
  
          const container = document.getElementById('map-container');
         // 1. Verificación inicial del contenedor
if (container) {
    // 2. Inicialización de Highcharts.maps
    if (!Highcharts.maps) {
      Highcharts.maps = {}; // Asegura que existe el objeto maps
    }
  
    // 3. Limpieza de instancia previa
    if (this.chart) {
      this.chart.destroy(); // Destruye la instancia anterior para evitar memory leaks
    }
  
    // 4. Configuración del contenedor
    container.style.height = '500px';
    container.style.width = '100%';
  
    // 5. Creación del nuevo mapa
    this.chart = Highcharts.mapChart('map-container', mapOptions);
  
    // 6. Manejador del evento wheel (scroll del mouse)
    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();     // Previene el scroll por defecto
        e.stopPropagation();   // Evita que el evento se propague a elementos padres
        
        // Usar type assertion para acceder a mapView
        const chartInstance = this.chart as any;
        if (chartInstance?.mapView) {
          const delta = e.deltaY;  // Obtiene la dirección del scroll
          const zoomDelta = delta > 0 ? 0.8 : 1.2;  // scroll hacia abajo = alejar, hacia arriba = acercar
          
          requestAnimationFrame(() => {
            try {
              chartInstance.mapView.zoomBy(zoomDelta);
            } catch (error) {
              console.error('Error al hacer zoom:', error);
            }
          });
        }
      };
  
    // 8. Gestión de eventos
    container.removeEventListener('wheel', handleWheel); // Remueve listener previo
    
    // 9. Agrega el nuevo listener
    container.addEventListener('wheel', handleWheel, { 
      passive: false,  // Permite usar preventDefault()
      capture: true    // Captura el evento en la fase de captura
    });
  
    resolve(); // Resuelve la promesa
  } else {
    console.error('Contenedor del mapa no encontrado');
    resolve();
  }
        } catch (error) {
          console.error('Error al renderizar el mapa:', error);
          resolve();
        }
      });
    });
  }
  

  private updateRegion(regionId: number): void {
    console.log('Actualizando región:', regionId);
    this.RegionSeleccionada = this.getRegionNameById(regionId);
    
    // Destruir el mapa existente antes de cargar uno nuevo
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
    
    this.loadMapData(regionId);
  }

  private async loadMapData(regionId: number): Promise<void> {
    console.log('Cargando datos del mapa para la región:', regionId);
    const mapDataUrl = this.getGeoJsonUrl(regionId);

    try {
      const response = await fetch(mapDataUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const mapData = await response.json();
      console.log('Datos GeoJSON recibidos');
      
      this.chartOptions = this.createChartOptions(mapData);
      
      // Usar requestAnimationFrame para asegurar que el DOM esté listo
      requestAnimationFrame(() => {
        if (document.getElementById('map-container')) {
          this.initializeMap();
        } else {
          console.error('Contenedor del mapa no encontrado');
        }
      });
    } catch (error) {
      console.error('Error al cargar el mapa:', error);
    }
  }

  private initializeMap(): void {
    console.log('Inicializando mapa para la región:', this.RegionSeleccionada);
    
    if (!this.chartOptions) {
      console.error('No hay opciones de mapa disponibles');
      return;
    }
  
    try {
      const mapOptions: Highcharts.Options = {
        chart: {
          map: this.chartOptions.chart.map,
          height: '65%', // Ajustado para mantener consistencia
          backgroundColor: '#ffffff',
          style: {
            fontFamily: 'Arial, sans-serif'
          },
          panning: {
            enabled: true,
            type: 'xy'
          },
          zooming: {
            type: 'xy'
          },
          events: {
            load: function() {
              setTimeout(() => {
                try {
                  const chartRef = this as unknown as Highcharts.Chart & {
                    mapView?: any;
                  };
  
                  const series = chartRef.series[0];
                  if (series && (series as any).bounds) {
                    const bounds = (series as any).bounds;
                    const padding = 0.1;
                    const width = bounds.x2 - bounds.x1;
                    const height = bounds.y2 - bounds.y1;
                    const centerX = (bounds.x1 + bounds.x2) / 2;
                    const centerY = (bounds.y1 + bounds.y2) / 2;
  
                    const containerWidth = chartRef.chartWidth || 0;
                    const containerHeight = chartRef.chartHeight || 0;
  
                    const scaleX = containerWidth / (width * (1 + padding * 2));
                    const scaleY = containerHeight / (height * (1 + padding * 2));
                    const zoomFactor = 2;
                    const zoom = Math.min(scaleX, scaleY) * zoomFactor;
  
                    if (chartRef.mapView && typeof chartRef.mapView.setView === 'function') {
                      chartRef.mapView.setView(
                        [centerY, centerX],
                        zoom,
                        false
                      );
                      
                      // Configurar límites de zoom
                      chartRef.mapView.minZoom = 0.5;
                      chartRef.mapView.maxZoom = 10;
                    }
                  }
                } catch (error) {
                  console.error('Error ajustando la vista del mapa:', error);
                }
              }, 100);
            }
          }
        },
        mapView: {
          projection: {
            name: undefined
          }
        },
        title: {
          text: 'Mapa de ' + this.RegionSeleccionada,
          style: {
            fontSize: '18px',
            fontWeight: 'bold'
          }
        },
        mapNavigation: {
            enabled: true,
            enableDoubleClickZoom: false,
            enableMouseWheelZoom: true,
            enableTouchZoom: true,
            mouseWheelSensitivity: 1.1,
            buttons: {
              zoomIn: {
                text: '+',
                onclick: function() {
                  if ((this as any).chart?.mapView) {
                    (this as any).chart.mapView.zoomBy(1.2);
                  }
                }
              },
              zoomOut: {
                text: '-',
                onclick: function() {
                  if ((this as any).chart?.mapView) {
                    (this as any).chart.mapView.zoomBy(0.8);
                  }
                }
              }
            }
          },
        colorAxis: [{
          min: 0,
          max: 100,
          minColor: '#E6F3FF',
          maxColor: '#1565C0',
          showInLegend: false
        }],
        tooltip: {
          enabled: true,
          headerFormat: '',
          pointFormat: `
            <div style="text-align: center;">
              <span style="font-size: 14px; font-weight: bold;">{point.name}</span><br/>
              <span style="font-size: 12px;">Código Comuna: {point.codigoComuna}</span><br/>
              <span style="font-size: 12px;">Cantidad de Jardines: {point.value}</span><br/>
            </div>
          `,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderWidth: 1,
          borderColor: '#AAA',
          borderRadius: 8,
          shadow: true,
          useHTML: true
        },
        series: [{
          type: 'map',
          name: 'Comunas',
          data: this.chartOptions.series[0].data,
          mapData: this.chartOptions.chart.map,
          joinBy: ['Comuna', 'hc-key'],
          states: {
            hover: {
              brightness: 0.1,
              borderColor: '#303030',
              borderWidth: 2
            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            style: {
              color: 'black',
              textOutline: '2px white',
              fontWeight: 'normal',
              fontSize: '11px'
            }
          }
        } as any],
        credits: {
          enabled: false
        }
      };
  
      // Limpiar el contenedor antes de crear un nuevo mapa
      const container = document.getElementById('map-container');
      if (container) {
        // Destruir el mapa existente si existe
        if (this.chart) {
          this.chart.destroy();
        }
  
        console.log('Creando nuevo mapa');
        this.chart = Highcharts.mapChart('map-container', mapOptions);
        
        // Configurar eventos después de la inicialización
        if (container && (this.chart as any).mapView) {
          const mapView = (this.chart as any).mapView;
          
          container.addEventListener('wheel', (e: WheelEvent) => {
            e.preventDefault();
            if (mapView) {
              const currentZoom = mapView.zoom || 2;
              const zoomDelta = e.deltaY > 0 ? -0.2 : 0.2;
              const newZoom = Math.max(0.5, Math.min(10, currentZoom + zoomDelta));
              mapView.setZoom(newZoom);
            }
          }, { passive: false });
        }
        
        console.log('Mapa creado exitosamente');
      } else {
        console.error('Contenedor del mapa no encontrado');
      }
    } catch (error) {
      console.error('Error al inicializar el mapa:', error);
    }
  }
  

  createChartOptions(mapData: any): any {
    const coordinates = this.getRegionCoordinates(this.RegionSeleccionada);
    const comunaColors = this.regionColors[this.RegionSeleccionada] || {};
  
    const seriesData = mapData.features.map((f: any) => ({
      'hc-key': f.properties['Comuna'],
      value: f.properties['CantidadJardines'] || 0,
      color: comunaColors[f.properties['Comuna']] || '#cccccc',
      name: f.properties['Comuna'],
      codigoComuna: f.properties['CodCom'], // Código de la comuna
      cantidadJardines: f.properties['CantidadJardines'] || 0,
      properties: f.properties
    }));
    console.log("Datos de seriesData:", seriesData);
    return {
      chart: {
        map: mapData,
        events: {
          load: function(this: Highcharts.MapChart) {
            //if (this.mapView) {
            //  this.mapView.setView([coordinates[1], coordinates[0]], 5);
           // }
          }
        }
      },
      series: [{
        mapData: mapData,
        data: seriesData,
        joinBy: ['Comuna', 'hc-key']
      }]
    };
  }

  DistribuirEnColumnas(numColumnas: number = 4): ItemLista[][] {
    const listaCompleta: ItemLista[] = [];
    const jardinesAgrupados = this.getJardinesAgrupados();
    const comunasOrdenadas = Array.from(jardinesAgrupados.entries())
        .sort((a, b) => a[0].localeCompare(b[0]));

    for (const [comuna, jardines] of comunasOrdenadas) {
        // Agregar comuna
        listaCompleta.push({
            tipo: 'comuna',
            nombre: comuna,
            modalidad: '' // Agregar modalidad como un campo vacío para cumplir con la estructura
        });

        // Agregar establecimientos ordenados alfabéticamente
        jardines
            .sort((a, b) => a.nombreJardin.localeCompare(b.nombreJardin))
            .forEach(jardin => {
                listaCompleta.push({
                    tipo: 'establecimiento',
                    nombre: jardin.nombreJardin,
                    modalidad: jardin.modalidad,
                    codigo: jardin.jardin,
                    estado: jardin.estado,
                    ubicacion: jardin.ubicacion
                });
            });
    }

    // Distribuir en columnas de manera uniforme
    const itemsPorColumna = Math.ceil(listaCompleta.length / numColumnas);
    const columnas: ItemLista[][] = [];

    for (let i = 0; i < numColumnas; i++) {
        const inicio = i * itemsPorColumna;
        const fin = Math.min(inicio + itemsPorColumna, listaCompleta.length);
        columnas.push(listaCompleta.slice(inicio, fin));
    }

    return columnas;
}

// Añade estos métodos a tu clase CustomDashboardComponent
getTipoEstablecimiento(modalidad: string): string {
    const modalidadUpper = modalidad?.toUpperCase() || '';
    if (modalidadUpper.includes('SALA CUNA')) return 'SC';
    if (modalidadUpper.includes('JARDIN INFANTIL')) return 'JI';
    if (modalidadUpper.includes('PROGRAMA MEJORAMIENTO')) return 'PMI';
    if (modalidadUpper.includes('ALTERNATIVO')) return 'PA';
    if (modalidadUpper.includes('FAMILIAR')) return 'PF';
    if (modalidadUpper.includes('LABORAL')) return 'PL';
    return 'OT'; // Otros tipos
}

getJardinesAgrupadosEnColumnas(): ComunaGroup[] {
    // Primero agrupamos por comuna
    const jardinesAgrupados = new Map<string, Jardin[]>();
    
    this.JardinesporRegion.forEach(jardin => {
        if (!jardinesAgrupados.has(jardin.comuna)) {
            jardinesAgrupados.set(jardin.comuna, []);
        }
        jardinesAgrupados.get(jardin.comuna)?.push(jardin);
    });

    // Convertimos el Map a un array de objetos con la estructura deseada
    const comunasArray: ComunaGroup[] = Array.from(jardinesAgrupados.entries())
        .map(([comuna, jardines]) => ({
            nombreComuna: comuna,
            establecimientos: jardines.sort((a, b) => 
                a.nombreJardin.localeCompare(b.nombreJardin)
            )
        }))
        .sort((a, b) => a.nombreComuna.localeCompare(b.nombreComuna));

    return comunasArray;
}

sortEstablecimientos(establecimientos: Jardin[]): Jardin[] {
    // Primero los ordena por tipo y luego por nombre
    return establecimientos.sort((a, b) => {
        const tipoA = this.getTipoEstablecimiento(a.modalidad);
        const tipoB = this.getTipoEstablecimiento(b.modalidad);
        if (tipoA !== tipoB) {
            return tipoA.localeCompare(tipoB);
        }
        return a.nombreJardin.localeCompare(b.nombreJardin);
    });
}  
// Añade este método a tu clase CustomDashboardComponent
getJardinesAgrupados() {
    const jardinesAgrupados = new Map<string, Jardin[]>();
    
    this.JardinesporRegion.forEach(jardin => {
        if (!jardinesAgrupados.has(jardin.comuna)) {
            jardinesAgrupados.set(jardin.comuna, []);
        }
        jardinesAgrupados.get(jardin.comuna)?.push(jardin);
    });

    // Ordenar las comunas alfabéticamente
    return new Map([...jardinesAgrupados.entries()].sort());
}

// También puedes agregar este método helper si necesitas formatear la modalidad
getModalidadAbreviada(modalidad: string): string {
    if (!modalidad) return 'OT';
    
    const modalidadUpper = modalidad.toUpperCase();
    if (modalidadUpper.includes('JARDIN INFANTIL')) return 'JI';
    if (modalidadUpper.includes('SALA CUNA')) return 'SC';
    if (modalidadUpper.includes('FAMILIAR')) return 'PF';
    if (modalidadUpper.includes('LABORAL')) return 'PL';
    if (modalidadUpper.includes('PMI')) return 'PMI';
    if (modalidadUpper.includes('ALTERNATIVO')) return 'PA';
    if (modalidadUpper.includes('COMUNICACIONAL')) return 'PC';
    return 'OT';
}
  getGeoJsonUrl(regionId: number): string {
    const regionGeoJsonUrls: { [key: number]: string } = {
      1: '/assets/map/clta.geo.json',
      2: '/assets/map/clan.geo.json',
      3: '/assets/map/clat.geo.json',
      4: '/assets/map/clco.geo.json',
      5: '/assets/map/clvs.geo.json',
      601: '/assets/map/clrm_nor_oriente.geo.json',
      602:'/assets/map/clrm_ruralnor_poniente.geo.json',
      603:'/assets/map/clrm_sur_oriente.geo.json',
      7:'/assets/map/clog.geo.json',
      8:'/assets/map/clml.geo.json',
      9:'/assets/map/clbi.geo.json',
      10:'/assets/map/clar.geo.json',
      14:'/assets/map/cllr.geo.json',
      11:'/assets/map/clll.geo.json',
      12:'/assets/map/clay.geo.json',
      13:'/assets/map/clma.geo.json',
      15:'/assets/map/clap.geo.json',
      16:'/assets/map/clnu.geo.json'
    };

    return regionGeoJsonUrls[regionId] || '/assets/map/cl-all.geo.json';
  }

  getRegionCoordinates(region: string): [number, number] {
    const regionCoordinates: { [key: string]: [number, number] } = {
      'Tarapacá': [-69.6689, -20.2133],
      'Antofagasta': [-70.4000, -23.6500],
      'Atacama': [-70.2500, -27.3667],
      'Coquimbo': [-71.2500, -29.9533],
      'Valparaíso': [-71.6167, -33.0472], // Coordenadas aproximadas de Valparaíso
      'NorPoniente': [-80.77332956991316,-33.72414856743086] // Coordenadas aproximadas de Valparaíso
    };
  
    return regionCoordinates[region] || [0, 0]; // Valor predeterminado si la región no se encuentra
  }
  
  getRegionNameById(regionId: number): string {
    const regionNames: { [key: number]: string } = {
      1: 'Tarapacá',
      2: 'Antofagasta',
      3: 'Atacama',
      4: 'Coquimbo',
      5: 'Valparaíso', // ID para la Región de Valparaíso
      601: 'NorPoniente',
      602: 'Rural Norponiente',
      603:'Sur Oriente',
      7:'O’ higgins',
      8:'Maule',
      9:'Biobio',
      10:'Araucania',
      11:'Los Lagos',
      12:'Aysén',
      13:'Magallanes',
      14:'Los Ríos',
      15:'Arica y Parinacota',
      16:'Ñuble'
    };
  
    return regionNames[regionId] || 'Desconocida';
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }

    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }
}


@NgModule({
  declarations: [CustomDashboardComponent],
  imports: [CommonModule, FontAwesomeModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CustomDashboardModule {}