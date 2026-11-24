import React, { useState } from 'react';
import {
  Train,
  ArrowRightLeft,
  Calendar,
  Users,
  Search,
  AlertTriangle,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useTransaction } from '../context/TransactionContext';
import { STATIONS, PASSENGER_PERSONA } from '../data/mockData';
import { formatRupiah } from '../utils/formatters';

export default function HomePage() {
  const { navigate, transaction, selectTrain } = useTransaction();
  const [origin, setOrigin] = useState('GMR');
  const [destination, setDestination] = useState('BD');
  const [travelDate, setTravelDate] = useState('2026-11-25');
  const [passengerCount, setPassengerCount] = useState(1);

  const swapStations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('schedule');
  };

  const isPending = transaction.paymentStatus === 'Pending';
  const isUnknown = transaction.paymentStatus === 'Unknown';
  const isFailed = transaction.paymentStatus === 'Failed';

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <Header title="Access by KAI" showBack={false} />

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Prototype Disclaimer Banner */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-[11px] text-amber-900">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="font-medium">
              Prototipe Demonstrasi UX Rekayasa Interaksi (Bukan Web Resmi KAI).
            </span>
          </div>
          <button
            onClick={() => navigate('help')}
            className="underline font-bold text-amber-800 shrink-0 ml-2"
          >
            FAQ
          </button>
        </div>

        {/* Dynamic Active Transaction Alert (Anti-Double Payment Alert on Home) */}
        {(isPending || isUnknown) && (
          <div
            onClick={() => navigate(isPending ? 'pending' : 'unknown')}
            className={`mx-4 mt-3 p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer shadow-sm transition-transform active:scale-[0.99] ${
              isPending
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-indigo-50 border-indigo-300 text-indigo-900'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-xl text-white shrink-0 ${
                  isPending ? 'bg-amber-500' : 'bg-indigo-500'
                }`}
              >
                {isPending ? (
                  <Clock className="w-5 h-5 animate-spin" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">
                  {isPending
                    ? 'Transaksi E-Wallet Sedang Diproses'
                    : 'Status Transaksi Belum Dapat Dipastikan'}
                </p>
                <p className="text-[11px] mt-0.5 opacity-90 leading-snug">
                  {isPending
                    ? 'Mohon tunggu verifikasi. Dilarang bayar ulang rute ini.'
                    : 'Koneksi terputus. Periksa status sebelum memesan kembali.'}
                </p>
                <p className="text-[10px] font-mono font-bold mt-1 text-kai-blue">
                  {transaction.trainName} • {transaction.transactionId}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 opacity-50 shrink-0 ml-2" />
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-kai-blue to-kai-dark text-white px-5 pt-5 pb-8 rounded-b-3xl shadow-sm relative">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-blue-200">Selamat datang,</p>
              <h2 className="text-lg font-black tracking-tight">{PASSENGER_PERSONA.name}</h2>
              <span className="inline-block bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1">
                KAI Member Prioritas
              </span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-kai-accent">
              <Train className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/15 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-kai-accent text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fitur Baru: E-Wallet Status & Recovery</span>
            </div>
            <p className="text-[11px] text-blue-100/90 leading-relaxed">
              Kepastian status transaksi seketika, proteksi dari pembayaran ganda, dan bantuan pemulihan saldo terpadu.
            </p>
          </div>
        </div>

        {/* Search Ticket Card */}
        <div className="mx-4 -mt-5 bg-white rounded-3xl p-4 shadow-lg border border-slate-100 space-y-3 relative z-10">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Train className="w-4 h-4 text-kai-blue" />
              Pesan Tiket Kereta Api Antarkota
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              Simulasi
            </span>
          </div>

          <form onSubmit={handleSearch} className="space-y-3">
            {/* Origin & Destination */}
            <div className="relative space-y-2">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-0.5">
                  STASIUN ASAL
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-kai-blue"
                >
                  {STATIONS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.city} ({s.code} - {s.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="absolute right-4 top-[32px] z-10">
                <button
                  type="button"
                  onClick={swapStations}
                  className="w-8 h-8 rounded-full bg-kai-blue text-white shadow-md flex items-center justify-center hover:bg-kai-dark active:scale-90 transition-transform"
                  title="Tukar Stasiun"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-0.5">
                  STASIUN TUJUAN
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-kai-blue"
                >
                  {STATIONS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.city} ({s.code} - {s.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Passenger */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-0.5">
                  TANGGAL PERGI
                </label>
                <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl p-2 bg-slate-50 text-xs font-medium text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-kai-blue shrink-0" />
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-0.5">
                  PENUMPANG
                </label>
                <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl p-2 bg-slate-50 text-xs font-bold text-slate-800">
                  <Users className="w-3.5 h-3.5 text-kai-blue shrink-0" />
                  <select
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(Number(e.target.value))}
                    className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                  >
                    <option value={1}>1 Dewasa</option>
                    <option value={2}>2 Dewasa</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-kai-accent hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <Search className="w-4 h-4" />
              <span>Cari Tiket Kereta Api</span>
            </button>
          </form>
        </div>

        {/* Quick Simulation CTA */}
        <div className="mx-4 mt-5 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-800">Mulai Simulasi Pembayaran E-Wallet</h3>
              <p className="text-[11px] text-slate-500">Pilih rute uji cepat untuk mendemonstrasikan status transaksi:</p>
            </div>
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                selectTrain({
                  id: 'TR-01',
                  name: 'Argo Parahyangan',
                  number: 'KA 34',
                  trainClass: 'Eksekutif',
                  origin: 'Gambir (GMR)',
                  destination: 'Bandung (BD)',
                  departureTime: '08:00',
                  arrivalTime: '10:45',
                  price: 150000,
                });
              }}
              className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-kai-blue hover:bg-blue-50/50 flex items-center justify-between transition-colors group"
            >
              <div>
                <p className="text-xs font-bold text-slate-800 group-hover:text-kai-blue">
                  Argo Parahyangan (Eksekutif)
                </p>
                <p className="text-[10px] text-slate-500">Gambir (GMR) → Bandung (BD) • 08:00 WIB</p>
              </div>
              <span className="text-xs font-extrabold text-kai-accent">
                {formatRupiah(150000)}
              </span>
            </button>
          </div>
        </div>

        {/* Features Guide Card */}
        <div className="mx-4 mt-4 bg-slate-100 rounded-2xl p-3.5 border border-slate-200 text-xs space-y-2">
          <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wide">
            5 Pilar Keamanan Pembayaran E-Wallet (PRD):
          </p>
          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600">
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              🟢 <strong>Status Transparan</strong>: 4 status visual jelas.
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              🛡️ <strong>Anti-Double Debit</strong>: Blokir bayar ulang saat Pending.
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              🎫 <strong>Pemisahan Tiket</strong>: Status dana vs status tiket independen.
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              💬 <strong>Bantuan Siaga</strong>: Form lapor kendala & FAQ instan.
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
