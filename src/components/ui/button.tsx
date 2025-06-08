import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'default',
  size = 'default',
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        {
          'bg-black text-white hover:bg-gray-800': variant === 'default',
          'border border-gray-300 bg-white hover:bg-gray-50': variant === 'outline',
          'hover:bg-gray-100': variant === 'ghost',
        },
        {
          'h-10 py-2 px-4': size === 'default',
          'h-9 px-3 text-xs': size === 'sm',
          'h-11 px-8': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
};