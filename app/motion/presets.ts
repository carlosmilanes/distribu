export const motionPresets = {
  springy: {
    type: 'spring' as const,
    duration: 0.5,
    bounce: 0.4,
    ease: 'easeOut' as const,
  },

//   smooth: {
//     type: 'spring' as const,
//     duration: 0.3,
//     bounce: 0.1,
//     ease: 'easeInOut' as const,
//   },

//   snappy: {
//     type: 'spring' as const,
//     duration: 0.2,
//     bounce: 0.4,
//     ease: 'easeOut' as const,
//   },
} as const;

// Layout-specific presets
export const layoutTransitions = {
  springy: { layout: motionPresets.springy },
  //   smooth: { layout: motionPresets.smooth },
  //   snappy: { layout: motionPresets.snappy },
} as const;
