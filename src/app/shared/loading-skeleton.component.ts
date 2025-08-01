import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-container" [ngClass]="'skeleton-' + type">
      <div class="skeleton-wrapper" *ngIf="type === 'card'; else textSkeleton">
        <div class="skeleton-image"></div>
        <div class="skeleton-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text short"></div>
        </div>
      </div>

      <ng-template #textSkeleton>
        <div
          class="skeleton-line"
          [style.width]="width"
          *ngFor="let line of lines"
        ></div>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .skeleton-container {
        background: #f5f5f5;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
      }

      .skeleton-wrapper {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      .skeleton-image {
        width: 100%;
        height: 200px;
        background: linear-gradient(
          90deg,
          #e0e0e0 25%,
          #f0f0f0 50%,
          #e0e0e0 75%
        );
        background-size: 200% 100%;
        animation: shimmer 2.5s infinite;
        border-radius: 8px;
      }

      .skeleton-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .skeleton-title {
        height: 24px;
        width: 70%;
        background: linear-gradient(
          90deg,
          #e0e0e0 25%,
          #f0f0f0 50%,
          #e0e0e0 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
      }

      .skeleton-text {
        height: 16px;
        width: 100%;
        background: linear-gradient(
          90deg,
          #e0e0e0 25%,
          #f0f0f0 50%,
          #e0e0e0 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
      }

      .skeleton-text.short {
        width: 60%;
      }
      .skeleton-line {
        height: 20px;
        margin: 10px 0;
        background: linear-gradient(
          90deg,
          #e0e0e0 25%,
          #f0f0f0 50%,
          #e0e0e0 75%
        );
        background-size: 200% 100%;
        animation: shimmer 2.5s infinite;
        border-radius: 4px;
      }

      @keyframes shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }

      /* Card variations */
      .skeleton-card .skeleton-wrapper {
        flex-direction: row;
        align-items: center;
      }

      .skeleton-card .skeleton-image {
        width: 150px;
        height: 100px;
        flex-shrink: 0;
        margin-right: 20px;
      }

      /* Timeline skeleton */
      .skeleton-timeline {
        display: flex;
        align-items: center;
        margin: 20px 0;
      }

      .skeleton-timeline .skeleton-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(
          90deg,
          #e0e0e0 25%,
          #f0f0f0 50%,
          #e0e0e0 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        margin-right: 15px;
        flex-shrink: 0;
      }

      .skeleton-timeline .skeleton-content {
        flex: 1;
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class LoadingSkeletonComponent {
  @Input() type: 'card' | 'text' | 'timeline' = 'text';
  @Input() lines: number[] = [1, 2, 3];
  @Input() width: string = '100%';
}
