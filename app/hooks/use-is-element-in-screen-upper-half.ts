import { useState, useEffect, type RefObject } from 'react';

export function useIsElementInScreenUpperHalf(elementRef: RefObject<HTMLDivElement | null>) {
  const middlePoint = useElementMiddlePoint(elementRef);
  console.log(`is in upper half: ${middlePoint && middlePoint.y < (typeof window !== 'undefined' ? window.innerHeight : 0) / 2}`); // TODO: delete

  return middlePoint ? middlePoint.y < (typeof window !== 'undefined' ? window.innerHeight : 0) / 2 : false;
}

/**
 * Custom hook that calculates and returns the middle point coordinates of an element on the screen
 *
 * @param elementRef - React ref from the target element
 * @returns Object containing x and y coordinates of the element's middle point, or null if element not found
 */
function useElementMiddlePoint(elementRef: RefObject<HTMLDivElement | null>) {
  const [coordinates, setCoordinates] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    function updateCoordinates() {
      if (!elementRef?.current) {
        setCoordinates(null);
        return;
      }

      const rect = elementRef.current.getBoundingClientRect();
      const middleX = rect.left + rect.width / 2;
      const middleY = rect.top + rect.height / 2;

      setCoordinates({ x: middleX, y: middleY });
    }

    // Calculate initial coordinates
    updateCoordinates();

    // Update coordinates on window resize and scroll
    window.addEventListener('resize', updateCoordinates);
    window.addEventListener('scroll', updateCoordinates);

    return () => {
      window.removeEventListener('resize', updateCoordinates);
      window.removeEventListener('scroll', updateCoordinates);
    };
  }, [elementRef]);

  return coordinates;
}