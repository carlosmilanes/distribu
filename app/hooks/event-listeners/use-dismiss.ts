import { type RefObject } from 'react';
import { useEscapeKey } from './use-escape-key';
import { useOutsidePress } from './use-outside-press';

/**
 * Hook that triggers a handler when pressing the Escape key or clicking/touching outside a referenced element.
 *
 * @template T - The type of HTML element to attach the ref to
 * @param callback - Function called when escape is pressed or clicking/touching outside the referenced element
 * @returns A ref object to attach to the target element
 *
 * @example
 * ```tsx
 * function Modal() {
 *   const [isOpen, setIsOpen] = useState(true);
 *   const modalRef = useDismiss<HTMLDivElement>(() => setIsOpen(false));
 *
 *   return (
 *     <div ref={modalRef} className="modal">
 *       Modal content
 *     </div>
 *   );
 * }
 * ```
 */
export function useDismiss<T extends HTMLElement = HTMLElement>(
  callback: () => void
): RefObject<T | null> {
  const ref = useOutsidePress<T>(callback);
  useEscapeKey(callback);

  return ref;
}
