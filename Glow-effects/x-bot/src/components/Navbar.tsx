import React from 'react';
import { Bot } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="p-4 flex justify-between items-center relative z-50">
      <div className="flex items-center space-x-2">
        <Bot className="w-6 h-6 text-blue-400" />
        <span className="text-xl font-mono">
          Yapping<span className="text-blue-400">Bot</span>
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] border border-[#333]">
          🌙
        </button>
        <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#252525] rounded-lg transition-all border border-[#333]">
          Demo
        </button>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all">
          Start Free
        </button>
      </div>
    </nav>
  );
}