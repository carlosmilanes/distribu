import { useDocumentEventListener } from './use-document-event-listener';
import { useStableCallback } from '../use-stable-callback';

/**
 * Foundation hook for listening to keyboard events
 * @param key Key to listen for (e.g., 'Escape', 'Enter')
 * @param callback Function to call when key is pressed
 */
export function useKeyDown(key: KeyboardEvent['key'], callback: () => void) {
  const stableCallback = useStableCallback(callback);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === key) {
      event.preventDefault();
      stableCallback();
    }
  }

  useDocumentEventListener('keydown', handleKeyDown);
}
