// ==========================================
// 1. KONFIGURASI FIREBASE (GANTI DENGAN PUNYA ANDA)
// ==========================================
const firebaseConfig = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnrapvPH0noYCpcM1mOy_bpeW_urpnhU8",
  authDomain: "si-retribusi-pkm-tering.firebaseapp.com",
  projectId: "si-retribusi-pkm-tering",
  storageBucket: "si-retribusi-pkm-tering.firebasestorage.app",
  messagingSenderId: "292725347925",
  appId: "1:292725347925:web:723a617974e377a757e6dc",
  measurementId: "G-8D1XKNHW9F"
};
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ==========================================
// 2. DATA DEFAULT & VARIABEL GLOBAL
// ==========================================
const dataDefaultBulanan = [
    { bulan: "Januari", pasien: 115, sarana: 3528300, pelayanan: 2352200, total: 5880500 },
    { bulan: "Februari", pasien: 110, sarana: 3665100, pelayanan: 2443400, total: 6108500 },
    { bulan: "Maret", pasien: 117, sarana: 3411300, pelayanan: 2274200, total: 5685500 },
    { bulan: "April", pasien: 111, sarana: 3312900, pelayanan: 2208600, total: 5521500 },
    { bulan: "Mei", pasien: 116, sarana: 3671400, pelayanan: 2447600, total: 6119000 },
    { bulan: "Juni", pasien: 168, sarana: 7481700, pelayanan: 4987800, total: 12469500 },
    { bulan: "Juli", pasien: 117, sarana: 6261300, pelayanan: 4174200, total: 10435500 },
    { bulan: "Agustus", pasien: 119, sarana: 5780400, pelayanan: 3853600, total: 9634000 },
    { bulan: "September", pasien: 196, sarana: 7153800, pelayanan: 4769200, total: 11923000 },
    { bulan: "Oktober", pasien: 87, sarana: 3846000, pelayanan: 2564000, total: 6410000 },
    { bulan: "November", pasien: 87, sarana: 3365400, pelayanan: 2243600, total: 5609000 },
    { bulan: "Desember", pasien: 182, sarana: 7130100, pelayanan: 4753400, total: 11883500 }
];

let dataBulanan = [];
let dataHarian = [];
let chartInstance = null;

// --- LOGIN LOGIC ---
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    
    if(user === 'admin' && pass === '123') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('app-screen').style.display = 'flex';
        initApp(); // Mulai tarik data dari Firebase
    } else {
        Swal.fire('Akses Ditolak', 'Username atau Password salah! Pastikan: admin / 123', 'error');
    }
});

function logout() {
    Swal.fire({
        title: 'Keluar Aplikasi?',
        text: "Anda akan keluar dari sistem.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        confirmButtonText: 'Ya, Keluar'
    }).then((result) => {
        if (result.isConfirmed) { location.reload(); }
    });
}

function initApp() {
    tarikDataBulanan();
    tarikDataHarian();
}

// --- NAVIGASI TAB ---
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sidebar-menu li').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    event.currentTarget.classList.add('active');
    document.getElementById('page-title').innerText = tabName === 'dashboard' ? 'Dashboard Retribusi' : 
                                                      tabName === 'harian' ? 'Log Data Harian Pasien' : 'Pengaturan Sistem';
}

const formatRupiah = (angka) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

// ==========================================
// 3. LOGIKA FIREBASE: TARIK DATA BULANAN
// ==========================================
function tarikDataBulanan() {
    db.collection("bulanan").onSnapshot((snapshot) => {
        // Jika database di Firebase masih kosong, otomatis isi dengan data Excel awal
        if (snapshot.empty) {
            dataDefaultBulanan.forEach(item => {
                db.collection("bulanan").doc(item.bulan).set(item);
            });
            return;
        }

        dataBulanan = [];
        snapshot.forEach((doc) => {
            dataBulanan.push(doc.data());
        });

        // Urutkan berdasarkan bulan
        const urutanBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        dataBulanan.sort((a, b) => urutanBulan.indexOf(a.bulan) - urutanBulan.indexOf(b.bulan));

        renderBulananUI();
    });
}

function renderBulananUI() {
    const totalPenerimaan = dataBulanan.reduce((acc, item) => acc + item.total, 0);
    const totalPasien = dataBulanan.reduce((acc, item) => acc + item.pasien, 0);
    const rataRata = dataBulanan.length > 0 ? totalPenerimaan / dataBulanan.length : 0;

    document.getElementById('total-penerimaan').innerText = formatRupiah(totalPenerimaan);
    document.getElementById('total-pasien').innerText = totalPasien.toLocaleString('id-ID');
    document.getElementById('rata-rata').innerText = formatRupiah(rataRata);

    const tbody = document.getElementById('tbody-bulanan');
    tbody.innerHTML = ''; 
    dataBulanan.forEach(item => {
        tbody.innerHTML += `<tr>
            <td><strong>${item.bulan}</strong></td><td>${item.pasien}</td>
            <td>${formatRupiah(item.sarana)}</td><td>${formatRupiah(item.pelayanan)}</td>
            <td style="color: #10B981; font-weight: bold;">${formatRupiah(item.total)}</td>
        </tr>`;
    });

    const ctx = document.getElementById('chart-penerimaan').getContext('2d');
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataBulanan.map(item => item.bulan),
            datasets: [{
                label: 'Penerimaan (Rp)', data: dataBulanan.map(item => item.total),
                backgroundColor: 'rgba(37, 99, 235, 0.1)', borderColor: '#2563EB',
                borderWidth: 3, pointBackgroundColor: '#fff', pointBorderColor: '#2563EB',
                pointRadius: 5, fill: true, tension: 0.4
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
}

// ==========================================
// 4. LOGIKA FIREBASE: TARIK DATA HARIAN
// ==========================================
function tarikDataHarian() {
    db.collection("harian").orderBy("tanggal", "desc").onSnapshot((snapshot) => {
        dataHarian = [];
        snapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id; // Simpan ID dokumen untuk fitur hapus
            dataHarian.push(data);
        });
        renderHarianUI();
    });
}

