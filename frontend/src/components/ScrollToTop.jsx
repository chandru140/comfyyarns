import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use 'instant' to bypass the CSS `scroll-behavior: smooth` rule in index.css.
    // Without this, the smooth animation gets cut short when the new page renders,
    // leaving the scroll position wherever it was on the previous page.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
