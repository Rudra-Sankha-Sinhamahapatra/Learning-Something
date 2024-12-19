
import { GlowEffects } from './components/GlowEffects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PreviewWindow } from './components/PreviewWindow';

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <GlowEffects />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <PreviewWindow />
      </div>
    </div>
  );
}

export default App;