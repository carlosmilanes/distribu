import { useEffect, type RefObject } from 'react';
import { useStableCallback } from './use-stable-callback';

/**
 * Foundation hook for listening to keyboard events
 * @param key Key to listen for (e.g., 'Escape', 'Enter')
 * @param callback Function to call when key is pressed
 * @param scopeRef Optional ref to scope the listener to specific element
 */
export function useKeyDown(
  key: KeyboardEvent['key'],
  callback: () => void,
  scopeRef?: RefObject<EventTarget> | null
) {
  const stableCallback = useStableCallback(callback);

  useEffect(() => {
    const scope = scopeRef?.current || document;

    function handleKeyDown(event: Event) {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === key) {
        keyboardEvent.preventDefault();
        stableCallback();
      }
    }

    scope.addEventListener('keydown', handleKeyDown);
    return () => scope.removeEventListener('keydown', handleKeyDown);
  }, [key, stableCallback]);
}
