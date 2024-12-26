import React from 'react';

interface StatusMessageProps {
  message: string;
  type: 'error' | 'success';
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className="mt-4">
      <p className={`text-sm ${type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
        {message}
      </p>
    </div>
  );
};