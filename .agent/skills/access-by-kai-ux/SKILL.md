# UX Skill: Access by KAI E-Wallet Payment UX Guidelines

> **Konteks Skill**: Panduan ini adalah petunjuk komprehensif bagi AI Agent, Desainer UI/UX, dan Perekayasa Perangkat Lunak saat merancang, mengevaluasi, dan mengimplementasikan fitur **E-Wallet Payment Status & Recovery** pada aplikasi **Access by KAI**.

---

## 1. Skill Overview
Skill ini menetapkan prinsip interaksi, pola desain antarmuka, tata kelola pesan, dan aturan bisnis dalam menangani ketidakpastian status pembayaran dompet digital (*e-wallet*). Tujuannya adalah menciptakan pengalaman pengguna yang transparan, menenangkan, dan bebas dari risiko pembayaran berulang (*double payment*).

---

## 2. Product Context
- **Nama Aplikasi**: Access by KAI
- **Fitur**: E-Wallet Payment Status & Recovery
- **Domain**: Pemesanan Tiket Transportasi Kereta Api
- **Karakteristik Transaksi**: Transaksi bersifat *time-critical* (kursi terbatas, batas waktu bayar ketat, dan mobilitas fisik pengguna).
- **Kondisi Khusus**: Keterlibatan pihak ketiga (e-wallet gateway: GoPay, DANA, OVO, LinkAja) rentan mengalami latensi jaringan, timeout, atau kegagalan webhook.

---

## 3. UX Objectives
1. **Clarity (Kejelasan)**: Pengguna segera memahami kondisi pasti dari transaksi mereka tanpa interpretasi ganda.
2. **Reassurance (Ketenangan)**: Mengurangi kecemasan pengguna saat verifikasi membutuhkan waktu, dengan jaminan saldo aman.
3. **Prevention (Pencegahan Human Error)**: Melindungi pengguna dari tindakan impulsif melakukan pemesanan/pembayaran ulang saat status belum final.
4. **Actionability (Arahan Konkret)**: Menyediakan langkah-langkah solutif dan terarah ketika terjadi kendala atau kegagalan pembayaran.

---

## 4. Target User and Persona
- **Nama Persona**: Muhammad Senopati
- **Usia**: 21 Tahun
- **Pekerjaan**: Mahasiswa
- **Karakteristik & Kebiasaan**:
  - Mengandalkan kereta api untuk mobilitas antar kota (kampus ke rumah).
  - Mengutamakan transaksi digital nontunai (*cashless*) melalui e-wallet.
  - Memiliki anggaran keuangan terbatas khas mahasiswa sehingga sangat cemas jika ada pemotongan saldo tanpa kejelasan tiket.
- **Tujuan Pengguna**:
  - Menyelesaikan pemesanan tiket dengan lancar.
  - Memastikan *Boarding Pass* digital segera aktif dan aman.

---

## 5. User Pain Points
1. **Transaction Status Uncertainty**: Ketidakjelasan status setelah menekan tombol bayar di e-wallet (apakah sukses, menggantung, atau gagal).
2. **Saldo Terpotong Tanpa Tiket**: Saldo pada aplikasi e-wallet telah berkurang, tetapi tiket pada Access by KAI belum terbit.
3. **Accidental Double Payment**: Pengguna panik karena takut kehabisan kursi, lalu melakukan pembayaran ulang tiket yang sama sehingga saldo terpotong dua kali.
4. **Cryptic Error Messages**: Pesan kesalahan berupa kode sistem (misal: `ERR_GATEWAY_TIMEOUT_504`) yang membingungkan dan tidak memberikan solusi.
5. **Kesulitan Mencari Bantuan**: Pengguna tidak tahu harus melapor ke penyedia e-wallet atau ke pihak KAI.

---

