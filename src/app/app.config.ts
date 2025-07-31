import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import{provideAnimations} from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loaderInterceptor } from './core/interceptors/loader/loader.interceptor';
 import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader,TranslateModule } from '@ngx-translate/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';




 export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, 'i18n/', '.json');
 }


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(),withInterceptors([headersInterceptor,errorsInterceptor,loaderInterceptor])),
    provideAnimations(),
    importProvidersFrom([NgxSpinnerModule,TranslateModule.forRoot({
      loader:{
           provide: TranslateLoader,
           useFactory: HttpLoaderFactory,
           deps: [HttpClient]
      }
    })]),
    provideRouter(routes,
      withInMemoryScrolling({scrollPositionRestoration:'enabled'}),
      withViewTransitions(),
    ), provideClientHydration(withEventReplay())]
};