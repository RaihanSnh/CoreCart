import React from 'react';
import { cn } from '../../lib/utils';

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({
  activeTab: '',
  setActiveTab: () => {},
});

export const Tabs: React.FC<TabsProps> = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ className, children }) => {
  return (
    <div className={cn('inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500', className)}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, className, children }) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-900',
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, className, children }) => {
  const { activeTab } = React.useContext(TabsContext);
  
  if (activeTab !== value) return null;

  return (
    <div className={cn('mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2', className)}>
      {children}
    </div>
  );
};