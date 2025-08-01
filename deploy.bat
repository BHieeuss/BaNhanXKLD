@echo off
REM 
cd /d %~dp0
echo commit/push Github...
git add .
git commit -m "Update source code and deploy to GitHub Pages"
git push -u origin main

echo build Angular project...
call ng run App:build:production --base-href "/"

echo Create file CNAME...
echo banhanxkld.id.vn > dist\app\browser\CNAME

echo Deploy GitHub Pages...
call npx angular-cli-ghpages --dir=dist/app/browser --repo=https://github.com/BHieeuss/ViecLamXKLD.git

echo done!
pause
