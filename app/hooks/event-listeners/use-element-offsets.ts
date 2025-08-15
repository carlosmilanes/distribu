import { useState, useLayoutEffect } from 'react';

/**
 * Hook that returns the element's position relative to the viewport
 * 
 * @param ref - React ref object pointing to the target HTML element
 * @returns Object with element's bounding rect relative to viewport or null if element is not available
 */
export function useElementOffsets(ref: React.RefObject<HTMLElement | null>): Offset | null {
  const [offsets, setOffsets] = useState<Offset | null>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      setOffsets(null);
      return;
    }

    const updateOffsets = () => {
      const rect = element.getBoundingClientRect();
      
      setOffsets({
        top: window.innerHeight - rect.top,
        right: window.innerWidth - rect.right,
        bottom: rect.bottom,
        left: rect.left,
      });
    };

    updateOffsets();

    window.addEventListener('scroll', updateOffsets, true); // TODO: need this? getBoundingClientRect accouts for scroll
    window.addEventListener('resize', updateOffsets);

    return () => {
      window.removeEventListener('scroll', updateOffsets, true);
      window.removeEventListener('resize', updateOffsets);
    };
  }, [ref]);

  return offsets;
}

export type Offset = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};