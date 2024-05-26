import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { environment } from '../environments/environment';
import { ApiConfiguration } from '@common/api/api-configuration';
import { authInterceptor } from '@common/api/interceptor';
import { TuiDataListModule, TuiRootModule } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TAIGA_MODULES } from './taiga.modules';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserAnimationsModule, TuiRootModule, ...TAIGA_MODULES),
        { provide: ApiConfiguration, useValue: { rootUrl: environment.apiUrl } },

        provideRouter(
            [
                {
                    path: '',
                    loadComponent: () => import('./layout/layout.component'),
                    loadChildren: () => import('./layout/layout.routes'),
                },
            ],
            withHashLocation(),
        ),
        provideHttpClient(withInterceptors([authInterceptor()])),
    ],
};
