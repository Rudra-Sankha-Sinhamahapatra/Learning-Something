import React from 'react';
import { Bot } from 'lucide-react';

export function Hero() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="inline-block bg-[#1a1a1a]/50 px-4 py-1 rounded-full mb-6 backdrop-blur-sm border border-[#333]">
        <p className="text-sm text-blue-400 flex items-center gap-2">
          <Bot className="w-4 h-4" />
          AI-Powered X Management
        </p>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-mono mb-6">
        Meet Your AI
        <br />
        <span className="text-blue-400">X Assistant</span>
      </h1>
      
      <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
        Let AI maintain your X presence while staying true to your voice.
        Define your persona, and let YappingBot handle the rest.
      </p>
      
      <div className="flex items-center justify-center gap-4">
        <button className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#252525] rounded-lg transition-all border border-[#333]">
          Watch Demo
        </button>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all">
          Start Free Trial
        </button>
      </div>
    </div>
  );
}