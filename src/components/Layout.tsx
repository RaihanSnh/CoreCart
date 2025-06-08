import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === '/checkout';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isCheckoutPage && <Header />}
      <main className={isCheckoutPage ? "" : "pb-20 pt-[120px]"}>
        {children}
      </main>
      {!isCheckoutPage && <BottomNavigation />}
    </div>
  );
};