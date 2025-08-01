import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

/**
 * Header Component
 * Provides navigation with smooth scrolling and active section highlighting
 * Includes SSR compatibility for server-side rendering
 */
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  // ===== PROPERTIES =====
  isMenuOpen = false;

  // ===== CONSTRUCTOR =====
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // ===== LIFECYCLE METHODS =====
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.onScroll();
    }
  }

  // ===== PUBLIC METHODS =====
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(event: Event) {
    event.preventDefault();
    if (!isPlatformBrowser(this.platformId)) return;

    const targetId = (event.target as HTMLAnchorElement)
      .getAttribute('href')
      ?.substring(1);
    const target = document.getElementById(targetId!);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.isMenuOpen = false;
    }
  }

  // ===== EVENT HANDLERS =====
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const scrollPos = window.pageYOffset;
    const anchors = document.querySelectorAll('.nav a');

    anchors.forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const section = document.querySelector(href);
      if (section) {
        const top = (section as HTMLElement).offsetTop;
        const bottom = top + (section as HTMLElement).offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          anchors.forEach((a) => a.classList.remove('active'));
          anchor.classList.add('active');
        }
      }
    });
  }
}
