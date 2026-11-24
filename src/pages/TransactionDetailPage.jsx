import React from 'react';
import {
  FileText,
  Train,
  Clock,
  Calendar,
  Ticket,
  Printer,
  Share2,
  HelpCircle,
  RefreshCw,
  History,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { PaymentStatusBadge, TicketStatusBadge } from '../components/StatusBadge';
import { useTransaction } from '../context/TransactionContext';
import { formatRupiah } from '../utils/formatters';

export default function TransactionDetailPage() {
  const {
    transaction,
    navigate,
    verifyTransactionStatus,
    isVerifying,
    setIsTicketModalOpen,
    setIsReportModalOpen,
  } = useTransaction();

  const isPending = transaction.paymentStatus === 'Pending';
  const isUnknown = transaction.paymentStatus === 'Unknown';
  const isSuccess = transaction.paymentStatus === 'Success';
  const isTicketIssued = transaction.ticketStatus === 'Ticket Issued';

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <Header title="Detail Transaksi" showBack={true} backTo="home" />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        {/* Status Header Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">ID TRANSAKSI</p>
              <p className="font-mono font-extrabold text-sm text-slate-800">
                {transaction.transactionId}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase text-right">KODE BOOKING</p>
              <p className="font-mono font-extrabold text-sm text-kai-blue text-right">
                {transaction.bookingId}
              </p>
            </div>
          </div>

          {/* Status Breakdown (PRD Requirement: Separate Status Display) */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status Pembayaran</p>
              <PaymentStatusBadge status={transaction.paymentStatus} size="sm" />
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status Tiket</p>
              <TicketStatusBadge status={transaction.ticketStatus} size="sm" />
            </div>
          </div>

          {(isPending || isUnknown) && (
            <button
              onClick={verifyTransactionStatus}
              disabled={isVerifying}
              className="w-full bg-blue-50 hover:bg-blue-100 text-kai-blue font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 border border-blue-200 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
              <span>{isVerifying ? 'Sedang Memeriksa...' : 'Periksa Status Transaksi Ini'}</span>
            </button>
          )}

          {isTicketIssued && (
            <button
              onClick={() => setIsTicketModalOpen(true)}
              className="w-full bg-kai-blue hover:bg-kai-dark text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Ticket className="w-3.5 h-3.5 text-kai-accent" />
              <span>Buka E-Boarding Pass</span>
            </button>
          )}
        </div>

        {/* Train Trip Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Train className="w-4 h-4 text-kai-blue" />
              <span className="font-bold text-slate-800">{transaction.trainName}</span>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
              {transaction.trainNumber} • {transaction.trainClass}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-800 text-sm">{transaction.origin.split(' ')[0]}</p>
              <p className="text-slate-500 text-[11px]">{transaction.departureTime}</p>
            </div>
            <div className="text-center px-2">
              <p className="text-[10px] text-slate-400">{transaction.travelDate}</p>
              <div className="w-16 h-0.5 bg-slate-300 relative my-1">
                <div className="w-1.5 h-1.5 rounded-full bg-kai-blue absolute -top-0.5 right-0" />
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800 text-sm">{transaction.destination.split(' ')[0]}</p>
              <p className="text-slate-500 text-[11px]">{transaction.arrivalTime}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-medium">PENUMPANG</p>
              <p className="font-bold text-slate-800">{transaction.passengerName}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-medium">KURSI</p>
              <p className="font-extrabold text-kai-accent">{transaction.seatNumber}</p>
            </div>
          </div>
        </div>

        {/* Payment & Audit Info */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2 text-xs">
          <h3 className="font-bold text-slate-800 pb-1 border-b border-slate-100">
            Rincian Pembayaran
          </h3>
          <div className="flex justify-between text-slate-600">
            <span>Metode Pembayaran</span>
            <span className="font-bold text-kai-blue">{transaction.paymentMethod}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Waktu Transaksi</span>
            <span>{transaction.transactionTime}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Harga Tiket</span>
            <span>{formatRupiah(transaction.amount)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Biaya Layanan</span>
            <span className="text-emerald-600 font-bold">Rp 0</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-sm">
            <span>Total Pembayaran</span>
            <span className="text-kai-accent">{formatRupiah(transaction.totalAmount)}</span>
          </div>
        </div>

        {/* Status History Timeline (Audit Trail) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3 text-xs">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
            <History className="w-4 h-4 text-kai-blue" />
            <h3 className="font-bold text-slate-800">
              Riwayat Perubahan Status (Audit Trail)
            </h3>
          </div>

          <div className="space-y-3 relative pl-3 border-l-2 border-slate-200 ml-1.5 pt-1">
            {transaction.statusHistory.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-kai-blue border-2 border-white absolute -left-[17px] top-1" />
                <div className="flex justify-between items-start text-[11px]">
                  <span className="font-bold text-slate-800">{item.paymentStatus} ({item.ticketStatus})</span>
                  <span className="font-mono text-slate-400 text-[10px]">{item.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions & Print */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => alert(`Bukti transaksi ${transaction.transactionId} dicetak (Simulasi).`)}
              className="bg-white hover:bg-slate-100 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-300 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Bukti</span>
            </button>
            <button
              onClick={() => alert(`Tautan transaksi ${transaction.transactionId} disalin.`)}
              className="bg-white hover:bg-slate-100 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-300 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan Bukti</span>
            </button>
          </div>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="w-full bg-blue-50 text-kai-blue hover:bg-blue-100 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-blue-200 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Ada Kendala? Lapor ke Layanan Bantuan</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
