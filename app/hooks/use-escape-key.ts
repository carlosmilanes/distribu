import { useEffect } from 'react';
import { useStableCallback } from './use-stable-callback';

/**
 * Hook that handles escape key presses globally
 * @param callback Function to call when the escape key is pressed
 */
export function useEscapeKey(callback: () => void) {
  const stableCallback = useStableCallback(callback);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        stableCallback();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [stableCallback]);
}
