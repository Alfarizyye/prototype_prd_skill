import React from 'react';
import { TransactionProvider, useTransaction } from './context/TransactionContext';
import MobileLayout from './layouts/MobileLayout';

import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import BookingSummaryPage from './pages/BookingSummaryPage';
import PaymentProcessingPage from './pages/PaymentProcessingPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentPendingPage from './pages/PaymentPendingPage';
import PaymentFailedPage from './pages/PaymentFailedPage';
import PaymentUnknownPage from './pages/PaymentUnknownPage';
import TransactionDetailPage from './pages/TransactionDetailPage';
import HelpCenterPage from './pages/HelpCenterPage';

function AppContent() {
  const { currentPage } = useTransaction();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'schedule':
        return <SchedulePage />;
      case 'booking':
        return <BookingSummaryPage />;
      case 'processing':
        return <PaymentProcessingPage />;
      case 'success':
        return <PaymentSuccessPage />;
      case 'pending':
        return <PaymentPendingPage />;
      case 'failed':
        return <PaymentFailedPage />;
      case 'unknown':
        return <PaymentUnknownPage />;
      case 'detail':
        return <TransactionDetailPage />;
      case 'help':
        return <HelpCenterPage />;
      default:
        return <HomePage />;
    }
  };

  return <MobileLayout>{renderPage()}</MobileLayout>;
}

export default function App() {
  return (
    <TransactionProvider>
      <AppContent />
    </TransactionProvider>
  );
}
