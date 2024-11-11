import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';  // FontAwesome import
import { HighchartsChartModule } from 'highcharts-angular';
import { TestDataComponent } from './components/test-data/test-data.component';
//import { CardsModule } from './components/cards/cards-module';
// Routes
import { routes } from './app.route';

import { AppComponent } from './app.component';

// store
import { StoreModule } from '@ngrx/store';
import { indexReducer } from './store/index.reducer';

// shared module
import { SharedModule } from 'src/shared.module';

// i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// AOT compilation support
export function HttpLoaderFactory(httpHandler: HttpBackend): TranslateHttpLoader {
    return new TranslateHttpLoader(new HttpClient(httpHandler));
}

// dashboard
import { AnalyticsComponent } from './analytics';
import { IndexComponent } from './index';
import { FinanceComponent } from './finance';
import { CryptoComponent } from './crypto';
//import { CustomDashboardComponent } from './components/ds-nivel-regional/custom-dashboard.component';
//import { CustomDashboardInicialComponent } from './components/ds-nivel-nacional/custom-dashboard-inicial.component';  // Asegúrate de importar aquí
import { SharedDataService } from './services/shared-data.service'; 
// widgets
import { WidgetsComponent } from './widgets';

// tables
import { TablesComponent } from './tables';

// font-icons
import { FontIconsComponent } from './font-icons';

// charts
import { ChartsComponent } from './charts';

// dragndrop
import { DragndropComponent } from './dragndrop';

// pages
import { KnowledgeBaseComponent } from './pages/knowledge-base';
import { FaqComponent } from './pages/faq';

// Layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

import { HeaderComponent } from './layouts/header';
import { FooterComponent } from './layouts/footer';
import { SidebarComponent } from './layouts/sidebar';
import { ThemeCustomizerComponent } from './layouts/theme-customizer';

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        //CardsModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpBackend],
            },
        }),
        StoreModule.forRoot({ index: indexReducer }),
        SharedModule.forRoot(),
        FontAwesomeModule,
        
        HighchartsChartModule,  
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        ThemeCustomizerComponent,
        TablesComponent,
        FontIconsComponent,
        ChartsComponent,
        IndexComponent,
        AnalyticsComponent,
        FinanceComponent,
        CryptoComponent,
        WidgetsComponent,
        DragndropComponent,
        AppLayout,
        AuthLayout,
        KnowledgeBaseComponent,
        FaqComponent,
        TestDataComponent,
        //CustomDashboardComponent,  // Asegúrate de incluir este componente
        //CustomDashboardInicialComponent // Asegúrate de incluir este componente
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [Title, SharedDataService],
    bootstrap: [AppComponent],
})
export class AppModule {}