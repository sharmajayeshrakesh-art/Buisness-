/**
 * ScrollProvider — boots the smooth-scroll core once for the whole app and
 * exposes the Lenis instance + a scrollTo helper via context. Wrap <App/> in it.
 */
import { createContext, useContext, useEffect, useState } from 'react';
import { initSmoothScroll, destroySmoothScroll, scrollTo } from '../lib/scroll';

const ScrollContext = createContext({ lenis: null, scrollTo });

export function ScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const instance = initSmoothScroll();
    setLenis(instance);
    return () => destroySmoothScroll();
  }, []);

  return (
    <ScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  return useContext(ScrollContext);
}
