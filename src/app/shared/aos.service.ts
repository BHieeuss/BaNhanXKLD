import { Injectable } from '@angular/core';
import AOS from 'aos';

@Injectable({
  providedIn: 'root',
})
export class AOSService {
  init(options?: any) {
    const defaultOptions = {
      duration: 1500,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
      offset: 150,
      delay: 200,
      ...options,
    };

    AOS.init(defaultOptions);
  }

  refresh() {
    AOS.refresh();
  }

  refreshHard() {
    AOS.refreshHard();
  }
}
