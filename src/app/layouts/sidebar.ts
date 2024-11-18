import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { slideDownUp } from '../shared/animations';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

import { faClipboard } from '@fortawesome/free-solid-svg-icons';


import { faGavel } from '@fortawesome/free-solid-svg-icons';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { RegionService } from '../region.service'; // Importar el servicio

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
    faCalendarDays,
    faHome,
    faShoppingCart

} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    animations: [slideDownUp],
})
export class SidebarComponent {
    active = false;
    store: any;
    activeDropdown: string[] = [];
    parentDropdown: string = '';
    faBriefcase = faBriefcase;
    faClipboard = faClipboard;
    faBook = faBook;
    faUsers = faUsers;
    faGavel = faGavel;
    faLaptopCode = faLaptopCode;
    faCogs = faCogs;
    faFileAlt = faFileAlt;
    faBuilding = faBuilding;
    faCircle = faCircle;
    faSchool = faSchool;    


    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
        private regionService: RegionService // Inyectar el servicio
        
    ) {
        this.initStore();
    }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    ngOnInit() {
        this.setActiveDropdown();
    }

    setActiveDropdown() {
        const selector = document.querySelector('.sidebar ul a[routerLink="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }

    toggleMobileMenu() {
        if (window.innerWidth < 1024) {
            this.storeData.dispatch({ type: 'toggleSidebar' });
        }
    }

    toggleAccordion(name: string, parent?: string) {
        if (this.activeDropdown.includes(name)) {
            this.activeDropdown = this.activeDropdown.filter((d) => d !== name);
        } else {
            this.activeDropdown.push(name);
        }
    }

    updateMap(regionId: number) {
        // Aquí debes implementar la lógica para actualizar el mapa según la región seleccionada.
        // Puedes comunicarte con el componente del mapa a través de un servicio compartido o
        // actualizando el estado de la aplicación con NgRx.
        this.regionService.setRegion(regionId);
        console.log(`Mapa actualizado para la región: ${regionId}`);
        // Implementa la lógica aquí para comunicar el cambio al componente que muestra el mapa.
        // Esto podría involucrar el uso de un servicio o la actualización de un estado compartido.
    }
}
