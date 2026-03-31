import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const NavigationProgress = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setProgress(20);

    const t1 = setTimeout(() => setProgress(60), 100);
    const t2 = setTimeout(() => setProgress(85), 250);
    const t3 = setTimeout(() => setProgress(100), 350);
    const t4 = setTimeout(() => {
      setIsVisible(false);
      setProgress(0);
    }, 600);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [location.pathname]);

  if (!isVisible && progress === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #F5C000, #FFD700)',
        zIndex: 99999,
        transition: 'width 0.25s ease, opacity 0.3s ease',
        opacity: isVisible ? 1 : 0,
        boxShadow: '0 0 10px rgba(245,192,0,0.6)',
        borderRadius: '0 2px 2px 0',
      }}
    />
  );
};
