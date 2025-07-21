import React, { useEffect, useState } from 'react';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    setHiding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setHiding(false);
      setVisible(false);
    }, 500); // Match animation duration
  };

  return (
    <button
      aria-label="Scroll to top"
      onClick={handleClick}
      className={`
        fixed bottom-6 right-6 z-[9999]
        w-12 h-12 flex items-center justify-center
        bg-[#ff0000cc] rounded-md shadow-lg
        transition-transform duration-500
        ${visible && !hiding ? 'animate-bounce-in' : ''}
        ${hiding ? 'animate-bounce-out pointer-events-none' : ''}
        ${!visible && !hiding ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'}
      `}
      style={{ transition: 'opacity 0.3s, transform 0.5s' }}
    >
      {/* Clean upward curved arrow SVG */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V7" />
        <path d="M8 11l4-4 4 4" />
      </svg>
    </button>
  );
};

export default ScrollToTop;

// Tailwind CSS animations (add to tailwind.css):
// .animate-bounce-in { animation: bounceIn 0.5s cubic-bezier(.68,-0.55,.27,1.55) both; }
// .animate-bounce-out { animation: bounceOut 0.5s cubic-bezier(.68,-0.55,.27,1.55) both; }
// @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.5) translateY(40px); } 60% { opacity: 1; transform: scale(1.1) translateY(-10px); } 80% { transform: scale(0.95) translateY(5px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
// @keyframes bounceOut { 0% { opacity: 1; transform: scale(1) translateY(0); } 20% { transform: scale(1.1) translateY(-10px); } 100% { opacity: 0; transform: scale(0.5) translateY(40px); } } 