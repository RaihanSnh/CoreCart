import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useStore } from '../store/useStore';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useStore();
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 px-4">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 text-center mb-6">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link to="/">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg">Shopping Cart ({cart.length})</h1>
        <button onClick={clearCart} className="text-red-600 text-sm font-medium">
          Clear All
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4">
        {cart.map((item) => (
          <Card key={item.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="text-sm text-gray-600">
                  Rp {item.price.toLocaleString()} × {item.quantity}
                </span>
                <span className="font-semibold text-lg">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold text-gray-900">
            Rp {total.toLocaleString()}
          </span>
        </div>
        <Link to="/checkout">
          <Button className="w-full h-12 text-lg font-semibold">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};