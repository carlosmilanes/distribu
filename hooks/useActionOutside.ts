import { useRef, useEffect } from "react";

/**
 * Hook that handles outside interactions (mouse, touch, scroll) for any HTML element
 * @param callback Function to call when an interaction outside the element is detected
 * @returns Ref to be attached to the element that should detect outside interactions
 */
export function useActionOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleOutsideAction(e: Event) {
      if (
        ref.current &&
        e.composedPath() &&
        !e.composedPath().includes(ref.current)
      ) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleOutsideAction);
    document.addEventListener("touchstart", handleOutsideAction);
    document.addEventListener("scroll", handleOutsideAction, true); // Use capture phase

    // Clean up the event listeners
    return () => {
      document.removeEventListener("mousedown", handleOutsideAction);
      document.removeEventListener("touchstart", handleOutsideAction);
      document.removeEventListener("scroll", handleOutsideAction, true);
    };
  }, [callback]);

  return ref;
}
