import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Bell, MapPin } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, getCartItemsCount } = useStore();
  const cartItemsCount = getCartItemsCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      {/* Main Header */}
      <div className="px-4 py-3 space-y-3">
        {/* Search and Notification */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-12 h-10 bg-gray-100 border-gray-300 rounded-lg"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-black text-white rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <Bell className="w-6 h-6 text-gray-700" />
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Ship to Cibeber</span>
        </div>
      </div>
    </header>
  );
};