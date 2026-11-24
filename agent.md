# Agent Instructions: Access by KAI UX Project

> **Peran & Otoritas**: Dokumen ini adalah instruksi operasional utama (*Master Agent Instructions*) bagi AI Agent yang bekerja pada repositori proyek **Fitur Kejelasan Status Pembayaran E-Wallet pada Access by KAI** (*E-Wallet Payment Status & Recovery*).

---

## 1. Project Identity
- **Nama Proyek**: Access by KAI — E-Wallet Payment Status & Recovery UX Prototype
- **Platform**: Web Prototype berbasis React + Vite (Simulasi Aplikasi Mobile)
- **Konteks**: Tugas Rekayasa Interaksi (Human-Computer Interaction)
- **Persona Utama**: Muhammad Senopati (Mahasiswa, 21 Tahun, Pengguna E-Wallet)

---

## 2. Project Objectives
Mengembangkan prototipe web interaktif berkualitas tinggi yang mendemonstrasikan kejelasan status pembayaran dompet digital (GoPay, DANA, OVO, LinkAja), memisahkan status pembayaran dari status tiket, mencegah pembayaran ganda (*anti-double payment*), menyediakan detail transaksi komprehensif, dan menghadirkan layanan bantuan yang mudah diakses.

---

## 3. Source of Truth
1. Dokumen **PRD asli** yang tertuang dalam `README.md` adalah sumber kebenaran tunggal (*Single Source of Truth*).
2. **Dilarang** mengubah, menghapus, atau mengurangi requirement ID (`FR-01` s/d `FR-06`, `UX-01` s/d `UX-05`, `AC-01` s/d `AC-06`, `NFR-01` s/d `NFR-05`).
3. Seluruh keputusan desain interaksi harus merujuk pada `.agent/skills/access-by-kai-ux/SKILL.md`.

---

## 4. Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite 6
- **Language**: JavaScript (JSX ES Modules)
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Routing**: React Router / Client-side Hash Router
- **State Management**: React Context API (`TransactionContext`) didukung `localStorage`
- **Testing**: Manual scenario testing + Functional Verification Suite

---

## 5. Architecture Guidelines
1. **Pemisahan Lapisan yang Jelas**:
   - `src/components/`: Komponen antarmuka yang dapat digunakan kembali (*reusable UI*).
   - `src/layouts/`: Kerangka layout seperti `MobileLayout` dan `DemoControlBar`.
   - `src/pages/`: Halaman spesifik alur transaksi.
   - `src/context/`: State global terpusat (`TransactionContext.jsx`).
   - `src/data/`: Data tiruan (*mock data*) kereta, jadwal, stasiun, penumpang, dan FAQ.
   - `src/utils/`: Fungsi pembantu pemformatan mata uang, tanggal, dan status mapping.
2. **Komponen Mandiri & Bebas Error**: Setiap komponen wajib menangani kondisi `loading`, `empty`, dan `error` secara anggun.

---

## 6. Coding Standards
- Gunakan penamaan komponen PascalCase (`BookingSummaryPage.jsx`).
- Gunakan penamaan hooks dengan prefiks `use` (`useTransaction.js`).
- Hindari *prop drilling* yang berlebihan; manfaatkan `TransactionContext`.
- Tuliskan komentar pada logika bisnis penting (misal: validasi pencegahan bayar ganda).
- Tidak boleh ada *dead code*, *unused imports*, atau *console.error* yang tidak tertangani.

---

