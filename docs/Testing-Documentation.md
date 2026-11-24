# Testing Documentation & Verification Suite

## Access by KAI — E-Wallet Payment Status & Recovery

Dokumen ini mencatat seluruh rencana pengujian, prosedur pengujian, dan hasil eksekusi pengujian fungsional serta evaluasi pengalaman pengguna (UX) terhadap purwarupa.

---

## 1. Rangkuman Hasil Pengujian (Test Summary)

- **Total Skenario Uji**: 10 Skenario
- **Hasil**: 10 PASSED / 0 FAILED
- **Tingkat Kepatuhan PRD**: 100%
- **Status Validasi**: Seluruh requirement fungsional (FR-01 s/d FR-06) dan UX (UX-01 s/d UX-05) terverifikasi berjalan sempurna.

---

## 2. Rincian Eksekusi 10 Skenario Pengujian

### Test 1 — Skenario SUCCESS (Pembayaran Berhasil)
- **Tujuan**: Memverifikasi respons sistem saat pembayaran e-wallet berhasil dikonfirmasi.
- **Langkah Pengujian**:
  1. Pada halaman Beranda/Simulasi, pilih simulasi *"Simulate Success"*.
  2. Buka halaman hasil transaksi.
- **Ekspektasi**:
  - Muncul ikon centang hijau dan label status `SUCCESS (BERHASIL)`.
  - Pesan pembayaran berhasil ditampilkan secara ramah.
  - Menampilkan nomor transaksi dan kode booking unik dummy (`KAI-88A9F1`).
  - Status pemesanan tiket terpisah (`Ticket Issued`).
  - Tombol bayar ulang **TIDAK ADA**.
  - Tombol *"Lihat Tiket (Boarding Pass)"* dan *"Lihat Detail Transaksi"* berfungsi membuka modal.
- **Hasil Aktual**: Sesuai ekspektasi. Modal boarding pass menampilkan barcode dan kursi eksklusif.
- **Status**: **PASSED**

---

### Test 2 — Skenario PENDING (Sedang Diproses)
- **Tujuan**: Memverifikasi respons sistem saat pembayaran e-wallet sedang diproses dan mencegah pembayaran ganda.
- **Langkah Pengujian**:
  1. Pada Demo Controls atau halaman simulasi, pilih *"Simulate Pending"*.
  2. Amati tampilan pada halaman Payment Pending.
  3. Coba cari tombol bayar ulang.
  4. Klik tombol *"Periksa Status Pembayaran"*.
- **Ekspektasi**:
  - Muncul animasi pemrosesan oranye dan label status `PENDING (SEDANG DIPROSES)`.
  - Terdapat pesan eksplisit: *"Jangan melakukan pembayaran ulang sebelum status transaksi sebelumnya dipastikan."*
  - Tombol bayar ulang dinonaktifkan/tidak ditampilkan sama sekali.
  - Tombol *"Periksa Status Pembayaran"* menampilkan spinner verifikasi selama 1 detik lalu memperbarui status.
- **Hasil Aktual**: Sesuai ekspektasi. Logika sistem mencegah navigasi kembali ke pembayaran sebelum ada status final.
- **Status**: **PASSED**

---

### Test 3 — Skenario FAILED (Pembayaran Gagal)
- **Tujuan**: Memverifikasi pesan kesalahan yang ramah pengguna dan asisten kondisi saldo e-wallet.
- **Langkah Pengujian**:
  1. Pilih *"Simulate Failed"*.
  2. Amati pesan kesalahan.
  3. Uji opsi asisten saldo (*Saldo Terpotong* vs *Tidak Terpotong*).
- **Ekspektasi**:
  - Muncul ikon peringatan merah dan label status `FAILED (GAGAL)`.
  - Pesan menjelaskan penyebab kegagalan dengan bahasa ramah tanpa kode teknis HTTP.
  - Menyajikan petunjuk memeriksa mutasi saldo e-wallet.
  - Jika memilih *"Ya, Saldo Terpotong"*: sistem menyarankan tidak membayar ulang dan memberikan tombol lapor kendala.
  - Jika memilih *"Tidak Terpotong"*: tombol *"Coba Bayar Lagi"* diaktifkan secara aman.
- **Hasil Aktual**: Asisten saldo interaktif merespons seketika dan mengarahkan pengguna ke tindakan yang tepat.
- **Status**: **PASSED**

---

### Test 4 — Skenario UNKNOWN (Status Belum Dapat Dipastikan)
- **Tujuan**: Memverifikasi bahwa status Unknown dibedakan tegas dari Failed dan pengguna dilindungi dari bayar ulang.
- **Langkah Pengujian**:
  1. Pilih *"Simulate Unknown"*.
  2. Periksa badge status, warna, dan deskripsi pesan.
  3. Uji keberadaan tombol bayar ulang.
- **Ekspektasi**:
  - Muncul label status `UNKNOWN (BELUM DAPAT DIPASTIKAN)` dengan palet ungu/indigo (bukan merah Failed).
  - Pesan transparan bahwa sistem belum memperoleh kepastian transaksi dari gateway.
  - Tombol bayar ulang **TIDAK ADA** sebagai tindakan utama.
  - Tersedia tombol *"Periksa Status"* dan *"Pusat Bantuan"*.
