import React from 'react';

interface StatusMessageProps {
  message: string;
  type: 'error' | 'success';
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ message, type }) => {
  if (!message) return null;

  const styles = {
    error: 'bg-red-500/10 border-red-500/20 text-red-400',
    success: 'bg-teal-500/10 border-teal-500/20 text-teal-400'
  };

  return (
    <div className={`mt-4 p-3 rounded-lg border ${styles[type]} text-sm`}>
      {message}
    </div>
  );
};