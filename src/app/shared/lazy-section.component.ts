import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSkeletonComponent } from './loading-skeleton.component';

@Component({
  selector: 'app-lazy-section',
  standalone: true,
  imports: [CommonModule, LoadingSkeletonComponent],
  template: `
    <div
      #sectionElement
      class="lazy-section"
      [class.section-loaded]="isLoaded"
      [attr.data-aos]="animationType"
      [attr.data-aos-duration]="duration"
      [attr.data-aos-delay]="delay"
      [attr.data-aos-easing]="easing"
      [attr.data-aos-anchor-placement]="anchorPlacement"
    >
      <div class="section-content" *ngIf="isLoaded">
        <ng-content></ng-content>
      </div>

      <!-- Error state -->
      <div class="section-error" *ngIf="hasError">
        <div class="error-content">
          <i class="bi bi-exclamation-triangle"></i>
          <h4>Failed to load content</h4>
          <p>Something went wrong while loading this section.</p>
          <button class="btn btn-primary" (click)="retryLoad()">Retry</button>
        </div>
      </div>

      <div
        class="section-placeholder"
        *ngIf="!isLoaded && enableLazyLoad && !hasError"
      >
        <app-loading-skeleton [type]="skeletonType" [lines]="skeletonLines">
        </app-loading-skeleton>
      </div>
    </div>
  `,
  styles: [
    `
      .lazy-section {
        min-height: 100px;
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .lazy-section.section-loaded {
        opacity: 1;
        transform: translateY(0);
      }
      .section-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        border-radius: 10px;
        margin: 20px 0;
      }

      @media (max-width: 768px) {
        .lazy-section {
          min-height: 50px;
          transform: translateY(20px);
        }

        .section-placeholder {
          min-height: 120px;
          margin: 10px 0;
          border-radius: 6px;
        }

        .section-error {
          min-height: 120px;
          margin: 10px 0;
          border-radius: 6px;
        }

        .error-content i {
          font-size: 36px;
          margin-bottom: 10px;
        }

        .error-content h4 {
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .error-content p {
          font-size: 0.9rem;
          margin-bottom: 15px;
        }

        .spinner {
          width: 30px;
          height: 30px;
          border-width: 3px;
        }
      }

      @media (max-width: 480px) {
        .lazy-section {
          min-height: 30px;
          transform: translateY(15px);
        }

        .section-placeholder {
          min-height: 80px;
          margin: 5px 0;
          border-radius: 4px;
        }

        .section-error {
          min-height: 80px;
          margin: 5px 0;
          border-radius: 4px;
        }
      }

      .section-error {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        background: linear-gradient(135deg, #ffe6e6 0%, #ffcccc 100%);
        border-radius: 10px;
        margin: 20px 0;
      }

      .error-content {
        text-align: center;
        color: #666;
      }

      .error-content i {
        font-size: 48px;
        color: #dc3545;
        margin-bottom: 15px;
      }

      .error-content h4 {
        color: #dc3545;
        margin-bottom: 10px;
      }

      .error-content p {
        margin-bottom: 20px;
        color: #666;
      }

      .loading-spinner {
        text-align: center;
        color: #666;
      }

      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 10px;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .section-content {
        animation: contentFadeIn 0.8s ease-out;
      }

      @keyframes contentFadeIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
  ],
})
export class LazySectionComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() enableLazyLoad: boolean = true;
  @Input() animationType: string = 'fade-up';
  @Input() duration: string = '1500';
  @Input() delay: string = '300';
  @Input() easing: string = 'ease-out-cubic';
  @Input() anchorPlacement: string = 'top-bottom';
  @Input() loadOffset: number = 100; // Pixels before element comes into view
  @Input() skeletonType: 'card' | 'text' | 'timeline' = 'text';
  @Input() skeletonLines: number[] = [1, 2, 3];
  @Input() sectionName: string = ''; // For asset preloading

  @ViewChild('sectionElement', { static: true }) sectionElement!: ElementRef;
  isLoaded: boolean = false;
  hasError: boolean = false;
  private observer!: IntersectionObserver;
  constructor() {}
  ngOnInit() {
    // Không load gì cả trong ngOnInit
  }

  ngAfterViewInit() {
    if (this.enableLazyLoad) {
      // Chỉ setup observer, không load ngay
      this.setupIntersectionObserver();
    } else {
      // Chỉ load ngay lập tức khi enableLazyLoad = false
      this.isLoaded = true;
    }
  }
  private setupIntersectionObserver() {
    const options = {
      root: null,
      // Chỉ bắt đầu load khi element thực sự xuất hiện trong viewport
      rootMargin: '0px 0px -50px 0px', // Load khi element còn cách bottom viewport 50px
      // Element phải hiển thị ít nhất 10% mới trigger
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isLoaded && !this.hasError) {
          console.log(
            `🚀 Lazy loading triggered for section: ${this.sectionName}`
          );

          this.loadSection();

          // Ngừng observe sau khi đã load để tránh trigger lại
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.observer.observe(this.sectionElement.nativeElement);
  }
  private loadSection() {
    if (this.isLoaded || this.hasError) {
      return; // Tránh load lại
    }
    try {
      // Load ngay lập tức khi user scroll đến
      this.isLoaded = true;
      this.hasError = false;

      console.log(`✅ Section "${this.sectionName}" loaded successfully`);
    } catch (error) {
      console.error(`❌ Error loading section "${this.sectionName}":`, error);
      this.hasError = true;
      this.isLoaded = false;
    }
  }

  retryLoad() {
    this.hasError = false;
    this.isLoaded = false;
    this.loadSection();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
