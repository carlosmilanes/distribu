import { defineVars } from 'stylex';

const DARK = '@media (prefers-color-scheme: dark)';

export const colors = defineVars({
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

  vibrantText: {
    default: 'rgba(0, 0, 0, 0.9)',
    [DARK]: 'rgba(255, 255, 255, 0.9)',
  },
  secondaryVibrantText: {
    default: 'rgba(0, 0, 0, 0.6)',
    [DARK]: 'rgba(255, 255, 255, 0.6)',
  },
  tertiaryVibrantText: {
    default: 'rgba(0, 0, 0, 0.3)',
    [DARK]: 'rgba(255, 255, 255, 0.3)',
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

export const borderRadius = defineVars({
  small: '8px',
  medium: '16px',
  big: '24px',
  full: 'calc(infinity * 1px)',
});

export const shadows = defineVars({
  small: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  medium: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  large: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xlarge: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
});