## 6. UX Principles
1. **Never Assume Failure Prematurely**: Jangan menyatakan transaksi gagal hanya karena konfirmasi belum diterima dalam hitungan detik.
2. **Transparency Over Speed**: Lebih baik menginformasikan proses verifikasi yang sedang berlangsung daripada menampilkan hasil spekulatif.
3. **System-Enforced Safeguards**: Jangan hanya mengandalkan himbauan teks; cegah tombol pembayaran ulang secara logis di level aplikasi saat status masih *Pending* atau *Unknown*.
4. **Separate Money from Ticket**: Pembayaran lunas dan penerbitan tiket adalah dua entitas proses yang berbeda; komunikasikan status keduanya secara terpisah dan jujur.
5. **Empathetic Human Language**: Gunakan Bahasa Indonesia yang santun, jelas, dan berorientasi pada penyelesaian masalah.

---

## 7. User-Centered Design Guidelines
- **Fokus pada Beban Kognitif Rendah**: Saat menghadapi kegagalan bayar, pengguna berada dalam kondisi cemas (*heightened anxiety*). Gunakan tata letak yang bersih, hindari distraksi elemen visual yang tidak relevan.
- **Hierarki Informasi**:
  1. Status Transaksi (Ikon + Label Status + Badge Warna).
  2. Pesan Penjelas Utama (Apa yang sedang terjadi dan mengapa).
  3. Detail Transaksi (Nomor referensi, nominal, waktu, metode pembayaran).
  4. Tombol Aksi Utama (Periksa Status / Lihat Tiket / Hubungi Bantuan).

---

## 8. Information Architecture
```
[Access by KAI]
├── Home (Beranda)
│   ├── Greeting Persona & Dynamic Status Banner (Pending/Failed alert)
│   ├── Pencarian Tiket (Stasiun Asal, Tujuan, Tanggal, Penumpang)
│   └── Rekomendasi Jadwal
├── Jadwal Kereta (Schedule List)
│   ├── Filter & Sort
│   └── Kartu Jadwal & Pilih Kursi Dummy
├── Ringkasan Pemesanan (Booking Summary)
│   ├── Data Perjalanan & Penumpang
│   ├── Pemilihan E-Wallet (GoPay, DANA, OVO, LinkAja)
│   └── Ringkasan Biaya & Tombol Bayar
├── Payment Processing (Animasi Verifikasi Gateway)
├── Status Halaman:
│   ├── Payment Success (Status Pembayaran: Berhasil, Status Tiket: Terbit/Menunggu)
│   ├── Payment Pending (Status Pembayaran: Diproses, Anti-Double Payment Lock)
│   ├── Payment Failed (Status Pembayaran: Gagal, Asisten Cek Saldo)
│   └── Payment Unknown (Status: Belum Dipastikan, Safe Guidance)
├── Detail Transaksi (Transaction Detail & Audit Trail)
└── Pusat Bantuan (FAQ & Form Lapor Kendala E-Wallet)
```

---

## 9. User Flow Guidelines
1. Pengguna memilih tiket dan metode e-wallet.
2. Setelah otorisasi simulasi, arahkan ke layar status yang sesuai.
3. Setiap layar status harus memiliki jalur navigasi yang jelas:
   - Dari **Success**: Pengguna dapat melihat *Boarding Pass* digital atau membuka *Detail Transaksi*.
   - Dari **Pending**: Pengguna dapat menekan *Periksa Status* atau melihat *Detail Transaksi*. Dilarang ada tombol bayar ulang.
   - Dari **Failed**: Pengguna dapat mengikuti panduan cek mutasi e-wallet. Tombol bayar ulang hanya aktif bila pengguna menyatakan saldo tidak terpotong.
   - Dari **Unknown**: Pengguna dapat menekan *Periksa Status* atau membuka formulir bantuan. Dilarang ada tombol bayar ulang.

---

## 10. Payment Status Design Guidelines
Empat status wajib memiliki representasi visual dan verbal yang konsisten:

| Status | Warna Utama | Hex Code | Ikon Lucide | Label Visual | Tone of Voice |
|---|---|---|---|---|---|
| **SUCCESS** | Emerald Green | `#10B981` | `CheckCircle2` | `BERHASIL` | Meyakinkan, apresiatif, jelas |
| **PENDING** | Amber / Orange | `#F58220` | `Clock` / `Loader2` | `SEDANG DIPROSES` | Menenangkan, sabar, meminta menunggu |
| **FAILED** | Crimson Red | `#DC2626` | `AlertCircle` / `XCircle` | `PEMBAYARAN GAGAL` | Informatif, tidak menyalahkan, solutif |
| **UNKNOWN** | Indigo / Violet | `#6366F1` | `HelpCircle` / `AlertTriangle`| `BELUM DAPAT DIPASTIKAN`| Waspada, transparan, protektif |

