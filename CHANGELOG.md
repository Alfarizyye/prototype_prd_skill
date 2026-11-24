# Changelog

Semua perubahan penting pada proyek **Access by KAI — E-Wallet Payment Status & Recovery** akan didokumentasikan dalam berkas ini. Format penulisan mengacu pada [Keep a Changelog](https://keepachangelog.com/id/1.0.0/).

---

## [Unreleased]

### Added
- **Struktur Proyek Inti**: Inisialisasi arsitektur React 18, Vite 6, Tailwind CSS 3, dan Lucide React.
- **Dokumentasi PRD Lengkap (`README.md`)**: Dokumen spesifikasi kebutuhan produk yang mencakup 23 bab lengkap sesuai standar PRD asli, tanpa mengubah ruang lingkup atau requirement ID.
- **UX Skill Guidelines (`.agent/skills/access-by-kai-ux/SKILL.md`)**: Panduan kerja komprehensif 21 poin untuk AI Agent dan Desainer UX, mencakup prinsip interaksi, aksesibilitas, tone of voice, dan aturan status transaksi.
- **Instruksi AI Agent (`agent.md`)**: Standar kepatuhan arsitektur, aturan bisnis transaksi, pencegahan pembayaran ganda, dan batasan implementasi.
- **Dokumentasi Pendukung (`docs/`)**:
  - `docs/Project-Documentation.md`: Arsitektur teknis dan detail perancangan.
  - `docs/User-Flow.md`: Spesifikasi visual dan alur pengguna 4 kemungkinan hasil transaksi.
  - `docs/Requirement-Traceability.md`: Matriks keterlacakan kebutuhan FR-01 s/d FR-06, UX-01 s/d UX-05, AC-01 s/d AC-06, dan NFR-01 s/d NFR-05.
  - `docs/Testing-Documentation.md`: Rencana dan hasil pengujian 10 skenario pengujian fungsional dan UX.
  - `docs/Design-Guidelines.md`: Panduan desain visual, palet warna KAI, hierarki tipografi, dan aksesibilitas WCAG AA.
- **Sistem State Transaksi Terpusat (`TransactionContext`)**:
  - Penyimpanan state transaksi tunggal (*Single Source of Truth*).
  - Sinkronisasi instan ke seluruh halaman dan persistensi `localStorage`.
  - Pelacakan riwayat perubahan status (*audit trail timeline*).
- **Implementasi 4 Status Transaksi**:
  - `SUCCESS`: Konfirmasi pembayaran lunas, pemisahan status penerbitan tiket, dan tampilan boarding pass.
  - `PENDING`: Status pembayaran dalam proses verifikasi, proteksi penguncian tombol bayar ulang (*Anti-Double Payment Safeguard*), dan tombol periksa status.
  - `FAILED`: Notifikasi kegagalan ramah pengguna dengan asisten interaktif verifikasi status saldo e-wallet.
  - `UNKNOWN`: Notifikasi status belum dapat dipastikan akibat latensi/gangguan jaringan, proteksi bayar ulang, dan panduan aman.
- **Pemisahan Status Pembayaran & Status Tiket**:
  - Dukungan skenario khusus: Pembayaran Berhasil (`Success`) namun Tiket Masih Menunggu Penerbitan (`Waiting for Ticket Issuance`).
- **Floating Demo Controls Lab**:
  - Tombol simulasi interaktif (*Simulate Success*, *Simulate Pending*, *Simulate Failed*, *Simulate Unknown*, *Simulate Payment Success + Ticket Pending*, *Check Status*, dan *Reset Simulation*).
- **Halaman Lengkap Prototipe**:
  - Beranda (`HomePage.jsx`) dengan banner status aktif dan form pencarian tiket.
  - Pilih Jadwal (`SchedulePage.jsx`) dengan filter dan sorting kelas kereta.
  - Ringkasan Pemesanan (`BookingSummaryPage.jsx`) dengan pemilihan e-wallet (GoPay, DANA, OVO, LinkAja).
  - Simulasi Pembayaran (`PaymentSimulationPage.jsx`) dengan timer dan simulator gateway.
  - Halaman Status Hasil Pembayaran (`PaymentSuccessPage.jsx`, `PaymentPendingPage.jsx`, `PaymentFailedPage.jsx`, `PaymentUnknownPage.jsx`).
  - Detail Transaksi (`TransactionDetailPage.jsx`) dengan ringkasan lengkap dan riwayat status.
  - Pusat Bantuan (`HelpCenterPage.jsx`) dengan accordion FAQ interaktif dan form laporan kendala e-wallet.
  - Modal Boarding Pass Digital (`TicketModal.jsx`).
  - Simulator Bingkai HP (*Mobile Frame*) dengan toggle layar penuh.

### Changed
- Tidak ada perubahan pada requirement ID atau cakupan produk PRD asli.

### Fixed
- Menghilangkan ambiguitas antara status kegagalan (`Failed`) dan status belum pasti (`Unknown`).
- Memperbaiki potensi pembayaran berulang (*double debit*) dengan mengunci opsi bayar ulang saat transaksi masih dalam proses.

### Removed
- Tidak ada.
