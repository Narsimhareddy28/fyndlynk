import React, { useState, useEffect } from 'react';

const CustomScrollbar = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) : 0;
      setScrollPercent(percent);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center"
      style={{ height: '25vh' }}
      aria-hidden="true"
    >
      <div
        className="relative"
        style={{ width: '4px', height: '100%' }}
      >
        {/* Track */}
        <div
          className="absolute left-0 top-0 w-full h-full rounded-full"
          style={{ background: '#ffffff20' }}
        />
        {/* Progress */}
        <div
          className="absolute left-0 top-0 w-full rounded-full"
          style={{
            background: '#ff0000',
            height: `${Math.round(scrollPercent * 100)}%`,
            transition: 'height 0s',
          }}
        />
      </div>
    </div>
  );
};

export default CustomScrollbar; 