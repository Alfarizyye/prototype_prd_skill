import React from 'react';
import { useTransaction } from '../context/TransactionContext';
import DemoControlBar from '../components/DemoControlBar';
import TicketModal from '../components/TicketModal';
import ReportIssueModal from '../components/ReportIssueModal';

export default function MobileLayout({ children }) {
  const { isMobileFrame } = useTransaction();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-800 flex flex-col items-center justify-start pb-28 pt-2 sm:pt-6 selection:bg-kai-blue selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#1D3F7A_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Frame Container */}
      <div
        className={`w-full transition-all duration-300 relative ${
          isMobileFrame
            ? 'max-w-[430px] rounded-[40px] shadow-2xl border-[6px] border-slate-800 bg-white overflow-hidden my-auto'
            : 'max-w-2xl bg-white shadow-xl min-h-screen sm:rounded-2xl overflow-hidden'
        }`}
      >
        {/* Smartphone Speaker / Notch on Mobile Frame */}
        {isMobileFrame && (
          <div className="h-5 bg-slate-900 w-full flex items-center justify-center relative">
            <div className="w-16 h-3 bg-black rounded-full" />
            <div className="absolute right-4 text-[10px] text-white/50 font-mono font-bold">
              100%
            </div>
          </div>
        )}

        {/* Inner Content Screen */}
        <main className="min-h-[760px] bg-slate-50 flex flex-col">
          {children}
        </main>
      </div>

      {/* Modals & Overlays */}
      <TicketModal />
      <ReportIssueModal />

      {/* Global Floating Demo Controls Lab */}
      <DemoControlBar />
    </div>
  );
}
