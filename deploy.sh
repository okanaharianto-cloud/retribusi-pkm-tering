#!/usr/bin/env bash
# ============================================================
#   DEPLOY OTOMATIS KE GITHUB
#   SI-RETRIBUSI UPTD PKM TERING SEBERANG 2026
# ============================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}============================================================${NC}"
echo -e "${BLUE}  DEPLOY SI-RETRIBUSI PKM TERING SEBERANG 2026${NC}"
echo -e "${BLUE}============================================================${NC}"
echo ""

# Cek git
if ! command -v git &> /dev/null; then
    echo -e "${RED}[ERROR] Git belum terinstall!${NC}"
    echo "Download dari: https://git-scm.com/downloads"
    exit 1
fi

# Cek login git
if [ -z "$(git config user.name)" ]; then
    echo -e "${YELLOW}[INFO] Setup awal Git...${NC}"
    read -p "Masukkan Nama Git  : " GIT_NAME
    read -p "Masukkan Email Git : " GIT_EMAIL
    git config --global user.name "$GIT_NAME"
    git config --global user.email "$GIT_EMAIL"
    echo ""
fi

# Init repo jika belum ada
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}[INFO] Inisialisasi repository baru...${NC}"
    git init
    git branch -M main
    echo ""
    echo -e "${YELLOW}[PENTING] Masukkan URL repo GitHub Anda!${NC}"
    echo "Contoh: https://github.com/USERNAME/si-retribusi-pkm-tering.git"
    read -p "URL Repo: " REPO_URL
    git remote add origin "$REPO_URL"
    echo ""
fi

# Tambahkan file
echo -e "${BLUE}[INFO] Menambahkan file...${NC}"
git add .

# Commit
TIMESTAMP=$(date +"%Y-%m-%d %H:%M")
read -p "Pesan commit (Enter untuk default): " COMMIT_MSG
[ -z "$COMMIT_MSG" ] && COMMIT_MSG="Update otomatis $TIMESTAMP"

echo ""
echo -e "${BLUE}[INFO] Commit: ${COMMIT_MSG}${NC}"
git commit -m "$COMMIT_MSG" || echo -e "${YELLOW}[INFO] Tidak ada perubahan untuk di-commit.${NC}"

# Push
echo ""
echo -e "${BLUE}[INFO] Push ke GitHub...${NC}"
if git push -u origin main; then
    echo ""
    echo -e "${GREEN}============================================================${NC}"
    echo -e "${GREEN}  ✅ SUKSES! File berhasil di-upload ke GitHub${NC}"
    echo -e "${GREEN}============================================================${NC}"
    echo ""
    echo "Langkah selanjutnya:"
    echo "  1. Buka repo GitHub Anda"
    echo "  2. Settings → Pages → Branch: main → Save"
    echo "  3. Tunggu 1-2 menit, akses via GitHub Pages"
    echo ""
else
    echo ""
    echo -e "${RED}[ERROR] Push gagal! Cek koneksi atau kredensial.${NC}"
    exit 1
fi
