import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
  withInMemoryScrolling,
} from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Zone change detection optimization
    provideZoneChangeDetection({
      eventCoalescing: true,
      runCoalescing: true,
    }),

    // Router optimization với preloading strategy
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),

    // Client hydration optimization
    provideClientHydration(withEventReplay()),

    // HTTP client optimization
    provideHttpClient(
      withFetch(), // Sử dụng Fetch API thay vì XMLHttpRequest
      withInterceptorsFromDi()
    ),
  ],
};
