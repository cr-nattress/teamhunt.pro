import React from 'react';

export interface ExampleProps {
  text: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const Example: React.FC<ExampleProps> = ({
  text,
  variant = 'primary',
  size = 'medium',
  onClick
}) => {
  const baseStyles = 'font-medium rounded px-4 py-2 border cursor-pointer';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'
  };

  const sizeStyles = {
    small: 'text-sm px-3 py-1',
    medium: 'text-base px-4 py-2',
    large: 'text-lg px-6 py-3'
  };

  const className = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`;

  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};