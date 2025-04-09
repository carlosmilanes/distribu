import { create } from 'stylex';
import { colors } from './vars.stylex';

export const glass = create({
  regular: {
    backgroundColor: colors.glassyBackground,
    backdropFilter: 'blur(8px)',
    border: `1px solid ${colors.glassyBorder}`,
  },
});
