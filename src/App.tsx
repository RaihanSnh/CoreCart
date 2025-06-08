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
import { Toaster } from './components/ui/toaster';

export const App = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-50">
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
        </Routes>
      </Layout>
      <Toaster />
    </div>
  );
};