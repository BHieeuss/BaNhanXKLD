@echo off
echo ============================================
echo      SETUP REPOSITORY MỚI - SEIKI WEBSITE
echo ============================================

echo.
echo Bước 1: Khởi tạo Git repository...
git init

echo.
echo Bước 2: Cấu hình Git user (nếu chưa có)...
echo Nhập thông tin Git của bạn:
set /p username="Git username: "
set /p email="Git email: "

git config user.name "%username%"
git config user.email "%email%"

echo.
echo Bước 3: Thêm tất cả files vào Git...
git add .

echo.
echo Bước 4: Tạo commit đầu tiên...
git commit -m "🎉 Initial commit: SEIKI Website - Xuất khẩu lao động Nhật Bản

✅ Features:
- Angular 19 application
- SEO optimized (meta tags, robots.txt, sitemap.xml)
- GitHub Pages ready
- Custom domain support (banhanxkld.id.vn)
- Structured data for LocalBusiness
- Social media optimization (Open Graph, Twitter Cards)
- Analytics ready (GA, GTM, Facebook Pixel)
- Mobile responsive design
- Geographic targeting for Vĩnh Long, Trà Vinh area

🛠️ Technical:
- TypeScript
- Bootstrap 5
- AOS animations
- jQuery, Owl Carousel
- Chart.js for data visualization
- SSR support"

echo.
echo Bước 5: Thiết lập remote repository...
echo.
echo 📝 Hướng dẫn:
echo 1. Vào https://github.com/new
echo 2. Tạo repository mới với tên: BaNhanXKLD
echo 3. Chọn Public
echo 4. KHÔNG check "Add a README file"
echo 5. Click "Create repository"
echo 6. Copy URL repository (https://github.com/BHieeuss/BaNhanXKLD.git)
echo.

set /p repo_url="Nhập URL repository mới (ví dụ: https://github.com/BHieeuss/BaNhanXKLD.git): "

git remote add origin %repo_url%
git branch -M main

echo.
echo Bước 6: Push code lên GitHub...
git push -u origin main

echo.
echo ✅ HOÀN THÀNH!
echo.
echo 🌐 Repository của bạn: %repo_url%
echo 📁 Branch chính: main
echo.
echo 🚀 Bước tiếp theo để deploy GitHub Pages:
echo 1. Vào repository Settings
echo 2. Chọn Pages
echo 3. Source: Deploy from a branch
echo 4. Branch: gh-pages (sẽ tạo khi deploy lần đầu)
echo 5. Chạy: npm run deploy:github
echo.
echo 🎯 Website sẽ có tại:
echo - GitHub Pages: https://bhieeuss.github.io/BaNhanXKLD/
echo - Custom domain: https://banhanxkld.id.vn (sau khi setup DNS)
echo.
pause
