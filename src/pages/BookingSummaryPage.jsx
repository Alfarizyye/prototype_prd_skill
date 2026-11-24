import React, { useState } from 'react';
import {
  Train,
  User,
  ShieldCheck,
  Wallet,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Info,
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useTransaction } from '../context/TransactionContext';
import { EWALLET_PROVIDERS, PASSENGER_PERSONA } from '../data/mockData';
import { formatRupiah } from '../utils/formatters';

export default function BookingSummaryPage() {
  const { transaction, selectPaymentMethod, navigate, canRetryPayment } = useTransaction();
  const [selectedWalletId, setSelectedWalletId] = useState('gopay');

  const selectedWallet = EWALLET_PROVIDERS.find((w) => w.id === selectedWalletId) || EWALLET_PROVIDERS[0];

  const handlePayNow = () => {
    selectPaymentMethod(selectedWallet.name);
    navigate('processing');
  };

  const isPending = transaction.paymentStatus === 'Pending';
  const isUnknown = transaction.paymentStatus === 'Unknown';

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <Header title="Ringkasan Pemesanan" showBack={true} backTo="schedule" />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        {/* Anti Double Payment Safeguard Banner */}
        {(isPending || isUnknown) && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3.5 flex items-start gap-3 text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold">Peringatan: Transaksi Sebelumnya Masih Aktif!</p>
              <p className="text-[11px] leading-relaxed text-amber-800">
                Anda memiliki transaksi {transaction.transactionId} berstatus{' '}
                <strong>{transaction.paymentStatus}</strong>. Sistem membatasi pembayaran tiket baru
                untuk mencegah pemotongan saldo ganda (*Anti-Double Payment Safeguard*).
              </p>
              <button
                onClick={() => navigate(isPending ? 'pending' : 'unknown')}
                className="underline font-bold text-kai-blue text-[11px] block mt-1"
              >
                Lihat Transaksi Sebelumnya →
              </button>
            </div>
          </div>
        )}

        {/* Journey Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Train className="w-4 h-4 text-kai-blue" />
              <span className="font-bold text-xs text-slate-800">{transaction.trainName}</span>
            </div>
            <span className="text-[10px] font-bold bg-blue-50 text-kai-blue px-2 py-0.5 rounded-full border border-blue-200">
              {transaction.trainClass}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-extrabold text-slate-800 text-sm">{transaction.origin.split(' ')[0]}</p>
              <p className="text-[11px] text-slate-500">{transaction.departureTime}</p>
            </div>
            <div className="text-center px-2">
              <p className="text-[10px] text-slate-400 font-medium">{transaction.travelDate}</p>
              <div className="w-16 h-0.5 bg-slate-300 relative my-1">
                <div className="w-1.5 h-1.5 rounded-full bg-kai-blue absolute -top-0.5 right-0" />
              </div>
            </div>
            <div className="text-right">
              <p className="font-extrabold text-slate-800 text-sm">{transaction.destination.split(' ')[0]}</p>
              <p className="text-[11px] text-slate-500">{transaction.arrivalTime}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-2.5 flex justify-between items-center text-xs border border-slate-200/60">
            <div>
              <p className="text-[10px] text-slate-400 font-medium">PENUMPANG (1 DEWASA)</p>
              <p className="font-bold text-slate-800">{transaction.passengerName}</p>
              <p className="text-[10px] text-slate-500 font-mono">NIK: {PASSENGER_PERSONA.idNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-medium">ALOKASI KURSI</p>
              <p className="font-extrabold text-xs text-kai-accent">{transaction.seatNumber}</p>
            </div>
          </div>
        </div>

        {/* E-Wallet Selection */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-kai-blue" />
              Pilih Dompet Digital (E-Wallet)
            </span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              Bebas Biaya Admin
            </span>
          </div>

          <div className="space-y-2">
            {EWALLET_PROVIDERS.map((wallet) => {
              const isSelected = selectedWalletId === wallet.id;
              return (
                <div
                  key={wallet.id}
                  onClick={() => setSelectedWalletId(wallet.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? `${wallet.bgColor} ${wallet.borderColor} border-2 shadow-sm`
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-sm"
                      style={{ backgroundColor: wallet.color }}
                    >
                      {wallet.iconText}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{wallet.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{wallet.account}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[11px] font-bold text-slate-700">
                      Saldo: {formatRupiah(wallet.balance)}
                    </p>
                    <div className="flex items-center justify-end mt-0.5">
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-kai-blue" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2.5 text-xs">
          <h4 className="font-bold text-slate-800">Rincian Pembayaran</h4>
          <div className="flex justify-between text-slate-600">
            <span>Harga Tiket Kereta (1x)</span>
            <span className="font-semibold">{formatRupiah(transaction.amount)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Biaya Layanan E-Wallet</span>
            <span className="font-semibold text-emerald-600">Rp 0 (Promo)</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-sm font-extrabold text-slate-900">
            <span>Total Pembayaran</span>
            <span className="text-kai-accent text-base">{formatRupiah(transaction.totalAmount)}</span>
          </div>
        </div>

        {/* Security & Anti Double Payment Education */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 flex items-start gap-2.5 text-[11px] text-slate-600">
          <ShieldCheck className="w-4 h-4 text-kai-blue shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Pembayaran Anda dilindungi sistem otorisasi otomatis. Jangan menutup aplikasi atau melakukan
            pembayaran ganda saat proses verifikasi berlangsung.
          </p>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayNow}
          className="w-full bg-kai-blue hover:bg-kai-dark text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
        >
          <span>Bayar Sekarang ({selectedWallet.name})</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
