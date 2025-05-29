import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose, duration]);

  const baseClasses = 'fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between max-w-md animate-slideIn transition-opacity';
  
  const typeClasses = {
    success: 'bg-green-100 text-green-800 border-l-4 border-green-500',
    error: 'bg-red-100 text-red-800 border-l-4 border-red-500',
    info: 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <span className="mr-8">{message}</span>
      <button 
        onClick={onClose} 
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;