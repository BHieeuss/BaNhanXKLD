import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private meta: Meta, private titleService: Title) {}

  updateSEO(data: SEOData): void {
    // Update title
    if (data.title) {
      this.titleService.setTitle(data.title);
      this.meta.updateTag({ property: 'og:title', content: data.title });
      this.meta.updateTag({ name: 'twitter:title', content: data.title });
    }

    // Update description
    if (data.description) {
      this.meta.updateTag({ name: 'description', content: data.description });
      this.meta.updateTag({
        property: 'og:description',
        content: data.description,
      });
      this.meta.updateTag({
        name: 'twitter:description',
        content: data.description,
      });
    }

    // Update keywords
    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }

    // Update image
    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
      this.meta.updateTag({ name: 'twitter:image', content: data.image });
    }

    // Update URL
    if (data.url) {
      this.meta.updateTag({ property: 'og:url', content: data.url });
      this.meta.updateTag({ rel: 'canonical', href: data.url });
    }

    // Update type
    if (data.type) {
      this.meta.updateTag({ property: 'og:type', content: data.type });
    }
  }

  // Structured data for different page types
  addStructuredData(data: any): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // Add local business structured data
  addLocalBusinessSchema(): void {
    const localBusiness = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'SEIKI - Xuất khẩu lao động Nhật Bản',
      description:
        'Công ty chuyên cung cấp dịch vụ xuất khẩu lao động Nhật Bản tại Vĩnh Long, Trà Vinh',
      url: 'https://banhanxkld.id.vn',
      telephone: '+84-xxx-xxx-xxx',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Địa chỉ cụ thể của công ty',
        addressLocality: 'Vĩnh Long',
        addressRegion: 'Vĩnh Long',
        postalCode: '87000',
        addressCountry: 'VN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '10.2530556',
        longitude: '105.972222',
      },
      openingHours: 'Mo-Sa 08:00-17:00',
      areaServed: [
        { '@type': 'State', name: 'Vĩnh Long' },
        { '@type': 'State', name: 'Trà Vinh' },
        { '@type': 'State', name: 'Đồng Tháp' },
        { '@type': 'State', name: 'An Giang' },
      ],
    };

    this.addStructuredData(localBusiness);
  }

  // Add FAQ structured data
  addFAQSchema(faqs: Array<{ question: string; answer: string }>): void {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    this.addStructuredData(faqSchema);
  }

  // Add service schema
  addServiceSchema(): void {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Dịch vụ xuất khẩu lao động Nhật Bản',
      description:
        'Hỗ trợ toàn diện từ tư vấn, đào tạo đến xuất cảnh làm việc tại Nhật Bản',
      provider: {
        '@type': 'Organization',
        name: 'SEIKI',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vĩnh Long',
          addressCountry: 'VN',
        },
      },
      areaServed: [
        { '@type': 'State', name: 'Vĩnh Long' },
        { '@type': 'State', name: 'Trà Vinh' },
      ],
      serviceType: 'Xuất khẩu lao động',
      offers: {
        '@type': 'Offer',
        description: 'Dịch vụ tư vấn và hỗ trợ xuất khẩu lao động Nhật Bản',
      },
    };

    this.addStructuredData(serviceSchema);
  }
}
