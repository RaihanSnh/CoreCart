import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, CreditCard, Settings, HelpCircle, LogOut, Bell } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useStore } from '../store/useStore';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useStore();

  const menuItems = [
    { icon: User, label: 'Edit Profile', action: () => {} },
    { icon: MapPin, label: 'Addresses', action: () => {} },
    { icon: CreditCard, label: 'Payment Methods', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: Settings, label: 'Settings', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', action: () => {} },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center p-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-lg ml-2">Profile</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* User Info */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {user?.name || 'Guest User'}
                </h2>
                <p className="text-gray-600">{user?.email || 'guest@example.com'}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  {user ? 'Edit Profile' : 'Sign In'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card className="bg-white">
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <item.icon className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left font-medium text-gray-900">
                  {item.label}
                </span>
                <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Orders</div>
            </CardContent>
          </Card>
          <Card className="bg-white text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Wishlist</div>
            </CardContent>
          </Card>
          <Card className="bg-white text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </CardContent>
          </Card>
        </div>

        {/* Logout */}
        <Card className="bg-white">
          <CardContent className="p-0">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-colors text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span className="flex-1 text-left font-medium">Sign Out</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};