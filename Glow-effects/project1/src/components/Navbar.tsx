
import { Bookmark } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="p-4 flex justify-between items-center relative z-50">
      <div className="flex items-center space-x-2">
        <Bookmark className="w-6 h-6 text-orange-400" />
        <span className="text-xl font-mono">
          Buk<span className="text-orange-400">Marks</span>
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] border border-[#333]">
          🌙
        </button>
        <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#252525] rounded-lg transition-all border border-[#333]">
          Sign In
        </button>
        <button className="px-4 py-2 bg-[#D4965B] hover:bg-[#e0a66c] rounded-lg transition-all">
          Sign Up
        </button>
      </div>
    </nav>
  );
}