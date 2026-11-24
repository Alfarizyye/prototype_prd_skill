import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  MessageSquare,
  Mail,
  MapPin,
  AlertTriangle,
  FileQuestion,
  ShieldCheck,
  Search,
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { FAQ_DATA } from '../data/mockData';
import { useTransaction } from '../context/TransactionContext';

export default function HelpCenterPage() {
  const { setIsReportModalOpen, transaction } = useTransaction();
  const [openFaqId, setOpenFaqId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaq = FAQ_DATA.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <Header title="Pusat Bantuan & FAQ" showBack={true} backTo="home" />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        {/* Help Banner */}
        <div className="bg-gradient-to-br from-kai-blue to-kai-dark text-white rounded-2xl p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <HelpCircle className="w-5 h-5 text-kai-accent" />
            <span>Pusat Bantuan Pembayaran E-Wallet</span>
          </div>
          <p className="text-xs text-blue-100/90 leading-relaxed">
            Temukan panduan penanganan kendala transaksi dompet digital dan akses layanan pelanggan 24/7.
          </p>
        </div>

        {/* Quick Report Issue Button */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3.5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-amber-900">Mengalami Kendala Pembayaran?</p>
            <p className="text-[11px] text-amber-800">Kirim laporan kendala e-wallet untuk investigasi cepat.</p>
          </div>
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Lapor Kendala</span>
          </button>
        </div>

        {/* Search FAQ */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari kendala (misal: pending, saldo terpotong)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-kai-blue shadow-sm"
          />
        </div>

        {/* Interactive FAQ Accordion (5 Core Questions from PRD) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <FileQuestion className="w-4 h-4 text-kai-blue" />
            <h3 className="font-bold text-xs text-slate-800">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h3>
          </div>

          <div className="space-y-2">
            {filteredFaq.length > 0 ? (
              filteredFaq.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
                    >
                      <span className="pr-2">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-kai-blue shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-3 bg-white text-[11px] text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">
                Tidak ada pertanyaan yang sesuai dengan kata kunci Anda.
              </p>
            )}
          </div>
        </div>

        {/* Contact Channels */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3 text-xs">
          <h3 className="font-bold text-slate-800 pb-1 border-b border-slate-100">
            Kanal Bantuan Resmi KAI 24 Jam
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-kai-blue shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold">CONTACT CENTER</p>
                <p className="font-extrabold text-slate-800">121</p>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold">WHATSAPP RESMI</p>
                <p className="font-extrabold text-slate-800">0811-1211-1121</p>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-kai-accent shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold">EMAIL DUKUNGAN</p>
                <p className="font-bold text-slate-800 truncate">cs@kai.id</p>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold">CS STASIUN</p>
                <p className="font-bold text-slate-800">Loket Stasiun</p>
              </div>
            </div>
          </div>
        </div>

        {/* Safe Notice */}
        <div className="flex items-center gap-2 text-[10px] text-slate-400 bg-slate-100 p-2.5 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Layanan pelanggan KAI tidak pernah meminta PIN e-wallet atau OTP rahasia Anda.</span>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
