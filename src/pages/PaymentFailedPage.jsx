import React from 'react';
import {
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Home,
  FileText,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { PaymentStatusBadge, TicketStatusBadge } from '../components/StatusBadge';
import { useTransaction } from '../context/TransactionContext';
import { formatRupiah } from '../utils/formatters';

export default function PaymentFailedPage() {
  const {
    transaction,
    navigate,
    verifyTransactionStatus,
    isVerifying,
    isBalanceDeducted,
    setIsBalanceDeducted,
    canRetryPayment,
    setIsReportModalOpen,
  } = useTransaction();

  const handleRetryPayment = () => {
    if (canRetryPayment) {
      navigate('booking');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <Header title="Status Pembayaran" showBack={false} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        {/* Failed Visual & Notice */}
        <div className="text-center pt-2 pb-1 space-y-2">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-md">
            <AlertCircle className="w-10 h-10 stroke-[2.5]" />
          </div>
          <h2 className="text-lg font-black text-slate-800 tracking-tight">
            Pembayaran Belum Berhasil
          </h2>
          <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
            Pembayaran belum berhasil dikonfirmasi. Silakan periksa riwayat transaksi e-wallet Anda
            sebelum mencoba melakukan pembayaran kembali.
          </p>
        </div>

        {/* Status Badges */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2.5">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700">Status Pembayaran</span>
            <PaymentStatusBadge status={transaction.paymentStatus} />
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-xs font-bold text-slate-700">Status Pemesanan Tiket</span>
            <TicketStatusBadge status={transaction.ticketStatus} />
          </div>
        </div>

        {/* Guided 4-Step Balance Assistant (CRITICAL UX REQUIREMENT) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-kai-blue text-white flex items-center justify-center font-bold text-xs">
              ?
            </div>
            <h3 className="font-extrabold text-xs text-slate-800">
              Panduan Pemulihan Transaksi (Langkah 1 dari 2)
            </h3>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
            <p className="text-xs font-bold text-slate-800">
              Apakah saldo {transaction.paymentMethod} Anda telah terpotong?
            </p>
            <p className="text-[11px] text-slate-500">
              Buka aplikasi {transaction.paymentMethod} Anda dan periksa mutasi saldo terakhir.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsBalanceDeducted(true)}
                className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  isBalanceDeducted === true
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                <span>Ya, Terpotong</span>
              </button>

              <button
                type="button"
                onClick={() => setIsBalanceDeducted(false)}
                className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  isBalanceDeducted === false
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Tidak Terpotong</span>
              </button>
            </div>
          </div>

          {/* Condition 1: Saldo Terpotong */}
          {isBalanceDeducted === true && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 space-y-2 text-xs text-amber-950 animate-fadeIn">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>JANGAN MEMBAYAR ULANG!</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Karena saldo Anda telah terpotong, pembayaran ulang akan berisiko pemotongan ganda.
                Sistem perbankan akan memproses rekonsiliasi pengembalian dana (*refund*) dalam 1x24 jam kerja,
                atau Anda dapat melaporkannya ke tim kami sekarang.
              </p>
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Buka Form Lapor Saldo Terpotong</span>
              </button>
            </div>
          )}

          {/* Condition 2: Saldo Tidak Terpotong */}
          {isBalanceDeducted === false && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 space-y-2 text-xs text-emerald-950 animate-fadeIn">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>AMAN UNTUK MEMESAN / BAYAR KEMBALI</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Saldo Anda tidak berkurang. Anda aman untuk mencoba pembayaran ulang atau memilih metode pembayaran e-wallet lainnya.
              </p>
              <button
                onClick={handleRetryPayment}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Coba Pembayaran Kembali Sekarang</span>
              </button>
            </div>
          )}
        </div>

        {/* Transaction Summary Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2 text-xs">
          <h3 className="font-bold text-slate-800 pb-1 border-b border-slate-100">
            Detail Transaksi
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
            <span className="text-slate-800">Total Nominal</span>
            <span className="text-slate-700 font-extrabold">{formatRupiah(transaction.totalAmount)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={verifyTransactionStatus}
            disabled={isVerifying}
            className="w-full bg-kai-blue hover:bg-kai-dark text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Memeriksa ke Gateway...' : 'Periksa Kembali Status Transaksi'}</span>
          </button>

          <button
            onClick={() => navigate('detail')}
            className="w-full bg-white hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-300 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Lihat Rincian Detail Transaksi</span>
          </button>

          <button
            onClick={() => navigate('help')}
            className="w-full text-slate-600 hover:text-kai-blue font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-kai-blue" />
            <span>Pusat Bantuan & Saluran CS KAI</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
