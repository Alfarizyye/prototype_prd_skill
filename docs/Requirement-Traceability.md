# Requirement Traceability Matrix (RTM)

## Access by KAI — E-Wallet Payment Status & Recovery

Matriks ini menghubungkan seluruh kebutuhan produk (Functional Requirements, UX Requirements, Acceptance Criteria, dan Non-Functional Requirements) dengan halaman, komponen, status implementasi, dan skenario pengujian terkait.

---

### 1. Functional Requirements (FR-01 s/d FR-06)

| Req ID | Deskripsi Requirement | Halaman Terkait | Komponen Terkait | Status Implementasi | Skenario Uji |
|---|---|---|---|---|---|
| **FR-01** | **Menampilkan Status Pembayaran**: Menampilkan status transaksi (Success, Pending, Failed, Unknown) dengan jelas dan aktif pada halaman detail. | `PaymentSuccessPage`, `PaymentPendingPage`, `PaymentFailedPage`, `PaymentUnknownPage`, `TransactionDetailPage` | `StatusBadge`, `TransactionContext`, `DemoControlBar` | **IMPLEMENTED** | Test 1, Test 2, Test 3, Test 4 |
| **FR-02** | **Memberikan Konfirmasi Pembayaran**: Menampilkan pesan pembayaran berhasil, rincian transaksi, dan status pemesanan tiket terpisah. | `PaymentSuccessPage`, `TransactionDetailPage` | `PaymentSuccessPage`, `TicketModal`, `StatusBadge` | **IMPLEMENTED** | Test 1, Test 5 |
| **FR-03** | **Menampilkan Notifikasi Kesalahan**: Memberikan informasi kegagalan atau kendala dengan bahasa ramah, kondisi transaksi, dan arahan tindakan selanjutnya. | `PaymentFailedPage`, `PaymentUnknownPage` | `PaymentFailedPage`, `PaymentUnknownPage`, `BalanceAssistant` | **IMPLEMENTED** | Test 3, Test 4 |
| **FR-04** | **Memverifikasi Status Transaksi**: Menyediakan tombol periksa status, mencegah bayar ulang saat Pending/Unknown, dan mengizinkan bayar ulang hanya jika Failed & aman. | `PaymentPendingPage`, `PaymentUnknownPage`, `PaymentFailedPage` | `VerificationButton`, `AntiDoublePaymentGuard`, `TransactionContext` | **IMPLEMENTED** | Test 2, Test 4, Test 7 |
| **FR-05** | **Menampilkan Detail Transaksi**: Menampilkan metode pembayaran, nominal, waktu transaksi, status pembayaran, dan status pemesanan tiket secara konsisten. | `TransactionDetailPage`, `PaymentSuccessPage` | `TransactionDetailPage`, `TransactionHistoryTimeline` | **IMPLEMENTED** | Test 6 |
| **FR-06** | **Menyediakan Akses Bantuan**: Menyediakan akses layanan bantuan pada halaman detail transaksi atau halaman kesalahan pembayaran, mencakup FAQ dan panduan kendala. | `HelpCenterPage`, `PaymentPendingPage`, `PaymentFailedPage`, `PaymentUnknownPage`, `TransactionDetailPage` | `HelpCenterPage`, `ReportIssueModal`, `ContactCard` | **IMPLEMENTED** | Test 4, Test 8 |

---

### 2. UX Requirements (UX-01 s/d UX-05)

