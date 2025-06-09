import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

export const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ ...user, name, email });
      // In a real app, you would send this data to a backend
      alert('Profile updated successfully!');
      navigate(-1); // Go back to the previous page (ProfilePage)
    } else {
      alert('No user logged in.');
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 fixed top-0 left-0 right-0 z-40 h-[64px] flex items-center p-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800 dark:text-gray-200">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg ml-2 text-gray-900 dark:text-white">Edit Profile</h1>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-[64px]"></div>

      <div className="p-4 space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Your Profile Information</h2>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <Button type="submit" className="w-full bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}; 