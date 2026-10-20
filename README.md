# SI-RETRIBUSI UPTD PKM Tering Seberang

Sistem Informasi Retribusi Jasa Pelayanan Kesehatan  
**UPTD Puskesmas Tering Seberang — Tahun Anggaran 2026**

![Status](https://img.shields.io/badge/status-active-success.svg)
![Tahun](https://img.shields.io/badge/TA-2026-blue.svg)
![License](https://img.shields.io/badge/license-Internal-lightgrey.svg)

---

## 🎯 Fitur

- ✅ **Entri Data Pasien** — Formulir interaktif dengan auto-hitung jasa sarana/pelayanan
- ✅ **Master Therapy** — 60+ tindakan medis dengan tarif otomatis
- ✅ **Import Fleksibel** — Dukungan file `.xlsx`, `.xls`, `.csv`, `.txt`
- ✅ **Auto-Detect Format** — Otomatis mendeteksi format Uraian Harian / Rekap Bulanan / STS
- ✅ **Export Form Konfirmasi BPK 2026** — Sesuai format resmi BPK
- ✅ **Export Uraian Harian** — Per bulan, siap cetak
- ✅ **Export Rekap Bulanan & STS**
- ✅ **Dashboard Grafik** — Chart.js visualisasi penerimaan bulanan
- ✅ **Print PDF** — Melalui fitur print browser
- ✅ **Data Tersimpan Lokal** — Menggunakan `localStorage` (tanpa server)

---

## 🚀 Cara Pakai

### Online (GitHub Pages)
1. Buka URL: `https://USERNAME.github.io/si-retribusi-pkm-tering/`
2. Import file Excel/CSV/TXT melalui tombol **"Import Excel/CSV/TXT"**
3. Atau input manual melalui **Formulir Entri Data Pasien**
4. Export laporan melalui **Panel Cetak Laporan**

### Offline (Lokal)
1. Download `index.html`
2. Buka di browser (Chrome/Edge/Firefox)
3. Selesai — semua fitur berjalan tanpa internet

---

## 📊 Format File yang Didukung

| Jenis File | Format | Kegunaan |
|---|---|---|
| **Uraian Harian** | XLSX / CSV / TXT | Data pasien per hari |
| **Rekapan Bulanan** | XLSX | Rekap penerimaan per bulan |
| **STS (Surat Tanda Setor)** | XLSX / TXT | Data setoran ke BPK |

---

## 🛠️ Teknologi

| Library | Fungsi |
|---|---|
| **Tailwind CSS** (CDN) | Framework UI |
| **SheetJS (xlsx.js)** | Parsing & export Excel |
| **Chart.js** | Grafik penerimaan bulanan |
| **SweetAlert2** | Notifikasi interaktif |
| **Font Awesome 6** | Ikon |

Semua library dimuat via **CDN** — tidak perlu install apa pun.

---

## 📱 Browser yang Didukung

- ✅ Chrome / Edge (terbaru)
- ✅ Firefox (terbaru)
- ✅ Safari (terbaru)
- ✅ Opera (terbaru)

---

## 📁 Struktur Data

Aplikasi menyimpan data di **localStorage browser**:

| Key | Isi |
|---|---|
| `dataUraianHarian` | Data pasien + therapy |
| `dataBulananPKM` | Rekap bulanan |
| `dataSTS` | Data Surat Tanda Setor |

> ⚠️ Data hilang jika browser cache di-clear. Backup rutin via **Export Excel**.

---

## 👥 Tim

| Jabatan | Nama |
|---|---|
| Kepala UPTD PKM Tering Seberang | Ns. Anti, S.Kep. |
| Bendahara Penerimaan | Eka Erningsih, A.Md.Far |

---

## 📄 Lisensi

Internal — Dinas Kesehatan Kabupaten Kutai Barat  
**© 2026 UPTD Puskesmas Tering Seberang**
