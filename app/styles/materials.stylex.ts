import { create } from 'stylex';
import { colors } from './vars.stylex';

export const glass = create({
  regular: {
    backgroundColor: colors.regularGlass,
    backdropFilter: 'blur(20px)',
    // border: `0.5px solid ${colors.gray3}`,
  },
});