---

## 11. Payment and Ticket Status Separation
Sistem **WAJIB** menyajikan dua status independen:
1. **Payment Status**: Kondisi perpindahan dana pada e-wallet (`Success`, `Pending`, `Failed`, `Unknown`).
2. **Booking/Ticket Status**: Kondisi penerbitan tiket pada database KAI (`Ticket Issued`, `Waiting for Ticket Issuance`, `Waiting for Payment Confirmation`, `Booking Not Completed`, `Booking Status Not Confirmed`).

### Matriks Hubungan Status:
| Payment Status | Booking / Ticket Status | Interpretasi UX |
|---|---|---|
| **Success** | `Ticket Issued` | Normal: Pembayaran lunas, tiket langsung terbit dan aktif. |
| **Success** | `Waiting for Ticket Issuance` | Kasus Khusus: Pembayaran lunas namun antrean server penerbitan tiket sedang padat. Pengguna ditenangkan bahwa kursi sudah aman. |
| **Pending** | `Waiting for Payment Confirmation` | Normal: Menunggu notifikasi dari e-wallet gateway. Tiket di-*reserve* sementara. |
| **Failed** | `Booking Not Completed` | Normal: Transaksi ditolak, reservasi kursi dibatalkan secara aman. |
| **Unknown** | `Booking Status Not Confirmed` | Anomali: Status pembayaran belum dipastikan, status tiket ditahan sementara (*on hold*). |

---

## 12. Error Message Guidelines
- **Gunakan Bahasa Manusia**: Ganti istilah teknis seperti "504 Gateway Timeout" dengan kalimat "Koneksi ke penyedia e-wallet sedang membutuhkan waktu lebih lama".
- **Struktur Pesan**:
  1. *Apa yang terjadi*: "Pembayaran Anda belum dapat kami konfirmasi."
  2. *Mengapa hal tersebut terjadi*: "Terjadi kendala jaringan saat menghubungi sistem e-wallet."
  3. *Kondisi saldo*: "Jangan khawatir, jika saldo terpotong, dana Anda aman dalam proses verifikasi."
  4. *Tindakan yang harus dilakukan*: "Silakan periksa mutasi saldo pada aplikasi e-wallet Anda sebelum mencoba pembayaran lain."

---

## 13. Duplicate Payment Prevention (Anti-Double Payment)
Aturan validasi sistem:
- **Kondisi Pending**: Nonaktifkan secara programatis tombol pemesanan ulang untuk perjalanan yang sama. Tampilkan banner peringatan berwarna oranye.
- **Kondisi Unknown**: Nonaktifkan tombol pemesanan ulang. Tampilkan banner peringatan bahwa status pembayaran sebelumnya harus dikonfirmasi terlebih dahulu untuk mencegah kerugian finansial.
- **Kondisi Failed**: Sediakan tombol *Coba Bayar Lagi* HANYA jika pengguna mengonfirmasi bahwa saldo e-wallet miliknya tidak berkurang.

---

## 14. UI Design Guidelines
- **Mobile-First Layout**: Lebar container ideal 390px - 440px pada simulator smartphone, terpusat rapi pada layar desktop dengan background netral (`#F1F5F9`).
- **Brand Identity Access by KAI**:
  - Warna Primer: Deep KAI Blue (`#1D3F7A`)
  - Warna Sekunder: Dark Blue (`#132B54`)
  - Warna Aksen: KAI Orange (`#ED6B23`)
  - Netral: Slate (`#F8FAFC`, `#0F172A`)
- **Cards & Elevation**: Gunakan rounded corners modern (`rounded-2xl`, `rounded-3xl`), border tipis (`border-slate-200`), dan bayangan halus (`shadow-sm`, `shadow-md`).
- **Typography Hierarchy**:
  - Judul Halaman: 18px - 20px, Semi-Bold / Bold
  - Judul Bagian: 14px - 16px, Semi-Bold
  - Body Text: 13px - 14px, Regular
  - Caption / Label Meta: 11px - 12px, Medium

