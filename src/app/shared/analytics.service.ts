import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor() {}

  // Initialize Google Analytics
  initGoogleAnalytics(trackingId: string): void {
    // Add Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script1);

    // Add gtag configuration
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}', {
        page_title: document.title,
        page_location: window.location.href
      });
    `;
    document.head.appendChild(script2);
  }

  // Track page views
  trackPageView(url: string, title: string): void {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_TRACKING_ID', {
        page_path: url,
        page_title: title,
      });
    }
  }

  // Track events
  trackEvent(
    action: string,
    category: string,
    label?: string,
    value?: number
  ): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }

  // Track conversions (for form submissions, calls, etc.)
  trackConversion(conversionAction: string): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        send_to: conversionAction,
      });
    }
  }

  // Initialize Google Tag Manager
  initGoogleTagManager(containerId: string): void {
    // Add GTM script to head
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${containerId}');
    `;
    document.head.appendChild(script);

    // Add GTM noscript to body
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.insertBefore(noscript, document.body.firstChild);
  }

  // Initialize Facebook Pixel
  initFacebookPixel(pixelId: string): void {
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/>
    `;
    document.head.appendChild(noscript);
  }

  // Track Facebook events
  trackFacebookEvent(eventName: string, parameters?: any): void {
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', eventName, parameters);
    }
  }

  // Initialize Zalo Pixel (if needed)
  initZaloPixel(pixelId: string): void {
    const script = document.createElement('script');
    script.innerHTML = `
      !function(z,a,l,o){z[o]=z[o]||function(){(z[o].q=z[o].q||[]).push(arguments)};
      var d=a.createElement(l),s=a.getElementsByTagName(l)[0];d.async=1;
      d.src="https://sp.zalo.me/plugins/sdk.js";s.parentNode.insertBefore(d,s)}(window,document,"script","ZaloSocial");
      ZaloSocial.init('${pixelId}');
    `;
    document.head.appendChild(script);
  }
}
