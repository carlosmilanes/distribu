import { useEffect } from 'react';
import { useStableCallback } from '../use-stable-callback';

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
  const stableHandler = useStableCallback(handler);

  useEffect(() => {
    if (!targetElement?.addEventListener) return;

    const eventListener = (event: Event) => {
      stableHandler(event as HTMLElementEventMap[K]);
    };

    targetElement.addEventListener(eventName, eventListener, options);

    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [targetElement, eventName, stableHandler, options]);
}
