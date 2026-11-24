import React, { useState } from 'react';
import {
  CheckCircle2,
  Ticket,
  FileText,
  Home,
  Copy,
  Check,
  Clock,
  Train,
  AlertCircle,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { PaymentStatusBadge, TicketStatusBadge } from '../components/StatusBadge';
import { useTransaction } from '../context/TransactionContext';
import { formatRupiah } from '../utils/formatters';

export default function PaymentSuccessPage() {
  const { transaction, navigate, setIsTicketModalOpen, verifyTransactionStatus, isVerifying } = useTransaction();
  const [copied, setCopied] = useState(false);

  const handleCopyBooking = () => {
    navigator.clipboard.writeText(transaction.bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isTicketPending = transaction.ticketStatus === 'Waiting for Ticket Issuance';

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <Header title="Status Pembayaran" showBack={false} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        {/* Success Icon & Header */}
        <div className="text-center pt-2 pb-1 space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md animate-bounce">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          <h2 className="text-lg font-black text-slate-800 tracking-tight">
            Pembayaran Berhasil!
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Terima kasih, dana Anda telah dikonfirmasi oleh pihak {transaction.paymentMethod}.
          </p>
        </div>

        {/* Status Separation Card (MANDATORY PRD FEATURE) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Status Transaksi & Pemesanan
          </p>

          <div className="grid grid-cols-2 gap-2">
            {/* Payment Status */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex flex-col justify-between">
              <div>
                <p className="text-[10px] text-emerald-800 font-bold mb-1">STATUS PEMBAYARAN</p>
                <PaymentStatusBadge status={transaction.paymentStatus} size="md" />
              </div>
              <p className="text-[10px] text-emerald-700 mt-2 font-medium">
                Dana berhasil diterima
              </p>
            </div>

            {/* Ticket Status */}
            <div
              className={`border rounded-xl p-3 flex flex-col justify-between ${
                isTicketPending
                  ? 'bg-amber-50/80 border-amber-300'
                  : 'bg-blue-50/70 border-blue-200'
              }`}
            >
              <div>
                <p
                  className={`text-[10px] font-bold mb-1 ${
                    isTicketPending ? 'text-amber-800' : 'text-kai-blue'
                  }`}
                >
                  STATUS TIKET
                </p>
                <TicketStatusBadge status={transaction.ticketStatus} size="md" />
              </div>
              <p
                className={`text-[10px] mt-2 font-medium ${
                  isTicketPending ? 'text-amber-700' : 'text-slate-600'
                }`}
              >
                {isTicketPending ? 'Menunggu antrean cetak' : 'Siap untuk Boarding'}
              </p>
            </div>
          </div>

          {/* Ticket Pending Explanation Notice */}
          {isTicketPending && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-[11px]">
                  Pembayaran Sukses, Tiket Sedang Diterbitkan:
                </p>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  Pembayaran Anda telah lunas. Namun, server penerbitan tiket sedang mengalami antrean.
                  Kursi Anda tetap aman direservasi. Silakan periksa status secara berkala.
                </p>
                <button
                  onClick={verifyTransactionStatus}
                  disabled={isVerifying}
                  className="mt-1 bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] flex items-center gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${isVerifying ? 'animate-spin' : ''}`} />
                  <span>{isVerifying ? 'Memperbarui...' : 'Sinkronkan Tiket Sekarang'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Booking Code Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">KODE BOOKING TIKET</p>
              <p className="text-xl font-black text-kai-blue font-mono tracking-wider">
                {transaction.bookingId}
              </p>
            </div>
            <button
              onClick={handleCopyBooking}
              className="flex items-center gap-1 text-xs font-bold text-kai-blue bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin'}</span>
            </button>
          </div>

          {/* Train Trip Summary */}
          <div className="text-xs space-y-2">
            <div className="flex justify-between text-slate-700">
              <span className="text-slate-400">Kereta Api</span>
              <span className="font-bold text-slate-800">{transaction.trainName} ({transaction.trainClass})</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="text-slate-400">Rute Perjalanan</span>
              <span className="font-semibold">{transaction.origin} → {transaction.destination}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="text-slate-400">Tanggal & Jam</span>
              <span className="font-semibold">{transaction.travelDate} • {transaction.departureTime}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="text-slate-400">Penumpang / Kursi</span>
              <span className="font-bold text-kai-accent">{transaction.passengerName} ({transaction.seatNumber})</span>
            </div>
            <div className="flex justify-between text-slate-700 pt-1 border-t border-slate-100 font-bold">
              <span>Total Dibayar</span>
              <span className="text-emerald-600 font-extrabold text-sm">{formatRupiah(transaction.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          {transaction.ticketStatus === 'Ticket Issued' && (
            <button
              onClick={() => setIsTicketModalOpen(true)}
              className="w-full bg-kai-blue hover:bg-kai-dark text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <Ticket className="w-4 h-4 text-kai-accent" />
              <span>Lihat Tiket (Boarding Pass)</span>
            </button>
          )}

          <button
            onClick={() => navigate('detail')}
            className="w-full bg-white hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-300 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Lihat Rincian Detail Transaksi</span>
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
