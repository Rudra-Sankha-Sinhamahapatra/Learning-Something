import React from 'react';

export const GlowEffect: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      {/* Primary glow layer */}
      <div 
        className="absolute top-[-200px] left-[5%] w-[90%] h-[250px] bg-gradient-to-r from-green-400 via-teal-300 to-blue-500/40 blur-[130px] rounded-[100%]"
      ></div>
      
      {/* Secondary subtle layer for depth */}
      <div 
        className="absolute top-[-180px] left-[15%] w-[70%] h-[200px] bg-gradient-to-r from-green-500/20 via-teal-400/30 to-blue-500/40 blur-[100px] rounded-[100%]"
      ></div>
      
      {/* Tertiary layer for color variation */}
      <div 
        className="absolute top-[-150px] left-[25%] w-[50%] h-[150px] bg-gradient-to-r from-green-600/15 via-teal-500/20 to-blue-600/25 blur-[90px] rounded-[100%]"
      ></div>
    </div>
  );
};
