import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useTransaction } from '../context/TransactionContext';

export default function ReportIssueModal() {
  const { transaction, isReportModalOpen, setIsReportModalOpen } = useTransaction();
  const [issueType, setIssueType] = useState('saldo_terpotong_tiket_pending');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  if (!isReportModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNumber = `CS-KAI-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketNumber(newNumber);
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsReportModalOpen(false);
    setSubmitted(false);
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-kai-blue text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-kai-accent" />
            <span className="font-bold text-sm">Lapor Kendala Pembayaran E-Wallet</span>
          </div>
          <button
            onClick={handleClose}
            aria-label="Tutup form laporan"
            className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Laporan Berhasil Dikirim</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Nomor Aduan Layanan Pelanggan:
                </p>
                <p className="text-lg font-black text-kai-blue mt-1 font-mono tracking-wider">
                  {ticketNumber}
                </p>
              </div>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 text-left leading-relaxed">
                Tim rekonsiliasi pembayaran KAI akan memverifikasi mutasi e-wallet Anda ke pihak gateway dalam 1x24 jam kerja.
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-kai-blue text-white py-2.5 rounded-xl font-bold text-xs hover:bg-kai-dark transition-colors"
              >
                Selesai & Tutup
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <p className="text-[11px] text-slate-500 font-medium">Transaksi Terkait</p>
                <p className="font-bold text-slate-800">{transaction.transactionId} ({transaction.paymentMethod})</p>
                <p className="text-[11px] text-slate-600">
                  Status Saat Ini: <span className="font-semibold text-kai-blue">{transaction.paymentStatus}</span>
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Jenis Kendala
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-kai-blue"
                >
                  <option value="saldo_terpotong_tiket_pending">Saldo e-wallet terpotong tapi status masih Pending</option>
                  <option value="status_unknown_koneksi">Status Unknown / Koneksi terputus saat bayar</option>
                  <option value="status_failed_saldo_kurang">Status Failed tapi saldo terpotong</option>
                  <option value="double_debit">Terjadi pemotongan ganda (Double payment)</option>
                  <option value="lainnya">Kendala lainnya</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nomor Akun E-Wallet / HP
                </label>
                <input
                  type="text"
                  defaultValue="0812-9876-5432"
                  className="w-full border border-slate-300 rounded-xl p-2.5 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-kai-blue"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Rincian Tambahan (Opsional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan detail kendala mutasi atau pesan error e-wallet..."
                  rows={3}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-kai-blue resize-none"
                />
              </div>

              <div className="flex items-start gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Data transaksi Anda aman dan hanya digunakan untuk proses rekonsiliasi resmi.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-kai-blue text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-kai-dark transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Laporan Kendala</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
