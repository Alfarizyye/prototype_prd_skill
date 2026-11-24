import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Smartphone,
  Maximize2,
  Minimize2,
  Layers,
  ChevronUp,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import { useTransaction } from '../context/TransactionContext';

export default function DemoControlBar() {
  const {
    transaction,
    setPaymentScenario,
    verifyTransactionStatus,
    resetTransaction,
    isVerifying,
    isMobileFrame,
    setIsMobileFrame,
  } = useTransaction();

  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      aria-label="Panel Demo Simulasi"
      className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 text-white backdrop-blur-md border-t border-slate-700 shadow-2xl transition-all"
    >
      {/* Bar Top Toggle */}
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-kai-accent animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-kai-accent uppercase">
            Demo Controls Lab
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            (Alat Pengujian Skenario Status Transaksi PRD)
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Frame Toggle */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            title={isMobileFrame ? 'Ganti ke Layar Penuh' : 'Ganti ke Simulator Ponsel'}
          >
            {isMobileFrame ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Layar Penuh</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Frame Ponsel</span>
              </>
            )}
          </button>

          {/* Expand/Collapse */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            title={isExpanded ? 'Sembunyikan Kontrol' : 'Tampilkan Kontrol'}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Controls */}
      {isExpanded && (
        <div className="max-w-4xl mx-auto px-4 pb-3 pt-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {/* 1. Success */}
            <button
              onClick={() => setPaymentScenario('Success', 'Ticket Issued')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                transaction.paymentStatus === 'Success' && transaction.ticketStatus === 'Ticket Issued'
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-900/50 scale-[1.02]'
                  : 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300 hover:bg-emerald-900/80'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Success</span>
            </button>

            {/* 2. Pending */}
            <button
              onClick={() => setPaymentScenario('Pending', 'Waiting for Payment Confirmation')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                transaction.paymentStatus === 'Pending'
                  ? 'bg-amber-600 border-amber-400 text-white shadow-lg shadow-amber-900/50 scale-[1.02]'
                  : 'bg-amber-950/60 border-amber-800/80 text-amber-300 hover:bg-amber-900/80'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Pending</span>
            </button>

            {/* 3. Failed */}
            <button
              onClick={() => setPaymentScenario('Failed', 'Booking Not Completed')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                transaction.paymentStatus === 'Failed'
                  ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-900/50 scale-[1.02]'
                  : 'bg-rose-950/60 border-rose-800/80 text-rose-300 hover:bg-rose-900/80'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Failed</span>
            </button>

            {/* 4. Unknown */}
            <button
              onClick={() => setPaymentScenario('Unknown', 'Booking Status Not Confirmed')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                transaction.paymentStatus === 'Unknown'
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-900/50 scale-[1.02]'
                  : 'bg-indigo-950/60 border-indigo-800/80 text-indigo-300 hover:bg-indigo-900/80'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Unknown</span>
            </button>

            {/* 5. Success + Ticket Pending */}
            <button
              onClick={() =>
                setPaymentScenario(
                  'Success',
                  'Waiting for Ticket Issuance',
                  'Pembayaran berhasil, tetapi tiket sedang dalam antrean penerbitan'
                )
              }
              className={`col-span-2 sm:col-span-2 md:col-span-1 flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl text-[11px] font-bold border transition-all ${
                transaction.paymentStatus === 'Success' && transaction.ticketStatus === 'Waiting for Ticket Issuance'
                  ? 'bg-teal-600 border-teal-400 text-white shadow-lg shadow-teal-900/50 scale-[1.02]'
                  : 'bg-teal-950/60 border-teal-800/80 text-teal-300 hover:bg-teal-900/80'
              }`}
              title="Pembayaran Berhasil, Tiket Menunggu Penerbitan"
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Tiket Pending</span>
            </button>

            {/* 6. Check Status */}
            <button
              onClick={verifyTransactionStatus}
              disabled={isVerifying}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 border border-blue-400 text-white transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
              <span>{isVerifying ? 'Cek...' : 'Cek Status'}</span>
            </button>

            {/* 7. Reset */}
            <button
              onClick={resetTransaction}
              className="col-span-2 sm:col-span-1 md:col-span-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 transition-all"
              title="Reset Simulasi ke Kondisi Awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
            <p>
              Status Aktif: <strong className="text-white font-mono">{transaction.paymentStatus}</strong> |
              Tiket: <strong className="text-kai-accent font-mono">{transaction.ticketStatus}</strong>
            </p>
            <p className="hidden md:inline">
              *Panel demo hanya digunakan untuk pengujian prototype UX
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
