import React from 'react';
import { Play } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0D1720] via-[#124A50] to-[#142D3B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Transform Your Ideas Into
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-400 mt-2">
              Powerful Digital Solutions
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#B0B6C0]">
            We build cutting-edge MVPs that bring your vision to life, combining AI innovation
            with exceptional design and development expertise.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition-all transform hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-3 border border-[#B0B6C0] text-white rounded-lg font-medium hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-20 relative">
          <div className="aspect-video rounded-lg overflow-hidden border border-white/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex items-center justify-center group cursor-pointer">
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform transition-all group-hover:scale-110">
                <Play className="w-6 h-6 text-teal-600 ml-1" />
              </button>
            </div>
            <video
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
              loop
              muted
            >
              <source src="/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};