| Req ID | Deskripsi UX Requirement | Halaman / Elemen | Komponen / Implementasi | Status | Skenario Uji |
|---|---|---|---|---|---|
| **UX-01** | **Bahasa yang Mudah Dipahami**: Menghindari kode teknis mentah; pesan sederhana dan berorientasi solusi. | Seluruh Halaman Error & Status | Pesan Bahasa Indonesia santun, penjelasan konteks tanpa HTTP status code | **IMPLEMENTED** | Test 3, Test 4 |
| **UX-02** | **Indikator Status yang Jelas**: Menggunakan teks status eksplisit bersamaan dengan ikon dan palet warna konsisten. | Seluruh Halaman | `StatusBadge` (Warna + Ikon + Teks Status Baku) | **IMPLEMENTED** | Test 1, Test 2, Test 3, Test 4 |
| **UX-03** | **Informasi Transparan**: Pengguna mengetahui kondisi pembayaran, status tiket, dan langkah selanjutnya secara rinci. | `PaymentSuccessPage`, `TransactionDetailPage` | Tabel ringkasan ganda (Status Pembayaran vs Status Tiket) | **IMPLEMENTED** | Test 5, Test 6 |
| **UX-04** | **Pencegahan Pembayaran Ganda**: Peringatan visual dan pemblokiran sistem saat transaksi masih diproses atau belum pasti. | `PaymentPendingPage`, `PaymentUnknownPage`, `HomePage` | `AntiDoublePaymentBanner`, disable button logic, banner di Home | **IMPLEMENTED** | Test 2, Test 4, Test 7 |
| **UX-05** | **Kemudahan Akses Informasi**: Detail pembayaran, status pemesanan, dan bantuan mudah dijangkau dalam 1 kali klik. | `BottomNav`, Floating Demo Bar, Halaman Status | `BottomNav.jsx` dengan badge status aktif dan tombol pintas | **IMPLEMENTED** | Test 8 |

---

### 3. Acceptance Criteria (AC-01 s/d AC-06)

| AC ID | Deskripsi Acceptance Criteria | Parameter Verifikasi | Status |
|---|---|---|---|
| **AC-01** | Pengguna dapat melihat status pembayaran yang sesuai dengan hasil konfirmasi transaksi dari penyedia pembayaran. | Visual status berubah tepat saat tombol simulasi ditekan dan tercatat di context. | **PASSED** |
| **AC-02** | Ketika pembayaran berhasil dikonfirmasi, sistem menampilkan status berhasil dan informasi pemesanan tiket. | Halaman menampilkan centang hijau, kode booking dummy, rincian biaya, dan status tiket. | **PASSED** |
| **AC-03** | Ketika pembayaran gagal, sistem menampilkan pesan yang menjelaskan kondisi dan tindakan selanjutnya. | Halaman menampilkan alasan kegagalan, panduan cek mutasi, dan asisten saldo terpotong. | **PASSED** |
| **AC-04** | Ketika status transaksi sebelumnya masih diproses, sistem tidak langsung mengarahkan pengguna untuk membayar ulang. | Tombol bayar ulang hilang/terkunci; muncul instruksi untuk menunggu dan tombol cek status. | **PASSED** |
| **AC-05** | Pengguna dapat melihat metode pembayaran, nominal, waktu transaksi, dan status pemesanan dalam halaman detail transaksi. | Halaman Transaction Detail membaca seluruh field dari satu sumber state tanpa perbedaan nilai. | **PASSED** |
| **AC-06** | Pengguna dapat mengakses layanan bantuan ketika mengalami kendala pembayaran. | Akses ke Help Center, FAQ 5 pertanyaan, dan form modal lapor kendala berfungsi 100%. | **PASSED** |

---

### 4. Non-Functional Requirements (NFR-01 s/d NFR-05)

| NFR ID | Kategori | Deskripsi Kebutuhan | Pemenuhan Teknis | Status |
|---|---|---|---|---|
| **NFR-01** | **Reliability** | Status pembayaran berdasarkan hasil verifikasi transaksi terpercaya. | Single Source of Truth via `TransactionContext`, audit trail perubahan status tersimpan. | **PASSED** |
| **NFR-02** | **Security** | Informasi transaksi terlindungi; tidak ada paparan data sensitif. | Tidak meminta PIN, password, data kartu asli; seluruh data dummy diisolasi lokal. | **PASSED** |
| **NFR-03** | **Performance** | Informasi status ditampilkan cepat tanpa latensi berlebih. | Vite SPA architecture; render instan < 100ms dengan transisi simulasi terukur (1.2 detik). | **PASSED** |
| **NFR-04** | **Usability** | Desain ramah pengguna lintas literasi teknologi. | Standar WCAG AA, ukuran font proporsional, teks deskriptif, dan mobile frame simulator. | **PASSED** |
| **NFR-05** | **Consistency** | Informasi status pembayaran dan pemesanan tiket konsisten antar halaman. | Semua halaman merender dari state global yang sama tanpa duplikasi data terpisah. | **PASSED** |
