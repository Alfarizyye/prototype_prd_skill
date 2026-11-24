import React from 'react';
import { ArrowLeft, Bell, HelpCircle, ShieldCheck } from 'lucide-react';
import { useTransaction } from '../context/TransactionContext';

export default function Header({ title, showBack = true, backTo = 'home' }) {
  const { navigate, currentPage, transaction } = useTransaction();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      window.history.back();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-kai-blue text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-3">
          {showBack && currentPage !== 'home' ? (
            <button
              onClick={handleBack}
              aria-label="Kembali"
              className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-black text-kai-accent tracking-tighter text-sm border border-white/20">
                KAI
              </div>
            </div>
          )}

          <div>
            <h1 className="text-base font-bold leading-tight truncate max-w-[210px] sm:max-w-xs">
              {title || 'Access by KAI'}
            </h1>
            <p className="text-[11px] text-blue-100/80 font-normal">
              E-Wallet Payment & Recovery
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('help')}
            aria-label="Pusat Bantuan"
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors relative"
            title="Pusat Bantuan"
          >
            <HelpCircle className="w-5 h-5 text-white" />
          </button>
          
          <button
            onClick={() => navigate('detail')}
            aria-label="Detail Transaksi"
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors relative"
            title="Transaksi Aktif"
          >
            <Bell className="w-5 h-5 text-white" />
            {transaction.paymentStatus === 'Pending' && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-kai-accent animate-ping" />
            )}
            {transaction.paymentStatus === 'Pending' && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-kai-accent border border-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
