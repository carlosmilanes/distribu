import { useId } from 'react';
import { type MotionProps } from 'motion/react';
import { layoutTransitions } from '@/app/motion/presets';

/**
Generates the shared props that morph two components into each other.
Call once in the parent and spread the result onto the Motion element of both components.
The `layoutId` is unique per call, so several morphs can coexist.
Only one component with these props should be rendered at a time.
*/
export function useMorph({
  transition = layoutTransitions.springy,
  isCrossfaded = true,
}: UseMorphOptions = {}): MorphProps {
  const layoutId = useId();

  return { layoutId, layoutCrossfade: isCrossfaded, transition };
}

type UseMorphOptions = {
  /** Layout transition preset from `@/app/motion/presets` */
  transition?: MotionProps['transition'];
  /** Set false to keep opacity constant during the morph */
  isCrossfaded?: boolean;
};

/** Props returned by `useMorph`. Components to be morphed should accept and forward them. */
export type MorphProps = Required<
  Pick<MotionProps, 'layoutId' | 'layoutCrossfade' | 'transition'>
>;
