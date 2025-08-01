@echo off
echo Clearing GitHub Pages cache...

echo Step 1: Clear gh-pages cache
call npx gh-pages-clean

echo Step 2: Clear npm cache
call npm cache clean --force

echo Step 3: Clear node_modules cache
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"

echo Step 4: Clear Angular cache
if exist ".angular\cache" rmdir /s /q ".angular\cache"

echo ✅ Cache cleared successfully!
echo Now you can try deploy again with: deploy-github.bat
pause
