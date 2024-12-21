import React from 'react';
import { GlowEffects } from './components/GlowEffects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { PreviewWindow } from './components/PreviewWindow';

function App() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <GlowEffects />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <PreviewWindow />
        <Pricing />
      </div>
    </div>
  );
}

export default App;