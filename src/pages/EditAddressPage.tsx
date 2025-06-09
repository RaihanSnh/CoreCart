import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Plus, CheckCircle, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

interface Address {
  id: string;
  title: string;
  address: string;
  phone: string;
  isDefault: boolean;
}

export const EditAddressPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  const [addresses, setAddresses] = useState<Address[]>(user?.addresses || [
    { id: '1', title: 'Home Address', address: 'Jl. Contoh No. 123, Kota Contoh, Provinsi Contoh', phone: '081234567890', isDefault: true },
    { id: '2', title: 'Work Address', address: 'Jl. Kantor No. 456, Kota Bisnis, Provinsi Usaha', phone: '089876543210', isDefault: false },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState(addresses.find(addr => addr.isDefault)?.id || '');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ title: '', address: '', phone: '' });

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
    setSelectedAddressId(id);
  };

  const handleDeleteAddress = (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
      if (selectedAddressId === id && addresses.length > 1) {
        setSelectedAddressId(addresses.filter(addr => addr.id !== id)[0]?.id || '');
      } else if (addresses.length === 1 && selectedAddressId === id) {
        setSelectedAddressId('');
      }
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddress.title && newAddress.address && newAddress.phone) {
      const id = Date.now().toString();
      setAddresses([...addresses, { ...newAddress, id, isDefault: false }]);
      setNewAddress({ title: '', address: '', phone: '' });
      setShowAddForm(false);
    } else {
      alert('Please fill all fields for the new address.');
    }
  };

  const handleSaveAddresses = () => {
    if (user) {
      setUser({ ...user, addresses }); // Update user's addresses in store
      alert('Addresses updated successfully!');
    } else {
      alert('No user logged in. Addresses are saved locally for this session.');
    }
    navigate(-1); // Go back to the previous page (ProfilePage)
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 fixed top-0 left-0 right-0 z-40 h-[64px] flex items-center p-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800 dark:text-gray-200">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg ml-2 text-gray-900 dark:text-white">Edit Address</h1>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-[64px]"></div>

      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Your Addresses</h2>

        <RadioGroup onValueChange={handleSetDefault} value={selectedAddressId} className="space-y-3">
          {addresses.map((address) => (
            <Card key={address.id} className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
              <CardContent className="p-4 flex items-center justify-between">
                <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">{address.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{address.address}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{address.phone}</p>
                  {address.isDefault && (
                    <Badge className="mt-2 bg-blue-500 text-white dark:bg-blue-600">Default Address</Badge>
                  )}
                </Label>
                <RadioGroupItem value={address.id} id={address.id} className="ml-4" />
                <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)} className="ml-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20">
                    <X className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>

        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full bg-black text-white dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Address
        </Button>

        {showAddForm && (
          <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Address</h3>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-title" className="text-gray-700 dark:text-gray-300">Title (e.g., Home, Work)</Label>
                <Input
                  id="new-title"
                  type="text"
                  value={newAddress.title}
                  onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-address" className="text-gray-700 dark:text-gray-300">Full Address</Label>
                <Input
                  id="new-address"
                  type="text"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-phone" className="text-gray-700 dark:text-gray-300">Phone Number</Label>
                <Input
                  id="new-phone"
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                Save New Address
              </Button>
            </form>
          </Card>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4">
          <Button onClick={handleSaveAddresses} className="w-full bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700">
            Done Managing Addresses
          </Button>
        </div>
      </div>
    </div>
  );
}; 