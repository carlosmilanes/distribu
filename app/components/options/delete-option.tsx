import { BaseOption } from './base-component';
import { TrashIcon } from '@heroicons/react/24/outline';
import { create } from 'stylex';
import { colors } from '@/app/styles/vars.stylex';

export function DeleteOption() {
  return (
    <BaseOption
      IconComponent={TrashIcon}
      label="Delete"
      styleProps={styles.base}
    />
  );
}

const styles = create({
  base: {
    color: colors.alert,
  },
});
