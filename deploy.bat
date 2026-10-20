@echo off
REM ============================================================
REM   DEPLOY OTOMATIS KE GITHUB
REM   SI-RETRIBUSI UPTD PKM TERING SEBERANG 2026
REM ============================================================

echo.
echo ============================================================
echo   DEPLOY SI-RETRIBUSI PKM TERING SEBERANG 2026
echo ============================================================
echo.

REM Cek apakah git sudah terinstall
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git belum terinstall!
    echo Download dari: https://git-scm.com/downloads
    pause
    exit /b 1
)

REM Cek apakah sudah login git
git config user.name >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Setup awal Git...
    set /p GIT_NAME="Masukkan Nama Git: "
    set /p GIT_EMAIL="Masukkan Email Git: "
    git config --global user.name "%GIT_NAME%"
    git config --global user.email "%GIT_EMAIL%"
    echo.
)

REM Cek apakah folder .git sudah ada
if not exist ".git" (
    echo [INFO] Inisialisasi repository baru...
    git init
    git branch -M main
    echo.
    echo [PENTING] Masukkan URL repo GitHub Anda!
    echo Contoh: https://github.com/USERNAME/si-retribusi-pkm-tering.git
    set /p REPO_URL="URL Repo: "
    git remote add origin "%REPO_URL%"
    echo.
)

REM Tambahkan semua file
echo [INFO] Menambahkan file...
git add .

REM Commit dengan timestamp
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "TIMESTAMP=%dt:~0,4%-%dt:~4,2%-%dt:~6,2% %dt:~8,2%:%dt:~10,2%"

set /p COMMIT_MSG="Pesan commit (Enter untuk default): "
if "%COMMIT_MSG%"=="" set "COMMIT_MSG=Update otomatis %TIMESTAMP%"

echo.
echo [INFO] Commit: %COMMIT_MSG%
git commit -m "%COMMIT_MSG%"

REM Push
echo.
echo [INFO] Push ke GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================================
    echo   [SUKSES] File berhasil di-upload ke GitHub!
    echo ============================================================
    echo.
    echo Langkah selanjutnya:
    echo   1. Buka repo GitHub Anda
    echo   2. Settings > Pages > Branch: main > Save
    echo   3. Tunggu 1-2 menit, akses via GitHub Pages
    echo.
) else (
    echo.
    echo [ERROR] Push gagal! Cek koneksi internet atau kredensial.
)

pause
