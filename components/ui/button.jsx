import React from 'react';

export function Button({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'default',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) {
  // Base styles
  let variantClasses = '';
  let sizeClasses = '';
  
  // Variant styles
  switch (variant) {
    case 'outline':
      variantClasses = 'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100';
      break;
    case 'ghost':
      variantClasses = 'bg-transparent hover:bg-gray-100 text-gray-700';
      break;
    default: // default variant
      variantClasses = 'bg-emerald-600 hover:bg-emerald-700 text-white';
  }
  
  // Size styles
  switch (size) {
    case 'sm':
      sizeClasses = 'text-sm px-3 py-1.5 rounded-md';
      break;
    case 'lg':
      sizeClasses = 'text-lg px-6 py-3 rounded-lg';
      break;
    default: // default size
      sizeClasses = 'text-base px-4 py-2 rounded-md';
  }
  
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
} 