export function formatRupiah(number) {
  if (typeof number !== 'number') return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number);
}

export function getPaymentStatusMeta(status) {
  switch (status) {
    case 'Success':
      return {
        label: 'BERHASIL',
        badgeText: 'Pembayaran Berhasil',
        color: 'emerald',
        bgLight: 'bg-emerald-50',
        bgSolid: 'bg-emerald-600',
        textColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
        borderSolid: 'border-emerald-600',
        description: 'Pembayaran telah dikonfirmasi oleh sistem e-wallet.',
      };
    case 'Pending':
      return {
        label: 'SEDANG DIPROSES',
        badgeText: 'Menunggu Konfirmasi',
        color: 'amber',
        bgLight: 'bg-amber-50',
        bgSolid: 'bg-amber-500',
        textColor: 'text-amber-800',
        borderColor: 'border-amber-200',
        borderSolid: 'border-amber-500',
        description: 'Pembayaran sedang diverifikasi oleh jaringan e-wallet. Mohon tunggu.',
      };
    case 'Failed':
      return {
        label: 'GAGAL',
        badgeText: 'Pembayaran Gagal',
        color: 'rose',
        bgLight: 'bg-rose-50',
        bgSolid: 'bg-rose-600',
        textColor: 'text-rose-700',
        borderColor: 'border-rose-200',
        borderSolid: 'border-rose-600',
        description: 'Pembayaran tidak berhasil diselesaikan. Silakan periksa mutasi saldo Anda.',
      };
    case 'Unknown':
    default:
      return {
        label: 'BELUM DAPAT DIPASTIKAN',
        badgeText: 'Status Belum Pasti',
        color: 'indigo',
        bgLight: 'bg-indigo-50',
        bgSolid: 'bg-indigo-600',
        textColor: 'text-indigo-700',
        borderColor: 'border-indigo-200',
        borderSolid: 'border-indigo-600',
        description: 'Koneksi jaringan gateway terputus. Sistem sedang memastikan status pembayaran Anda.',
      };
  }
}

export function getTicketStatusMeta(status) {
  switch (status) {
    case 'Ticket Issued':
      return {
        label: 'Tiket Diterbitkan',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        description: 'Tiket telah aktif dan siap digunakan untuk boarding.',
      };
    case 'Waiting for Ticket Issuance':
      return {
        label: 'Menunggu Penerbitan',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        description: 'Pembayaran sudah lunas, tiket sedang dalam proses pencetakan digital.',
      };
    case 'Waiting for Payment Confirmation':
      return {
        label: 'Menunggu Konfirmasi Bayar',
        badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
        description: 'Reservasi kursi ditahan sementara menunggu verifikasi pembayaran.',
      };
    case 'Booking Not Completed':
      return {
        label: 'Pemesanan Tidak Selesai',
        badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
        description: 'Pemesanan dibatalkan karena pembayaran tidak berhasil.',
      };
    case 'Booking Status Not Confirmed':
    default:
      return {
        label: 'Status Tiket Ditahan',
        badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300',
        description: 'Status reservasi menunggu kepastian hasil transaksi pembayaran.',
      };
  }
}
