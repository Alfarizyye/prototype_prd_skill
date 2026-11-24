import React from 'react';
import { X, QrCode, Train, Calendar, Clock, MapPin, User, CheckCircle2, Share2, Download } from 'lucide-react';
import { useTransaction } from '../context/TransactionContext';

export default function TicketModal() {
  const { transaction, isTicketModalOpen, setIsTicketModalOpen } = useTransaction();

  if (!isTicketModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-kai-blue text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Train className="w-5 h-5 text-kai-accent" />
            <span className="font-bold text-sm tracking-wide">E-BOARDING PASS</span>
          </div>
          <button
            onClick={() => setIsTicketModalOpen(false)}
            aria-label="Tutup tiket"
            className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ticket Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Booking Code Card */}
          <div className="bg-blue-50/60 rounded-2xl p-3 border border-blue-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-500 font-medium">KODE BOOKING (PNR)</p>
              <p className="text-xl font-extrabold text-kai-blue tracking-wider">
                {transaction.bookingId}
              </p>
            </div>
            <div className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>LUNAS</span>
            </div>
          </div>

          {/* Dummy QR Code */}
          <div className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-2xl shadow-inner">
            <div className="w-36 h-36 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-2">
              <QrCode className="w-28 h-28 text-slate-800" />
            </div>
            <p className="text-[10px] text-slate-400 mt-2 font-mono">
              SCAN DI GATE STASIUN 2 JAM SEBELUM BERANGKAT
            </p>
          </div>

          {/* Train Details */}
          <div className="border border-slate-200 rounded-2xl p-3.5 space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <p className="font-bold text-slate-800 text-sm">{transaction.trainName}</p>
                <p className="text-slate-500">{transaction.trainNumber} • {transaction.trainClass}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-medium">TANGGAL</p>
                <p className="font-bold text-slate-700">{transaction.travelDate}</p>
              </div>
            </div>

            {/* Route */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="font-extrabold text-sm text-kai-blue">{transaction.origin.split(' ')[0]}</p>
                <p className="text-[11px] text-slate-500">{transaction.departureTime}</p>
              </div>
              <div className="flex flex-col items-center px-2">
                <span className="text-[10px] text-slate-400">Langsung</span>
                <div className="w-16 h-0.5 bg-slate-300 relative my-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-kai-blue absolute -top-0.5 right-0" />
                </div>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-sm text-kai-blue">{transaction.destination.split(' ')[0]}</p>
                <p className="text-[11px] text-slate-500">{transaction.arrivalTime}</p>
              </div>
            </div>

            {/* Passenger & Seat */}
            <div className="bg-slate-50 rounded-xl p-2.5 grid grid-cols-2 gap-2 border border-slate-200/60 mt-2">
              <div>
                <p className="text-[10px] text-slate-400 font-medium">NAMA PENUMPANG</p>
                <p className="font-bold text-slate-800 truncate">{transaction.passengerName}</p>
                <p className="text-[10px] text-slate-500 font-mono">NIK: {transaction.passengerId}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-medium">GERBONG & KURSI</p>
                <p className="font-extrabold text-sm text-kai-accent">{transaction.seatNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
          <button
            onClick={() => {
              alert('E-Boarding Pass berhasil disimpan ke perangkat (Simulasi).');
            }}
            className="flex-1 bg-kai-blue text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-kai-dark transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Simpan Tiket</span>
          </button>
          <button
            onClick={() => {
              alert(`Link tiket dibagikan untuk kode ${transaction.bookingId}`);
            }}
            className="p-2.5 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            title="Bagikan Tiket"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
