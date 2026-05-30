import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 220);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
};
