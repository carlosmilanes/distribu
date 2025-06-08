import { type RefObject } from 'react';
import { useEventListener } from './use-event-listener';

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
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === key) {
      event.preventDefault();
      callback();
    }
  };

  useEventListener('keydown', handleKeyDown, scopeRef);
}
