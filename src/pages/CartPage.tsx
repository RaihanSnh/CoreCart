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
      <div className="flex flex-col items-center justify-center h-96 px-4 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link to="/">
          <Button className="bg-black text-white hover:bg-gray-800 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800 dark:text-gray-200">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg text-gray-900 dark:text-white">Shopping Cart ({cart.length})</h1>
        <button onClick={clearCart} className="text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md p-2">
          Clear All
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4">
        {cart.map((item) => (
          <Card key={item.id} className="shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.brand}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Rp {item.price.toLocaleString()} × {item.quantity}
                </span>
                <span className="font-semibold text-lg text-gray-900 dark:text-white">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div className="fixed bottom-20 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Rp {total.toLocaleString()}
          </span>
        </div>
        <Link to="/checkout">
          <Button className="w-full h-12 text-lg font-semibold bg-black text-white hover:bg-gray-800 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};