import { useRef, type RefObject } from 'react';
import { useDocumentEventListener } from './use-document-event-listener';
import { useStableCallback } from '../use-stable-callback';

/**
 * Hook that triggers a handler when clicking or touching outside a referenced element.
 *
 * @template T - The type of HTML element to attach the ref to
 * @param handler - Function called when clicking/touching outside the referenced element
 * @returns A ref object to attach to the target element
 *
 * @example
 * ```tsx
 * function Modal() {
 *   const [isOpen, setIsOpen] = useState(true);
 *   const modalRef = useOutsidePress<HTMLDivElement>(() => setIsOpen(false));
 *
 *   return (
 *     <div ref={modalRef} className="modal">
 *       Modal content
 *     </div>
 *   );
 * }
 * ```
 */
export function useOutsidePress<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const stableHandler = useStableCallback(handler);

  function handleEvent(event: MouseEvent | TouchEvent) {
    const target = event.target;
    if (!ref.current || !target || ref.current.contains(target as Node)) {
      return;
    }
    stableHandler(event);
  }

  useDocumentEventListener('click', handleEvent);
  useDocumentEventListener('touchstart', handleEvent, { passive: true });

  return ref;
}
