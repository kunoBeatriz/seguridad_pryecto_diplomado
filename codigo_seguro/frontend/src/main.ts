import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
/*
if (environment.production) {
  enableProdMode();
}
*/
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN', // acordar con backend
        headerName: 'X-XSRF-TOKEN',
      })
    ),
  ],
}).catch(err => console.error(err));
