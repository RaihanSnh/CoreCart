import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 fixed top-0 left-0 right-0 z-40 h-[64px] flex items-center p-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800 dark:text-gray-200">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg ml-2 text-gray-900 dark:text-white">Settings</h1>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-[64px]"></div>

      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">App Settings</h2>
        
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {theme === 'light' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-400" />
            )}
            <Label htmlFor="dark-mode-toggle" className="text-gray-900 dark:text-white font-medium">Dark Mode</Label>
          </div>
          <Switch
            id="dark-mode-toggle"
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </div>

        <p className="text-gray-700 dark:text-gray-300">[Other settings options will go here]</p>
      </div>
    </div>
  );
}; 