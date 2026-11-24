import React, { useState, useEffect } from 'react';
import { Loader2, ShieldCheck, Clock, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import Header from '../components/Header';
import { useTransaction } from '../context/TransactionContext';
import { formatRupiah } from '../utils/formatters';

export default function PaymentProcessingPage() {
  const { transaction, setPaymentScenario, navigate } = useTransaction();
  const [countdown, setCountdown] = useState(15 * 60); // 15 mins countdown
  const [stepText, setStepText] = useState('Menghubungkan ke server e-wallet...');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const step1 = setTimeout(() => {
      setStepText('Memvalidasi saldo dan otorisasi pembayaran...');
    }, 1500);

    const step2 = setTimeout(() => {
      setStepText('Menunggu konfirmasi balasan dari gateway perbankan...');
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(step1);
      clearTimeout(step2);
    };
  }, []);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <Header title="Memproses Pembayaran" showBack={false} />

      <div className="flex-1 overflow-y-auto p-5 flex flex-col items-center justify-center text-center space-y-6 pb-12">
        {/* Animated Loading Ring */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-slate-200 border-t-kai-blue animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bold text-xs text-kai-blue font-mono">
              {transaction.paymentMethod}
            </span>
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-2 max-w-xs">
          <h2 className="text-base font-extrabold text-slate-800">
            Transaksi Sedang Diproses
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {stepText}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>Selesaikan dalam: {formatTimer(countdown)}</span>
          </div>
        </div>

        {/* Transaction Summary Card */}
        <div className="w-full bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-left space-y-2 text-xs">
          <div className="flex justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500">ID Transaksi</span>
            <span className="font-mono font-bold text-slate-800">{transaction.transactionId}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500">Kereta Api</span>
            <span className="font-bold text-slate-800">{transaction.trainName}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500">Metode</span>
            <span className="font-bold text-kai-blue">{transaction.paymentMethod}</span>
          </div>
          <div className="flex justify-between items-center pt-1 font-bold">
            <span className="text-slate-800">Total Nominal</span>
            <span className="text-kai-accent text-sm">{formatRupiah(transaction.totalAmount)}</span>
          </div>
        </div>

        {/* Quick Simulator Buttons */}
        <div className="w-full bg-slate-100 rounded-2xl p-3 border border-slate-200 space-y-2">
          <p className="text-[11px] font-bold text-slate-600">
            PILIH SIMULASI HASIL GATEWAY (DEMO PRD):
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setPaymentScenario('Success', 'Ticket Issued')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-2 rounded-xl flex items-center justify-center gap-1 shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Simulasi Sukses</span>
            </button>

            <button
              onClick={() => setPaymentScenario('Pending', 'Waiting for Payment Confirmation')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-2 rounded-xl flex items-center justify-center gap-1 shadow-sm transition-colors"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Simulasi Pending</span>
            </button>

            <button
              onClick={() => setPaymentScenario('Failed', 'Booking Not Completed')}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-2 rounded-xl flex items-center justify-center gap-1 shadow-sm transition-colors"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Simulasi Gagal</span>
            </button>

            <button
              onClick={() => setPaymentScenario('Unknown', 'Booking Status Not Confirmed')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded-xl flex items-center justify-center gap-1 shadow-sm transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Simulasi Unknown</span>
            </button>
          </div>
        </div>

        {/* Security Assurance */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Jangan merefresh halaman selama verifikasi berlangsung.</span>
        </div>
      </div>
    </div>
  );
}
