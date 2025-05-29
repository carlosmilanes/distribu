import { create } from 'stylex';
import { colors, shadows } from './vars.stylex';
import type { StyleXVar } from '@stylexjs/stylex/lib/StyleXTypes';

export const elevation = create({
  low: {
    boxShadow: shadows.s,
  },
  medium: {
    boxShadow: shadows.m,
  },
  high: {
    boxShadow: shadows.l,
  },
  xhigh: {
    boxShadow: shadows.xl,
  },
});

export const reactiveElevation = create({
  low: {
    position: 'relative',
    transition: 'scale 0.5s ease-in-out',

    '::before': {
      boxShadow: shadows.s,
      opacity: 1,
      content: '',
      position: 'absolute',
      inset: 0,
      // zIndex: -1,
      transition: 'opacity 0.5s ease-in-out',
      borderRadius: 'inherit',
    },

    '::after': {
      boxShadow: shadows.m,
      opacity: 0,
      content: '',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      transition: 'opacity 0.5s ease-in-out',
      borderRadius: 'inherit',
    },

    ':hover': {
      scale: 1.02,
      transition: 'scale 0.2s ease-in-out',
      '::before': {
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
      },
      '::after': {
        opacity: 1,
        transition: 'opacity 0.2s ease-in-out',
      },
    },

    ':active': {
      scale: 0.98,
      boxShadow: 'none',
      '::before': {
        opacity: 0,
      },
      '::after': {
        opacity: 0,
      },
    },
  },

  medium: {
    position: 'relative',
    transition: 'scale 0.5s ease-in-out',

    '::before': {
      boxShadow: shadows.m,
      opacity: 1,
      content: '',
      position: 'absolute',
      inset: 0,
      // zIndex: -1,
      transition: 'opacity 0.5s ease-in-out',
      borderRadius: 'inherit',
    },

    '::after': {
      boxShadow: shadows.l,
      opacity: 0,
      content: '',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      transition: 'opacity 0.5s ease-in-out',
      borderRadius: 'inherit',
    },

    ':hover': {
      scale: 1.02,
      transition: 'scale 0.2s ease-in-out',
      '::before': {
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
      },
      '::after': {
        opacity: 1,
        transition: 'opacity 0.2s ease-in-out',
      },
    },

    ':active': {
      scale: 0.98,
      boxShadow: shadows.s,
      '::before': {
        opacity: 0,
      },
      '::after': {
        opacity: 0,
      },
    },
  },

  high: {
    position: 'relative',
    transition: 'scale 0.5s ease-in-out',

    '::before': {
      boxShadow: shadows.l,
      opacity: 1,
      content: '',
      position: 'absolute',
      inset: 0,
      // zIndex: -1,
      transition: 'opacity 0.5s ease-in-out',
      borderRadius: 'inherit',
    },

    '::after': {
      boxShadow: shadows.xl,
      opacity: 0,
      content: '',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      transition: 'opacity 0.5s ease-in-out',
      borderRadius: 'inherit',
    },

    ':hover': {
      scale: 1.02,
      transition: 'scale 0.2s ease-in-out',
      '::before': {
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
      },
      '::after': {
        opacity: 1,
        transition: 'opacity 0.2s ease-in-out',
      },
    },

    ':active': {
      scale: 0.98,
      boxShadow: shadows.m,
      '::before': {
        opacity: 0,
      },
      '::after': {
        opacity: 0,
      },
    },
  },
});

export const lightReflection = create({
  ofColor: (backgroundColor: string) => ({
    boxShadow: `inset 0 1.5px 1px color-mix(in oklab, ${backgroundColor}, white 35%)`,
  }),
});
