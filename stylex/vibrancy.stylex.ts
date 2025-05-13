import { defineVars } from 'stylex';

// Vibrancy theme variables
export const vibrancyVars = defineVars({
  // Text colors
  primaryText: {
    default: 'black', // Light theme
    '@media (prefers-color-scheme: dark)': 'white', // Dark theme
  },
  secondaryText: {
    default: '#8B5E3C', // Light theme - brown
    '@media (prefers-color-scheme: dark)': '#D7B0BD', // Dark theme - light pink/mauve
  },
  tertiaryText: {
    default: '#C19A6B', // Light theme - light brown
    '@media (prefers-color-scheme: dark)': '#B48A99', // Dark theme - pink/mauve
  },
  quaternaryText: {
    default: '#DEC8B5', // Light theme - very light brown/beige
    '@media (prefers-color-scheme: dark)': '#967885', // Dark theme - darker pink/mauve
  },

  // Fill colors
  primaryFill: {
    default: '#8B5E3C', // Light theme - brown
    '@media (prefers-color-scheme: dark)': '#C19AAA', // Dark theme - pink/mauve
  },
  secondaryFill: {
    default: '#DEC8B5', // Light theme - light beige
    '@media (prefers-color-scheme: dark)': '#A58592', // Dark theme - darker pink/mauve
  },
  tertiaryFill: {
    default: '#EADFD5', // Light theme - very light beige
    '@media (prefers-color-scheme: dark)': '#86707A', // Dark theme - darkest pink/mauve
  },

  // Separator
  separator: {
    default: 'rgba(0, 0, 0, 0.1)', // Light theme - subtle black
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.1)', // Dark theme - subtle white
  },
});
