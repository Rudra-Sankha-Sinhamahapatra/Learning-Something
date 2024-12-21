import React from 'react';
import { Twitter, Bot, Clock, Settings, CheckCircle } from 'lucide-react';

export function PreviewWindow() {
  return (
    <div className="max-w-4xl mx-auto bg-[#1a1a1a]/50 rounded-lg p-4 backdrop-blur-sm border border-[#333] relative z-10">
      <div className="flex items-center gap-2 mb-4 text-gray-400">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="bg-[#0a0a0a] rounded-lg p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Persona Settings</span>
            </div>
            <Settings className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Next Tweet in 2 hours</span>
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-3">
              <Twitter className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">3 Tweets Queued</span>
            </div>
            <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-md text-sm">
              Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}