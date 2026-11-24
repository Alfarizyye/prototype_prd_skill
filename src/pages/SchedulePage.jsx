import React, { useState } from 'react';
import { ArrowLeft, Filter, ArrowUpDown, Clock, Train, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useTransaction } from '../context/TransactionContext';
import { TRAIN_SCHEDULES } from '../data/mockData';
import { formatRupiah } from '../utils/formatters';

export default function SchedulePage() {
  const { navigate, selectTrain } = useTransaction();
  const [selectedClass, setSelectedClass] = useState('Semua');
  const [sortBy, setSortBy] = useState('price_asc');

  const filteredTrains = TRAIN_SCHEDULES.filter((t) => {
    if (selectedClass === 'Semua') return true;
    return t.trainClass === selectedClass;
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <Header title="Pilih Kereta Api" showBack={true} backTo="home" />

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Route Bar */}
        <div className="bg-kai-blue text-white px-4 py-3 shadow-inner">
          <div className="flex justify-between items-center text-xs">
            <div>
              <p className="text-[10px] text-blue-200">RUTE PERJALANAN</p>
              <p className="font-extrabold text-sm">Gambir (GMR) → Bandung (BD)</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-blue-200">TANGGAL</p>
              <p className="font-bold">Rab, 25 Nov 2026</p>
            </div>
          </div>
        </div>

        {/* Filter & Sort Chips */}
        <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between text-xs gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-bold text-slate-400">KELAS:</span>
            {['Semua', 'Eksekutif', 'Ekonomi'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                  selectedClass === cls
                    ? 'bg-kai-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Train List */}
        <div className="p-4 space-y-3">
          <p className="text-xs font-bold text-slate-600">
            Jadwal Tersedia ({filteredTrains.length} Kereta)
          </p>

          {filteredTrains.map((train) => (
            <div
              key={train.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-kai-blue shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{train.name}</h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {train.number} • {train.trainClass}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-kai-accent">
                    {formatRupiah(train.price)}
                  </p>
                  <p className="text-[10px] text-emerald-600 font-medium flex items-center justify-end gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Sisa {train.availableSeats} kursi
                  </p>
                </div>
              </div>

              {/* Times */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-extrabold text-slate-800 text-base">{train.departureTime}</p>
                  <p className="text-[11px] text-slate-500">{train.origin.split(' ')[0]}</p>
                </div>

                <div className="flex flex-col items-center px-3">
                  <span className="text-[10px] text-slate-400 font-medium">{train.duration}</span>
                  <div className="w-20 h-0.5 bg-slate-300 relative my-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-kai-blue absolute -top-0.5 right-0" />
                  </div>
                  <span className="text-[9px] text-slate-400">Langsung</span>
                </div>

                <div className="text-right">
                  <p className="font-extrabold text-slate-800 text-base">{train.arrivalTime}</p>
                  <p className="text-[11px] text-slate-500">{train.destination.split(' ')[0]}</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => selectTrain(train)}
                className="w-full bg-kai-blue hover:bg-kai-dark text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
              >
                <span>Pilih & Lanjut ke Pembayaran</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
