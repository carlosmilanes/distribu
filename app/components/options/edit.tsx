import { OptionBase } from './base';
import { EditIcon } from '@/app/components/icons';
import { create } from 'stylex';
import { colors } from '@/app/styles/vars.stylex';

export function EditOption() {
  return (
    <OptionBase
      icon={<EditIcon />}
      label="Edit"
      styleProps={styles.base}
    />
  );
}

const styles = create({
  base: {
    color: colors.primary,
  },
});
