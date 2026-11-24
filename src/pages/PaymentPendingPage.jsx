import React, { useState, useEffect } from 'react';
import {
  Clock,
  RefreshCw,
  AlertCircle,
  FileText,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  Info,
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { PaymentStatusBadge, TicketStatusBadge } from '../components/StatusBadge';
import { useTransaction } from '../context/TransactionContext';
import { formatRupiah } from '../utils/formatters';

export default function PaymentPendingPage() {
  const {
    transaction,
    navigate,
    verifyTransactionStatus,
    isVerifying,
    setIsReportModalOpen,
  } = useTransaction();

  const [autoSeconds, setAutoSeconds] = useState(30);

  // Auto countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setAutoSeconds((prev) => (prev > 1 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <Header title="Status Pembayaran" showBack={false} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        {/* Animated Pending Visual */}
        <div className="text-center pt-2 pb-1 space-y-2">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-md">
            <Clock className="w-10 h-10 animate-spin" />
          </div>
          <h2 className="text-lg font-black text-slate-800 tracking-tight">
            Pembayaran Sedang Diproses
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Sistem sedang memverifikasi transaksi Anda ke penyedia {transaction.paymentMethod}.
          </p>
        </div>

        {/* Anti-Double Payment Warning Card (MANDATORY REQUIREMENT) */}
        <div className="bg-amber-500/10 border-2 border-amber-500 rounded-2xl p-4 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <span>PENTING: JANGAN LAKUKAN PEMBAYARAN ULANG</span>
          </div>
          <p className="text-xs text-amber-950 font-medium leading-relaxed">
            Pembayaran Anda sedang diverifikasi. Silakan tunggu hingga status transaksi diperbarui.
            <strong> Jangan melakukan pemesanan atau pembayaran ulang </strong>
            sebelum status transaksi sebelumnya dipastikan agar saldo e-wallet Anda tidak terpotong dua kali.
          </p>
        </div>

        {/* Status Badges */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700">Status Pembayaran</span>
            <PaymentStatusBadge status={transaction.paymentStatus} />
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700">Status Tiket</span>
            <TicketStatusBadge status={transaction.ticketStatus} />
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Sinkronisasi Otomatis</span>
            <span className="font-mono text-amber-700 font-bold">
              Dalam {autoSeconds} detik
            </span>
          </div>
        </div>

        {/* Transaction Summary Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2 text-xs">
          <h3 className="font-bold text-slate-800 pb-1 border-b border-slate-100">
            Ringkasan Transaksi
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
            <span>Metode Pembayaran</span>
            <span className="font-bold text-kai-blue">{transaction.paymentMethod}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Waktu Transaksi</span>
            <span className="font-medium text-slate-700">{transaction.transactionTime}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-100 font-bold">
            <span className="text-slate-800">Total Tagihan</span>
            <span className="text-kai-accent text-sm font-extrabold">{formatRupiah(transaction.totalAmount)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          {/* Check Status Button (FR-04) */}
          <button
            onClick={verifyTransactionStatus}
            disabled={isVerifying}
            className="w-full bg-kai-blue hover:bg-kai-dark text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Sedang Memeriksa ke Gateway...' : 'Periksa Status Pembayaran Sekarang'}</span>
          </button>

          <button
            onClick={() => navigate('detail')}
            className="w-full bg-white hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-300 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Lihat Detail Transaksi & Riwayat</span>
          </button>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="w-full text-slate-600 hover:text-kai-blue font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Ada Kendala? Lapor ke Layanan Bantuan</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
