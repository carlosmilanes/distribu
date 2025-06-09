import { useEffect } from 'react';
import { useStableCallback } from '../use-stable-callback';

/**
 * Hook for managing document event listeners with automatic cleanup
 * Supports all standard document events
 */
export function useDocumentEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions
) {
  const stableHandler = useStableCallback(handler);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const eventListener = (event: Event) => {
      stableHandler(event as DocumentEventMap[K]);
    };

    document.addEventListener(eventName, eventListener, options);

    return () => {
      document.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, stableHandler, options]);
}
