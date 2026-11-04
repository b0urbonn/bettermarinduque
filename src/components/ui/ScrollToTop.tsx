import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const changedPage = previousPath.current !== pathname;
    previousPath.current = pathname;

    if (hash) {
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
          target.focus({ preventScroll: true });
          target.scrollIntoView({ block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      });
      return () => cancelAnimationFrame(frame);
    }

    if (changedPage) {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
