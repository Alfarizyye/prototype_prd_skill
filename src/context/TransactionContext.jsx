import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TRANSACTION, TRAIN_SCHEDULES, EWALLET_PROVIDERS } from '../data/mockData';

const TransactionContext = createContext(null);

const STORAGE_KEY = 'kai_ux_transaction_v1';
const FRAME_KEY = 'kai_ux_mobile_frame_v1';

export function TransactionProvider({ children }) {
  // 1. Transaction State with localStorage persistence
  const [transaction, setTransaction] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load transaction from localStorage', e);
    }
    return INITIAL_TRANSACTION;
  });

  // 2. Navigation State (current page in prototype)
  // Pages: 'home' | 'schedule' | 'booking' | 'processing' | 'success' | 'pending' | 'failed' | 'unknown' | 'detail' | 'help'
  const [currentPage, setCurrentPage] = useState(() => {
    // If there is an active transaction, show status page or home
    return 'home';
  });

  // 3. UI State
  const [isVerifying, setIsVerifying] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBalanceDeducted, setIsBalanceDeducted] = useState(null); // null | true | false for Failed page
  const [isMobileFrame, setIsMobileFrame] = useState(() => {
    const savedFrame = localStorage.getItem(FRAME_KEY);
    return savedFrame !== null ? JSON.parse(savedFrame) : true;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transaction));
    } catch (e) {
      console.warn('Failed to save transaction to localStorage', e);
    }
  }, [transaction]);

  useEffect(() => {
    try {
      localStorage.setItem(FRAME_KEY, JSON.stringify(isMobileFrame));
    } catch (e) {
      console.warn('Failed to save frame setting', e);
    }
  }, [isMobileFrame]);

  // Navigate helper with scroll-to-top
  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to format current time
  const getCurrentTimeFormatted = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds} WIB`;
  };

  // 4. Scenario Controller (Demo Controls)
  const setPaymentScenario = (paymentStatus, customTicketStatus = null, customDescription = null) => {
    let resolvedTicketStatus = customTicketStatus;
    let description = customDescription;

    if (!resolvedTicketStatus) {
      switch (paymentStatus) {
        case 'Success':
          resolvedTicketStatus = 'Ticket Issued';
          description = description || 'Pembayaran berhasil dikonfirmasi, tiket resmi diterbitkan';
          break;
        case 'Pending':
          resolvedTicketStatus = 'Waiting for Payment Confirmation';
          description = description || 'Pembayaran sedang dalam antrean verifikasi gateway e-wallet';
          break;
        case 'Failed':
          resolvedTicketStatus = 'Booking Not Completed';
          description = description || 'Pembayaran gagal diotorisasi oleh penyedia e-wallet';
          break;
        case 'Unknown':
        default:
          resolvedTicketStatus = 'Booking Status Not Confirmed';
          description = description || 'Koneksi ke gateway terputus, status belum dapat dipastikan';
          break;
      }
    }

    const newHistoryEntry = {
      time: getCurrentTimeFormatted(),
      paymentStatus,
      ticketStatus: resolvedTicketStatus,
      description: description || `Status diubah menjadi ${paymentStatus}`,
    };

    setTransaction((prev) => ({
      ...prev,
      paymentStatus,
      ticketStatus: resolvedTicketStatus,
      statusHistory: [newHistoryEntry, ...prev.statusHistory],
    }));

    // Reset balance deducted question state on scenario switch
    setIsBalanceDeducted(null);

    // Auto navigate to the corresponding status page
    if (paymentStatus === 'Success') {
      navigate('success');
    } else if (paymentStatus === 'Pending') {
      navigate('pending');
    } else if (paymentStatus === 'Failed') {
      navigate('failed');
    } else if (paymentStatus === 'Unknown') {
      navigate('unknown');
    }
  };

  // 5. Verification Action (Simulate checking status from gateway)
  const verifyTransactionStatus = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      // When user checks status during pending or unknown, gateway confirms as Success
      const newHistoryEntry = {
        time: getCurrentTimeFormatted(),
        paymentStatus: 'Success',
        ticketStatus: 'Ticket Issued',
        description: 'Status berhasil diverifikasi secara manual melalui sinkronisasi gateway',
      };

      setTransaction((prev) => ({
        ...prev,
        paymentStatus: 'Success',
        ticketStatus: 'Ticket Issued',
        statusHistory: [newHistoryEntry, ...prev.statusHistory],
      }));

      navigate('success');
    }, 1200);
  };

  // 6. Reset Simulation
  const resetTransaction = () => {
    const cleanState = {
      ...INITIAL_TRANSACTION,
      transactionId: `TRX-${Date.now().toString().slice(-8)}`,
      paymentStatus: 'Pending',
      ticketStatus: 'Waiting for Payment Confirmation',
      statusHistory: [
        {
          time: getCurrentTimeFormatted(),
          paymentStatus: 'Pending',
          ticketStatus: 'Waiting for Payment Confirmation',
          description: 'Simulasi baru dimulai - Menunggu otorisasi e-wallet',
        },
      ],
    };
    setTransaction(cleanState);
    setIsBalanceDeducted(null);
    navigate('home');
  };

  // 7. Duplicate Payment Prevention Validator
  const canRetryPayment = (status, balanceDeductedState) => {
    if (status === 'Pending' || status === 'Unknown') {
      return false; // STRICTLY FORBIDDEN
    }
    if (status === 'Success') {
      return false; // Already paid
    }
    if (status === 'Failed') {
      // Allowed only if balance was NOT deducted
      return balanceDeductedState === false;
    }
    return true;
  };

  // 8. Update selected payment method
  const selectPaymentMethod = (methodName) => {
    setTransaction((prev) => ({
      ...prev,
      paymentMethod: methodName,
    }));
  };

  // 9. Update selected train
  const selectTrain = (train) => {
    setTransaction((prev) => ({
      ...prev,
      trainName: train.name,
      trainNumber: train.number,
      trainClass: train.trainClass,
      origin: train.origin,
      destination: train.destination,
      departureTime: `${train.departureTime} WIB`,
      arrivalTime: `${train.arrivalTime} WIB`,
      amount: train.price,
      totalAmount: train.price,
    }));
    navigate('booking');
  };

  const value = {
    transaction,
    currentPage,
    navigate,
    isVerifying,
    verifyTransactionStatus,
    setPaymentScenario,
    resetTransaction,
    canRetryPayment: canRetryPayment(transaction.paymentStatus, isBalanceDeducted),
    isBalanceDeducted,
    setIsBalanceDeducted,
    isTicketModalOpen,
    setIsTicketModalOpen,
    isReportModalOpen,
    setIsReportModalOpen,
    isMobileFrame,
    setIsMobileFrame,
    selectPaymentMethod,
    selectTrain,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
}
