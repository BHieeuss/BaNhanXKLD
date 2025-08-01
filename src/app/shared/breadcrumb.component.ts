import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from './seo.service';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  active?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav aria-label="breadcrumb" class="breadcrumb-nav">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" *ngFor="let item of items; let i = index">
          <a *ngIf="item.url && !item.active" [routerLink]="item.url">{{
            item.label
          }}</a>
          <span *ngIf="!item.url || item.active" [class.active]="item.active">{{
            item.label
          }}</span>
        </li>
      </ol>
    </nav>
  `,
  styles: [
    `
      .breadcrumb-nav {
        padding: 10px 0;
      }
      .breadcrumb {
        display: flex;
        flex-wrap: wrap;
        padding: 0.75rem 1rem;
        margin-bottom: 1rem;
        list-style: none;
        background-color: #f8f9fa;
        border-radius: 0.25rem;
      }
      .breadcrumb-item + .breadcrumb-item::before {
        display: inline-block;
        padding-right: 0.5rem;
        padding-left: 0.5rem;
        color: #6c757d;
        content: '/';
      }
      .breadcrumb-item.active {
        color: #6c757d;
      }
      .breadcrumb-item a {
        color: #007bff;
        text-decoration: none;
      }
      .breadcrumb-item a:hover {
        color: #0056b3;
        text-decoration: underline;
      }
    `,
  ],
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: BreadcrumbItem[] = [];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    if (this.items.length > 1) {
      this.addBreadcrumbStructuredData();
    }
  }

  private addBreadcrumbStructuredData(): void {
    const breadcrumbList = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: this.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: item.url ? `https://banhanxkld.id.vn${item.url}` : undefined,
      })),
    };

    this.seoService.addStructuredData(breadcrumbList);
  }
}
