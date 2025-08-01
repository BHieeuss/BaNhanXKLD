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
        'Xuất Khẩu Lao Động Nhật Bản SEIKI - Dịch Vụ Uy Tín Số 1 Miền Tây | Visa TITP, SSW, Engineer',
      description:
        'SEIKI - Công ty xuất khẩu lao động Nhật Bản uy tín hàng đầu tại Vĩnh Long. Chuyên cung cấp dịch vụ toàn diện: tuyển dụng, đào tạo, hỗ trợ làm việc tại Nhật Bản với visa TITP, SSW và Engineer. Hotline: 034 431 5150',
      keywords:
        'xuất khẩu lao động nhật bản, SEIKI, xuat khau lao dong nhat ban, việc làm nhật bản 2024, XKLĐ nhật bản vĩnh long, visa TITP, visa SSW, visa engineer nhật bản, đơn hàng nhật bản 2024, lương cao nhật bản, tuyển dụng nhật bản, thực tập sinh nhật bản, kỹ sư nhật bản, tokutei ginou, công ty xuất khẩu lao động uy tín, SEIKI vĩnh long, lao động kỹ năng đặc định, chương trình SSW nhật bản, đào tạo tiếng nhật, học tiếng nhật đi nhật, chi phí đi nhật bản, thủ tục visa nhật bản',
      image: 'https://banhanxkld.id.vn/assets/images/banner-right-image.png',
      url: 'https://banhanxkld.id.vn/',
      type: 'website',
    });

    // Add comprehensive keywords
    this.seoService.addComprehensiveKeywords();

    // Add structured data
    this.seoService.addLocalBusinessSchema();
    this.seoService.addServiceSchema();

    // Add breadcrumb schema
    this.seoService.addBreadcrumbSchema([
      { name: 'Trang chủ', url: 'https://banhanxkld.id.vn/' },
      { name: 'Xuất khẩu lao động Nhật Bản', url: 'https://banhanxkld.id.vn/' },
    ]);

    // Add article schema for better content understanding
    this.seoService.addArticleSchema({
      title: 'Xuất Khẩu Lao Động Nhật Bản SEIKI - Cơ Hội Việc Làm Lương Cao',
      description:
        'Hướng dẫn toàn diện về xuất khẩu lao động Nhật Bản: các chương trình visa, mức lương, ngành nghề hot và quy trình đăng ký',
      datePublished: '2024-01-01',
    });

    // Add job posting schema for recruitment
    this.seoService.addJobPostingSchema([
      {
        title: 'Kỹ sư IT - Visa Engineer Nhật Bản',
        description:
          'Tuyển dụng kỹ sư IT làm việc tại Nhật Bản với visa Engineer. Mức lương 300,000 - 500,000 yên/tháng',
        salary: '300000-500000',
      },
      {
        title: 'Thực tập sinh TITP - Ngành chế tạo',
        description:
          'Chương trình thực tập sinh kỹ thuật tại Nhật Bản, ngành chế tạo. Thời gian 3-5 năm',
        salary: '120000-180000',
      },
      {
        title: 'Lao động SSW - Ngành xây dựng',
        description:
          'Visa lao động có kỹ năng đặc định trong ngành xây dựng. Làm việc 5 năm tại Nhật Bản',
        salary: '150000-250000',
      },
    ]);

    // Add review schema for credibility
    this.seoService.addReviewSchema();

    // Add FAQ structured data
    const faqs = [
      {
        question: 'Chi phí xuất khẩu lao động Nhật Bản qua SEIKI là bao nhiêu?',
        answer:
          'Chi phí xuất khẩu lao động Nhật Bản dao động từ 120-200 triệu VNĐ tùy theo chương trình (TITP, SSW, Engineer). SEIKI hỗ trợ vay vốn ngân hàng với lãi suất ưu đãi 6-8%/năm.',
      },
      {
        question: 'Thời gian đào tạo và xuất cảnh qua SEIKI mất bao lâu?',
        answer:
          'Thời gian đào tạo tiếng Nhật và kỹ năng chuyên môn từ 6-12 tháng tùy chương trình. SEIKI cam kết xuất cảnh trong vòng 1-2 tháng sau khi hoàn thành đào tạo và đậu visa.',
      },
      {
        question: 'Mức lương làm việc tại Nhật Bản qua SEIKI như thế nào?',
        answer:
          'Mức lương trung bình từ 120,000 - 500,000 yên/tháng (23-95 triệu VNĐ) tùy theo chương trình: TITP (120-180k yên), SSW (150-250k yên), Engineer (300-500k yên). Làm thêm giờ có thể tăng 30-50% thu nhập.',
      },
      {
        question: 'SEIKI hỗ trợ gì khi lao động làm việc tại Nhật Bản?',
        answer:
          'SEIKI có đội ngũ hỗ trợ tiếng Việt 24/7 tại Nhật Bản, giải quyết mọi vấn đề về công việc, cuộc sống, y tế. Tỷ lệ gia hạn hợp đồng qua SEIKI đạt 95%.',
      },
      {
        question: 'Các ngành nghề nào đang hot tại Nhật Bản năm 2024?',
        answer:
          'Top ngành nghề hot: IT/Kỹ thuật (lương cao nhất), Chăm sóc sức khỏe, Chế tạo ô tô, Xây dựng, Nông nghiệp thực phẩm. SEIKI có đối tác tuyển dụng tại tất cả 14 ngành nghề SSW.',
      },
      {
        question: 'Điều kiện để đi xuất khẩu lao động Nhật Bản qua SEIKI?',
        answer:
          'Độ tuổi 18-35, sức khỏe tốt, không có tiền án tiền sự. Tùy chương trình có yêu cầu về học vấn (TITP: THCS, SSW: THPT, Engineer: Cao đẳng/Đại học kỹ thuật). SEIKI hỗ trợ đào tạo từ cơ bản.',
      },
    ];
    this.seoService.addFAQSchema(faqs);

    // Preload critical assets for better performance
    this.assetPreloadService.preloadImages([
      'assets/images/logo.png',
      'assets/images/banner-right-image.png',
      'assets/images/about-left-image.png',
      'assets/images/portfolio-image.png',
      'assets/images/service-icon-01.png',
      'assets/images/service-icon-02.png',
      'assets/images/service-icon-03.png',
      'assets/images/service-icon-04.png',
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
