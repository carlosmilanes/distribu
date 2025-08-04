import { useEffect } from 'react';

/**
 * Hook for managing HTML element event listeners with automatic cleanup
 * Supports all standard HTML element events
 */
export function useElementEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  targetElement: HTMLElement | null,
  options?: AddEventListenerOptions
) {
  useEffect(() => {
    if (!targetElement?.addEventListener) return;

    const eventListener = (event: Event) => {
      handler(event as HTMLElementEventMap[K]);
    };

    targetElement.addEventListener(eventName, eventListener, options);

    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [targetElement, eventName, handler, options]);
}
