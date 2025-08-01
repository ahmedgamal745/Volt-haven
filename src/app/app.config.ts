import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';
import {  provideHttpClient } from '@angular/common/http';
import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { NgxSpinnerModule } from 'ngx-spinner';


export const appConfig: ApplicationConfig = {
  providers: [
     provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
        MessageService,
        provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(),  importProvidersFrom(NgxSpinnerModule, ɵBrowserAnimationBuilder),
]
};
