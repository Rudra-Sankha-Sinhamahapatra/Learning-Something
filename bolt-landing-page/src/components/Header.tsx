import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="text-white text-2xl font-bold">bolt</div>
      <div className="flex gap-4">
        <button className="text-white">Sign In</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Get Started</button>
      </div>
    </header>
  );
};