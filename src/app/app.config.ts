import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {RectangleDataService} from "./service/rectange-data.service";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      provideHttpClient(),
      RectangleDataService,
  ]
};
