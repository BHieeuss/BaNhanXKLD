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
        'SEIKI - Công ty xuất khẩu lao động uy tín Vĩnh Long, chuyên tuyển dụng lao động Nhật Bản, XKLĐ Vĩnh Long Trà Vinh, hỗ trợ xuất khẩu lao động Nhật Bản, tìm việc làm tại Nhật Bản, visa lao động Nhật Bản',
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
      name: 'Dịch vụ xuất khẩu lao động Nhật Bản SEIKI',
      description:
        'SEIKI chuyên tuyển dụng lao động Nhật Bản, XKLĐ Vĩnh Long Trà Vinh, hỗ trợ xuất khẩu lao động Nhật Bản, tìm việc làm tại Nhật Bản, visa lao động Nhật Bản. Công ty xuất khẩu lao động uy tín Vĩnh Long, tuyển dụng lao động Nhật Bản Vĩnh Long.',
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
        { '@type': 'State', name: 'Đồng Tháp' },
        { '@type': 'State', name: 'An Giang' },
      ],
      serviceType: 'Xuất khẩu lao động',
      offers: {
        '@type': 'Offer',
        description:
          'Dịch vụ tư vấn và hỗ trợ xuất khẩu lao động Nhật Bản toàn diện',
      },
      keywords: [
        'SEIKI xuất khẩu lao động',
        'xuất khẩu lao động Nhật Bản Vĩnh Long',
        'XKLĐ Vĩnh Long',
        'XKLĐ Trà Vinh',
        'tuyển dụng Nhật Bản Vĩnh Long',
        'việc làm Nhật Bản Trà Vinh',
        'xuất khẩu lao động gần tôi',
      ],
    };

    this.addStructuredData(serviceSchema);
  }

  // Add comprehensive keywords for better Google understanding
  addComprehensiveKeywords(): void {
    const keywordData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SEIKI',
      alternateName: [
        'SEIKI xuất khẩu lao động',
        'Công ty xuất khẩu lao động uy tín Vĩnh Long',
        'XKLĐ Vĩnh Long Trà Vinh',
      ],
      description:
        'Chuyên tuyển dụng lao động Nhật Bản, XKLĐ Vĩnh Long Trà Vinh, hỗ trợ xuất khẩu lao động Nhật Bản, tìm việc làm tại Nhật Bản ở Vĩnh Long, visa lao động Nhật Bản',
      serviceArea: ['Vĩnh Long', 'Trà Vinh', 'Đồng Tháp', 'An Giang'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Dịch vụ xuất khẩu lao động',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Tuyển dụng lao động Nhật Bản Vĩnh Long',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'XKLĐ Nhật Bản gần tôi',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Hỗ trợ xuất khẩu lao động Nhật Bản Trà Vinh',
            },
          },
        ],
      },
    };

    this.addStructuredData(keywordData);
  }

  // Add Article Schema for better content understanding
  addArticleSchema(article: {
    title: string;
    description: string;
    datePublished: string;
  }): void {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      author: {
        '@type': 'Organization',
        name: 'SEIKI',
      },
      publisher: {
        '@type': 'Organization',
        name: 'SEIKI',
        logo: {
          '@type': 'ImageObject',
          url: 'https://banhanxkld.id.vn/assets/images/logo.png',
        },
      },
      datePublished: article.datePublished,
      dateModified: new Date().toISOString(),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://banhanxkld.id.vn',
      },
    };

    this.addStructuredData(articleSchema);
  }

  // Add Breadcrumb Schema
  addBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): void {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    this.addStructuredData(breadcrumbSchema);
  }

  // Add JobPosting Schema for recruitment pages
  addJobPostingSchema(
    jobs: Array<{ title: string; description: string; salary: string }>
  ): void {
    jobs.forEach((job) => {
      const jobSchema = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description: job.description,
        hiringOrganization: {
          '@type': 'Organization',
          name: 'SEIKI',
          sameAs: 'https://banhanxkld.id.vn',
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Vĩnh Long',
            addressRegion: 'Vĩnh Long',
            addressCountry: 'VN',
          },
        },
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: 'JPY',
          value: {
            '@type': 'QuantitativeValue',
            value: job.salary,
            unitText: 'YEAR',
          },
        },
        employmentType: 'FULL_TIME',
        datePosted: new Date().toISOString(),
      };

      this.addStructuredData(jobSchema);
    });
  }

  // Add Review Schema for credibility
  addReviewSchema(): void {
    const reviewSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SEIKI',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '150',
      },
      review: [
        {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
          },
          author: {
            '@type': 'Person',
            name: 'Nguyễn Văn A',
          },
          reviewBody:
            'Dịch vụ xuất khẩu lao động Nhật Bản chuyên nghiệp, hỗ trợ tận tình từ A-Z.',
        },
        {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
          },
          author: {
            '@type': 'Person',
            name: 'Trần Thị B',
          },
          reviewBody:
            'Đã làm việc tại Nhật thông qua SEIKI, rất hài lòng với dịch vụ và sự hỗ trợ.',
        },
      ],
    };

    this.addStructuredData(reviewSchema);
  }
}
