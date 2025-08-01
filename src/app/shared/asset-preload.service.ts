import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssetPreloadService {
  private preloadedImages = new Set<string>();
  private preloadQueue: string[] = [];
  private isPreloading = false;
  constructor() {
    // Tắt preload critical assets để đảm bảo lazy loading thực sự
    // this.preloadCriticalAssets();
    console.log('Asset preloading disabled - true lazy loading enabled');
  }

  private preloadCriticalAssets(): void {
    const criticalImages = [
      'assets/images/about-left-image.png',
      'assets/images/services-left-image.png',
      'assets/images/banner-right-image.png',
    ];

    this.preloadImages(criticalImages);
  }

  preloadImages(imagePaths: string[]): Promise<void[]> {
    const promises = imagePaths.map((path) => this.preloadImage(path));
    return Promise.all(promises);
  }

  private preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preloadedImages.has(src)) {
        resolve();
        return;
      }
      const img = new Image();
      img.onload = () => {
        this.preloadedImages.add(src);
        console.log(`✅ Preloaded: ${src}`);
        resolve();
      };
      img.onerror = () => {
        console.warn(`❌ Failed to preload: ${src}`);
        reject(new Error(`Failed to load ${src}`));
      };
      img.src = src;
    });
  }

  queuePreload(imagePath: string): void {
    if (
      !this.preloadedImages.has(imagePath) &&
      !this.preloadQueue.includes(imagePath)
    ) {
      this.preloadQueue.push(imagePath);
      this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    if (this.isPreloading || this.preloadQueue.length === 0) {
      return;
    }

    this.isPreloading = true;

    while (this.preloadQueue.length > 0) {
      const imagePath = this.preloadQueue.shift()!;
      try {
        await this.preloadImage(imagePath);
      } catch (error) {
        console.warn('Failed to preload queued image:', error);
      }
    }

    this.isPreloading = false;
  }

  isImagePreloaded(src: string): boolean {
    return this.preloadedImages.has(src);
  }
  // Preload images based on section visibility
  preloadSectionAssets(sectionType: string): void {
    // Tắt preload assets cho sections - chỉ load khi cần thiết
    console.log(
      `Skipping preload for section: ${sectionType} - True lazy loading enabled`
    );
    return;

    /* Code cũ bị tắt để đảm bảo lazy loading thực sự
    const sectionAssets: { [key: string]: string[] } = {
      about: ['assets/images/about-left-image.png'],
      services: ['assets/images/services-left-image.png'],
      portfolio: ['assets/images/portfolio-image.png'],
      blog: [
        'assets/images/big-blog-thumb.jpg',
        'assets/images/blog-thumb-01.jpg',
        'assets/images/blog-dec.png',
      ],
      contact: ['assets/images/contact-decoration.png'],
    };

    const assets = sectionAssets[sectionType];
    if (assets) {
      assets.forEach((asset) => this.queuePreload(asset));
    }
    */
  }
}
