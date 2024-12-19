export function GlowEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Left side green glow */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[500px]"
        style={{
          background: `
            radial-gradient(
              circle at left bottom,
              rgba(0, 255, 208, 0.6) 0%,
              rgba(0, 255, 208, 0.3) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Right side blue glow */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[500px]"
        style={{
          background: `
            radial-gradient(
              circle at right bottom,
              rgba(0, 64, 255, 0.6) 0%,
              rgba(0, 96, 255, 0.3) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Center blend overlay */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
        style={{
          background: `
            radial-gradient(
              circle at center bottom,
              rgba(0, 128, 255, 0.2) 0%,
              transparent 70%
            )
          `,
          filter: 'blur(90px)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Intensity boosters */}
      <div
        className="absolute bottom-0 left-[20%] w-[300px] h-[300px]"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgba(0, 255, 208, 0.3) 0%,
              transparent 70%
            )
          `,
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        className="absolute bottom-0 right-[20%] w-[300px] h-[300px]"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgba(0, 64, 255, 0.3) 0%,
              transparent 70%
            )
          `,
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}