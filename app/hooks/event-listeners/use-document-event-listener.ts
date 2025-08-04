import { useEffect } from 'react';

/**
 * Hook for managing document event listeners with automatic cleanup
 * Supports all standard document events
 */
export function useDocumentEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions
) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const eventListener = (event: Event) => {
      handler(event as DocumentEventMap[K]);
    };

    document.addEventListener(eventName, eventListener, options);

    return () => {
      document.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, handler, options]);
}
