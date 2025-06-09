import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, addOrder } = useStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<any>(null);

  const total = getCartTotal();
  const shippingCost = 25000; // Estimated Shipping & Handling
  const paymentFee = 5000; // Payment Fees
  const taxes = 10000; // Taxes
  const finalTotal = total + shippingCost + paymentFee + taxes;

  const [selectedAddress, setSelectedAddress] = useState<any>({
    id: 'akmal_house',
    title: "Akmal's House",
    address: "Jl. Cihanjuang No. 123, Cibabat, Cimahi Utara",
    phone: "081234567890",
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const paymentMethods = [
    { id: 'bca', name: 'BCA', icon: 'creditCard' },
    { id: 'qris', name: 'QRIS', icon: 'qrCode' },
    { id: 'dana', name: 'DANA', icon: 'wallet' },
    { id: 'ovo', name: 'OVO', icon: 'wallet' },
  ];

  const estimatedDeliveryDate = "Tuesday, October 26, 2024"; // Example date

  const handleContinue = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order = {
      id: `ORD-${Date.now()}`,
      items: cart,
      total: finalTotal,
      status: 'Payment',
      date: new Date().toISOString(),
      shippingAddress: selectedAddress,
      paymentMethod: selectedPaymentMethod,
      paidAt: new Date().toLocaleString(),
    };

    addOrder(order);
    clearCart();
    setOrderConfirmation(order);
    setOrderPlaced(true);
    setIsProcessing(false);
    setCurrentStep(4); // Ensure we are on step 4 for successful order display
  };

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-20">
      {/* Fixed Main Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 fixed top-0 left-0 right-0 z-40 h-[64px] flex items-center p-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800 dark:text-gray-200">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg ml-2 text-gray-900 dark:text-white">Checkout</h1>
      </div>

      {/* Fixed Step Indicator */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 fixed top-[64px] left-0 right-0 z-40 py-3">
        <div className="flex justify-around items-center">
          {[1, 2, 3, 4].map((step) => (
            <button
              key={step}
              onClick={() => setCurrentStep(step)}
              className="flex flex-col items-center focus:outline-none"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  currentStep >= step ? "bg-black text-white dark:bg-blue-600" : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                )}
              >
                {step}
              </div>
              <span
                className={cn(
                  "text-xs mt-1",
                  currentStep >= step ? "text-black font-medium dark:text-white" : "text-gray-500 dark:text-gray-400"
                )}
              >
                {step === 1 ? 'Shipping' : step === 2 ? 'Payment' : step === 3 ? 'Review' : 'Confirm'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area for steps - Adjusted padding-top to clear both fixed elements */}
      <div className="p-4 space-y-4 pt-[136px]"> {/* Combined height of header (64px) + step indicator (~72px) = ~136px */}
        {/* Step 1: Shipping Address */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Select Shipping Address</h2>
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">{selectedAddress.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedAddress.address}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedAddress.phone}</p>
              </CardContent>
            </Card>
            <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400" onClick={() => navigate('/profile/addresses')}>
              + Add New Shipping Address
            </Button>
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 flex justify-end">
              <Button onClick={handleContinue} className="w-full h-12 text-lg font-semibold bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Select Payment Method */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Select Payment Method</h2>
            <RadioGroup onValueChange={setSelectedPaymentMethod} value={selectedPaymentMethod}>
              {paymentMethods.map((method) => (
                <Card key={method.id} className="p-4 flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <Label htmlFor={method.id} className="flex items-center gap-3 w-full cursor-pointer">
                    {method.id === 'qris' ? <img src="/qris.png" alt="QRIS" className="w-8 h-8" /> : <CreditCard className="w-8 h-8 text-gray-600 dark:text-gray-400" />}
                    <span className="text-lg font-medium text-gray-900 dark:text-white">{method.name}</span>
                  </Label>
                  <RadioGroupItem value={method.id} id={method.id} className="dark:border-gray-600 dark:checked:bg-blue-600 dark:checked:text-white" />
                </Card>
              ))}
            </RadioGroup>
            <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400" onClick={() => navigate('/profile/payment-methods')}>
              + Add New Payment Method
            </Button>
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 flex justify-between">
              <Button onClick={() => setCurrentStep(1)} variant="outline" className="w-1/2 mr-2 h-12 text-lg font-semibold dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600">
                Back
              </Button>
              <Button onClick={handleContinue} disabled={!selectedPaymentMethod} className="w-1/2 ml-2 h-12 text-lg font-semibold bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Review Order</h2>
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="dark:border-gray-700">
                <CardTitle className="text-gray-900 dark:text-white">Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1 text-gray-900 dark:text-white">{item.name}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3 space-y-2 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">Rp {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Shipping & Handling</span>
                    <span className="text-gray-900 dark:text-white">Rp {shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Payment Fees</span>
                    <span className="text-gray-900 dark:text-white">Rp {paymentFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Taxes</span>
                    <span className="text-gray-900 dark:text-white">Rp {taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-gray-900 dark:text-white">Rp {finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="dark:border-gray-700">
                <CardTitle className="text-gray-900 dark:text-white">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedAddress.title}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedAddress.address}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedAddress.phone}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold mt-2">Estimated Delivery: {estimatedDeliveryDate}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="dark:border-gray-700">
                <CardTitle className="text-gray-900 dark:text-white">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{paymentMethods.find(m => m.id === selectedPaymentMethod)?.name || 'N/A'}</p>
              </CardContent>
            </Card>
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 flex justify-between">
              <Button onClick={() => setCurrentStep(2)} variant="outline" className="w-1/2 mr-2 h-12 text-lg font-semibold dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600">
                Back
              </Button>
              <Button onClick={handleContinue} className="w-1/2 ml-2 h-12 text-lg font-semibold bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                Place Order
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Payment / Order Successful */}
        {currentStep === 4 && !orderPlaced && (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Complete Payment</h2>
            <p className="text-gray-700 dark:text-gray-300">Please scan the QRIS code or use the transaction code below to complete your payment.</p>
            <div className="flex justify-center items-center h-48 bg-gray-200 dark:bg-gray-700 rounded-lg">
              {/* Placeholder for QRIS image or transaction code */}
              <p className="text-gray-600 dark:text-gray-400">QRIS Code / Transaction Details Here</p>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 flex justify-end">
              <Button onClick={handlePlaceOrder} disabled={isProcessing} className="w-full h-12 text-lg font-semibold bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                {isProcessing ? 'Processing Payment...' : 'I Have Paid'}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 4 && orderPlaced && orderConfirmation && (
          <div className="space-y-6 text-center py-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Successful!</h2>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-left space-y-3 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700 dark:text-gray-300">Order ID:</span>
                <span className="text-gray-900 dark:text-white">{orderConfirmation.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700 dark:text-gray-300">Payment Method:</span>
                <span className="text-gray-900 dark:text-white">{orderConfirmation.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700 dark:text-gray-300">Paid At:</span>
                <span className="text-gray-900 dark:text-white">{orderConfirmation.paidAt}</span>
              </div>
              <div className="border-t pt-3 mt-3 dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">Item Details:</h3>
                {orderConfirmation.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button onClick={() => navigate('/orders')} className="w-full h-12 text-lg font-semibold bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                Track Order
              </Button>
              <Button onClick={() => navigate('/')} variant="outline" className="w-full h-12 text-lg font-semibold dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600">
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};