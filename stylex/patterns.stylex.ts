import { create } from 'stylex';

const lowBoxShadow =
  '0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 6px 8px rgba(0,0,0,0.11), 0 8px 16px rgba(0,0,0,0.11)';

const lowHoveredBoxShadow =
  '0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 6px 8px rgba(0,0,0,0.11), 0 8px 16px rgba(0,0,0,0.11)';

const highBoxShadow =
  '0 2px 1px rgba(0,0,0,0.09), 0 4px 2px rgba(0,0,0,0.09), 0 8px 4px rgba(0,0,0,0.09), 0 16px 8px rgba(0,0,0,0.09), 0 32px 16px rgba(0,0,0,0.09)';

export const float = create({
  low: {
    boxShadow: lowBoxShadow,
  },
  high: {
    boxShadow: highBoxShadow,
  },
});

export const floatAndReact = create({
  low: {
    ':hover': {
      transform: 'scale(1.08)',
    },
    // '::after': {
    //   boxShadow: lowHoveredBoxShadow,
    //   opacity: 0,
    //   transition: 'opacity 0.3s ease-in-out',
    // },
    // ':hover::after': {
    //   opacity: 1,
    // },
    // ':active::after': {
    //   opacity: 1,
    // },
  },
});
