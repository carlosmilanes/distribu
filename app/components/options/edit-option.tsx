import { BaseOption } from './base-component';
import { EditIcon } from '@/app/components/icons';
import { create } from 'stylex';
import { colors } from '@/app/styles/vars.stylex';

export function EditOption() {
  return (
    <BaseOption
      IconComponent={EditIcon}
      label="Edit"
      styleProps={styles.base}
    />
  );
}

const styles = create({
  base: {},
});