function renderHarianUI() {
    const tbody = document.getElementById('tbody-harian');
    tbody.innerHTML = '';

    if(dataHarian.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#94A3B8;">Belum ada transaksi harian.</td></tr>';
    } else {
        dataHarian.forEach(item => {
            tbody.innerHTML += `<tr>
                <td>${item.tanggal}</td><td>${item.nama}</td>
                <td><span style="background:#E2E8F0; padding:4px 8px; border-radius:4px; font-size:0.8rem;">${item.layanan}</span></td>
                <td>${formatRupiah(item.sarana)}</td><td>${formatRupiah(item.pelayanan)}</td>
                <td><strong>${formatRupiah(item.total)}</strong></td>
            </tr>`;
        });
    }
}

// --- MODAL FUNCTIONS ---
function bukaFormBulanan() { document.getElementById('modalBulanan').style.display = 'block'; }
function tutupFormBulanan() { document.getElementById('modalBulanan').style.display = 'none'; document.getElementById('formBulanan').reset(); }
function bukaFormHarian() { document.getElementById('inputTanggal').valueAsDate = new Date(); document.getElementById('modalHarian').style.display = 'block'; }
function tutupFormHarian() { document.getElementById('modalHarian').style.display = 'none'; document.getElementById('formHarian').reset(); }

// ==========================================
// 5. LOGIKA FIREBASE: SIMPAN DATA
// ==========================================
document.getElementById('formBulanan').addEventListener('submit', function(e) {
    e.preventDefault();
    const bulan = document.getElementById('inputBulan').value;
    const pasien = parseInt(document.getElementById('inputPasienBulanan').value);
    const sarana = parseInt(document.getElementById('inputSaranaBulanan').value);
    const pelayanan = parseInt(document.getElementById('inputPelayananBulanan').value);
    const total = sarana + pelayanan;

    // Simpan ke Firebase (Timpa jika bulan sudah ada)
    db.collection("bulanan").doc(bulan).set({
        bulan: bulan, pasien: pasien, sarana: sarana, pelayanan: pelayanan, total: total
    }).then(() => {
        tutupFormBulanan();
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data bulanan tersimpan ke Database.', timer: 1500, showConfirmButton: false });
    });
});

document.getElementById('formHarian').addEventListener('submit', function(e) {
    e.preventDefault();
    const tanggal = document.getElementById('inputTanggal').value;
    const nama = document.getElementById('inputNama').value;
    const layanan = document.getElementById('inputLayanan').value;
    const sarana = parseInt(document.getElementById('inputSaranaHarian').value);
    const pelayanan = parseInt(document.getElementById('inputPelayananHarian').value);
    const total = sarana + pelayanan;

    // Tambah dokumen baru ke Firebase
    db.collection("harian").add({
        tanggal: tanggal, nama: nama, layanan: layanan, sarana: sarana, pelayanan: pelayanan, total: total
    }).then(() => {
        tutupFormHarian();
        Swal.fire({ icon: 'success', title: 'Tersimpan!', text: 'Data pasien masuk ke Database.', timer: 1500, showConfirmButton: false });
    });
});

// --- EXPORT CSV ---
function exportExcelBulanan() {
    let csv = "data:text/csv;charset=utf-8,Bulan,Jumlah Pasien,Jasa Sarana (Rp),Jasa Pelayanan (Rp),Total (Rp)\n";
    dataBulanan.forEach(r => csv += `"${r.bulan}",${r.pasien},${r.sarana},${r.pelayanan},${r.total}\n`);
    downloadCSV(csv, "Rekap_Bulanan_PKM.csv");
}
function exportExcelHarian() {
    let csv = "data:text/csv;charset=utf-8,Tanggal,Nama Pasien,Layanan,Jasa Sarana (Rp),Jasa Pelayanan (Rp),Total (Rp)\n";
    dataHarian.forEach(r => csv += `"${r.tanggal}","${r.nama}","${r.layanan}",${r.sarana},${r.pelayanan},${r.total}\n`);
    downloadCSV(csv, "Data_Harian_PKM.csv");
}
function downloadCSV(csv, fileName) {
    var link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", fileName);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

function resetAllData() {
    Swal.fire({ title: 'Fitur dinonaktifkan', text: "Untuk keamanan data online, hapus data dilakukan langsung melalui Dashboard Firebase.", icon: 'info' });
}
