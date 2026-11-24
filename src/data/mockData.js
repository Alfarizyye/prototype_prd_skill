export const STATIONS = [
  { id: 'GMR', name: 'Gambir', city: 'Jakarta', code: 'GMR' },
  { id: 'PSE', name: 'Pasar Senen', city: 'Jakarta', code: 'PSE' },
  { id: 'BD', name: 'Bandung', city: 'Bandung', code: 'BD' },
  { id: 'YK', name: 'Yogyakarta', city: 'Yogyakarta', code: 'YK' },
  { id: 'SMT', name: 'Semarang Tawang', city: 'Semarang', code: 'SMT' },
  { id: 'SGU', name: 'Surabaya Gubeng', city: 'Surabaya', code: 'SGU' },
];

export const PASSENGER_PERSONA = {
  name: 'Muhammad Senopati',
  idNumber: '3271020401030005',
  type: 'Dewasa',
  age: 21,
  phone: '0812-9876-5432',
  email: 'senopati.m@univ.ac.id',
  seat: 'Eks-1 / 12A',
};

export const TRAIN_SCHEDULES = [
  {
    id: 'TR-01',
    name: 'Argo Parahyangan',
    number: 'KA 34',
    trainClass: 'Eksekutif',
    origin: 'Gambir (GMR)',
    destination: 'Bandung (BD)',
    departureTime: '08:00',
    arrivalTime: '10:45',
    duration: '2j 45m',
    price: 150000,
    availableSeats: 18,
  },
  {
    id: 'TR-02',
    name: 'Taksaka',
    number: 'KA 68',
    trainClass: 'Eksekutif',
    origin: 'Gambir (GMR)',
    destination: 'Yogyakarta (YK)',
    departureTime: '09:20',
    arrivalTime: '15:35',
    duration: '6j 15m',
    price: 480000,
    availableSeats: 6,
  },
  {
    id: 'TR-03',
    name: 'Argo Bromo Anggrek',
    number: 'KA 2',
    trainClass: 'Eksekutif',
    origin: 'Gambir (GMR)',
    destination: 'Surabaya Pasarturi (SBI)',
    departureTime: '08:20',
    arrivalTime: '16:25',
    duration: '8j 05m',
    price: 610000,
    availableSeats: 24,
  },
];

export const EWALLET_PROVIDERS = [
  {
    id: 'gopay',
    name: 'GoPay',
    color: '#00AED6',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-300',
    iconText: 'GP',
    account: '0812-****-5432',
    balance: 350000,
  },
  {
    id: 'dana',
    name: 'DANA',
    color: '#118EEA',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    iconText: 'DN',
    account: '0812-****-5432',
    balance: 280000,
  },
  {
    id: 'ovo',
    name: 'OVO',
    color: '#4C3494',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    iconText: 'OV',
    account: '0812-****-5432',
    balance: 195000,
  },
  {
    id: 'linkaja',
    name: 'LinkAja',
    color: '#ED1C24',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    iconText: 'LA',
    account: '0812-****-5432',
    balance: 410000,
  },
];

export const INITIAL_TRANSACTION = {
  transactionId: 'TRX-20261124-8841',
  bookingId: 'KAI-88A9F1',
  passengerName: PASSENGER_PERSONA.name,
  passengerId: PASSENGER_PERSONA.idNumber,
  trainName: 'Argo Parahyangan',
  trainNumber: 'KA 34',
  trainClass: 'Eksekutif',
  origin: 'Gambir (GMR)',
  destination: 'Bandung (BD)',
  travelDate: '25 Nov 2026',
  departureTime: '08:00 WIB',
  arrivalTime: '10:45 WIB',
  seatNumber: 'Eks-1 / 12A',
  paymentMethod: 'GoPay',
  amount: 150000,
  adminFee: 0,
  totalAmount: 150000,
  paymentStatus: 'Pending', // 'Success' | 'Pending' | 'Failed' | 'Unknown'
  ticketStatus: 'Waiting for Payment Confirmation', // 'Ticket Issued' | 'Waiting for Ticket Issuance' | 'Waiting for Payment Confirmation' | 'Booking Not Completed' | 'Booking Status Not Confirmed'
  transactionTime: '24 Nov 2026, 16:45 WIB',
  statusHistory: [
    {
      time: '16:45:10 WIB',
      paymentStatus: 'Pending',
      ticketStatus: 'Waiting for Payment Confirmation',
      description: 'Permintaan pembayaran e-wallet dikirim ke gateway',
    },
  ],
};

export const FAQ_DATA = [
  {
    id: 1,
    question: 'Apa yang harus dilakukan jika pembayaran berstatus PENDING (Sedang Diproses)?',
    answer:
      'Jika status pembayaran masih Pending, transaksi Anda sedang dalam tahap verifikasi antrean di gateway e-wallet. DILARANG melakukan pembayaran ulang untuk tiket atau rute yang sama agar saldo Anda tidak terpotong dua kali. Silakan tunggu 2 hingga 5 menit, kemudian tekan tombol "Periksa Status Pembayaran" untuk menyinkronkan status terbaru.',
  },
  {
    id: 2,
    question: 'Apa yang harus dilakukan jika status transaksi UNKNOWN (Belum Dapat Dipastikan)?',
    answer:
      'Status Unknown terjadi apabila komunikasi jaringan antara sistem Access by KAI dan penyedia e-wallet terputus saat proses verifikasi. Status ini BUKAN berarti gagal. Jangan langsung melakukan pembayaran ulang. Silakan periksa riwayat mutasi pada aplikasi e-wallet Anda. Jika saldo terpotong, hubungi layanan bantuan kami untuk sinkronisasi manual.',
  },
  {
    id: 3,
    question: 'Bagaimana jika saldo e-wallet terpotong tetapi tiket belum muncul?',
    answer:
      'Jika saldo e-wallet Anda sudah berkurang tetapi status tiket masih "Menunggu Penerbitan", jangan cemas! Dana Anda telah berhasil dicatat oleh sistem perbankan. Penerbitan tiket terkadang mengalami antrean latensi server (10-15 menit). Anda dapat menekan tombol "Periksa Status" pada Detail Transaksi atau mengisi formulir "Lapor Kendala Transaksi" untuk percepatan validasi.',
  },
  {
    id: 4,
    question: 'Bagaimana jika pembayaran dinyatakan FAILED (Gagal)?',
    answer:
      'Pembayaran gagal dapat disebabkan oleh saldo tidak mencukupi, waktu otorisasi habis (timeout), atau pembatalan di aplikasi e-wallet. Pastikan Anda memeriksa riwayat mutasi dompet digital Anda terlebih dahulu. Jika saldo TIDAK terpotong, Anda aman untuk melakukan pemesanan dan pembayaran ulang.',
  },
  {
    id: 5,
    question: 'Bagaimana cara memeriksa detail transaksi dan bukti pembayaran?',
    answer:
      'Anda dapat mengakses halaman "Detail Transaksi" melalui menu navigasi bawah atau dari tautan pada halaman status. Pada halaman tersebut tercantum ID Transaksi, Kode Booking, metode pembayaran, rincian biaya, status pembayaran, status tiket, serta riwayat perubahan status transaksi secara real-time.',
  },
];
