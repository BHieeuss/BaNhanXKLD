import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/Pages/home/home.component';
import { provideRouter, Routes, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { HeaderComponent } from './app/Layout/header/header.component';
import { BannerComponent } from './app/Layout/banner/banner.component';

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'home', component: HomeComponent },

  { path: 'header', component: HeaderComponent },
  { path: 'banner', component: BannerComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    provideAnimations(),
    BrowserAnimationsModule,
  ],
}).catch((err) => console.error(err));