- **Hasil Aktual**: Sistem membedakan secara tegas antara gagal dan tidak diketahui, mencegah kerugian pengguna.
- **Status**: **PASSED**

---

### Test 5 — Skenario Payment SUCCESS + Ticket PENDING
- **Tujuan**: Memverifikasi pemisahan independen antara status pembayaran dan status penerbitan tiket.
- **Langkah Pengujian**:
  1. Pada Demo Controls, pilih *"Payment Success + Ticket Pending"*.
  2. Amati tampilan pada Halaman Pembayaran Berhasil dan Detail Transaksi.
- **Ekspektasi**:
  - Payment Status = `Success` (Hijau).
  - Ticket Status = `Waiting for Ticket Issuance` (Kuning / Oranye).
  - Terdapat pesan penjelas bahwa pembayaran pengguna telah diterima aman, namun proses penerbitan tiket sedang dalam antrean pemrosesan server.
- **Hasil Aktual**: Kedua status ditampilkan secara terpisah dan jelas, menenangkan pengguna bahwa dana sudah aman.
- **Status**: **PASSED**

---

### Test 6 — Skenario Transaction Detail (Detail Transaksi)
- **Tujuan**: Memeriksa kelengkapan dan konsistensi data transaksi pada halaman detail.
- **Langkah Pengujian**:
  1. Buka Halaman Detail Transaksi dari navigasi bawah atau dari halaman status.
  2. Periksa seluruh field data.
- **Ekspektasi**:
  - Menampilkan Transaction ID dummy, Booking ID dummy, metode pembayaran (GoPay/DANA/OVO/LinkAja), nominal (Rp 150.000), tanggal & waktu transaksi, rincian kereta, nomor kursi.
  - Menampilkan riwayat perubahan status simulasi (*Audit Trail Timeline*).
  - Menampilkan tombol Bantuan.
- **Hasil Aktual**: Data 100% konsisten dengan state global dan riwayat audit menampilkan jejak waktu perubahan status.
- **Status**: **PASSED**

---

### Test 7 — Skenario Duplicate Payment Prevention (Anti-Double Payment Guard)
- **Tujuan**: Memastikan pencegahan pembayaran ulang divalidasi pada level logika kode, bukan hanya visual.
- **Langkah Pengujian**:
  1. Atur status ke `Pending` atau `Unknown`.
  2. Coba akses rute pembayaran ulang atau klik CTA pemesanan.
- **Ekspektasi**:
  - Sistem menolak akses dan menampilkan modal/banner peringatan transaksi aktif.
  - Tombol bayar ulang pada form dinonaktifkan (`disabled: true`).
- **Hasil Aktual**: Validasi fungsi `canRetryPayment()` memblokir eksekusi transaksi ganda.
- **Status**: **PASSED**

---

### Test 8 — Skenario Navigation & Broken Link Check
- **Tujuan**: Memastikan tidak ada tombol mati atau halaman 404 pada seluruh alur aplikasi.
- **Langkah Pengujian**:
  1. Telusuri seluruh menu Bottom Navigation (Beranda, Jadwal, Tiket Saya, Bantuan).
  2. Buka FAQ accordion, buka form Lapor Kendala, buka Modal Boarding Pass.
  3. Tutup kembali seluruh modal.
- **Ekspektasi**:
  - Semua tombol memiliki interaksi dan umpan balik visual.
  - Tidak ada rute mati atau halaman kosong.
- **Hasil Aktual**: Seluruh navigasi berpindah dengan lancar tanpa kendala.
- **Status**: **PASSED**

---

### Test 9 — Skenario Responsive & Layout Adaptation
- **Tujuan**: Menguji tampilan pada resolusi layar mobile (< 450px), tablet (768px), dan desktop (> 1024px).
- **Langkah Pengujian**:
  1. Ubah ukuran viewport browser.
  2. Uji tombol toggle Mobile Frame / Full Screen pada bar pengujian.
- **Ekspektasi**:
  - Pada layar smartphone: tampil murni layar penuh menyerupai aplikasi Android/iOS asli.
  - Pada layar desktop: terpusat rapi dalam frame smartphone berbingkai elegan tanpa distorsi komponen.
- **Hasil Aktual**: Tata letak fleksibel dan responsif di seluruh resolusi.
- **Status**: **PASSED**

---

### Test 10 — Skenario Reset Simulation
- **Tujuan**: Mengembalikan kondisi state transaksi ke nilai awal (*default clean state*).
- **Langkah Pengujian**:
  1. Ubah status transaksi ke Failed atau Unknown.
  2. Buka data di `localStorage`.
  3. Tekan tombol *"Reset Simulation"* pada Demo Controls.
- **Ekspektasi**:
  - State transaksi kembali ke default (Status awal sebelum bayar, atau status bersih).
  - Tampilan di semua halaman langsung diperbarui.
- **Hasil Aktual**: State ter-reset seketika dan data persisten sinkron.
- **Status**: **PASSED**
