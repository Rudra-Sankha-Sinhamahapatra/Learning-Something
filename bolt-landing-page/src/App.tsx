import { Header } from './components/Header';
import { GlowEffect } from './components/GlowEffect';
import { MainContent } from './components/MainContent';

function App() {
  return (
    <div className="min-h-screen bg-[#080808] relative overflow-hidden">
      <GlowEffect />
      <Header />
      <MainContent />
    </div>
  );
}

export default App;