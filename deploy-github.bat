@echo off
echo Starting GitHub Pages deployment...

echo Step 1: Clean previous build
if exist "dist" rmdir /s /q "dist"

echo Step 2: Build production
call ng build --configuration=production --base-href="/ViecLamXKLD/"

if %ERRORLEVEL% neq 0 (
    echo Build failed!
    exit /b 1
)

echo Step 3: Copy additional files
copy "src\404.html" "dist\app\404.html" >nul
copy "src\.nojekyll" "dist\app\.nojekyll" >nul
copy "src\CNAME" "dist\app\CNAME" >nul

echo Step 4: Deploy to GitHub Pages
call npx gh-pages -d dist/app -m "Deploy: %date% %time%"

if %ERRORLEVEL% neq 0 (
    echo Deploy failed!
    echo Try clearing cache: npx gh-pages-clean
    exit /b 1
)

echo ✅ Deploy completed successfully!
echo 🌐 Your site will be available at: https://bhieeuss.github.io/ViecLamXKLD/
echo 🔗 Custom domain: https://banhanxkld.id.vn
pause
