import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Check if the user has requested reduced motion.
 */
export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReducedMotion(e.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(onChange);
      return () => mediaQuery.removeListener(onChange);
    }
  }, []);

  return reducedMotion;
}

/**
 * Intersection Observer hook for scroll-triggered animations.
 * Returns [ref, isVisible] — attach ref to the element you want to observe.
 * Automatically reveals immediately if the user prefers reduced motion.
 */
export function useInView(options = {}) {
  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [isInView, setIsInView] = useState(Boolean(prefersReduced));
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReduced) {
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    // Immediate check if element is already within viewport
    try {
      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh && rect.bottom > 0) {
        setIsInView(true);
        return;
      }
    } catch {
      // Fallback
    }

    // Use graceful rootMargin to trigger slightly before full entrance
    const defaultOptions = {
      threshold: 0.05,
      rootMargin: '50px 0px 50px 0px',
      ...options,
    };

    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(element); // Only trigger once
          }
        },
        defaultOptions
      );

      observer.observe(element);
      return () => observer.disconnect();
    } catch {
      setIsInView(true);
    }
  }, [prefersReduced]);

  return [ref, isInView];
}

/**
 * Format a number as Indian currency (₹).
 */
export function formatPrice(amount) {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Scroll to top on route change.
 */
export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
}

/**
 * Debounce hook for search/filter inputs.
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
