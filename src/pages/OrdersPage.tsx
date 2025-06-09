import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, Truck, CheckCircle, XCircle, CreditCard, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

export const OrdersPage: React.FC = () => {
  const { orders } = useStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const orderStatuses = ["Payment", "On Process", "On Delivery", "Delivered", "Rate"];

  const filteredOrders = orders.filter(order => {
    if (filter === 'All') {
      return true;
    }
    return order.status === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Payment':
        return <CreditCard className="w-4 h-4" />;
      case 'On Process':
        return <Clock className="w-4 h-4" />;
      case 'On Delivery':
        return <Truck className="w-4 h-4" />;
      case 'Delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'Rate':
        return <Star className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Payment':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'On Process':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'On Delivery':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Rate':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <div className="flex items-center p-4">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800 dark:text-gray-200">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-semibold text-lg ml-2 text-gray-900 dark:text-white">My Orders</h1>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center h-96 px-4">
          <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No orders yet</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
            When you place your first order, it will appear here.
          </p>
          <Button onClick={() => navigate('/')} className="mt-4 bg-black text-white hover:bg-gray-800 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700">Start Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b fixed top-0 left-0 right-0 z-40 h-[64px] flex items-center p-4 dark:border-gray-700">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800 dark:text-gray-200">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg ml-2 text-gray-900 dark:text-white">My Orders</h1>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-[64px]"></div>

      {/* Filter Buttons */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b mb-4 flex space-x-2 overflow-x-auto whitespace-nowrap dark:border-gray-700">
        <Button 
          variant={filter === 'All' ? 'default' : 'outline'} 
          onClick={() => setFilter('All')}
          className={cn(
            filter === 'All' ? 'bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700' : 'border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600',
            'px-4 py-2 rounded-full text-sm'
          )}
        >
          All
        </Button>
        {orderStatuses.map(status => (
          <Button 
            key={status} 
            variant={filter === status ? 'default' : 'outline'} 
            onClick={() => setFilter(status)}
            className={cn(
              filter === status ? 'bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700' : 'border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600',
              'px-4 py-2 rounded-full text-sm'
            )}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No orders found</h3>
            <p className="text-gray-600 dark:text-gray-300">Your orders will appear here.</p>
            <Button onClick={() => navigate('/')} className="mt-4 bg-black text-white hover:bg-gray-800 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700">Start Shopping</Button>
          </div>
        ) : (
          filteredOrders.map(order => (
            <Link to={`/order-tracking/${order.id}`} key={order.id} className="block">
              <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 dark:border-gray-700">
                  <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Order ID: {order.id}</CardTitle>
                  <Badge 
                    className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      getStatusColor(order.status)
                    )}
                  >
                    {order.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">Rp {order.total.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                    <p>Items: {order.items.map((item: any) => item.name).join(', ')}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};