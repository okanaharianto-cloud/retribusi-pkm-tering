// Data Rekap Bulanan (Diambil dari file "REKAPAN RETRIBUSI PKM TERING 2025.xlsx" sheet "RINCIAN PEMBAGIAN RET")
const dataRetribusi = [
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

// Format Rupiah
const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
};

// 1. Hitung Total Keseluruhan
const totalPenerimaan = dataRetribusi.reduce((acc, item) => acc + item.total, 0);
const totalPasien = dataRetribusi.reduce((acc, item) => acc + item.pasien, 0);
const rataRata = totalPenerimaan / dataRetribusi.length;

// Tampilkan di Kartu
document.getElementById('total-penerimaan').innerText = formatRupiah(totalPenerimaan);
document.getElementById('total-pasien').innerText = totalPasien.toLocaleString('id-ID');
document.getElementById('rata-rata').innerText = formatRupiah(rataRata);

// 2. Isi Tabel Rekap
const tbody = document.querySelector('#tabel-rekap tbody');
dataRetribusi.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.bulan}</td>
        <td>${item.pasien}</td>
        <td>${formatRupiah(item.sarana)}</td>
        <td>${formatRupiah(item.pelayanan)}</td>
        <td><strong>${formatRupiah(item.total)}</strong></td>
    `;
    tbody.appendChild(row);
});

// 3. Buat Grafik dengan Chart.js
const ctx = document.getElementById('chart-penerimaan').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: dataRetribusi.map(item => item.bulan),
        datasets: [{
            label: 'Total Penerimaan (Rp)',
            data: dataRetribusi.map(item => item.total),
            backgroundColor: 'rgba(0, 123, 255, 0.6)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return 'Rp ' + value.toLocaleString('id-ID');
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return formatRupiah(context.raw);
                    }
                }
            }
        }
    }
});