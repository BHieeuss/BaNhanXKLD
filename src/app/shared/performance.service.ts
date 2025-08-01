import { Injectable } from '@angular/core';

declare global {
  interface Window {
    gtag: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.initCoreWebVitals();
  }

  private initCoreWebVitals(): void {
    // Đo lường LCP (Largest Contentful Paint)
    this.measureLCP();

    // Đo lường FID (First Input Delay)
    this.measureFID();

    // Đo lường CLS (Cumulative Layout Shift)
    this.measureCLS();
  }

  private measureLCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;

        // LCP tốt: < 2.5s, cần cải thiện: 2.5-4s, kém: > 4s
        const lcpValue = lastEntry.startTime;
        console.log(`LCP: ${lcpValue}ms`);

        // Gửi dữ liệu đến Google Analytics (nếu có)
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: 'LCP',
            value: Math.round(lcpValue),
            custom_map: { metric_value: lcpValue },
          });
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  private measureFID(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          // FID tốt: < 100ms, cần cải thiện: 100-300ms, kém: > 300ms
          const fidValue = entry.processingStart - entry.startTime;
          console.log(`FID: ${fidValue}ms`);

          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'web_vitals', {
              event_category: 'Performance',
              event_label: 'FID',
              value: Math.round(fidValue),
              custom_map: { metric_value: fidValue },
            });
          }
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  private measureCLS(): void {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      let clsEntries: any[] = [];

      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        });

        // CLS tốt: < 0.1, cần cải thiện: 0.1-0.25, kém: > 0.25
        console.log(`CLS: ${clsValue}`);

        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: 'CLS',
            value: Math.round(clsValue * 1000),
            custom_map: { metric_value: clsValue },
          });
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  // Đo lường TTFB (Time to First Byte)
  measureTTFB(): void {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      const ttfb = navigation.responseStart - navigation.requestStart;

      console.log(`TTFB: ${ttfb}ms`);

      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: 'TTFB',
          value: Math.round(ttfb),
          custom_map: { metric_value: ttfb },
        });
      }
    }
  }

  // Theo dõi tốc độ tải trang
  measurePageLoadTime(): void {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;

        console.log(`Page Load Time: ${loadTime}ms`);

        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'page_load_time', {
            event_category: 'Performance',
            event_label: 'Page Load',
            value: Math.round(loadTime),
          });
        }
      }, 0);
    });
  }

  // Tối ưu hóa hình ảnh lazy loading
  optimizeImages(): void {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset['src']) {
                img.src = img.dataset['src'];
                img.classList.remove('lazy-load');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01,
        }
      );

      // Quan sát tất cả hình ảnh có class lazy-load
      document.querySelectorAll('img.lazy-load').forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }

  // Preload critical resources
  preloadCriticalResources(): void {
    const criticalResources = [
      '/assets/css/templatemo-space-dynamic.css',
      '/assets/js/templatemo-custom.js',
      '/assets/images/logo.png',
      '/assets/images/banner-right-image.png',
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';

      if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.match(/\.(jpg|jpeg|png|webp|svg)$/)) {
        link.as = 'image';
      }

      link.href = resource;
      document.head.appendChild(link);
    });
  }

  // Tối ưu hóa font loading
  optimizeFontLoading(): void {
    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.as = 'font';
    fontPreload.type = 'font/woff2';
    fontPreload.crossOrigin = 'anonymous';
    fontPreload.href =
      'https://fonts.gstatic.com/s/notosansjp/v52/k3kCo84MPvpLmixcA63oeALhL60rlh6oi6LoDAG12f_8UBdGAqz9XhAYj_Svi2QRyOg.woff2';
    document.head.appendChild(fontPreload);
  }

  // Tạo Service Worker cho caching
  registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }

  // Đo lường hiệu suất và báo cáo
  generatePerformanceReport(): any {
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;

    return {
      // Core Web Vitals
      metrics: {
        ttfb: navigation.responseStart - navigation.requestStart,
        fcp: this.getFirstContentfulPaint(),
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.fetchStart,
        loadComplete: navigation.loadEventEnd - navigation.fetchStart,
        // Mobile friendliness indicators
        viewport: window.innerWidth,
        userAgent: navigator.userAgent,
      },
      // SEO factors
      seo: {
        hasH1: document.querySelectorAll('h1').length > 0,
        hasMetaDescription: !!document.querySelector(
          'meta[name="description"]'
        ),
        hasCanonical: !!document.querySelector('link[rel="canonical"]'),
        imageWithoutAlt: document.querySelectorAll('img:not([alt])').length,
        linksCount: document.querySelectorAll('a').length,
      },
      // Accessibility scores
      accessibility: {
        hasSkipLinks: !!document.querySelector('a[href="#main"]'),
        hasLangAttribute: !!document.documentElement.lang,
        contrastIssues: this.checkContrastIssues(),
      },
    };
  }

  private getFirstContentfulPaint(): number {
    const entries = performance.getEntriesByType('paint');
    const fcpEntry = entries.find(
      (entry) => entry.name === 'first-contentful-paint'
    );
    return fcpEntry ? fcpEntry.startTime : 0;
  }

  private checkContrastIssues(): number {
    // Simplified contrast checking - in production, use a proper accessibility library
    const elements = document.querySelectorAll('*');
    let issues = 0;

    elements.forEach((el) => {
      const styles = window.getComputedStyle(el);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;

      // Basic contrast check (simplified)
      if (
        color === 'rgb(255, 255, 255)' &&
        backgroundColor === 'rgb(255, 255, 255)'
      ) {
        issues++;
      }
    });

    return issues;
  }
}
