import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { BannerComponent } from '../../Layout/banner/banner.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { AOSService } from '../../shared/aos.service';
import { LazySectionComponent } from '../../shared/lazy-section.component';
import { AssetPreloadService } from '../../shared/asset-preload.service';
import { SeoService } from '../../shared/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, CommonModule, LazySectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private api: ApiService,
    public aosService: AOSService,
    private assetPreloadService: AssetPreloadService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    // SEO Configuration for homepage
    this.seoService.updateSEO({
      title:
        'SEIKI - Dịch vụ xuất khẩu lao động Nhật Bản tại Vĩnh Long, Trà Vinh | Uy tín - Chất lượng',
      description:
        'SEIKI - Công ty xuất khẩu lao động Nhật Bản uy tín tại Vĩnh Long, Trà Vinh. Hỗ trợ tìm việc làm tại Nhật với mức lương cao, chế độ đãi ngộ tốt. Liên hệ ngay để được tư vấn miễn phí!',
      keywords:
        'xuất khẩu lao động Nhật Bản, việc làm Nhật Bản, XKLĐ Vĩnh Long, XKLĐ Trà Vinh, tuyển dụng Nhật Bản, visa lao động Nhật, SEIKI',
      image: 'https://banhanxkld.id.vn/assets/images/banner-right-image.png',
      url: 'https://banhanxkld.id.vn/',
      type: 'website',
    });

    // Add structured data
    this.seoService.addLocalBusinessSchema();
    this.seoService.addServiceSchema();

    // Add FAQ structured data
    const faqs = [
      {
        question: 'Chi phí xuất khẩu lao động Nhật Bản là bao nhiêu?',
        answer:
          'Chi phí xuất khẩu lao động Nhật Bản dao động từ 120-150 triệu VNĐ tùy theo nghề nghiệp và chương trình. Chúng tôi hỗ trợ vay vốn với lãi suất ưu đãi.',
      },
      {
        question: 'Thời gian đào tạo và xuất cảnh mất bao lâu?',
        answer:
          'Thời gian đào tạo tiếng Nhật và kỹ năng chuyên môn từ 6-12 tháng. Sau khi hoàn thành sẽ xuất cảnh trong vòng 1-2 tháng.',
      },
      {
        question: 'Mức lương làm việc tại Nhật Bản như thế nào?',
        answer:
          'Mức lương trung bình từ 130,000 - 200,000 yên/tháng (khoảng 25-38 triệu VNĐ) tùy theo nghề nghiệp và kinh nghiệm.',
      },
    ];
    this.seoService.addFAQSchema(faqs);

    // Preload critical assets
    this.assetPreloadService.preloadImages([
      'assets/images/portfolio-image.png',
      'assets/images/big-blog-thumb.jpg',
      'assets/images/blog-thumb-01.jpg',
      'assets/images/blog-dec.png',
      'assets/images/contact-decoration.png',
    ]);

    // Initialize AOS with custom settings
    this.aosService.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      offset: 100,
      delay: 0,
    });
  }

  ngAfterViewInit(): void {
    // Refresh AOS after view initialization
    setTimeout(() => {
      this.aosService.refresh();
    }, 100);
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  // Gọi hàm để tải file Excel
  downloadExcelFile() {
    this.api.downloadExcel().subscribe(
      (response: Blob) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Cv_Updated.xlsx'; // Tên file khi tải xuống
        link.click();
      },
      (error) => {
        console.error('Error downloading file', error);
      }
    );
  }
}
