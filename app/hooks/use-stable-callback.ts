import { useRef, useEffect } from 'react';

/**
 * Hook that ensures a callback always references the latest version
 * @param callback Function to keep fresh
 * @returns Stable function reference that always calls the latest callback
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T
): T {
  const callbackRef = useRef(callback);

  // Update ref with latest callback
  useEffect(() => {
    callbackRef.current = callback;
  });

  // Create stable function reference that calls latest callback
  const stableCallbackRef = useRef((...args: any[]) =>
    callbackRef.current(...args)
  );

  // Return the stable function
  return stableCallbackRef.current as T;
}
