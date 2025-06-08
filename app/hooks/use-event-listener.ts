import { useEffect, useMemo, type RefObject } from 'react';
import { useStableCallback } from './use-stable-callback';

/**
 * Hook for managing event listeners with automatic cleanup
 * @param eventName Single event or array of events to listen for
 * @param handler Function to call when event occurs
 * @param element Element, document, window, or ref to attach listener to (defaults to document)
 * @param options Event listener options (capture, passive, etc.)
 */
export function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element?: EventTarget | RefObject<EventTarget> | null,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<
  T extends EventTarget,
  K extends keyof HTMLElementEventMap
>(
  eventName: K | K[],
  handler: (event: HTMLElementEventMap[K]) => void,
  element?: T | RefObject<T> | null,
  options?: boolean | AddEventListenerOptions
) {
  const stableHandler = useStableCallback(handler);

  // eventList memoization - important for arrays
  const eventList = useMemo(
    () => (Array.isArray(eventName) ? eventName : [eventName]),
    [eventName]
  );

  // target resolution memoization
  const target = useMemo(() => {
    if (element === null) return null;
    if (element === undefined) return document;
    return 'current' in element ? element.current : element;
  }, [element]);

  useEffect(() => {
    // exit early if target is invalid or doesn't support event listeners
    if (!target?.addEventListener) return;

    // add event listeners
    eventList.forEach((event) => {
      target.addEventListener(event, stableHandler as EventListener, options);
    });

    return () => {
      eventList.forEach((event) => {
        target.removeEventListener(
          event,
          stableHandler as EventListener,
          options
        );
      });
    };
  }, [target, eventList, stableHandler, options]);
}
