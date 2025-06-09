import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ArrowLeft, MapPin, Package, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';

export const ShipmentTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { orders } = useStore();

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order not found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">The order you are looking for does not exist.</p>
        <button onClick={() => navigate('/orders')} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700">
          Back to Orders
        </button>
      </div>
    );
  }

  // Example tracking timeline (hardcoded for now)
  const trackingTimeline = [
    { status: 'Order Placed', date: new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }), time: new Date(order.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }), description: 'Your order has been successfully placed.' },
    { status: 'Payment Confirmed', date: '30 May 2025', time: '10:30', description: 'Payment has been successfully processed.' },
    { status: 'Picked Up', date: '30 May 2025', time: '14:00', description: 'The package has been picked up by NATH Express at Batam Riau Islands.' },
    { status: 'On Delivery', date: '01 Jun 2025', time: '09:00', description: 'Your package is out for delivery.' },
    { status: 'Delivered', date: '01 Jun 2025', time: '14:00', description: 'Your package has been delivered.' },
  ];

  const getStatusIcon = (status: string, isActive: boolean) => {
    if (status === 'Delivered' && isActive) return <CheckCircle className="w-6 h-6 text-green-500 fill-green-500" />;
    if (isActive) return <Package className="w-6 h-6 text-black dark:text-white" />;
    return <Clock className="w-6 h-6 text-gray-400 dark:text-gray-500" />;
  };

  const currentOrderStatusIndex = trackingTimeline.findIndex(item => item.status === order.status);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 fixed top-0 left-0 right-0 z-40 h-[64px] flex items-center p-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800 dark:text-gray-200">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg ml-2 text-gray-900 dark:text-white">Shipment Tracking</h1>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-[64px]"></div>

      <div className="p-4 space-y-4">
        {/* Shipping ID */}
        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Shipping ID: #NATH Express</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Order ID: {order.id}</p>
          </CardContent>
        </Card>

        {/* Shipping Information */}
        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-2" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Shipping Information</h2>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{order.shippingAddress.title}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{order.shippingAddress.address}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{order.shippingAddress.phone}</p>
          </CardContent>
        </Card>

        {/* Shipment Tracking Timeline */}
        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Shipment Status</h2>
            <div className="relative pl-4">
              {trackingTimeline.map((item, index) => (
                <div key={index} className="mb-6 last:mb-0 flex items-start">
                  <div className="absolute left-0 top-0 flex flex-col items-center">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      index <= currentOrderStatusIndex ? "bg-black text-white dark:bg-blue-600" : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                    )}>
                      {getStatusIcon(item.status, index <= currentOrderStatusIndex)}
                    </div>
                    {index < trackingTimeline.length - 1 && (
                      <div className={cn("w-0.5 flex-grow", index < currentOrderStatusIndex ? "bg-black dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600")} style={{ height: 'calc(100% + 24px)' }}></div>
                    )}
                  </div>
                  <div className="ml-10">
                    <h3 className="font-semibold text-base text-gray-900 dark:text-white">{item.status}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.date} {item.time}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 