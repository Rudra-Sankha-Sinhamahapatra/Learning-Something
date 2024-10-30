import React, { useEffect, useState } from 'react';

function throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let lastCall = 0;
  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  } as T;
}

const ThrottledResize: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = throttle(() => {
    setWindowWidth(window.innerWidth);
    console.log("Window resized:", window.innerWidth);
  }, 1000);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <h1>Window width: {windowWidth}</h1>
    </div>
  );
};

export default ThrottledResize;
