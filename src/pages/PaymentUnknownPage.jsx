import React from 'react';
import {
  HelpCircle,
  RefreshCw,
  AlertTriangle,
  FileText,
  ShieldAlert,
  Home,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { PaymentStatusBadge, TicketStatusBadge } from '../components/StatusBadge';
import { useTransaction } from '../context/TransactionContext';
import { formatRupiah } from '../utils/formatters';

export default function PaymentUnknownPage() {
  const {
    transaction,
    navigate,
    verifyTransactionStatus,
    isVerifying,
    setIsReportModalOpen,
  } = useTransaction();

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <Header title="Status Pembayaran" showBack={false} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        {/* Unknown Visual & Header */}
        <div className="text-center pt-2 pb-1 space-y-2">
          <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-md">
            <HelpCircle className="w-10 h-10 stroke-[2.5]" />
          </div>
          <h2 className="text-lg font-black text-slate-800 tracking-tight">
            Status Belum Dapat Dipastikan
          </h2>
          <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
            Sistem belum memperoleh konfirmasi kepastian transaksi dari penyedia {transaction.paymentMethod} karena kendala latensi jaringan.
          </p>
        </div>

        {/* Crucial Behavioral Warning (UNKNOWN IS NOT FAILED) */}
        <div className="bg-indigo-50 border-2 border-indigo-400 rounded-2xl p-4 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-950 font-extrabold text-xs">
            <ShieldAlert className="w-5 h-5 text-indigo-600 shrink-0" />
            <span>PERINGATAN: STATUS BUKAN GAGAL</span>
          </div>
          <p className="text-xs text-indigo-900 font-medium leading-relaxed">
            Status ini <strong>BUKAN</strong> kegagalan transaksi (*Failed*). Pembayaran Anda mungkin sudah berhasil di sisi e-wallet namun laporannya tertunda sampai ke sistem KAI.
            <strong> Jangan langsung melakukan pembayaran ulang </strong>
            sebelum status dipastikan, agar terhindar dari pemotongan saldo berulang.
          </p>
        </div>

        {/* Status Badges */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700">Status Pembayaran</span>
            <PaymentStatusBadge status={transaction.paymentStatus} />
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700">Status Pemesanan Tiket</span>
            <TicketStatusBadge status={transaction.ticketStatus} />
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            Status reservasi tiket Anda sedang ditahan sementara (*on hold*) selama sistem menunggu konfirmasi.
          </p>
        </div>

        {/* Safe Actions Guide */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2 text-xs">
          <h3 className="font-bold text-slate-800 pb-1 border-b border-slate-100">
            Langkah yang Perlu Anda Lakukan:
          </h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-600 text-[11px] leading-relaxed">
            <li>Buka aplikasi <strong>{transaction.paymentMethod}</strong> dan periksa riwayat mutasi saldo.</li>
            <li>Tekan tombol <strong>"Periksa Status Transaksi"</strong> di bawah untuk meminta sinkronisasi ulang ke gateway.</li>
            <li>Jika saldo terpotong namun status belum berubah dalam 10 menit, laporkan kepada layanan bantuan kami.</li>
          </ol>
        </div>

        {/* Transaction Summary Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2 text-xs">
          <h3 className="font-bold text-slate-800 pb-1 border-b border-slate-100">
            Rincian Transaksi Terkait
          </h3>
          <div className="flex justify-between text-slate-600">
            <span>ID Transaksi</span>
            <span className="font-mono font-bold text-slate-800">{transaction.transactionId}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Kereta Api</span>
            <span className="font-bold text-slate-800">{transaction.trainName}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Metode</span>
            <span className="font-bold text-kai-blue">{transaction.paymentMethod}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-100 font-bold">
            <span className="text-slate-800">Total Tagihan</span>
            <span className="text-slate-800 font-extrabold">{formatRupiah(transaction.totalAmount)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          {/* Check Status Action */}
          <button
            onClick={verifyTransactionStatus}
            disabled={isVerifying}
            className="w-full bg-kai-blue hover:bg-kai-dark text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Sinkronisasi Gateway...' : 'Periksa Status Transaksi Sekarang'}</span>
          </button>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Lapor Transaksi Belum Terkonfirmasi</span>
          </button>

          <button
            onClick={() => navigate('detail')}
            className="w-full bg-white hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-300 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Lihat Detail & Riwayat Transaksi</span>
          </button>

          <button
            onClick={() => navigate('home')}
            className="w-full text-slate-500 hover:text-kai-blue font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
