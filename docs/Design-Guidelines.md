# Design Guidelines & Visual Standards

## Access by KAI — E-Wallet Payment Status & Recovery

Dokumen ini merupakan panduan visual, sistem token desain, tipografi, dan standar aksesibilitas antarmuka pengguna untuk purwarupa **Access by KAI**.

---

## 1. Identitas Visual & Filosofi Desain

Karakter desain yang diterapkan:
- **Modern & Minimalis**: Memaksimalkan ruang negatif (*whitespace*) agar pengguna dalam kondisi cemas tidak kewalahan menerima informasi.
- **Profesional & Terpercaya**: Terinspirasi dari identitas visual resmi transportasi perkeretaapian Indonesia (Access by KAI).
- **Mobile-First & Clean**: Disesuaikan untuk interaksi sentuhan satu tangan (*thumb-friendly interaction*).

---

## 2. Palet Warna (Color System)

### 2.1 Warna Brand (KAI Corporate Colors)
- **KAI Deep Blue (Primer)**: `#1D3F7A`  
  Digunakan pada Header aplikasi, Hero cards, tombol CTA utama, dan indikator aktif navigasi.
- **KAI Dark Blue (Sekunder)**: `#132B54`  
  Digunakan pada footer modal, bar simulator ponsel, dan aksen latar gelap.
- **KAI Orange (Aksen Brand)**: `#ED6B23` / `#FF7300`  
  Digunakan pada badge promo, tombol sekunder penting, dan highlight rute kereta.
- **Subtle Background**: `#F4F7FC` / `#F8FAFC`  
  Latar belakang abu-abu terang yang nyaman di mata.

### 2.2 Warna Status Transaksi (Transaction Status Colors)
Setiap status memiliki identitas warna wajib yang konsisten:
```
┌─────────────────────────────────────────────────────────────┐
│ 🟢 SUCCESS: Emerald Green (#10B981 / #059669)               │
│    Artinya: Dana terverifikasi lunas, reservasi aman.       │
├─────────────────────────────────────────────────────────────┤
│ 🟡 PENDING: Amber / Orange (#F58220 / #EAB308)               │
│    Artinya: Menunggu antrean jaringan, saldo diverifikasi.  │
├─────────────────────────────────────────────────────────────┤
│ 🔴 FAILED: Crimson Red (#DC2626 / #E11D48)                  │
│    Artinya: Otorisasi ditolak/dibatalkan, cek mutasi saldo. │
├─────────────────────────────────────────────────────────────┤
│ 🟣 UNKNOWN: Indigo / Violet (#6366F1 / #4F46E5)             │
│    Artinya: Koneksi terputus, butuh verifikasi berkala.     │
└─────────────────────────────────────────────────────────────┘
```

> **Aturan Aksesibilitas Warna**: Jangan pernah mengandalkan warna sebagai satu-satunya indikator status. Setiap badge status wajib menyertakan **ikon semantik** dan **label teks eksplisit** (misal: "PENDING (Sedang Diproses)").

---

## 3. Tipografi (Typography)

Menggunakan keluarga huruf **Inter** (sans-serif modern yang dirancang untuk keterbacaan tinggi pada layar digital):

| Skala Tipografi | Ukuran | Weight | Line Height | Contoh Penggunaan |
|---|---|---|---|---|
| **Heading 1** | 22px (`text-xl`) | Bold (700) | 1.25 | Judul Layar Status Utama |
| **Heading 2** | 18px (`text-lg`) | Semi-Bold (600) | 1.3 | Judul Kartu & Modal Dialog |
| **Subtitle / Subheader** | 15px (`text-base`) | Medium (500) | 1.4 | Label Kereta, Nama Penumpang |
| **Body Regular** | 13px - 14px (`text-sm`) | Regular (400) | 1.5 | Paragraf penjelas error & FAQ |
| **Meta / Caption** | 11px - 12px (`text-xs`) | Medium (500) | 1.4 | Timestamp, Kode Transaksi, Badge |

---

## 4. Komponen UI Reusable

### 4.1 Cards & Containers
- Border radius: `rounded-2xl` (16px) untuk kartu informasi perjalanan dan rincian transaksi; `rounded-3xl` (24px) untuk container modal.
- Border: `border border-slate-200` atau `border-kai-border`.
- Shadows: Bayangan lembut `shadow-sm` untuk kartu reguler, `shadow-xl` untuk floating action bar dan modal popup.

### 4.2 Tombol Aksi (Buttons)
- **Primary Button**: Background KAI Deep Blue (`#1D3F7A`), teks putih, tinggi minimal 44px, `rounded-xl`, hover state lembut.
- **Secondary / Ghost Button**: Background transparan atau slate terang, border tipis, teks KAI Blue.
- **Disabled Button**: Opasitas 50%, kursor `not-allowed`, teks abu-abu pudar untuk mencegah klik ganda.
- **Loading State**: Tombol mengganti teks dengan spinner animasi (`Loader2` berputar) dan dinonaktifkan sementara.

### 4.3 Dialog Modal
- Menggunakan backdrop semi-transparan `bg-black/60` dengan efek *backdrop-blur-sm*.
- Animasi transisi halus (*fade-in* dan *scale-up*).
- Tombol tutup silang (`X`) di sudut kanan atas dengan touch target 40px.

---

## 5. Aksesibilitas (WCAG 2.1 AA Compliance)
1. **Rasio Kontras**: Teks primer (`#0F172A`) terhadap latar belakang putih (`#FFFFFF`) menghasilkan rasio 16.5:1 (jauh di atas batas minimal WCAG 4.5:1).
2. **Keyboard Navigation & Focus Ring**: Seluruh elemen input dan tombol memiliki focus ring `focus:ring-2 focus:ring-kai-blue`.
3. **Screen Reader Support**: Menambahkan atribut `aria-label` pada tombol ikon (seperti tombol salin kode booking dan tombol tutup modal).
