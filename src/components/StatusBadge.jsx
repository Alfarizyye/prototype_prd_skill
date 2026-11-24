import React from 'react';
import { CheckCircle2, Clock, AlertCircle, HelpCircle, AlertTriangle } from 'lucide-react';
import { getPaymentStatusMeta, getTicketStatusMeta } from '../utils/formatters';

export function PaymentStatusBadge({ status, size = 'md' }) {
  const meta = getPaymentStatusMeta(status);

  const getIcon = () => {
    switch (status) {
      case 'Success':
        return <CheckCircle2 className={size === 'lg' ? 'w-5 h-5 text-emerald-600' : 'w-4 h-4 text-emerald-600'} />;
      case 'Pending':
        return <Clock className={size === 'lg' ? 'w-5 h-5 text-amber-600 animate-spin' : 'w-4 h-4 text-amber-600 animate-spin'} />;
      case 'Failed':
        return <AlertCircle className={size === 'lg' ? 'w-5 h-5 text-rose-600' : 'w-4 h-4 text-rose-600'} />;
      case 'Unknown':
      default:
        return <HelpCircle className={size === 'lg' ? 'w-5 h-5 text-indigo-600' : 'w-4 h-4 text-indigo-600'} />;
    }
  };

  const sizeClasses = size === 'lg'
    ? 'px-3.5 py-1.5 text-sm font-bold gap-2'
    : 'px-2.5 py-1 text-xs font-semibold gap-1.5';

  return (
    <span
      className={`inline-flex items-center rounded-full border ${meta.bgLight} ${meta.borderColor} ${meta.textColor} ${sizeClasses}`}
    >
      {getIcon()}
      <span>{meta.label}</span>
    </span>
  );
}

export function TicketStatusBadge({ status, size = 'md' }) {
  const meta = getTicketStatusMeta(status);

  const sizeClasses = size === 'lg'
    ? 'px-3 py-1.5 text-sm font-semibold'
    : 'px-2.5 py-0.5 text-xs font-medium';

  return (
    <span className={`inline-flex items-center rounded-full border ${meta.badgeClass} ${sizeClasses}`}>
      {meta.label}
    </span>
  );
}
