import { useKeyDown } from './use-key-down';

/**
 * Hook that handles escape key presses globally
 * @param callback Function to call when the escape key is pressed
 */
export function useEscapeKey(callback: () => void) {
  useKeyDown('Escape', callback);
}
