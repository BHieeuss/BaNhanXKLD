import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { HeaderComponent } from './Layout/header/header.component';
import { CherryBlossomsComponent } from './shared/sakura-effect.component';
import { GoogleAnalyticsService } from './shared/analytics.service';
import { filter } from 'rxjs/operators';

/**
 * App Root Component
 * Main application component that includes header navigation and cherry blossoms animation
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CherryBlossomsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'SEIKI - Xuất khẩu lao động Nhật Bản';

  constructor(
    private router: Router,
    private analytics: GoogleAnalyticsService
  ) {}

  ngOnInit(): void {
    // Initialize tracking services (replace with your actual IDs)
    // this.analytics.initGoogleAnalytics('GA_TRACKING_ID');
    // this.analytics.initGoogleTagManager('GTM-XXXXXXX');
    // this.analytics.initFacebookPixel('YOUR_PIXEL_ID');

    // Track page views on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.analytics.trackPageView(event.urlAfterRedirects, document.title);
      });
  }
}
