# 🛠️ Hướng dẫn khắc phục lỗi GitHub Pages Deploy

## ❌ Lỗi hiện tại: "Unspecified error"

### 🔧 Các bước khắc phục:

#### 1. **Cài đặt gh-pages (nếu chưa có)**

```bash
npm install --save-dev gh-pages
```

#### 2. **Clear cache trước khi deploy**

```bash
# Chạy script clear cache
clear-cache.bat

# Hoặc chạy manual:
npx gh-pages-clean
npm cache clean --force
```

#### 3. **Deploy với script mới**

```bash
# Cách 1: Sử dụng script batch
deploy-github.bat

# Cách 2: Sử dụng npm command
npm run deploy:github

# Cách 3: Manual steps
npm run build:github
npx gh-pages -d dist/app
```

#### 4. **Kiểm tra cấu hình GitHub Repository**

Vào GitHub repo: https://github.com/BHieeuss/BaNhanXKLD

**Settings → Pages:**

- Source: `Deploy from a branch`
- Branch: `gh-pages` (sẽ được tạo tự động)
- Folder: `/ (root)`

#### 5. **Kiểm tra branch permissions**

```bash
# Đảm bảo có quyền push
git remote -v
git status
```

### 🚨 Các lỗi phổ biến và cách fix:

#### **Lỗi: "Permission denied"**

```bash
# Fix: Cấu hình Git credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Hoặc sử dụng GitHub CLI
gh auth login
```

#### **Lỗi: "Repository not found"**

```bash
# Fix: Kiểm tra remote URL
git remote set-url origin https://github.com/BHieeuss/ViecLamXKLD.git
```

#### **Lỗi: "Branch not found"**

```bash
# Fix: Tạo branch gh-pages manual
git checkout --orphan gh-pages
git rm -rf .
echo "GitHub Pages" > index.html
git add index.html
git commit -m "Initial gh-pages"
git push origin gh-pages
git checkout main
```

#### **Lỗi: "Build failed"**

```bash
# Fix: Kiểm tra build errors
ng build --configuration=production --verbose
```

### ✅ Verification Steps:

#### 1. **Kiểm tra build thành công**

```bash
ng build --configuration=production --base-href=/ViecLamXKLD/
# Folder dist/app được tạo với đầy đủ files
```

#### 2. **Kiểm tra files cần thiết trong dist/app:**

- ✅ index.html
- ✅ 404.html
- ✅ .nojekyll
- ✅ CNAME
- ✅ robots.txt
- ✅ sitemap.xml

#### 3. **Kiểm tra website sau deploy:**

- GitHub Pages URL: https://bhieeuss.github.io/ViecLamXKLD/
- Custom Domain: https://banhanxkld.id.vn (sau khi DNS setup)

### 🌐 Custom Domain Setup:

#### 1. **Cấu hình DNS tại nhà cung cấp domain:**

```
Type: CNAME
Name: @ (hoặc để trống)
Value: bhieeuss.github.io
```

#### 2. **Cấu hình subdomain (nếu cần):**

```
Type: CNAME
Name: www
Value: bhieeuss.github.io
```

### 📞 Troubleshooting Commands:

```bash
# Xem log chi tiết
npx gh-pages -d dist/app --dotfiles --verbose

# Deploy với custom message
npx gh-pages -d dist/app -m "Deploy: Custom message"

# Remove và recreate gh-pages branch
npx gh-pages-clean
git push origin --delete gh-pages
npm run deploy:github
```

### 🎯 Checklist sau khi deploy thành công:

- [ ] Website load được: https://bhieeuss.github.io/ViecLamXKLD/
- [ ] Routing hoạt động (refresh page không lỗi 404)
- [ ] Assets load đúng (images, CSS, JS)
- [ ] Meta tags SEO hiển thị đúng
- [ ] Mobile responsive
- [ ] Sitemap accessible: /sitemap.xml
- [ ] Robots.txt accessible: /robots.txt

### 🔄 Auto-deploy setup (nâng cao):

Tạo GitHub Action trong `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build:github
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/app
```
