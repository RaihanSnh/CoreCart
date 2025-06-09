import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  const dummyNotifications = [
    { id: 1, type: 'discount', title: 'Flash Sale! Up to 50% Off', message: "Don't miss out on our limited-time flash sale on selected electronics!", date: '2024-05-20' },
    { id: 2, type: 'update', title: 'App Update Available', message: 'New features and bug fixes are available in our latest app update.', date: '2024-05-18' },
    { id: 3, type: 'promo', title: 'Free Shipping on All Orders', message: 'Enjoy free shipping for a limited time. Shop now!', date: '2024-05-15' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 fixed top-0 left-0 right-0 z-40 h-[64px] flex items-center p-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800 dark:text-gray-200">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg ml-2 text-gray-900 dark:text-white">Notifications</h1>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-[64px]"></div>

      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Notifications</h2>
        {dummyNotifications.map(notification => (
          <div key={notification.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{notification.message}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{notification.date}</p>
          </div>
        ))}
        {dummyNotifications.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">No new notifications.</p>
        )}
      </div>
    </div>
  );
}; 