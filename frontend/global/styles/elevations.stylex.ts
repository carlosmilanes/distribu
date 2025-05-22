import { create, type StyleXStyles } from 'stylex';
import { shadows } from './vars.stylex';

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
  medium: {
    position: 'relative',
    transition: 'scale 0.5s ease-in-out',

    '::before': {
      boxShadow: shadows.m,
      opacity: 1,
      content: '',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      transition: 'opacity 0.5s ease-in-out', // issue here: after clicking, the shadow lags to appear
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
});
