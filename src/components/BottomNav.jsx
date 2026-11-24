import React from 'react';
import { Home, Calendar, Ticket, HelpCircle, Clock } from 'lucide-react';
import { useTransaction } from '../context/TransactionContext';

export default function BottomNav() {
  const { currentPage, navigate, transaction, setIsTicketModalOpen } = useTransaction();

  const isPending = transaction.paymentStatus === 'Pending';
  const isUnknown = transaction.paymentStatus === 'Unknown';

  const navItems = [
    {
      id: 'home',
      label: 'Beranda',
      icon: Home,
      action: () => navigate('home'),
      active: currentPage === 'home',
    },
    {
      id: 'schedule',
      label: 'Jadwal',
      icon: Calendar,
      action: () => navigate('schedule'),
      active: currentPage === 'schedule',
    },
    {
      id: 'ticket',
      label: 'Tiket Saya',
      icon: Ticket,
      action: () => {
        if (transaction.paymentStatus === 'Success' && transaction.ticketStatus === 'Ticket Issued') {
          setIsTicketModalOpen(true);
        } else {
          navigate('detail');
        }
      },
      active: currentPage === 'detail',
      badge: isPending ? 'Pending' : isUnknown ? '?' : null,
      badgeColor: isPending ? 'bg-amber-500' : 'bg-indigo-500',
    },
    {
      id: 'help',
      label: 'Bantuan',
      icon: HelpCircle,
      action: () => navigate('help'),
      active: currentPage === 'help',
    },
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-white border-t border-slate-200 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative ${
                item.active
                  ? 'text-kai-blue font-bold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.active ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.badge && (
                  <span
                    className={`absolute -top-1 -right-3 text-[9px] text-white px-1 py-0.2 rounded-full font-bold leading-tight ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              {item.active && (
                <div className="w-1 h-1 rounded-full bg-kai-blue mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
