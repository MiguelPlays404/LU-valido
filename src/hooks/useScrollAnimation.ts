import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('is-visible');
            const delay = el.dataset.delay;
            if (delay) {
              el.style.animationDelay = `${parseInt(delay) * 100}ms`;
            }
            io.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -20px 0px' }
    );

    const observeAll = (root: ParentNode) => {
      root.querySelectorAll('[data-animate]:not(.is-visible)').forEach((el) => io.observe(el));
    };

    observeAll(document);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n as HTMLElement;
          if (el.matches?.('[data-animate]') && !el.classList.contains('is-visible')) {
            io.observe(el);
          }
          if (el.querySelectorAll) observeAll(el);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
};