## 7. UX Skill Reference
Saat memodifikasi atau menambah komponen visual:
- Buka dan ikuti pedoman pada [SKILL.md](file:///.agent/skills/access-by-kai-ux/SKILL.md).
- Pastikan rasio kontras warna mematuhi panduan KAI Brand Identity.
- Selalu cantumkan teks status mendampingi ikon status.

---

## 8. Requirement Compliance
Setiap perubahan wajib dapat ditelusuri ke matriks penelusuran pada `docs/Requirement-Traceability.md`:
- `FR-01`: Menampilkan 4 Status Pembayaran.
- `FR-02`: Konfirmasi Pembayaran Berhasil & Status Tiket.
- `FR-03`: Notifikasi Kesalahan Informatif (Failed & Unknown).
- `FR-04`: Verifikasi Status Transaksi & Kunci Pembayaran Ulang.
- `FR-05`: Detail Transaksi Lengkap & Audit Trail.
- `FR-06`: Akses Bantuan Terpadu & Form Lapor Kendala.

---

## 9. Transaction State Rules
Data transaksi global wajib memiliki struktur minimal:
```javascript
{
  transactionId: "TRX-20261124-001",
  bookingId: "KAI-88A9F1",
  passengerName: "Muhammad Senopati",
  trainName: "Argo Parahyangan",
  origin: "Gambir (GMR)",
  destination: "Bandung (BD)",
  travelDate: "2026-11-25",
  travelTime: "08:00 - 10:45",
  seatNumber: "Eks-1 / 12A",
  paymentMethod: "GoPay",
  amount: 150000,
  paymentStatus: "Pending", // Success | Pending | Failed | Unknown
  ticketStatus: "Waiting for Payment Confirmation",
  transactionTime: "2026-11-24 16:45:00",
  statusHistory: [
    { time: "16:45:00", status: "Pending", note: "Menunggu konfirmasi e-wallet" }
  ]
}
```

---

## 10. Payment Status Rules
- **Success**: Dana diterima. Tidak ada opsi bayar ulang.
- **Pending**: Dana dalam verifikasi. Dilarang keras bayar ulang. Wajib ada tombol *Periksa Status*.
- **Failed**: Dana gagal dikonfirmasi. Diberikan panduan periksa mutasi saldo e-wallet. Opsi bayar ulang dibuka hanya setelah saldo dipastikan aman.
- **Unknown**: Gangguan jaringan/status belum dapat dipastikan. **Bukan Failed**. Dilarang bayar ulang. Wajib ada tombol *Periksa Status* dan *Bantuan*.

---

## 11. Ticket Status Rules
Status tiket bersifat **independen** dari status pembayaran:
1. `Ticket Issued` (Hanya jika pembayaran Success).
2. `Waiting for Ticket Issuance` (Pembayaran Success, namun tiket sedang antre penerbitan).
3. `Waiting for Payment Confirmation` (Jika pembayaran Pending).
4. `Booking Not Completed` (Jika pembayaran Failed).
5. `Booking Status Not Confirmed` (Jika pembayaran Unknown).

---

## 12. Duplicate Payment Prevention
Validasi logika aplikasi:
- Fungsi `canRetryPayment(paymentStatus, isBalanceDeducted)`:
  - Kembalikan `false` jika `paymentStatus === 'Pending'` atau `paymentStatus === 'Unknown'`.
  - Kembalikan `false` jika `paymentStatus === 'Success'`.
  - Kembalikan `true` HANYA jika `paymentStatus === 'Failed'` DAN pengguna memverifikasi bahwa saldo e-wallet tidak terpotong (`isBalanceDeducted === false`).

---

## 13. Documentation Rules
- Setiap perubahan fitur yang telah diselesaikan wajib dicatat dalam `CHANGELOG.md`.
- Jika membuat asumsi implementasi baru, dokumentasikan dalam `docs/Project-Documentation.md`.
- Matriks keterlacakan kebutuhan (`docs/Requirement-Traceability.md`) harus diperbarui jika ada komponen baru.

---

## 14. Testing Rules
- Jangan menyatakan pengujian selesai jika belum melakukan build dan memeriksa seluruh 10 skenario pengujian yang tercantum pada instruksi.
- Dokumentasikan log pengujian nyata pada `docs/Testing-Documentation.md`.

---

## 15. Security & Prototype Rules
1. Jangan menggunakan payment gateway sungguhan (Midtrans/Xendit/dll).
2. Jangan meminta nomor rekening, PIN, atau data perbankan sensitif asli.
3. Seluruh data transaksi, akun, dan saldo adalah data tiruan (*dummy*).
4. Jangan mengklaim sistem ini terintegrasi secara resmi dengan KAI atau dompet digital manapun.

---

## 16. Restrictions
- **DILARANG** membuat tombol dekoratif atau "placeholder" yang tidak memiliki aksi nyata.
- **DILARANG** meninggalkan rute navigasi yang menghasilkan halaman kosong atau 404 tanpa penanganan.
- **DILARANG** menghapus fitur yang sudah berjalan saat menambahkan fitur baru.

---

## 17. Definition of Done (DoD)
Sebuah tugas atau sesi pengembangan dinyatakan selesai apabila:
1. Kode berhasil dibangun (`npm run build`) tanpa error.
2. Seluruh 10 skenario pengujian fungsional berjalan sukses.
3. Seluruh dokumen (`README.md`, `CHANGELOG.md`, `agent.md`, `SKILL.md`, dan folder `docs/`) tersedia dan mutakhir.
4. Demo Controls berfungsi sempurna untuk semua status.
