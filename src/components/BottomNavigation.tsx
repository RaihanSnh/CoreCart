import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Receipt, ShoppingCart, User } from 'lucide-react';
import { cn } from '../lib/utils';

export const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/orders', icon: Receipt, label: 'Orders' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-lg transition-colors",
                isActive
                  ? "text-black"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "text-black")} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};