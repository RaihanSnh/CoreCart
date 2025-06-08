import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useStore } from '../store/useStore';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white border-b">
          <div className="flex items-center p-4">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-semibold text-lg ml-2">My Orders</h1>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center h-96 px-4">
          <Package className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 text-center mb-6">
            When you place your first order, it will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center p-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-lg ml-2">My Orders ({orders.length})</h1>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Order #{order.id}</CardTitle>
                <Badge className={`flex items-center gap-1 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                {new Date(order.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Order Items */}
              <div className="space-y-2">
                {order.items.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <p className="text-sm text-gray-600 pl-15">
                    +{order.items.length - 2} more items
                  </p>
                )}
              </div>

              {/* Order Total */}
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="text-lg font-bold">
                  Rp {order.total.toLocaleString()}
                </span>
              </div>

              {/* Shipping Address */}
              <div className="text-sm text-gray-600">
                <p className="font-medium">Shipping to:</p>
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}, {order.shippingAddress.city}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};