import { create } from 'stylex';
import { colors } from './vars.stylex';

export const glass = create({
  standard: {
    backgroundColor: colors.glassBackground,
    backdropFilter: 'blur(8px)',
    border: `1px solid ${colors.glassBorder}`,
  },
});
