# 📤 Panduan Upload ke GitHub

## Cara 1: Web GitHub (Tanpa Install)

### A. Buat Repository
1. Buka [github.com](https://github.com) → login
2. Klik **"+"** → **"New repository"**
3. Isi:
   - **Nama**: `si-retribusi-pkm-tering`
   - **Deskripsi**: `Sistem Informasi Retribusi UPTD PKM Tering Seberang 2026`
   - Pilih **Public**
   - ✅ Centang **"Add a README file"**
4. Klik **"Create repository"**

### B. Upload File
1. Klik **"Add file"** → **"Upload files"**
2. Drag & drop semua file:
   - `index.html` ← **WAJIB** rename dari `!DOCTYPE html.txt`
   - `README.md`
   - `.gitignore`
   - `deploy.bat`
   - `deploy.sh`
   - `PANDUAN-UPLOAD.md`
3. Commit message: `Initial commit - SI Retribusi PKM 2026`
4. Klik **"Commit changes"**

### C. Aktifkan GitHub Pages
1. **Settings** → **Pages** (sidebar kiri)
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` → `/ (root)` → **Save**
4. Tunggu 1–2 menit
5. URL aktif: `https://USERNAME.github.io/si-retribusi-pkm-tering/`

---

## Cara 2: Otomatis via Script

### Windows
```cmd
deploy.bat
