import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CategoryPage } from './pages/CategoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfilePage } from './pages/ProfilePage';
import { SearchPage } from './pages/SearchPage';
import { OrdersPage } from './pages/OrdersPage';
import { ShipmentTrackingPage } from './pages/ShipmentTrackingPage';
import { EditProfilePage } from './pages/EditProfilePage';
import { EditAddressPage } from './pages/EditAddressPage';
import { PaymentMethodsPage } from './pages/PaymentMethodsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './context/ThemeContext';

export const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/order-tracking/:orderId" element={<ShipmentTrackingPage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/profile/addresses" element={<EditAddressPage />} />
            <Route path="/profile/payment-methods" element={<PaymentMethodsPage />} />
            <Route path="/profile/notifications" element={<NotificationsPage />} />
            <Route path="/profile/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
        <Toaster />
      </div>
    </ThemeProvider>
  );
};