import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { cn } from '../lib/utils';

interface PaymentMethod {
  id: string;
  type: string; // e.g., 'Credit Card', 'Debit Card', 'E-wallet'
  details: string; // e.g., '**** **** **** 1234', 'DANA (0812...)', 'QRIS'
  isDefault: boolean;
}

export const PaymentMethodsPage: React.FC = () => {
  const navigate = useNavigate();

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'Credit Card', details: '**** **** **** 1234', isDefault: true },
    { id: '2', type: 'DANA', details: 'DANA (08123456789)', isDefault: false },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: '',
    details: '',
  });

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id,
    })));
  };

  const handleDeleteMethod = (id: string) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    }
  };

  const handleAddMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPaymentMethod.type && newPaymentMethod.details) {
      const id = Date.now().toString();
      setPaymentMethods([
        ...paymentMethods,
        { ...newPaymentMethod, id, isDefault: paymentMethods.length === 0 },
      ]);
      setNewPaymentMethod({ type: '', details: '' });
      setShowAddForm(false);
    } else {
      alert('Please fill all fields for the new payment method.');
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 fixed top-0 left-0 right-0 z-40 h-[64px] flex items-center p-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800 dark:text-gray-200">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg ml-2 text-gray-900 dark:text-white">Payment Methods</h1>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-[64px]"></div>

      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Your Payment Methods</h2>

        {paymentMethods.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No payment methods added yet.</p>
        ) : (
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <CreditCard className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{method.type}</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{method.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.isDefault ? (
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full dark:bg-blue-600">Default</span>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleSetDefault(method.id)}
                        className="text-xs dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        Set Default
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteMethod(method.id)}
                      className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full bg-black text-white dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Payment Method
        </Button>

        {showAddForm && (
          <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Payment Method</h3>
            <form onSubmit={handleAddMethod} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="method-type" className="text-gray-700 dark:text-gray-300">Method Type (e.g., Credit Card, DANA)</Label>
                <Input
                  id="method-type"
                  type="text"
                  value={newPaymentMethod.type}
                  onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, type: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="method-details" className="text-gray-700 dark:text-gray-300">Details (e.g., **** 1234, 0812...)</Label>
                <Input
                  id="method-details"
                  type="text"
                  value={newPaymentMethod.details}
                  onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, details: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                Save Payment Method
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}; 