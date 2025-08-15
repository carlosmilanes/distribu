import { create, props as style } from 'stylex';
import { colors, borderRadius } from '@/app/styles/vars.stylex';

export function OptionsSeparator() {
  return <hr {...style(styles.separator)} />;
}

const styles = create({
  separator: {
    color: colors.gray2,
    height: '0.5px',
    width: '90%',
    margin: '0 auto',
    borderRadius: borderRadius.full,
  },
});
