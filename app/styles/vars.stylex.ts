import { defineVars } from 'stylex';

const DARK = '@media (prefers-color-scheme: dark)';

export const colors = defineVars({
  // base
  '--primary': { default: '#34C759', [DARK]: '#30D158' },

  primary: 'var(--primary)',

  // backgrounds
  background: { default: '#FFFFFF', [DARK]: '#000000' },
  secondaryBackground: { default: '#F2F2F7', [DARK]: '#1C1C1E' },
  tertiaryBackground: { default: '#FFFFFF', [DARK]: '#2C2C2E' },

  // materials
  income: { default: '#34C759', [DARK]: '#30D158' },
  assignedIncome: { default: '#FF9500', [DARK]: '#FF9F0A' },
  usedIncome: { default: '#FF3B30', [DARK]: '#FF453A' },

  glassyBackground: {
    default: 'rgba(255, 255, 255, 0.1)',
    [DARK]: 'rgba(0, 0, 0, 0.1)',
  },

  glassyBorder: {
    default: 'rgba(255, 255, 255, 0.2)',
    [DARK]: 'rgba(0, 0, 0, 0.1)',
  },

  // text
  text: { default: '#000000', [DARK]: '#FFFFFF' },

  whiteText: '#FFFFFF',

  secondaryText: {
    default: 'rgba(60, 60, 67, 0.6)',
    [DARK]: 'rgba(235, 235, 245, 0.6)',
  },
  tertiaryText: {
    default: 'rgba(60, 60, 67, 0.3)',
    [DARK]: 'rgba(235, 235, 245, 0.3)',
  },
  quaternaryText: {
    default: 'rgba(60, 60, 67, 0.15)',
    [DARK]: 'rgba(235, 235, 245, 0.15)',
  },

  vibrant: {
    default: 'rgba(0, 0, 0, 0.9)',
    [DARK]: 'rgba(255, 255, 255, 0.9)',
  },
  secondaryVibrant: {
    default: '#8B5E3C',
    [DARK]: '#D7B0BD',
  },
  tertiaryVibrant: {
    default: '#C19A6B',
    [DARK]: '#B48A99',
  },
  quaternaryVibrant: {
    default: '#DEC8B5',
    [DARK]: '#967885',
  },

  // alerts
  alert: { default: '#FF0000', [DARK]: '#FF2D2D' },
  alertBackground: { default: '#FFE5E5', [DARK]: '#480000' },
  alertBorder: { default: '#FFB3A7', [DARK]: '#9B0000' },

  // warnings
  warning: { default: '#FF9F0A', [DARK]: '#FFD60A' },
  warningBackground: { default: '#FFF4E6', [DARK]: '#3C2A00' },
  warningBorder: { default: '#FFE5B4', [DARK]: '#9B7500' },

  // grays
  gray: { default: '#8E8E93', [DARK]: '#8E8E93' },
  gray2: { default: '#AEAEB2', [DARK]: '#636366' },
  gray3: { default: '#C7C7CC', [DARK]: '#48484A' },
  gray4: { default: '#D1D1D6', [DARK]: '#3A3A3C' },
});

export const fixedSizes = defineVars({
  s1: '4px',
  s2: '8px',
  s3: '12px',
  s4: '16px',

  m1: '24px',
  m2: '32px',
  m3: '48px',
  m4: '64px',

  l1: '96px',
  l2: '128px',
  l3: '192px',
  l4: '256px',

  xl1: '384px',
  xl2: '512px',
  xl3: '640px',
  xl4: '768px',
});

export const dynamicSizes = defineVars({
  s1: '0.25rem', // 4px
  s2: '0.5rem', // 8px
  s3: '0.75rem', // 12px
  s4: '1rem', // 16px

  m1: '1.5rem', // 24px
  m2: '2rem', // 32px
  m3: '3rem', // 48px
  m4: '4rem', // 64px

  l1: '6rem', // 96px
  l2: '8rem', // 128px
  l3: '12rem', // 192px
  l4: '16rem', // 256px

  xl1: '24rem', // 384px
  xl2: '32rem', // 512px
  xl3: '40rem', // 640px
  xl4: '48rem', // 768px
});

export const fontSizes = defineVars({
  s: '0.875rem', // 14px
  m: '1rem', // 16px
  l: '1.25rem', // 20px
  xl: '1.875rem', // 30px
  xxl: '2.5rem', // 40px
});

export const fontWeights = defineVars({
  regular: '400',
  medium: '500',
  bold: '700',
});

export const borderRadius = defineVars({
  s: '4px',
  m: '8px',
  l: '16px',
  xl: '24px',
  full: 'calc(infinity * 1px)',
});

export const shadows = defineVars({
  s: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  m: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  l: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  xxl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
});
