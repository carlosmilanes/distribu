import { create, type StyleXStyles } from 'stylex';
import { shadows } from './vars.stylex';

export const elevation = create({
  low: {
    boxShadow: shadows.small,
  },
  medium: {
    boxShadow: shadows.medium,
  },
  high: {
    boxShadow: shadows.large,
  },
  xhigh: {
    boxShadow: shadows.xlarge,
  },
});

export const reactiveElevation = create({
  medium: {
    position: 'relative',
    boxShadow: shadows.medium,
    transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',

    ':hover': {
      transform: 'scale(1.02)',
      transition: 'transform 0.2s ease-in-out, opacity 0.5s ease-in-out',
      '::after': {
        opacity: 1,
        transition: 'opacity 0.2s ease-in-out',
      },
    },

    '::after': {
      opacity: 0,
      content: '',
      position: 'absolute',
      inset: 0,
      boxShadow: shadows.large,
      zIndex: -1,
      transition: 'opacity 0.5s ease-in-out',
      borderRadius: 'inherit',
    },

    ':active': {
      transform: 'scale(0.98)',
      transition: 'transform 0.2s ease-in-out',
      '::after': {
        opacity: 0,
      },
    },
  },
});
