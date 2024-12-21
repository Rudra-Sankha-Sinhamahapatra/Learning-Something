import React from 'react';

export function GlowEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary blue glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
        style={{
          background: `
            radial-gradient(
              circle at center bottom,
              rgba(0, 163, 255, 0.75) 0%,
              rgba(0, 163, 255, 0.3) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(15px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Secondary green glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]"
        style={{
          background: `
            radial-gradient(
              circle at center bottom,
              rgba(0, 255, 133, 0.45) 0%,
              rgba(0, 255, 133, 0.15) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Left intensity booster */}
      <div
        className="absolute bottom-0 left-[20%] w-[300px] h-[300px]"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgba(0, 163, 255, 0.4) 0%,
              transparent 70%
            )
          `,
          filter: 'blur(15px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Right intensity booster */}
      <div
        className="absolute bottom-0 right-[20%] w-[300px] h-[300px]"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgba(0, 255, 133, 0.3) 0%,
              transparent 70%
            )
          `,
          filter: 'blur(15px)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}