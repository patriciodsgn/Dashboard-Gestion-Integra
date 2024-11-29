﻿import { Component, OnInit } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { Store } from '@ngrx/store';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from '../service/app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/login.services'; // Importa AuthService
import { UsuarioResponse } from '../services/login.services'; // Asegúrate de tener esta interfaz disponible

@Component({
  selector: 'header',
  templateUrl: './header.html',
  animations: [toggleAnimation],
})
export class HeaderComponent implements OnInit {
  store: any;
  usuario: any = null; // Variable para almacenar datos del usuario
  search = false;
  notifications = [
    {
      id: 1,
      profile: 'user-profile.jpeg',
      message: '<strong class="text-sm mr-1">Juan Pérez</strong> te invitó a colaborar en <strong>Evaluación de Programas Regionales</strong>',
      time: '45 min atrás',
    },
    {
      id: 2,
      profile: 'profile-34.jpeg',
      message: '<strong class="text-sm mr-1">Carolina Silva</strong> mencionó tu participación en <strong>Revisión de Indicadores Educativos</strong>',
      time: '3 horas atrás',
    },
    {
      id: 3,
      profile: 'profile-16.jpeg',
      message: '<strong class="text-sm mr-1">Felipe Martínez</strong> subió un archivo sobre <strong>Estadísticas de Jardines Infantiles</strong>',
      time: '9 horas atrás',
    },
  ];
  messages = [
    {
      id: 1,
      image: this.sanitizer.bypassSecurityTrustHtml(
        `<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </span>`
      ),
      title: 'Congratulations!',
      message: 'Your OS has been updated.',
      time: '1hr',
    },
    // Más mensajes...
  ];

  constructor(
    public translate: TranslateService,
    public storeData: Store<any>,
    public router: Router,
    private appSetting: AppService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    this.initStore();
  }

  ngOnInit(): void  {
    this.setActiveDropdown();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveDropdown();
      }
    });
    this.obtenerUsuario('usuario@correo.com'); // Reemplaza con un correo válido
  }

  async initStore() {
    this.storeData
      .select((d) => d.index)
      .subscribe((d) => {
        this.store = d;
      });
  }

  obtenerUsuario(correo: string): void {
    this.authService.getUsuario(correo).subscribe({
      next: (response: UsuarioResponse) => {
        console.log('Datos del usuario obtenidos:', response);
        this.usuario = response.data; // Almacena los datos en la variable usuario
      },
      error: (error) => {
        console.error('Error al obtener el usuario:', error);
      },
    });
  }


  setActiveDropdown() {
    const selector = document.querySelector('ul.horizontal-menu a[routerLink="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }

  removeNotification(value: number) {
    this.notifications = this.notifications.filter((d) => d.id !== value);
  }

  removeMessage(value: number) {
    this.messages = this.messages.filter((d) => d.id !== value);
  }

  changeLanguage(item: any) {
    this.translate.use(item.code);
    this.appSetting.toggleLanguage(item);
    if (this.store.locale?.toLowerCase() === 'ae') {
      this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
    } else {
      this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
    }
    window.location.reload();
  }
}
