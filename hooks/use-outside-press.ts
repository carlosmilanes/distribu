import { useRef, useEffect } from 'react';

/**
 * Hook that handles outside interactions (mouse, touch, scroll) for any HTML element
 * @param callback Function to call when an interaction outside the element is detected
 * @returns Ref to be attached to the element that should detect outside interactions
 */
export function useOutsidePress<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleOutsidePress(e: Event) {
      if (
        ref.current &&
        e.composedPath() &&
        !e.composedPath().includes(ref.current)
      ) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleOutsidePress);
    document.addEventListener('touchstart', handleOutsidePress);
    document.addEventListener('scroll', handleOutsidePress, true); // Use capture phase

    // Clean up the event listeners
    return () => {
      document.removeEventListener('mousedown', handleOutsidePress);
      document.removeEventListener('touchstart', handleOutsidePress);
      document.removeEventListener('scroll', handleOutsidePress, true);
    };
  }, [callback]);

  return ref;
}
