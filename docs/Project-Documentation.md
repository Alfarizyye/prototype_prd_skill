# Project Documentation: E-Wallet Payment Status & Recovery

## 1. Pendahuluan
Dokumen ini menyajikan arsitektur teknis, keputusan desain sistem, dan perancangan rekayasa interaksi pada purwarupa web **Access by KAI — E-Wallet Payment Status & Recovery**. Purwarupa ini dikembangkan untuk memvalidasi solusi UX terhadap permasalahan ketidakpastian status transaksi pada pembayaran tiket kereta api menggunakan dompet digital (*e-wallet*).

---

## 2. Arsitektur Sistem Prototype

### 2.1 Pola Arsitektur (Architectural Pattern)
Purwarupa menggunakan pola **Single Page Application (SPA)** berbasis komponen fungsional React dengan **Centralized Context State Management** (`TransactionContext`).

```
┌─────────────────────────────────────────────────────────────┐
│                       Browser Window                        │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    App Container                      │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │            TransactionProvider (State)          │  │  │
│  │  │  - transactionData                              │  │  │
│  │  │  - updateStatus(paymentStatus, ticketStatus)    │  │  │
│  │  │  - verifyStatus()                               │  │  │
│  │  │  - resetTransaction()                           │  │  │
│  │  │  - localStorage Sync                            │  │  │
│  │  └───────────────────────┬─────────────────────────┘  │  │
│  │                          │                            │  │
│  │        ┌─────────────────┴─────────────────┐          │  │
│  │        ▼                                   ▼          │  │
│  │  ┌───────────────┐                  ┌──────────────┐  │  │
│  │  │ Mobile Shell  │                  │  Demo Bar    │  │  │
│  │  │  - Header     │                  │  (Floating)  │  │  │
│  │  │  - Active Page│                  │  - Controls  │  │  │
│  │  │  - Bottom Nav │                  │  - Scenarios │  │  │
│  │  │  - Modals     │                  └──────────────┘  │  │
│  │  └───────────────┘                                    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Komponen Arsitektur Utama
1. **`TransactionContext`**: Menyediakan satu-satunya sumber kebenaran (*Single Source of Truth*) untuk data pemesanan, data penumpang, metode pembayaran, status transaksi, status tiket, dan riwayat status (*audit trail*).
2. **`MobileShell`**: Menjamin pengalaman visual menyerupai smartphone pada layar desktop dengan mockup bingkai ponsel elegan, serta mendukung mode responsif penuh (*full width*).
3. **`DemoControlBar`**: Kontrol pengujian mengambang yang memungkinkan evaluator menguji perubahan kondisi status seketika tanpa mengubah kode sumber.
4. **`Router Engine`**: Mengelola navigasi antar-halaman secara deklaratif dan responsif.

---

## 3. Keputusan Teknis & Implementasi (Implementation Decisions)

| No | Topik | Keputusan Implementasi | Rasional Teknis & UX |
|---|---|---|---|
| 1 | **Status Separation** | Memisahkan variabel `paymentStatus` dan `ticketStatus`. | Pembayaran dan penerbitan tiket adalah sistem terdistribusi independen. Tiket bisa saja tertunda (*queueing*) meski saldo sudah terpotong. |
| 2 | **Anti-Double Payment** | Pengecekan logika programatis pada level tombol dan transisi rute. | Mencegah pengguna memicu transaksi baru saat status masih `Pending` atau `Unknown`. |
| 3 | **State Persistence** | Menggunakan `localStorage` dengan fallback memori lokal. | Mencegah data simulasi hilang saat pengguna memuat ulang (*refresh*) halaman peramban. |
| 4 | **Simulasi Status Unknown** | Ditambahkan sebagai status ke-4 dengan perlakuan protektif. | Merefleksikan kondisi nyata *network timeout* di mana sistem KAI kehilangan sinyal konfirmasi dari mitra e-wallet. |
| 5 | **Guided Balance Assistant** | Form interaktif pada halaman `Failed` untuk menanyakan apakah saldo pengguna terpotong. | Mengeliminasi asumsi sepihak sistem dan memberikan rute aman bagi pengguna. |

---

## 4. Keamanan dan Batasan Prototipe (Limitations & Security)
- Seluruh interaksi keuangan sepenuhnya merupakan **simulasi lokal**.
- Tidak ada data pribadi atau perbankan nyata yang dikumpulkan atau disimpan.
- Sistem tidak melakukan pemanggilan API ke payment gateway pihak ketiga sungguhan.
- Prototipe ditujukan semata-mata untuk evaluasi akademis dan pengujian kegunaan (*usability testing*).