---

## 15. Accessibility Guidelines (A11y)
- **Kontras Warna**: Rasio kontras teks terhadap latar belakang memenuhi standar WCAG 2.1 AA (minimal 4.5:1 untuk teks normal).
- **Non-Color Indicators**: Jangan mengandalkan warna semata untuk menyampaikan status. Selalu kombinasikan warna dengan teks label status eksplisit dan ikon semantik yang sesuai.
- **Touch Target**: Seluruh tombol interaktif memiliki ukuran minimal 44x44 piksel dengan padding yang nyaman.

---

## 16. Responsive Design Guidelines
- **Mobile (< 640px)**: Tampilan layar penuh tanpa bingkai simulator, pengalaman aplikasi mobile murni.
- **Desktop (>= 640px)**: Menampilkan frame perangkat mobile modern dengan status bar dummy, tombol navigasi, dan kontrol demo mengambang di luar frame agar tidak menghalangi interaksi utama.

---

## 17. Interaction Guidelines
- **Feedback Langsung**: Setiap penekanan tombol penting (seperti *Periksa Status*) wajib memicu indikator pemuatan (*loading spinner*) selama 1 - 2 detik sebelum memperbarui status.
- **Haptic / Motion Feedback**: Gunakan transisi halus (`transition-all duration-300`) untuk membuka/menutup accordion FAQ dan modal dialog.

---

## 18. Usability Testing Guidelines
Saat menguji prototype kepada pengguna (persona Muhammad Senopati):
1. Amati waktu yang dibutuhkan untuk memahami status transaksi.
2. Tanyakan apakah pengguna memahami apa yang harus dilakukan ketika menghadapi status *Pending*.
3. Perhatikan apakah pengguna tergoda untuk menekan bayar ulang saat status *Unknown*.
4. Catat kemudahan menemukan fitur *Detail Transaksi* dan formulir *Lapor Kendala*.

---

## 19. Acceptance Criteria Validation
Sebelum sebuah fitur dirilis:
- Pastikan seluruh kriteria AC-01 sampai AC-06 terpenuhi.
- Pastikan tidak ada tombol buntu atau tautan mati (*dead click*).
- Pastikan state transaksi sinkron di seluruh komponen.

---

## 20. Do and Don't

### DO (Wajib Dilakukan):
- Tampilkan nama status dalam teks tebal berdampingan dengan ikon yang tepat.
- Pisahkan visual status pembayaran dengan status tiket secara gamblang.
- Sediakan tombol manual *Periksa Status* pada status *Pending* dan *Unknown*.
- Berikan asisten kondisi saldo pada halaman *Failed*.
- Sediakan panel demo simulasi yang mudah digunakan oleh penilai/penguji.

### DON'T (Dilarang Keras):
- Jangan menyamakan status *Unknown* dengan status *Failed*.
- Jangan mengaktifkan tombol bayar ulang ketika transaksi belum pasti.
- Jangan menjanjikan pengembalian dana (*refund*) seketika tanpa panduan verifikasi.
- Jangan menggunakan kode error teknis seperti `HTTP 500` atau `ECONNRESET`.
- Jangan membiarkan halaman Beranda dan Detail Transaksi menampilkan status yang bertentangan.

---

## 21. Implementation Checklist
- [x] Context API `TransactionContext` terhubung ke seluruh halaman.
- [x] Persistensi status tersimpan di `localStorage`.
- [x] Halaman Beranda menampilkan banner peringatan jika transaksi sebelumnya belum beres.
- [x] Halaman Payment Success membedakan kondisi tiket terbit vs tiket menunggu penerbitan.
- [x] Halaman Payment Pending memblokir opsi bayar ulang.
- [x] Halaman Payment Failed menyediakan asisten interaktif status saldo e-wallet.
- [x] Halaman Payment Unknown memandu verifikasi tanpa bayar ulang.
- [x] Halaman Detail Transaksi menyajikan riwayat audit transaksi (*status history timeline*).
- [x] Halaman Pusat Bantuan menyajikan FAQ dan form lapor kendala interaktif.
- [x] Demo Controls Panel mengizinkan pengujian seluruh 4 status transaksi dan skenario tiket pending.
