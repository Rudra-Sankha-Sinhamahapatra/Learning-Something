import { Bookmark } from 'lucide-react';
import { GlowEffects } from './GlowEffects';

export function PreviewWindow() {
  return (
    <>
          <GlowEffects/>
    <div className="max-w-4xl mx-auto bg-[#1a1a1a]/50 rounded-lg p-4 backdrop-blur-sm border border-[#333] relative z-10">
      <div className="flex items-center gap-2 mb-4 text-gray-400">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="bg-[#0a0a0a] rounded-lg p-6">
        <div className="flex items-center gap-4 text-gray-400">
          <Bookmark className="w-5 h-5" />
          <span>Add Bookmarks</span>
        </div>
        <pre className="text-gray-300 text-sm mt-4 overflow-x-auto">
          <code>
{`export function GlowEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Left side green glow */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[500px]"
        style={{
          background: \`
            radial-gradient(
              circle at left bottom,
              rgba(0, 255, 208, 0.6) 0%,
              rgba(0, 255, 208, 0.3) 40%,
              transparent 70%
            )
          \`,
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Right side blue glow */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[500px]"
        style={{
          background: \`
            radial-gradient(
              circle at right bottom,
              rgba(0, 64, 255, 0.6) 0%,
              rgba(0, 96, 255, 0.3) 40%,
              transparent 70%
            )
          \`,
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Center blend overlay */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
        style={{
          background: \`
            radial-gradient(
              circle at center bottom,
              rgba(0, 128, 255, 0.2) 0%,
              transparent 70%
            )
          \`,
          filter: 'blur(90px)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Intensity boosters */}
      <div
        className="absolute bottom-0 left-[20%] w-[300px] h-[300px]"
        style={{
          background: \`
            radial-gradient(
              circle at center,
              rgba(0, 255, 208, 0.3) 0%,
              transparent 70%
            )
          \`,
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        className="absolute bottom-0 right-[20%] w-[300px] h-[300px]"
        style={{
          background: \`
            radial-gradient(
              circle at center,
              rgba(0, 64, 255, 0.3) 0%,
              transparent 70%
            )
          \`,
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}`}
          </code>
        </pre>
      </div>
    </div>
    </>
  );
}
